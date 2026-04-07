import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ParticleBackground from '@/components/ParticleBackground';
import ContactForm from '@/components/ContactForm';
import HomeBlogSection from '@/components/HomeBlogSection';
import SEO from '@/components/SEO';
import {
  Calendar,
  Target,
  TrendingUp,
  Users,
  Brain,
  Star,
  Play,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Divorce Recovery Coaching",
      description: "India's first divorce coach specializing in breakup healing and relationship transition support for emotional recovery and new beginnings."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Digital Nomad Lifestyle Coaching", 
      description: "Master location independence, remote work strategies, and build a successful nomadic lifestyle while traveling the world."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Success & Tech Coaching",
      description: "Specialized coaching for software engineers, tech professionals, and startup founders to accelerate career growth and leadership."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Relationship & Life Strategy",
      description: "Comprehensive relationship coaching and life strategy development for high achievers seeking authentic connections and purpose."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Mindset Mastery & Confidence",
      description: "Transform limiting beliefs into empowering thoughts. Build unshakeable confidence for personal and professional success."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Leadership Development",
      description: "Cultivate authentic leadership skills for entrepreneurs, executives, and ambitious professionals ready to make an impact."
    }
  ];

  const videos = [
    {
      id: "fQvde2LuQdI",
      title: "Divorce Recovery - Healing After Breakup"
    },
    {
      id: "g9zS01iiTXw", 
      title: "Digital Nomad Success Strategies"
    },
    {
      id: "fb7Qz-Mn0XE",
      title: "Relationship Transition & Life Rebuilding"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Seattle, WA",
      text: "Krishnan helped me rebuild my life after a difficult divorce. His approach as India's first divorce coach is truly revolutionary.",
      rating: 5
    },
    {
      name: "Raj Patel", 
      location: "San Francisco, CA",
      text: "As a software engineer, I connected with Krishnan's tech background. His digital nomad coaching changed my entire lifestyle.",
      rating: 5
    },
    {
      name: "Meera Gupta",
      location: "New York, NY", 
      text: "The breakup recovery program was life-changing. Krishnan's expertise in relationship transitions is unmatched.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <SEO
        title="India's First Divorce Coach | Breakup Recovery Expert | Krishnan Govindan"
        description="India's First Divorce Coach & Breakup Recovery Expert. Heal after divorce with the proven 3-phase framework from Krishnan Govindan — CEO India Therapist, founder indianlifecoaches.com. Free discovery call."
        keywords="india's first divorce coach, divorce recovery coach, breakup coach india, divorce coach krishnan, healing after divorce, life strategist india, indian divorce coach, divorce coaching, breakup recovery program, relationship transition coach, life coach seattle, indianlifecoaches.com, krishnan govindan"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Krishnan Govindan',
            alternateName: "India's First Divorce Coach",
            description:
              'Breakup and Divorce Recovery Coach, Life Strategist, Relationship Coach, CEO at India Therapist, Founder of indianlifecoaches.com',
            jobTitle: 'Life Strategist, Divorce Recovery Coach, CEO',
            worksFor: {
              '@type': 'Organization',
              name: 'India Therapist',
              url: 'https://www.indianlifecoaches.com/',
            },
            knowsAbout: [
              'Divorce Recovery',
              'Breakup Coaching',
              'Life Coaching',
              'Digital Nomad Lifestyle',
              'Relationship Coaching',
            ],
            sameAs: [
              'https://www.instagram.com/nomad_krishnan/',
              'https://www.facebook.com/NomadKrishnan/',
              'https://youtube.com/@NomadKrishnan',
              'https://www.linkedin.com/in/coachkrishnangovindan/',
              'https://www.indianlifecoaches.com/',
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: "India's First Divorce Coach",
            description:
              'Divorce recovery coaching, breakup healing, and life strategy programs by Krishnan Govindan.',
            provider: { '@type': 'Person', name: 'Krishnan Govindan' },
            areaServed: { '@type': 'Country', name: 'Worldwide' },
            serviceType: 'Divorce Recovery Coaching',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "Who is India's First Divorce Coach?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Krishnan Govindan is India's First Divorce Coach, Life Strategist, and CEO of India Therapist. He helps professionals heal after divorce, breakups, and major life transitions using a proven 3-phase framework.",
                },
              },
              {
                '@type': 'Question',
                name: 'How does divorce recovery coaching work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Krishnan uses a 3-phase framework: Stabilize (first 90 days of emotional regulation and routines), Reclaim (rediscover identity outside the relationship), and Rebuild (design the next chapter of career, lifestyle, and relationships).',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I book a session with Krishnan?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can book a free discovery call by filling out the contact form, calling +1-425-442-4167, or emailing support@indianlifecoaches.com. Krishnan offers coaching in English and Hindi worldwide.',
                },
              },
            ],
          },
        ]}
      />
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center animate-glow">
              <span className="text-primary-foreground font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-gradient">India's 1st Divorce Coach</h1>
              <p className="text-muted-foreground text-sm">Krishnan Govindan • CEO India Therapist</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://calendly.com/krishnangovindan/ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero"
            >
              Schedule Session
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-block bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
              <span className="text-primary font-medium">India's 1st Divorce Coach, CEO India Therapist, Founder Indian Life Coaches</span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              #1 Breakup & Divorce Recovery Coach 
              <span className="text-gradient block mt-2">
                Heal, Rebuild & Thrive Again
              </span>
              <span className="text-gradient block mt-2 text-3xl lg:text-4xl">
                Life will never be the same again
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              India's 1st Divorce Coach & Life Strategist. Specialized in breakup recovery, digital nomad lifestyle, and relationship transitions. CEO at India Therapist, founder of Indian Life Coaches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="https://calendly.com/krishnangovindan/ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero text-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Session
              </a>
              
              <a
                href="https://wa.me/14254424167"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp: +1 (425) 442-4167
              </a>
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://www.instagram.com/nomad_krishnan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/NomadKrishnan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/@NomadKrishnan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/coachkrishnangovindan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="card-luxury p-4 animate-glow">
              <img
                src="https://storage.googleapis.com/msgsndr/m9jCzEyKqM4xlMWTjcgS/media/685aa9b8f1a848bc1fe8873d.jpeg"
                alt="Krishnan Govindan - Elite Life Coach"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-section-alt border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
              Meet <span className="text-gradient">Krishnan Govindan</span> - India's 1st Divorce Coach
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From software engineer to India's pioneering divorce recovery expert. CEO at India Therapist, founder of Indian Life Coaches, and digital nomad lifestyle strategist helping thousands rebuild their lives.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="card-luxury p-2 rounded-2xl">
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/f4KJi4NTTmA"
                  title="Introduction - Krishnan Govindan"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card-luxury p-8">
                <h3 className="font-display text-2xl font-semibold mb-4 text-gradient">
                  My Revolutionary Approach
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  As India's 1st Divorce Coach and CEO of India Therapist, I pioneered breakup and divorce recovery methodologies combining Eastern wisdom with Western psychology. From software engineer to digital nomad lifestyle expert, I've personally navigated major life transitions and now guide others through relationship endings, career pivots, and location independence journeys.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="text-2xl font-bold text-primary mb-1">100+</div>
                    <div className="text-sm text-muted-foreground">Divorce Recoveries</div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="text-2xl font-bold text-primary mb-1">India's #1</div>
                    <div className="text-sm text-muted-foreground">Divorce Coach</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-foreground mb-2">Credentials & Recognition</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CEO & Founder - India Therapist</li>
                    <li>• Founder - Indian Life Coaches</li>
                    <li>• Digital Nomad Lifestyle Expert</li>
                    <li>• Relationship & Life Strategist</li>
                    <li>• Software Engineering Background</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Specialized <span className="text-gradient">Coaching Programs</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From divorce recovery to digital nomad lifestyle - comprehensive coaching programs for life transitions, relationship healing, and location independence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="card-luxury group hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="text-primary mb-6 group-hover:animate-glow transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-4 group-hover:text-gradient transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Success Stories from <span className="text-gradient">Divorce Recovery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real transformations from clients who've rebuilt their lives with India's 1st divorce coach and digital nomad lifestyle expert.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-luxury group hover:scale-105 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-border/50 pt-4">
                    <h4 className="font-semibold group-hover:text-gradient transition-all duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Content Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-section-alt border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
              Watch Latest <span className="text-gradient">Recovery & Lifestyle Videos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert guidance on divorce recovery, digital nomad lifestyle, and relationship transitions from India's 1st divorce coach.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="card-luxury group hover:scale-105 transition-all duration-500">
                <div className="p-4">
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-0 transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-semibold group-hover:text-gradient transition-all duration-300">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-section-alt border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Common questions about divorce recovery coaching, digital nomad lifestyle, and relationship transitions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-light p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">What makes you India's 1st Divorce Coach?</h3>
              <p className="text-gray-600 text-sm">I pioneered specialized divorce recovery methodologies in India, combining Eastern wisdom with Western psychology. As CEO of India Therapist and founder of Indian Life Coaches, I've helped over 100+ individuals navigate breakup and divorce recovery successfully.</p>
            </div>
            
            <div className="card-light p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">How does digital nomad coaching work?</h3>
              <p className="text-gray-600 text-sm">I provide comprehensive guidance on location independence, remote work strategies, visa planning, and building income streams while traveling. Having lived as a digital nomad myself, I understand the unique challenges and opportunities.</p>
            </div>
            
            <div className="card-light p-6">
              <h3 className="font-semibent text-lg mb-3 text-gray-800">Do you work with tech professionals specifically?</h3>
              <p className="text-gray-600 text-sm">Yes! With my software engineering background, I specialize in coaching tech professionals, software engineers, and startup founders through career transitions, relationship changes, and lifestyle design.</p>
            </div>
            
            <div className="card-light p-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">What's included in divorce recovery coaching?</h3>
              <p className="text-muted-foreground text-sm">My divorce recovery program includes emotional healing strategies, rebuilding confidence, co-parenting guidance (if applicable), financial independence planning, and creating a new life vision post-divorce.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <HomeBlogSection />

      {/* Contact Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Transform Your Life?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take the first step towards unlocking your potential. Schedule a session or send me a message to begin your transformation journey.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="card-luxury p-8 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-6 animate-glow" />
                <h3 className="font-display text-2xl font-semibold mb-4 text-gradient">
                  Schedule a Coaching Session
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Book a personalized 1-on-1 coaching session to discuss your goals and create a transformation plan.
                </p>
                <a
                  href="https://calendly.com/krishnangovindan/ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero inline-flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Book Now on Calendly
                </a>
              </div>
              
              <div className="card-luxury p-8">
                <h3 className="font-display text-2xl font-semibold mb-6 text-gradient">
                  Connect With Me
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:support@indianlifecoaches.com"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary">@</span>
                    </div>
                    <span>support@indianlifecoaches.com</span>
                  </a>
                  
                  <a
                    href="https://wa.me/14254424167"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span>+1 (425) 442-4167</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">K</span>
                </div>
              <div>
                <h3 className="font-display font-bold text-lg text-gradient">India's 1st Divorce Coach</h3>
                <p className="text-muted-foreground text-sm">Krishnan Govindan • CEO India Therapist</p>
              </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                India's pioneering divorce recovery expert. Founder of Indian Life Coaches, specializing in breakup healing, digital nomad lifestyle, and relationship transitions.
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
                <a href="https://www.instagram.com/nomad_krishnan/" className="text-muted-foreground hover:text-primary">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/NomadKrishnan/" className="text-muted-foreground hover:text-primary">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@NomadKrishnan" className="text-muted-foreground hover:text-primary">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/coachkrishnangovindan/" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Indian Life Coach. All rights reserved. | Krishnan Govindan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;