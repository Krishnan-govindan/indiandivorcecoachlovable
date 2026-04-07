// Knowledge base scraped/derived from the website. Used as the chatbot context.
export const knowledgeBase = `
ABOUT KRISHNAN GOVINDAN
- India's First Divorce Coach, Life Strategist, Breakup Recovery Expert.
- CEO of India Therapist (indianlifecoaches.com).
- Based in Seattle, WA. Works with clients globally.
- Background: software engineer, tech professional, digital nomad, startup mentor.
- Offers coaching in English and Hindi.
- Phone: +1-425-442-4167  |  Email: support@indianlifecoaches.com

SERVICES
1. Divorce Recovery Coaching — India's first divorce coach specializing in breakup healing and relationship transition support.
2. Digital Nomad Lifestyle Coaching — location independence, remote work strategies, building a nomadic life.
3. Career Success & Tech Coaching — for software engineers, tech professionals, and startup founders.
4. Relationship & Life Strategy — comprehensive relationship coaching for high achievers.
5. Mindset Mastery & Confidence — transform limiting beliefs, build unshakeable confidence.
6. Leadership Development — authentic leadership skills for entrepreneurs and executives.

3-PHASE HEALING FRAMEWORK
1. Stabilize: First 90 days. Emotional regulation, sleep, nutrition, daily routines. Slow the spiral.
2. Reclaim: Rediscover identity outside the relationship. Pursue paused dreams.
3. Rebuild: Design the next chapter — career, location, lifestyle, relationships.

WHO HE WORKS WITH
- Professionals going through divorce, separation, breakups.
- Software engineers, tech professionals, startup founders.
- People wanting to transition into digital nomad lifestyle.
- High achievers seeking authentic relationships and life purpose.

HOW TO BOOK
- Visit the contact form on the website.
- Call +1-425-442-4167.
- Email support@indianlifecoaches.com.
- Free discovery calls available.

SOCIAL
- Instagram: @nomad_krishnan
- YouTube: @NomadKrishnan
- LinkedIn: coachkrishnangovindan
- Facebook: NomadKrishnan
`;

const QA_PAIRS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['who', 'krishnan', 'about', 'coach'],
    answer:
      "Krishnan Govindan is India's First Divorce Coach, Life Strategist, and CEO of India Therapist (indianlifecoaches.com). Based in Seattle, he helps professionals worldwide heal after divorce, breakups, and major life transitions.",
  },
  {
    keywords: ['divorce', 'recovery', 'heal', 'healing'],
    answer:
      "Krishnan's divorce recovery coaching uses a proven 3-phase framework: Stabilize (first 90 days of emotional regulation), Reclaim (rediscover your identity), and Rebuild (design your next chapter). He's helped hundreds of clients heal and rebuild stronger lives.",
  },
  {
    keywords: ['breakup', 'relationship', 'broken'],
    answer:
      "Breakups are emotionally devastating but recoverable. Krishnan specializes in breakup healing and relationship transitions. He'll help you process the loss, rebuild your identity, and create a life you love. Reach out for a free discovery call.",
  },
  {
    keywords: ['service', 'offer', 'coaching', 'program'],
    answer:
      "Krishnan offers: 1) Divorce Recovery Coaching, 2) Digital Nomad Lifestyle Coaching, 3) Career & Tech Coaching, 4) Relationship & Life Strategy, 5) Mindset & Confidence Mastery, 6) Leadership Development. Which one interests you?",
  },
  {
    keywords: ['book', 'session', 'appointment', 'consultation', 'call'],
    answer:
      'You can book a free discovery call by filling out the contact form on this site, calling +1-425-442-4167, or emailing support@indianlifecoaches.com. Krishnan will personally reach out within 24 hours.',
  },
  {
    keywords: ['price', 'cost', 'fee', 'how much', 'pricing'],
    answer:
      "Pricing depends on the program and length of coaching. Krishnan offers a free discovery call where you'll discuss your goals and find the right program. Contact us at +1-425-442-4167 to schedule.",
  },
  {
    keywords: ['nomad', 'remote', 'travel', 'location'],
    answer:
      "Krishnan is a long-time digital nomad himself (Instagram @nomad_krishnan). His Digital Nomad Lifestyle Coaching helps you master remote work, location independence, and build a sustainable nomadic life.",
  },
  {
    keywords: ['tech', 'software', 'engineer', 'startup'],
    answer:
      "With a background as a software engineer and tech professional, Krishnan offers specialized career coaching for engineers, tech professionals, and startup founders. He understands your world deeply.",
  },
  {
    keywords: ['contact', 'reach', 'email', 'phone'],
    answer:
      'Phone: +1-425-442-4167  |  Email: support@indianlifecoaches.com  |  Or use the contact form on this page. Krishnan responds personally within 24 hours.',
  },
  {
    keywords: ['language', 'hindi', 'english'],
    answer:
      'Krishnan offers coaching in both English and Hindi, and works with clients worldwide.',
  },
  {
    keywords: ['hi', 'hello', 'hey', 'namaste'],
    answer:
      "Hi! 👋 I'm Krishnan's AI assistant. I can answer questions about divorce recovery, breakup healing, life coaching, services, pricing, or how to get started. What's on your mind?",
  },
];

export function findKnowledgeBaseAnswer(question: string): string {
  const q = question.toLowerCase();
  let bestMatch = { count: 0, answer: '' };

  for (const pair of QA_PAIRS) {
    const count = pair.keywords.filter((k) => q.includes(k)).length;
    if (count > bestMatch.count) {
      bestMatch = { count, answer: pair.answer };
    }
  }

  if (bestMatch.count > 0) return bestMatch.answer;

  return "That's a great question. For personalized guidance, I'd recommend connecting with Krishnan directly — he offers free discovery calls. You can call +1-425-442-4167, email support@indianlifecoaches.com, or use the contact form on this page. Is there anything else about divorce recovery or coaching I can help with?";
}
