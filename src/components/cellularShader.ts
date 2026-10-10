// Fragment shader for the cellular orb + tunnel background (mode 2 = orb inside tunnel).
export const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uMode;    // 0 = orb, 1 = tunnel, 2 = both
uniform vec2  uMouse;   // smoothed pointer, -1..1

#define PI  3.14159265
#define TAU 6.28318531

// ---------------------------------------------------------------- hashes (sine-free, stable at large coords)
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*.1031); p3 += dot(p3, p3.yzx+33.33); return fract((p3.x+p3.y)*p3.z); }
vec2  hash22(vec2 p){ vec3 p3 = fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); p3 += dot(p3, p3.yzx+33.33); return fract((p3.xx+p3.yz)*p3.zy); }
float hash13(vec3 p3){ p3 = fract(p3*.1031); p3 += dot(p3, p3.zyx+31.32); return fract((p3.x+p3.y)*p3.z); }
vec3  hash33(vec3 p3){ p3 = fract(p3*vec3(.1031,.1030,.0973)); p3 += dot(p3, p3.yxz+33.33); return fract((p3.xxy+p3.yxx)*p3.zyx); }

// thin-film style rainbow
vec3 irid(float x){ return 0.5 + 0.5*cos(TAU*(x + vec3(0.0, 0.33, 0.67))); }

mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }

// ---------------------------------------------------------------- cellular noise
// Smooth distance to the nearest cell border (rounded holes) + its gradient.
// 2D, periodic in x (wraps around the tunnel). returns (dist, grad.xy, cellHash)
vec4 cells2(vec2 x, float per, float sk){
  vec2 n = floor(x), f = fract(x);
  vec2 mg = vec2(0.0), mr = vec2(0.0);
  float md = 8.0;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec2 g = vec2(float(i), float(j));
    vec2 c = n + g; c.x = mod(c.x, per);
    vec2 r = g + 0.1 + 0.8*hash22(c) - f;
    float d = dot(r,r);
    if(d < md){ md = d; mr = r; mg = g; }
  }
  float sw = 0.0; vec2 gs = vec2(0.0);
  for(int j=-2;j<=2;j++) for(int i=-2;i<=2;i++){
    vec2 g = mg + vec2(float(i), float(j));
    vec2 c = n + g; c.x = mod(c.x, per);
    vec2 r = g + 0.1 + 0.8*hash22(c) - f;
    vec2 dr = r - mr;
    float l2 = dot(dr,dr);
    if(l2 > 1e-6){
      vec2 nd = dr*inversesqrt(l2);
      float w = exp(-dot(0.5*(mr+r), nd)/sk);
      sw += w; gs += w*nd;
    }
  }
  sw = max(sw, 1e-30);
  vec2 cid = n + mg; cid.x = mod(cid.x, per);
  return vec4(-sk*log(sw), -gs/sw, hash12(cid));
}

// 3D version for the orb. returns (dist, grad.xyz); cell hash via out param
vec4 cells3(vec3 x, float sk, out float cid){
  vec3 n = floor(x), f = fract(x);
  vec3 mg = vec3(0.0), mr = vec3(0.0);
  float md = 8.0;
  for(int k=-1;k<=1;k++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec3 g = vec3(float(i), float(j), float(k));
    vec3 r = g + hash33(n+g) - f;
    float d = dot(r,r);
    if(d < md){ md = d; mr = r; mg = g; }
  }
  float sw = 0.0; vec3 gs = vec3(0.0);
  for(int k=-1;k<=1;k++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec3 g = mg + vec3(float(i), float(j), float(k));
    vec3 r = g + hash33(n+g) - f;
    vec3 dr = r - mr;
    float l2 = dot(dr,dr);
    if(l2 > 1e-6){
      vec3 nd = dr*inversesqrt(l2);
      float w = exp(-dot(0.5*(mr+r), nd)/sk);
      sw += w; gs += w*nd;
    }
  }
  sw = max(sw, 1e-30);
  cid = hash13(n+mg);
  return vec4(-sk*log(sw), -gs/sw);
}

