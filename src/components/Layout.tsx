import { Link, useLocation } from "react-router-dom";
import { SITE, NAV_ITEMS } from "@/data/site";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";
import { SpaceBackground } from "@/components/SpaceBackground";

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="glass border-x-0 border-t-0 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:text-nano-accent transition-colors"
          title="Home"
        >
          <Logo />
          <span className="font-brand text-sm tracking-wider uppercase text-nano-text">{SITE.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm transition-colors ${
                location.pathname === item.path
                  ? "text-nano-text font-medium"
                  : "text-nano-text-secondary hover:text-nano-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-nano-text-secondary hover:text-nano-text"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-nano-border px-6 py-3 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-1.5 text-sm transition-colors ${
                location.pathname === item.path
                  ? "text-nano-text font-medium"
                  : "text-nano-text-secondary hover:text-nano-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-nano-border mt-16">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nano-text-secondary hover:text-nano-text transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nano-text-secondary hover:text-nano-text transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SITE.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-nano-text-secondary hover:text-nano-text transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-nano-text-secondary hover:text-nano-text transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-nano-text-secondary">
            © {new Date().getFullYear()} {SITE.name}. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 p-2 glass rounded-full shadow-sm hover:shadow-md transition-all text-nano-text-secondary hover:text-nano-text z-40"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

// Preview switch for background layouts: ?look=open|cards|frame|dark and ?accent=gold
function useLook() {
  const params = new URLSearchParams(window.location.search);
  const look = params.get("look") || "open";
  const accent = params.get("accent") || "violet";
  useEffect(() => {
    document.documentElement.dataset.look = look;
    document.documentElement.dataset.accent = accent;
  }, [look, accent]);
  return look;
}

// In the "cards" look the scrim is opaque, with holes cut where the cards are,
// so the moving background only shows through the cards.
function useCardWindows(enabled: boolean, scrim: React.RefObject<HTMLDivElement | null>, isHome: boolean) {
  useEffect(() => {
    const el = scrim.current;
    if (!el) return;
    if (!enabled) { el.style.clipPath = ""; return; }
    let raf = 0, prev = "";
    const tick = () => {
      const w = innerWidth, h = innerHeight;
      let d = `M0 0H${w}V${h}H0Z`;
      document.querySelectorAll<HTMLElement>(isHome ? ".bg-window" : "main > div").forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) return;
        const k = Math.min(20, r.width / 2, r.height / 2);
        d += `M${r.left + k} ${r.top}H${r.right - k}Q${r.right} ${r.top} ${r.right} ${r.top + k}V${r.bottom - k}Q${r.right} ${r.bottom} ${r.right - k} ${r.bottom}H${r.left + k}Q${r.left} ${r.bottom} ${r.left} ${r.bottom - k}V${r.top + k}Q${r.left} ${r.top} ${r.left + k} ${r.top}Z`;
      });
      if (d !== prev) { el.style.clipPath = `path(evenodd, "${d}")`; prev = d; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.style.clipPath = ""; };
  }, [enabled, scrim, isHome]);
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const look = useLook();
  const isHome = location.pathname === "/";
  const scrim = useRef<HTMLDivElement>(null);
  useCardWindows(look === "cards", scrim, isHome);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SpaceBackground />
      <div ref={scrim} className={`space-scrim${isHome ? " home" : ""}`} aria-hidden="true" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}