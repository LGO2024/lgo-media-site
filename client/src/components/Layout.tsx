// LGO Layout Components
// Design: Japanese Editorial × Digital-Native
// - Header: Logo + Nav + LINE CTA
// - Footer: Sitemap + Brand
// - StickyCTA: Fixed bottom bar on mobile (モゲチェック型UX①)
// - CTA links route to internal LINE gateway page for error recovery

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle, ChevronRight } from "lucide-react";
import { LINE_GATEWAY_PATH } from "@/lib/data";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/plans", label: "プランを探す" },
    { href: "/articles", label: "お役立ち記事" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
          : "bg-white border-b border-border"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.72 0.15 210)" }}>
              <span className="text-white font-bold text-sm" style={{ fontFamily: "Oswald, sans-serif" }}>LGO</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base" style={{ color: "oklch(0.22 0.06 250)", fontFamily: "Noto Sans JP, sans-serif" }}>
                LGO旅チェック
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors no-underline ${
                  location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-2 no-underline text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={LINE_GATEWAY_PATH}
                            className="btn-line justify-center text-sm no-underline"
              onClick={() => setMenuOpen(false)}
            >
              <MessageCircle size={16} />
              LGOに1分で丸投げ！LINE無料診断
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[oklch(0.22_0.06_250)] text-white mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.72 0.15 210)" }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: "Oswald, sans-serif" }}>LGO</span>
              </div>
              <span className="font-bold text-white">LGO旅チェック</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              大学生の合宿・旅行をLGOが1分でマッチング。<br />
              幹事の面倒な宿探し・見積もりを全部丸投げ。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3 text-white">コンテンツ</h4>
            <ul className="space-y-2">
              <li><Link href="/plans" className="text-sm text-white/60 hover:text-white no-underline">プランを探す</Link></li>
              <li><Link href="/articles" className="text-sm text-white/60 hover:text-white no-underline">お役立ち記事</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3 text-white">無料診断</h4>
            <p className="text-sm text-white/60 mb-4">LGOが1分で最適なプランを3つ提案。完全無料でご利用いただけます。</p>
            <a
              href={LINE_GATEWAY_PATH}
                            className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2 rounded-full no-underline"
              style={{ background: "oklch(0.72 0.15 210)" }}
            >
              <MessageCircle size={14} />
              LINEで無料診断
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/40">
          <span>© 2026 LGO旅チェック. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white/70 no-underline text-white/40">プライバシーポリシー</Link>
            <Link href="/contact" className="hover:text-white/70 no-underline text-white/40">お問い合わせ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-slide-in-bottom">
      <a
        href={LINE_GATEWAY_PATH}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between px-4 py-3 text-white no-underline"
        style={{ background: "oklch(0.72 0.15 210)", boxShadow: "0 -4px 20px oklch(0.72 0.15 210 / 0.4)" }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle size={20} />
          <div>
            <div className="text-xs font-bold leading-tight">LGOに1分で丸投げ！</div>
            <div className="text-xs opacity-90 leading-tight">LINE無料診断（完全無料）</div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
          診断する <ChevronRight size={12} />
        </div>
      </a>
    </div>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
