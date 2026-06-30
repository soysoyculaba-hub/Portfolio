import React, { useState, useRef, useEffect } from 'react';

// ── Knowledge Base ────────────────────────────────────
const KB = [
  // GREETINGS
  {
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'good day', 'howdy', "what's up", 'hiya', 'greetings', 'wassup'],
    answer: "Hey! 👋 Thanks for visiting. I can tell you about Raphael's services, projects, availability, or how to get in touch. What would you like to know?",
  },

  // AVAILABILITY
  {
    patterns: ['available', 'availability', 'taking client', 'open for work', 'open to work', 'currently working', 'are you free', 'accepting project', 'taking project', 'new project', 'new client', 'taking on', 'can you take', 'when can you start', 'start soon', 'start immediately', 'start now', 'busy', 'fully booked', 'slots', 'spot'],
    answer: "Yes! Raphael is currently available and open to new projects. 🟢\n\nThe best way to check his schedule and lock in a time is to book a free discovery call:\n\n📅 https://calendly.com/culabaraphael",
  },

  // EXPERIENCE / YEARS
  {
    patterns: ['how long', 'years of experience', 'how many years', 'experience', 'how experienced', 'how old', 'since when', 'when did you start', 'background in', 'expert', 'expertise', 'proficient', 'skilled'],
    answer: "Raphael has been working in automation and web development for several years. He's delivered 40+ GoHighLevel workflows, built AI voice agent systems for clients like law firms, and handled large-scale automation pipelines — so he has solid hands-on experience across real projects.",
  },

  // SERVICES OVERVIEW
  {
    patterns: ['service', 'offer', 'what do you do', 'specialize', 'provide', 'can you do', 'what can you', 'help me with', 'help with', 'what are you good at'],
    answer: "Raphael offers 4 core services:\n\n• AI Automation — n8n, Zapier, GoHighLevel, Retell AI\n• Web Development — WordPress, React, Laravel, HTML/CSS/JS\n• CRM & Lead Management — GoHighLevel systems & dashboards\n• AI Voice Agents — multi-agent phone systems with Retell AI & Twilio\n\nWhich one interests you most?",
  },

  // AI AUTOMATION
  {
    patterns: ['ai automation', 'n8n', 'zapier', 'make.com', 'automation', 'automate', 'automated', 'automating', 'workflow', 'smart automation', 'business automation', 'process automation', 'automate my'],
    answer: "Raphael builds smart automation systems using n8n, Zapier, GoHighLevel, and Retell AI. He's built 40+ GHL workflows for real estate and other industries, and a PDF batch pipeline handling 1,500+ documents with n8n and OpenAI. If there's a repetitive process in your business, he can probably automate it.",
  },

  // VOICE AGENTS
  {
    patterns: ['voice', 'phone', 'retell', 'twilio', 'receptionist', 'intake', 'voice agent', 'ai phone', 'phone system', 'call center', 'phone bot', 'automated call', 'answer call', 'inbound call'],
    answer: "Raphael builds AI voice agent systems using Retell AI and Twilio. His standout project: a multi-agent phone system for a law firm with a receptionist, intake agent, and sales agent — all running automatically 24/7. Great for businesses that handle a lot of inbound calls.",
  },

  // WEB DEVELOPMENT
  {
    patterns: ['web', 'website', 'wordpress', 'react', 'laravel', 'html', 'css', 'javascript', 'frontend', 'backend', 'landing page', 'landing', 'web app', 'web design', 'design a site', 'build a site', 'build a website', 'create a website', 'make a website', 'portfolio site', 'ecommerce', 'e-commerce', 'online store', 'woocommerce'],
    answer: "Raphael builds websites using WordPress for content-driven sites, and custom development with React, Laravel, HTML, CSS, and JavaScript for more complex projects. He handles both frontend and backend — from simple landing pages to full web applications.",
  },

  // CRM / GOHIGHLEVEL
  {
    patterns: ['crm', 'gohighlevel', 'ghl', 'lead management', 'lead gen', 'follow-up', 'follow up', 'dashboard', 'pipeline', 'lead capture', 'nurture', 'drip', 'automation sequence', 'email sequence', 'sms', 'text message', 'appointment booking', 'appointment', 'booking system'],
    answer: "Raphael specializes in GoHighLevel CRM systems — automated pipelines, follow-up sequences (email + SMS), lead dashboards, and full CRM setups. He's built 40+ automation workflows for real estate and other industries. If you're on GHL or thinking about it, he's your guy.",
  },

  // CHATBOT / AI CHATBOT
  {
    patterns: ['chatbot', 'chat bot', 'chat agent', 'ai chat', 'customer support bot', 'support bot', 'live chat', 'messenger bot', 'website chat', 'ai assistant'],
    answer: "Yes! Raphael can build AI chatbots for websites and customer support. He works with various AI tools and automation platforms to create conversational bots that can answer questions, capture leads, or route visitors — similar to what you're chatting with right now! 😄",
  },

  // EMAIL MARKETING
  {
    patterns: ['email marketing', 'email campaign', 'newsletter', 'drip campaign', 'email blast', 'mailchimp', 'active campaign', 'klaviyo'],
    answer: "Raphael can set up automated email marketing sequences through GoHighLevel or integrate with other platforms. This includes drip campaigns, lead nurture sequences, and automated follow-ups triggered by user actions.",
  },

  // WHATSAPP / SOCIAL AUTOMATION
  {
    patterns: ['whatsapp', 'facebook', 'instagram', 'social media automation', 'messenger', 'dm automation', 'social automation'],
    answer: "Raphael can integrate automations with WhatsApp, Facebook, and Instagram through GoHighLevel and n8n — things like auto-replies, lead capture from DMs, and follow-up sequences across social platforms.",
  },

  // SEO
  {
    patterns: ['seo', 'search engine', 'google ranking', 'rank on google', 'search optimization', 'keywords', 'organic traffic'],
    answer: "While Raphael's main focus isn't SEO consulting, he builds websites with clean code and good structure that supports SEO. For WordPress sites especially, he can set up SEO plugins and best practices. For a full SEO strategy, you'd want a dedicated SEO specialist.",
  },

  // MOBILE APP
  {
    patterns: ['mobile app', 'app', 'ios', 'android', 'flutter', 'react native', 'mobile application'],
    answer: "Raphael focuses on web development and automation rather than native mobile apps. However, he can build responsive web apps that work great on mobile, and Progressive Web Apps (PWAs) that feel app-like on phones.",
  },

  // PROJECTS OVERVIEW
  {
    patterns: ['project', 'portfolio', 'built', 'example', 'past work', 'previous work', 'case study', 'what have you done', 'show me', 'sample', 'work you did'],
    answer: "Key projects Raphael has built:\n\n• Multi-agent AI phone system for a law firm (Retell AI + Twilio)\n• PDF batch pipeline processing 1,500+ documents (n8n + OpenAI)\n• 40+ GoHighLevel automation workflows for real estate & more\n\nWant details on any of these?",
  },

  // LAW FIRM PROJECT
  {
    patterns: ['law firm', 'legal', 'lawyer', 'attorney', 'law office'],
    answer: "Raphael built a multi-agent AI phone system for a law firm using Retell AI and Twilio. Three AI agents work together: a receptionist answers calls, an intake agent collects client info, and a sales agent handles conversions — fully automated, running 24/7.",
  },

  // PDF PIPELINE PROJECT
  {
    patterns: ['pdf', 'document', 'batch', '1500', '1,500', 'openai', 'document process'],
    answer: "Raphael built a PDF batch processing pipeline using n8n and OpenAI that handled 1,500+ documents automatically. It extracted, processed, and organized data at scale — a great example of what's possible with AI + automation.",
  },

  // REAL ESTATE
  {
    patterns: ['real estate', 'realtor', 'realty', 'property', 'housing', 'broker'],
    answer: "Raphael has built 40+ GoHighLevel automation workflows specifically for real estate — lead capture, automated follow-up sequences, appointment booking, and full CRM pipeline management. It's one of his most-served industries.",
  },

  // INDUSTRIES
  {
    patterns: ['industry', 'industries', 'niche', 'sector', 'what kind of business', 'type of client', 'who do you work with', 'what businesses'],
    answer: "Raphael works with a wide range of industries including real estate, law firms, e-commerce, service businesses, coaches/consultants, and more. If your business has processes that can be automated or needs a stronger online presence, he can likely help.",
  },

  // ABOUT / BACKGROUND
  {
    patterns: ['about', 'who is', 'who are you', 'background', 'bio', 'tell me about raphael', 'tell me about yourself', 'introduce', 'raphael wayne', 'culaba'],
    answer: "Raphael Wayne Culaba is an Automation & Web Developer based in Butuan City, Philippines. He specializes in GoHighLevel, AI automation (n8n, Zapier, Retell AI), and web development. He's currently finishing his BSIT degree at Caraga State University and works with clients remotely worldwide.",
  },

  // LOCATION / TIMEZONE
  {
    patterns: ['location', 'where', 'based', 'country', 'philippines', 'butuan', 'remote', 'timezone', 'time zone', 'pst', 'est', 'gmt', 'ph time', 'philippine time'],
    answer: "Raphael is based in Butuan City, Philippines (PHT — UTC+8). He works with clients remotely worldwide and can adjust communication schedules to overlap with US, EU, or AU timezones. 🌍",
  },

  // EDUCATION
  {
    patterns: ['study', 'degree', 'university', 'college', 'school', 'bsit', 'caraga', 'student', 'graduate', 'education', 'certification', 'certified', 'course'],
    answer: "Raphael is currently finishing his BSIT (Bachelor of Science in Information Technology) at Caraga State University in the Philippines. Beyond formal education, he's built real-world experience through actual client projects.",
  },

  // FREELANCER OR AGENCY
  {
    patterns: ['freelancer', 'freelance', 'agency', 'team', 'company', 'solo', 'work alone', 'do you have a team', 'staff', 'employee', 'partner'],
    answer: "Raphael works as a freelancer — you'll be working directly with him, not a middleman or account manager. For larger projects that need extra hands, he can bring in trusted collaborators, but you always have direct communication with Raphael throughout.",
  },

  // PROCESS / HOW IT WORKS
  {
    patterns: ['process', 'how does it work', 'how do you work', 'steps', 'what happens', 'what to expect', 'workflow process', 'how do you build', 'how do you start', 'onboard', 'onboarding'],
    answer: "Here's how working with Raphael typically goes:\n\n1. Free discovery call — understand your needs\n2. Proposal & scope — clear plan and timeline\n3. Development — regular updates as he builds\n4. Review & revisions — your feedback matters\n5. Launch & handover — you get everything you need\n\nBook the first step here: https://calendly.com/culabaraphael",
  },

  // TIMELINE / TURNAROUND
  {
    patterns: ['timeline', 'how long', 'turnaround', 'how fast', 'when will', 'delivery', 'deadline', 'time frame', 'timeframe', 'eta', 'how soon', 'rush', 'urgent', 'asap', 'quickly'],
    answer: "Timeline depends on the project scope. A simple automation workflow might take a few days; a full CRM setup or custom website could take 1–3 weeks. Rush projects can sometimes be accommodated — best to discuss on a discovery call: https://calendly.com/culabaraphael",
  },

  // COMMUNICATION
  {
    patterns: ['communicate', 'communication', 'language', 'english', 'speak', 'zoom', 'slack', 'discord', 'teams', 'skype', 'google meet', 'how do we talk', 'how to contact', 'update', 'progress update'],
    answer: "Raphael communicates fluently in English. He's comfortable with Zoom, Google Meet, Slack, or whatever platform works best for you. He provides regular progress updates throughout the project so you're never left wondering what's happening.",
  },

  // REVISIONS / SUPPORT
  {
    patterns: ['revision', 'change', 'edit', 'modify', 'update after', 'support', 'maintenance', 'after the project', 'post launch', 'post-launch', 'bug fix', 'fix after', 'ongoing'],
    answer: "Raphael includes revisions in his projects — the exact number is agreed on upfront. He also offers post-launch support so if something breaks or needs tweaking, you're covered. Ongoing maintenance can be discussed depending on the project.",
  },

  // TOOLS / TECHNOLOGIES
  {
    patterns: ['tools', 'technology', 'technologies', 'tech stack', 'software', 'platform', 'what do you use', 'programming', 'language', 'php', 'python', 'node', 'database', 'mysql', 'sql', 'api', 'integration'],
    answer: "Raphael's core toolkit:\n\n• Automation: n8n, Zapier, GoHighLevel, Make.com\n• Voice AI: Retell AI, Twilio\n• Web: React, Laravel, WordPress, HTML/CSS/JS\n• AI: OpenAI API, Claude API\n• CRM: GoHighLevel\n• Other: REST APIs, webhooks, MySQL, and more",
  },

  // PRICING
  {
    patterns: ['price', 'cost', 'rate', 'how much', 'charge', 'fee', 'budget', 'pricing', 'quote', 'estimate', 'invoice', 'expensive', 'cheap', 'affordable', 'pay', 'worth'],
    answer: "Pricing depends on the project scope and complexity. Raphael doesn't do one-size-fits-all rates — he'd rather give you a fair, custom quote after understanding exactly what you need.\n\nBook a free discovery call to discuss: https://calendly.com/culabaraphael",
  },

  // PAYMENT METHODS
  {
    patterns: ['payment method', 'how to pay', 'paypal', 'wise', 'bank transfer', 'gcash', 'crypto', 'credit card', 'deposit', 'downpayment', 'down payment', 'milestone', 'upfront'],
    answer: "Payment details and methods are discussed during the project setup. Raphael typically works with milestone-based payments for larger projects. Accepted methods can be discussed on the discovery call: https://calendly.com/culabaraphael",
  },

  // GUARANTEE / SATISFACTION
  {
    patterns: ['guarantee', 'refund', 'not satisfied', 'what if', 'dissatisfied', 'money back', 'promise', 'quality', 'reliable', 'trustworthy', 'trust'],
    answer: "Raphael takes quality seriously. He works closely with clients throughout the project and includes revision rounds to make sure the outcome meets your expectations. The discovery call and proposal stage exist specifically to align on what \"done\" looks like before any work begins.",
  },

  // REVIEWS / TESTIMONIALS
  {
    patterns: ['review', 'testimonial', 'feedback', 'client say', 'what do people say', 'rating', 'reference', 'recommendation', 'linkedin recommendation', 'happy client', 'success story'],
    answer: "You can find client feedback and reviews on Raphael's portfolio page and LinkedIn profile. His work speaks through results — like the law firm phone system and the large-scale automation pipelines he's delivered. Want to know more about a specific project?",
  },

  // UPWORK / FIVERR / PLATFORMS
  {
    patterns: ['upwork', 'fiverr', 'freelancer.com', 'toptal', 'platform', 'marketplace'],
    answer: "Raphael is available for direct hire — which means you get better rates and direct communication without platform fees. The easiest first step is a free discovery call: https://calendly.com/culabaraphael",
  },

  // SOCIAL MEDIA / LINKS
  {
    patterns: ['linkedin', 'github', 'twitter', 'facebook', 'instagram', 'tiktok', 'youtube', 'social media', 'social', 'profile', 'follow', 'connect on'],
    answer: "You can connect with Raphael on LinkedIn to see his professional background and recommendations. You can also reach him directly through the contact form on this page, or book a call: https://calendly.com/culabaraphael",
  },

  // WHY HIRE / WHAT MAKES YOU DIFFERENT
  {
    patterns: ['why hire', 'why you', 'why raphael', 'what makes you different', 'why should i', 'stand out', 'unique', 'advantage', 'better than', 'compared to', 'strengths'],
    answer: "A few things that set Raphael apart:\n\n• He combines AI, automation, AND web skills — so you don't need multiple freelancers\n• He's built real, complex systems (not just basic Zapier zaps)\n• Direct communication — no middlemen\n• Based in PH with global client experience and flexible hours\n\nBest way to see if it's a good fit: https://calendly.com/culabaraphael",
  },

  // INTEGRATIONS
  {
    patterns: ['integrate', 'integration', 'connect', 'sync', 'api', 'webhook', 'plug in', 'third party', 'existing tool', 'existing system', 'already have', 'work with my'],
    answer: "Raphael is experienced with API integrations and webhooks — if your existing tools have an API, there's a good chance he can connect them. Platforms like GoHighLevel, n8n, and Zapier support hundreds of integrations out of the box. Tell him what you're working with on the discovery call.",
  },

  // DISCOVERY CALL DETAILS
  {
    patterns: ['discovery call', 'free call', 'what is the call', 'what happens on the call', 'call about', 'consultation', 'free consult', 'no charge', 'no obligation'],
    answer: "The free discovery call is a 20–30 minute no-pressure conversation where Raphael learns about your project, answers your questions, and figures out if he's the right fit. No sales pitch — just an honest chat. Book here: https://calendly.com/culabaraphael",
  },

  // CONTACT FORM / EMAIL
  {
    patterns: ['contact form', 'email', 'message', 'reach', 'send', 'get in touch', 'drop a message', 'write to'],
    answer: "You can send Raphael a message through the contact form at the bottom of this page — he typically replies within 24 hours. Or skip the wait and book a free call directly: https://calendly.com/culabaraphael",
  },

  // BOOKING
  {
    patterns: ['book', 'hire', 'meet', 'calendly', 'schedule', 'get started', 'work with', 'work together', 'start', 'onboard me', 'let\'s go', 'i\'m interested', 'interested', 'sign up', 'next step', 'what next', 'how do i'],
    answer: "Awesome! The easiest next step is to book a free discovery call — no commitment, just a conversation:\n\n📅 https://calendly.com/culabaraphael\n\nOr drop a message through the contact form on this page!",
  },

  // TRAINING / HANDOVER
  {
    patterns: ['training', 'teach', 'handover', 'documentation', 'how to use', 'learn', 'tutorial', 'walkthrough', 'guide me', 'explain how'],
    answer: "Raphael provides handover and walkthrough so you know how to use what he builds. For automation systems, he'll explain how everything works and document key processes so you're not left in the dark after delivery.",
  },

  // CONVERSATIONAL / POSITIVE REACTIONS
  {
    patterns: ['interesting', 'cool', 'wow', 'amazing', 'awesome', 'great', 'nice', 'love it', 'sounds good', 'perfect', 'fantastic', 'impressive', 'that\'s great', 'that\'s cool', 'good to know', 'noted'],
    answer: "Glad you think so! 😊 Is there anything specific you'd like to know more about, or are you ready to book a free call with Raphael? https://calendly.com/culabaraphael",
  },

  // UNSURE / MAYBE
  {
    patterns: ['not sure', 'maybe', 'i think', 'possibly', 'probably', 'might', 'considering', 'thinking about', 'exploring', 'just looking', 'just browsing', 'just checking'],
    answer: "No rush at all! Feel free to browse and ask anything. When you're ready, a free discovery call is a zero-pressure way to explore what's possible: https://calendly.com/culabaraphael",
  },

  // TELL ME MORE
  {
    patterns: ['tell me more', 'more info', 'more details', 'elaborate', 'explain', 'go on', 'continue', 'and then', 'what else'],
    answer: "Happy to! What would you like to know more about — his services, specific projects, how the process works, or how to get started?",
  },

  // YES / AGREEMENT
  {
    patterns: ['yes', 'yeah', 'yep', 'yup', 'sure', 'definitely', 'absolutely', 'of course', 'okay', 'ok', 'alright', 'sounds good', 'let\'s do it'],
    answer: "Great! 🙌 The best next step is to book a free discovery call with Raphael so you can talk through the details:\n\n📅 https://calendly.com/culabaraphael",
  },

  // NO / NEGATIVE
  {
    patterns: ['no', 'nah', 'nope', 'not now', 'not interested', 'not yet', 'later', 'maybe later', 'not right now'],
    answer: "No worries at all! If you ever want to come back and chat, I'm here. You can also reach Raphael through the contact form anytime. 👋",
  },

  // THANKS
  {
    patterns: ['thanks', 'thank you', 'thank', 'appreciate', 'helpful', 'thx', 'ty', 'cheers'],
    answer: "You're welcome! 😊 If you have more questions or want to work with Raphael, book a free call anytime: https://calendly.com/culabaraphael",
  },

  // GOODBYE
  {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'ciao', 'take care', 'good night', 'gotta go', 'talk later', 'ttyl', 'have a good'],
    answer: "Thanks for stopping by! 👋 Whenever you're ready to work with Raphael, book a free call here: https://calendly.com/culabaraphael — have a great day!",
  },
];

