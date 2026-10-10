import { Link, useLocation } from "react-router-dom";
import { SITE, NAV_ITEMS } from "@/data/site";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";  // ← ADD THIS IMPORT

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="border-b border-nano-border bg-nano-surface/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 hover:text-nano-accent transition-colors"
          title="Home"
        >
          <Logo />
          <span className="text-sm font-semibold text-nano-text">{SITE.name}</span>
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
        <nav className="md:hidden border-t border-nano-border bg-nano-surface px-6 py-3 space-y-2">
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
      className="fixed bottom-6 right-6 p-2 bg-nano-surface border border-nano-border rounded-full shadow-sm hover:shadow-md transition-all text-nano-text-secondary hover:text-nano-text z-40"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-nano-bg">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}