// nearest feature point only (for spikes). returns (dist, hash)
vec2 f1cells3(vec3 x){
  vec3 n = floor(x), f = fract(x);
  float md = 8.0, id = 0.0;
  for(int k=-1;k<=1;k++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){
    vec3 g = vec3(float(i), float(j), float(k));
    vec3 r = g + hash33(n+g) - f;
    float d = dot(r,r);
    if(d < md){ md = d; id = hash13(n+g+7.0); }
  }
  return vec2(sqrt(md), id);
}

vec2 sph(vec3 ro, vec3 rd, vec3 c, float r){
  vec3 oc = ro - c;
  float b = dot(oc, rd);
  float h = b*b - dot(oc,oc) + r*r;
  if(h < 0.0) return vec2(-1.0);
  h = sqrt(h);
  return vec2(-b-h, -b+h);
}

// ---------------------------------------------------------------- tunnel
vec2 path(float z){ return vec2(1.1*sin(z*0.19) + 0.7*sin(z*0.071+1.3), 0.8*cos(z*0.157) + 0.5*sin(z*0.093+0.4)); }
vec2 dpath(float z){ return vec2(0.209*cos(z*0.19) + 0.0497*cos(z*0.071+1.3), -0.1256*sin(z*0.157) + 0.0465*cos(z*0.093+0.4)); }

void layerParams(int L, out float R, out float per, out float w){
  if(L == 0){ R = 1.85; per = 10.0; w = 0.15; }
  else if(L == 1){ R = 2.9; per = 14.0; w = 0.12; }
  else { R = 4.4; per = 19.0; w = 0.10; }
}

vec3 spaceBg(vec3 rd){
  vec3 col = vec3(0.004, 0.003, 0.012);
  float n = sin(rd.x*3.1 + sin(rd.y*2.3)) * sin(rd.y*2.7 + rd.z*1.9);
  col += vec3(0.025, 0.008, 0.06) * (0.5 + 0.5*n);
  vec3 q = rd*150.0;
  vec3 id = floor(q);
  float h = hash13(id);
  if(h > 0.986){
    float s = smoothstep(0.32, 0.0, length(fract(q) - 0.5));
    col += vec3(0.85, 0.8, 1.0) * s * (h - 0.986) * 70.0;
  }
  return col;
}

