import { Link } from 'react-router-dom';

export default function SiteHeader() {
  return (
    <nav className="relative z-10 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center animate-glow">
            <span className="text-primary-foreground font-bold text-xl">K</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-gradient">
              India's 1st Divorce Coach
            </h1>
            <p className="text-muted-foreground text-sm">
              Krishnan Govindan • CEO India Therapist
            </p>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/blog"
            className="hidden sm:inline-flex text-foreground/80 hover:text-primary font-medium transition-colors"
          >
            Blog
          </Link>
          <a
            href="https://calendly.com/fulsuccess/ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero"
          >
            Schedule Session
          </a>
        </div>
      </div>
    </nav>
  );
}
