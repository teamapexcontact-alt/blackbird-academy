import { Globe, Video, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="BlackBird Academy" className="h-7 w-7" />
            <span className="display-heading text-sm">
              Black<span className="serif-accent text-accent">Bird</span>
              <span className="block text-[10px] font-label uppercase tracking-[0.2em] text-muted-text mt-0.5">
                Academy © {new Date().getFullYear()}
              </span>
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-text hover:text-accent hover:border-accent/40 transition-all"
              aria-label="Instagram"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-text hover:text-accent hover:border-accent/40 transition-all"
              aria-label="YouTube"
            >
              <Video className="w-4 h-4" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-text hover:text-accent hover:border-accent/40 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </nav>

          <div className="flex items-center gap-5 text-xs text-muted-text font-label uppercase tracking-[0.2em]">
            <button className="hover:text-primary-text transition-colors">Privacy</button>
            <button className="hover:text-primary-text transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