vec3 renderTunnel(vec3 ro, vec3 rd, float tm, vec3 lightPos, float pixA, out float tFirst){
  vec3 col = vec3(0.0);
  vec3 fogCol = vec3(0.016, 0.008, 0.042);
  float T = 1.0;
  float t = 0.0;
  tFirst = 1e5;
  for(int L=0; L<3; L++){
    float R, per, wb;
    layerParams(L, R, per, wb);
    for(int i=0; i<60; i++){
      vec3 p = ro + rd*t;
      float d = R - length(p.xy - path(p.z));
      if(d < 0.003 || t > 60.0) break;
      t += d*0.8;
    }
    if(t > 60.0){ col += T*fogCol; T = 0.0; break; }
    if(L == 0) tFirst = t;

    vec3 p = ro + rd*t;
    vec2 rel = p.xy - path(p.z);
    float rho = length(rel);
    vec2 rn = rel/rho;
    vec3 N = normalize(vec3(-rn, dot(rn, dpath(p.z))));
    float ang = atan(rel.y, rel.x);
    float sz = per/(TAU*R)*0.72;
    float fl = float(L);
    vec2 uv = vec2(ang/TAU*per, p.z*sz);
    uv.x += 0.22*sin(uv.y*0.9 + fl*1.7);
    uv.y += 0.30*sin(ang*3.0 + fl*2.3);
    vec4 v = cells2(uv, per, 0.07);

    float w = wb*(0.7 + 0.6*v.w)*(1.0 + 0.12*sin(tm*0.6 + v.w*TAU));
    float aa = clamp(t*pixA*sz/max(abs(dot(rd, N)), 0.2), 0.004, 0.3);
    float hole = smoothstep(w - aa, w + aa, v.x);
    float a = 1.0 - hole;

    // rounded membrane normal: tilts into the hole near its rim
    vec3 Tt = vec3(-rn.y, rn.x, 0.0);
    vec3 Tz = normalize(vec3(0.0, 0.0, 1.0) - N*N.z);
    vec3 gW = Tt*v.y*(per/(TAU*rho)) + Tz*v.z*sz;
    gW = gW/(length(gW) + 1e-5);
    float s = clamp(v.x/w, 0.0, 1.0);
    vec3 Nf = normalize(N*sqrt(max(1.0 - s*s*0.88, 0.0)) + gW*s);

    vec3 V = -rd;
    vec3 Lv = lightPos - p; float ld = length(Lv); Lv /= ld;
    float att = 1.0/(1.0 + 0.045*ld*ld);
    float dif = max(dot(Nf, Lv), 0.0);
    float fres = pow(1.0 - clamp(dot(Nf, V), 0.0, 1.0), 4.0);
    float spec = pow(max(dot(Nf, normalize(Lv + V)), 0.0), 48.0);

    float rim = smoothstep(0.62, 1.0, s); rim *= rim;
    vec3 base = mix(vec3(0.010, 0.008, 0.035), vec3(0.030, 0.014, 0.075), v.w);
    vec3 c = base*(0.14 + 1.7*dif*att);
    vec3 rimCol = mix(vec3(0.58, 0.34, 1.0), vec3(1.0, 0.48, 0.80), v.w);
    c += rimCol * rim * (0.05 + 1.3*att) * (0.3 + 0.7*fres);
    c += vec3(0.85, 0.75, 1.0) * spec * att * 1.1;

    c = mix(fogCol, c, exp(-t*0.07));
    c *= 1.0 - fl*0.24;
    col += T*a*c;
    T *= hole;
    if(T < 0.02) break;
    t += 0.01;
  }
  col += T*spaceBg(rd);
  return col;
}

// helical light streams flowing down the tunnel.
// Each ray segment's glow is integrated analytically (no sampling grain).
vec2 strandQ(vec3 p, float fk, float tm, float spread){
  vec2 rel = p.xy - path(p.z);
  float rho = length(rel);
  float ang = atan(rel.y, rel.x);
  float rh = spread + 0.28*sin(p.z*0.37 + fk*2.1 + tm*0.5);
  float beta = p.z*(0.9 + 0.22*fk) - tm*(1.25 + 0.3*fk) + fk*2.0944;
  float da = mod(ang - beta + PI, TAU) - PI;
  return vec2(rho - rh, da*rh*0.6);
}
// integral over u in [0,1] of 1/(|q0 + (q1-q0)u|^2 + k)
float segInt(vec2 q0, vec2 q1, float k){
  vec2 D = q1 - q0;
  float A = dot(D, D), B = 2.0*dot(q0, D), C = dot(q0, q0) + k;
  float disc = sqrt(max(4.0*A*C - B*B, 1e-12));
  return 2.0/disc*(atan((2.0*A + B)/disc) - atan(B/disc));
}
vec3 energy(vec3 ro, vec3 rd, float tmax, float tm, float spread){
  float acc = 0.0;
  float tBeg = 0.7;
  float tEnd = min(tmax, 15.0);
  float dt = max(tEnd - tBeg, 0.0)/24.0;
  for(int i=0; i<24; i++){
    float t0 = tBeg + dt*float(i);
    vec3 p0 = ro + rd*t0, p1 = p0 + rd*dt;
    for(int k=0; k<3; k++){
      float fk = float(k);
      vec2 q0 = strandQ(p0, fk, tm, spread), q1 = strandQ(p1, fk, tm, spread);
      if(abs(q1.y - q0.y) < 1.2){
        float pulse = 0.35 + 0.65*pow(0.5 + 0.5*sin((p0.z + p1.z)*0.7 - tm*2.4 + fk*1.7), 2.0);
        acc += pulse*dt*(0.0013*segInt(q0, q1, 0.0005) + 0.00022*segInt(q0, q1, 0.02));
      }
    }
  }
  return vec3(0.52, 0.36, 1.0)*acc*1.5 + vec3(1.0, 0.92, 1.0)*acc*acc*1.2;
}

