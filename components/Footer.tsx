import { Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 py-10 section-pad">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-white/35">

        {/* Logo / brand */}
        <div className="flex items-center gap-2">
          <span className="text-white/80 font-semibold tracking-tight">RacketMatch</span>
          <span className="text-white/20">·</span>
          <span>© {year}</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-white/60 transition-colors">Prywatność</a>
          <a href="#" className="hover:text-white/60 transition-colors">Regulamin</a>
          <a
            href="mailto:hello@racketmatch.pl"
            className="flex items-center gap-1.5 hover:text-white/60 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Kontakt
          </a>
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white/60 transition-colors text-xs font-medium tracking-wide uppercase"
          >
            IG
          </a>
          <a
            href="#"
            aria-label="TikTok"
            className="hover:text-white/60 transition-colors text-xs font-medium tracking-wide uppercase"
          >
            TT
          </a>
        </div>
      </div>

      {/* Bottom tagline */}
      <p className="text-center text-xs text-white/18 mt-6">
        Made with 🎾 in Poland
      </p>
    </footer>
  );
}