const QUICK_REPLIES = [
  "What services do you offer?",
  "Are you available for projects?",
  "Tell me about your projects",
  "How can I hire Raphael?",
];

const FALLBACKS = [
  "I'm not sure about that one! For anything specific, reach Raphael directly through the contact form or book a free call: https://calendly.com/culabaraphael 😊",
  "Great question — that's best answered by Raphael himself! Book a free chat here: https://calendly.com/culabaraphael",
  "I don't have that info, but Raphael would be happy to help. Drop a message via the contact form or schedule a call: https://calendly.com/culabaraphael 📅",
  "Hmm, I'm not sure! Ask Raphael directly — he responds within 24 hours via the contact form, or you can book a call: https://calendly.com/culabaraphael",
];

// Match whole word/phrase only — prevents 'yo' matching inside 'you', 'hi' inside 'hire', etc.
function matchPattern(text, pattern) {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?<![a-z])${escaped}(?![a-z])`).test(text);
}

let fallbackIdx = 0;
function getResponse(input) {
  const text = input.toLowerCase().trim();
  for (const item of KB) {
    if (item.patterns.some((p) => matchPattern(text, p))) {
      return item.answer;
    }
  }
  const reply = FALLBACKS[fallbackIdx % FALLBACKS.length];
  fallbackIdx++;
  return reply;
}

// ── Icons ─────────────────────────────────────────────
const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const SendIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TypingIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 14px', background: '#1a1a3e', borderRadius: '12px 12px 12px 0', width: 'fit-content' }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#915EFF', animation: 'cbBounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
    ))}
  </div>
);

// ── Main Component ────────────────────────────────────
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! 👋 I'm Raphael's assistant. Ask me anything about his services, projects, availability, or how to get in touch!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
      inputRef.current?.focus();
    }
  }, [messages, isTyping, isOpen]);

  const sendMessage = (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setShowQuickReplies(false);
    setIsTyping(true);

    setTimeout(() => {
      const answer = getResponse(trimmed);
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer"
          style={{ color: '#c4b5fd', textDecoration: 'underline', wordBreak: 'break-all' }}>
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <>
      <style>{`
        @keyframes cbBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes cbFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cbPulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(145,94,255,0.5); }
          50%       { box-shadow: 0 0 0 10px rgba(145,94,255,0); }
        }
        .cb-window { animation: cbFadeIn 0.22s ease-out; }
        .cb-pulse  { animation: cbPulse 2s ease-in-out infinite; }
        .cb-scroll::-webkit-scrollbar       { width: 4px; }
        .cb-scroll::-webkit-scrollbar-track { background: transparent; }
        .cb-scroll::-webkit-scrollbar-thumb { background: #915EFF44; border-radius: 4px; }
        .cb-input::placeholder { color: #8892b0; }
        .cb-input:focus        { outline: none; }
        .cb-qr:hover  { background: #915EFF !important; color: #fff !important; border-color: #915EFF !important; }
        .cb-toggle:hover { transform: scale(1.08) !important; box-shadow: 0 6px 28px rgba(145,94,255,0.65) !important; }
      `}</style>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="cb-window fixed z-50 flex flex-col"
          style={{
            bottom: '88px', right: '24px',
            width: 'min(360px, calc(100vw - 32px))',
            height: 'min(520px, calc(100vh - 120px))',
            background: '#050816',
            border: '1px solid #915EFF44',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(145,94,255,0.08)',
            overflow: 'hidden',
          }}>

          {/* Header */}
          <div style={{ padding: '13px 16px', background: 'linear-gradient(135deg,#1a0a3e,#0d0620)', borderBottom: '1px solid #915EFF33', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#915EFF,#6B3FA8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
              🤖
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '14px', margin: 0, lineHeight: '1.2' }}>Raphael's Assistant</p>
              <p style={{ color: '#915EFF', fontSize: '11px', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Always online
              </p>
            </div>
            <button onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#888', display: 'flex', alignItems: 'center', borderRadius: '6px' }}
              aria-label="Close chat">
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="cb-scroll" style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '84%',
                  padding: '9px 13px',
                  borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                  background: msg.role === 'user' ? 'linear-gradient(135deg,#915EFF,#7B4FD8)' : '#1a1a3e',
                  color: '#fff',
                  fontSize: '13px',
                  lineHeight: '1.55',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}>
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <TypingIndicator />
              </div>
            )}

            {/* Quick Replies */}
            {showQuickReplies && !isTyping && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                {QUICK_REPLIES.map((q) => (
                  <button key={q} className="cb-qr"
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: '5px 11px',
                      background: 'transparent',
                      border: '1px solid #915EFF88',
                      borderRadius: '20px',
                      color: '#c4b5fd',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      lineHeight: '1.4',
                    }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #915EFF22', background: '#050816', display: 'flex', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
            <textarea
              ref={inputRef}
              className="cb-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              style={{
                flex: 1,
                background: '#1a1a3e',
                border: '1px solid #915EFF44',
                borderRadius: '10px',
                padding: '9px 12px',
                color: '#fff',
                fontSize: '13px',
                resize: 'none',
                lineHeight: '1.4',
                maxHeight: '80px',
                overflowY: 'auto',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = '#915EFF'; }}
              onBlur={(e)  => { e.target.style.borderColor = '#915EFF44'; }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              style={{
                width: '36px', height: '36px',
                borderRadius: '10px',
                background: input.trim() && !isTyping ? 'linear-gradient(135deg,#915EFF,#7B4FD8)' : '#2a2a4a',
                border: 'none',
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}
              aria-label="Send">
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className={`cb-toggle ${!isOpen ? 'cb-pulse' : ''}`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
          width: '54px', height: '54px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#915EFF,#6B3FA8)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(145,94,255,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  );
};

export default Chatbot;