// ---------------------------------------------------------------- orb
// One perforated shell layer. Returns premultiplied colour + coverage.
vec4 orbShell(vec3 p, vec3 rd, vec3 c, float rad, mat3 M, float scl, float wb, float side,
              float t, float pixA, vec3 lightPos, float theme, float inner, float tm){
  vec3 n = (p - c)/rad;
  vec3 no = M*n;
  float cid;
  vec4 v = cells3(no*scl + vec3(inner*17.3), 0.10, cid);
  float w = wb*(0.35 + 2.4*cid*cid*cid);
  float aa = clamp(t*pixA*scl/rad/max(abs(dot(rd, n)), 0.12), 0.003, 0.3);
  float hole = smoothstep(w - aa, w + aa, v.x);
  float a = 1.0 - hole;
  bool skin = side > 0.0 && inner < 0.5;

  // chromatic fringe just inside each hole's edge
  float fr = hole*exp(-max(v.x - w, 0.0)/0.035)*(skin ? mix(0.75, 0.6, theme) : 0.35);
  vec3 frC = clamp(irid((v.x - w)*7.0 + cid*0.7 + no.y*0.4 + tm*0.03)*1.45 - 0.25, 0.0, 1.0);
  frC = mix(frC, frC*vec3(0.75, 0.6, 1.25), theme);
  if(a < 0.002 && fr < 0.002) return vec4(0.0);

  vec3 g = v.yzw*M;                       // gradient back to world space
  g -= n*dot(g, n);
  g = g/(length(g) + 1e-5);
  float s = clamp(v.x/w, 0.0, 1.0);
  vec3 Nf = normalize(n*side*sqrt(max(1.0 - s*s*0.9, 0.0)) + g*s);
  vec3 V = -rd;
  float ndv = clamp(dot(Nf, V), 0.0, 1.0);
  vec3 Lv = normalize(lightPos - p);
  float dif = max(dot(Nf, Lv), 0.0);
  float spec = pow(max(dot(Nf, normalize(Lv + V)), 0.0), 60.0);
  float fres = pow(1.0 - ndv, 2.5);
  vec3 ir = clamp(irid(1.3*(1.0 - ndv) + 0.8*s + cid*0.6 + tm*0.03)*1.3 - 0.15, 0.0, 1.0);
  float rim = smoothstep(0.3, 1.0, s);

  vec3 col;
  if(skin){
    // outer skin: dark, glossy, rainbow rims around every hole
    vec3 base = mix(vec3(0.045, 0.05, 0.07), vec3(0.03, 0.022, 0.07), theme);
    col = base*(0.4 + 1.4*dif);
    float edge = pow(1.0 - abs(dot(n, V)), 2.0);
    col += mix(vec3(0.20, 0.45, 0.62), vec3(0.42, 0.28, 0.90), theme)*edge*0.55;
    col += ir*rim*rim*(0.45 + 0.8*fres)*mix(1.0, 1.15, theme);
    col += vec3(0.9, 0.95, 1.0)*smoothstep(0.92, 1.0, s)*0.22;
    col += vec3(1.0)*spec*0.7;
  } else {
    // interior surfaces: luminous, glassy
    vec3 emit = mix(vec3(0.80, 0.76, 0.86), vec3(0.16, 0.09, 0.40), theme);
    emit *= mix(vec3(1.0), 0.55 + 0.6*irid(cid + no.y*0.3 + tm*0.02), 0.45);
    col = emit*(0.65 + 0.35*dif);
    col = mix(col, ir*mix(1.05, 1.5, theme), rim*(0.55 + 0.4*fres));
    col += vec3(1.0)*spec*0.4;
    a *= mix(0.78, 0.85, inner);
  }
  return vec4(col*a + frC*fr, a + fr);
}

