import { useEffect, useRef } from "react";
import { FRAG } from "@/components/cellularShader";

// Full-screen WebGL background: the cellular orb floating inside the violet tunnel.
// Resolution adapts to frame rate; rendering pauses while the tab is hidden.
export function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const opts = { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "high-performance" as const };
    const gl = (canvas.getContext("webgl2", opts) || canvas.getContext("webgl", opts)) as WebGLRenderingContext | null;
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "shader");
      return sh;
    };
    const prog = gl.createProgram()!;
    try {
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, "attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }"));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.bindAttribLocation(prog, 0, "aPos");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link");
    } catch (e) {
      console.error(e);
      return;
    }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMode = gl.getUniformLocation(prog, "uMode");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const speed = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.35 : 1;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const forBudget = (px: number) => Math.sqrt(px / Math.max(1, innerWidth * innerHeight * DPR * DPR));
    let maxScale = 1, minScale = 0.25, ceiling = 1, scale = 1;

    const resize = () => {
      canvas.width = Math.max(1, Math.round(innerWidth * DPR * scale));
      canvas.height = Math.max(1, Math.round(innerHeight * DPR * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const resetScale = () => {
      maxScale = Math.min(1, forBudget(1.6e6));
      minScale = Math.min(maxScale, Math.max(0.2, forBudget(2.0e5)));
      ceiling = maxScale;
      scale = Math.min(maxScale, Math.max(minScale, forBudget(6e5)));
      resize();
    };

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("resize", resetScale);

    let simTime = 7, last = performance.now(), ema = 16.7, lastAdjust = 0, raf = 0;
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      simTime += dt * speed;
      const k = Math.min(1, dt * 2.2);
      mouse.x += (mouse.tx - mouse.x) * k;
      mouse.y += (mouse.ty - mouse.y) * k;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, simTime);
      gl.uniform1f(uMode, 2);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      ema = ema * 0.9 + dt * 1000 * 0.1;
      if (now - lastAdjust > 1200) {
        if (ema > 24 && scale > minScale) {
          scale = Math.max(minScale, scale * 0.85);
          ceiling = scale;
          resize(); lastAdjust = now;
        } else if (ema < 17.6 && scale < Math.min(maxScale, ceiling)) {
          scale = Math.min(maxScale, ceiling, scale * 1.06);
          resize(); lastAdjust = now;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    document.addEventListener("visibilitychange", onVisibility);

    resetScale();
    canvas.classList.add("on");
    raf = requestAnimationFrame((t) => { last = t; frame(t); });

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", resetScale);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="space-bg" aria-hidden="true" />;
}
