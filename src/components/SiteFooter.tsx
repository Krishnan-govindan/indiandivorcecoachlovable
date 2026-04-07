import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-card/20 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">K</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-gradient">
                  India's 1st Divorce Coach
                </h3>
                <p className="text-muted-foreground text-sm">
                  Krishnan Govindan • CEO India Therapist
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              India's pioneering divorce recovery expert. Founder of Indian Life Coaches,
              specializing in breakup healing, digital nomad lifestyle, and relationship
              transitions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Specialized Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Divorce Recovery Coaching</li>
              <li>Breakup Healing Programs</li>
              <li>Digital Nomad Lifestyle</li>
              <li>Relationship Transition Support</li>
              <li>Tech Professional Coaching</li>
              <li>Life Strategy Development</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/nomad_krishnan/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/NomadKrishnan/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@NomadKrishnan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/coachkrishnangovindan/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              support@indianlifecoaches.com
              <br />
              +1 (425) 442-4167
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} India's 1st Divorce Coach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