vec4 spikes(vec3 ro, vec3 rd, vec3 c, float rad, mat3 M, float pixA, float theme, float tm){
  float tc = dot(c - ro, rd);
  vec3 bv = ro + rd*tc - c;
  float b = length(bv);
  float L = rad*0.24;
  float x = b - rad;
  if(x < -0.02*rad || x > L) return vec4(0.0);
  vec3 q = M*(bv/b);
  vec2 f = f1cells3(q*15.0);
  float h = L*pow(clamp(1.0 - f.x/0.62, 0.0, 1.0), 1.4)*(0.18 + 0.82*f.y*f.y);
  float aa = tc*pixA*1.2;
  float a = smoothstep(h + aa, h - aa, x)*smoothstep(4.0, 12.0, L/(tc*pixA));
  if(a < 0.002) return vec4(0.0);
  float tip = clamp(x/max(h, 1e-3), 0.0, 1.0);
  vec3 skin = mix(vec3(0.06, 0.075, 0.10), vec3(0.05, 0.035, 0.11), theme);
  vec3 tipC = mix(vec3(0.35, 0.75, 0.95), irid(f.y*2.0 + tm*0.03), 0.5);
  vec3 col = mix(skin, tipC*mix(0.9, 1.15, theme), smoothstep(0.35, 1.0, tip)*0.6);
  return vec4(col, a*0.92);
}

vec3 renderOrb(vec3 ro, vec3 rd, vec3 c, float rad, mat3 M, float tm, vec3 bg,
               float pixA, vec3 lightPos, float theme, out float hitT){
  hitT = 1e5;
  vec3 col = vec3(0.0);
  float T = 1.0;
  vec2 iO = sph(ro, rd, c, rad);
  if(iO.y > 0.0){
    hitT = iO.x;
    vec3 p = ro + rd*iO.x;
    vec4 s = orbShell(p, rd, c, rad, M, 3.1, 0.045, 1.0, iO.x, pixA, lightPos, theme, 0.0, tm);
    col += T*s.rgb; T *= 1.0 - s.a;

    // light trapped inside the shell
    float chord = iO.y - iO.x;
    float hz = 1.0 - exp(-chord*0.55);
    vec3 haze = mix(vec3(0.95, 0.90, 1.0), vec3(0.40, 0.24, 1.0), theme);
    col += T*haze*hz*mix(0.22, 0.22, theme);
    T *= 1.0 - hz*mix(0.30, 0.25, theme);

    if(T > 0.01){
      mat3 M2 = rotY(-tm*0.21)*rotX(0.7)*M;
      float r2 = rad*0.58;
      vec2 iI = sph(ro, rd, c, r2);
      if(iI.y > 0.0){
        p = ro + rd*iI.x;
        s = orbShell(p, rd, c, r2, M2, 3.4, 0.05, 1.0, iI.x, pixA, lightPos, theme, 1.0, tm);
        col += T*s.rgb; T *= 1.0 - s.a;
        if(T > 0.01){
          p = ro + rd*iI.y;
          s = orbShell(p, rd, c, r2, M2, 3.4, 0.05, -1.0, iI.y, pixA, lightPos, theme, 1.0, tm);
          col += T*s.rgb; T *= 1.0 - s.a;
        }
      }
      if(T > 0.01){
        p = ro + rd*iO.y;
        s = orbShell(p, rd, c, rad, M, 3.1, 0.045, -1.0, iO.y, pixA, lightPos, theme, 0.0, tm);
        col += T*s.rgb; T *= 1.0 - s.a;
      }
    }
  }
  col += T*bg;
  vec4 sp = spikes(ro, rd, c, rad, M, pixA, theme, tm);
  col = mix(col, sp.rgb, sp.a);
  if(sp.a > 0.01) hitT = min(hitT, dot(c - ro, rd));
  return col;
}

// ---------------------------------------------------------------- camera
mat3 camMat(vec3 ro, vec3 ta, float roll){
  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(sin(roll), cos(roll), 0.0);
  vec3 cu = normalize(cross(cp, cw));
  vec3 cv = cross(cw, cu);
  return mat3(cu, cv, cw);
}

vec3 aces(vec3 x){ return clamp((x*(2.51*x + 0.03))/(x*(2.43*x + 0.59) + 0.14), 0.0, 1.0); }

void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = (fc - 0.5*uRes)/uRes.y;
  vec2 q = fc/uRes;
  float tm = uTime;
  float jit = hash12(fc + fract(tm*7.13)*91.0);
  vec3 col;

  if(uMode < 0.5){
    // ---------------- ORB: pale studio backdrop
    float f = 1.75;
    float a = tm*0.06;
    vec3 ro = vec3(0.45*sin(a) + uMouse.x*0.35, 0.15 + uMouse.y*0.25, -5.2);
    vec3 ta = vec3(0.0);
    vec3 rd = camMat(ro, ta, 0.0)*normalize(vec3(uv, f));
    float pixA = 1.0/(uRes.y*f);

    vec3 bg = mix(vec3(0.80, 0.86, 0.90), vec3(0.93, 0.95, 0.97), smoothstep(-0.6, 0.6, uv.y));
    float halo = exp(-dot(uv, uv)*3.2);
    bg += vec3(0.02, 0.06, 0.07)*halo;
    bg += irid(atan(uv.y, uv.x)/TAU + tm*0.02)*0.035*exp(-pow(length(uv) - 0.42, 2.0)*40.0);

    vec3 c = vec3(0.0, 0.06*sin(tm*0.55), 0.0);
    mat3 M = rotX(0.35*sin(tm*0.13))*rotY(tm*0.16);
    vec3 lp = vec3(-3.0, 4.0, -4.0);
    float hitT;
    col = renderOrb(ro, rd, c, 1.0, M, tm, bg, pixA, lp, 0.0, hitT);
    col *= 0.88 + 0.12*pow(16.0*q.x*q.y*(1.0 - q.x)*(1.0 - q.y), 0.25);
    col = clamp(col, 0.0, 1.0);
  } else {
    // ---------------- TUNNEL (and BOTH: orb floating inside it)
    float both = step(1.5, uMode);
    float f = 1.15;
    float zc = tm*0.85;
    vec3 ro = vec3(path(zc), zc);
    ro.xy += uMouse*vec2(0.28, 0.2);
    vec3 ta = vec3(path(zc + 2.4), zc + 2.4);
    float roll = 0.22*sin(tm*0.11) - (path(zc + 3.0).x - path(zc).x)*0.35;
    vec3 rd = camMat(ro, ta, roll)*normalize(vec3(uv, f));
    float pixA = 1.0/(uRes.y*f);

    float zl = zc + 4.0;
    vec3 lp = vec3(path(zl) + 0.45*vec2(cos(tm*0.8), sin(tm*0.8)), zl);

    float tF;
    col = renderTunnel(ro, rd, tm, lp, pixA, tF);

    float tStop = tF;
    if(both > 0.5){
      float zo = zc + 5.6;
      vec3 c = vec3(path(zo), zo) + vec3(0.0, 0.08*sin(tm*0.7), 0.0);
      mat3 M = rotX(0.35*sin(tm*0.13))*rotY(tm*0.16);
      float hitT;
      vec3 oc = renderOrb(ro, rd, c, 0.78, M, tm, col, pixA, lp, 1.0, hitT);
      if(hitT < tF){ col = oc; tStop = hitT; }
    }

    col += energy(ro, rd, tStop, tm, mix(0.6, 1.15, both));
    // soft bloom around the light
    vec3 toL = lp - ro;
    float lt = dot(toL, rd);
    if(lt > 0.0 && lt < tStop){
      float ld = length(toL - rd*lt);
      col += vec3(0.6, 0.45, 1.0)*0.05/(ld*ld + 0.05);
    }
    col *= 0.55 + 0.45*pow(16.0*q.x*q.y*(1.0 - q.x)*(1.0 - q.y), 0.3);
    col = aces(col*1.05);
  }

  col = pow(col, vec3(1.0/2.2));
  col += (jit - 0.5)/255.0;
  gl_FragColor = vec4(col, 1.0);
}
`;
