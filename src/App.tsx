import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Globe, 
  ShieldCheck, 
  ChevronRight, 
  Play, 
  Star, 
  ArrowRight,
  Stethoscope,
  Scale,
  Building2,
  Home,
  Utensils,
  Sparkles,
  Menu,
  X,
  Mail,
  Briefcase,
  Loader2
} from 'lucide-react';

// --- Components ---

const LeadFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    gmail: '',
    businessName: '',
    businessType: '',
    phoneNumber: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ gmail: '', businessName: '', businessType: '', phoneNumber: '' });
        }, 3000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <div className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <img 
                  src="/logo.png" 
                  alt="Eman's AI Receptionist" 
                  className="h-10 w-auto"
                  referrerPolicy="no-referrer"
                />
                <span className="font-bold text-xl text-navy-900">Eman's AI Receptionist</span>
              </div>
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-navy-900 mb-4">Message Sent!</h3>
                  <p className="text-gray-600">Eman will review your details and reach out to your Gmail shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-navy-900 mb-2">Get Started</h3>
                    <p className="text-gray-500">Provide your details and Eman will handle the rest.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-teal-accent" /> Your Gmail
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="yourname@gmail.com"
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-accent/20 focus:border-teal-accent transition-all"
                        value={formData.gmail}
                        onChange={(e) => setFormData({ ...formData, gmail: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-teal-accent" /> Business Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="E.g. Smith Dental"
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-accent/20 focus:border-teal-accent transition-all"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-teal-accent" /> Business Type
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="E.g. Medical Spa"
                          className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-accent/20 focus:border-teal-accent transition-all"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-navy-900 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-teal-accent" /> Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-accent/20 focus:border-teal-accent transition-all"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>
                    )}

                    <button
                      disabled={status === 'loading'}
                      type="submit"
                      className="w-full bg-navy-900 text-white py-5 rounded-xl font-bold text-lg hover:bg-navy-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending to Eman...
                        </>
                      ) : (
                        <>
                          Send My Details
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-900/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Eman's AI Receptionist" 
            className="h-10 w-auto"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="hidden items-center gap-2">
            <div className="w-10 h-10 bg-teal-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(100,255,218,0.4)]">
              <Phone className="text-navy-900 w-6 h-6" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Eman's <span className="text-teal-accent">AI Receptionist</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-gray-300 hover:text-teal-accent transition-colors">How It Works</a>
          <a href="#features" className="text-gray-300 hover:text-teal-accent transition-colors">What I Do</a>
          <a href="#pricing" className="text-gray-300 hover:text-teal-accent transition-colors">Pricing</a>
          <button className="bg-teal-accent hover:bg-teal-hover text-navy-900 px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy-800 p-6 flex flex-col gap-4 md:hidden border-b border-white/10"
          >
            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">How It Works</a>
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">What I Do</a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">Pricing</a>
            <button className="bg-teal-accent text-navy-900 px-6 py-3 rounded-full font-bold">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-navy-900 flex items-center">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-accent/10 border border-teal-accent/20 text-teal-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Done-For-You Personal Service</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
            I'll build you an AI receptionist that never misses a call — <span className="text-teal-accent">all you need is your Gmail.</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            You give me your Gmail. I handle everything else. Your calls get answered 24/7 starting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenForm}
              className="bg-teal-accent hover:bg-teal-hover text-navy-900 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(100,255,218,0.3)]"
            >
              Get Started — Send Eman a Message
            </button>
            <a href="#how-it-works" className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all">
              See How It Works
            </a>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/10">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-6">Already handling calls for 50+ businesses</p>
            <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
              <div className="text-white font-bold text-xl">DENTALPRO</div>
              <div className="text-white font-bold text-xl">LEGALSHIELD</div>
              <div className="text-white font-bold text-xl">HOMESERVE</div>
              <div className="text-white font-bold text-xl">MEDSPA+</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Personal Touch - Placeholder for Eman's Photo */}
          <div className="relative mx-auto w-full max-w-md aspect-square bg-navy-800 rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/eman/800/800" 
              alt="Eman" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-2xl flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-12 h-12 rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-white font-bold">"I personally build and manage every AI receptionist to ensure your brand sounds perfect."</p>
                <p className="text-teal-accent text-sm mt-1">— Eman</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Problem = () => {
  const painPoints = [
    {
      icon: <Clock className="w-8 h-8 text-red-400" />,
      title: "Missed calls after hours",
      description: "Every call you don't answer is a lost job or a client calling your competitor. You're leaving money on the table every night."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-orange-400" />,
      title: "Receptionists cost $2k–$4k/mo",
      description: "Between salary, benefits, and training, a human receptionist is a massive overhead that most small businesses can't justify."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
      title: "You're too busy to answer",
      description: "You're running a business, not a call center. You shouldn't have to choose between doing your work and answering the phone."
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">You're losing customers every time a call goes unanswered.</h2>
          <div className="w-20 h-1.5 bg-teal-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="mb-6">{point.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-navy-900 italic">
            "I built Eman's AI Receptionist so you never have to worry about this again."
          </p>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { number: "01", title: "You send me your Gmail address", desc: "That's it. No complicated forms or technical onboarding." },
    { number: "02", title: "I build your custom AI", desc: "I handle the entire setup and management. You do absolutely nothing." },
    { number: "03", title: "Your AI answers 24/7", desc: "I email you every call summary straight to your Gmail instantly." }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-navy-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Here's how simple it is.</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            No apps to learn. No tech setup. No headaches. Just send me your Gmail and you're done.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10"
            >
              <div className="text-6xl font-black text-teal-accent/10 absolute top-4 right-4 leading-none">{step.number}</div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
              <p className="text-gray-400 relative z-10">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  const capabilities = [
    { icon: <Clock />, text: "Answers every call 24/7" },
    { icon: <Building2 />, text: "Greets in your business name" },
    { icon: <MessageSquare />, text: "Answers common questions" },
    { icon: <Calendar />, text: "Takes messages & bookings" },
    { icon: <ArrowRight />, text: "Sends summaries to your Gmail" },
    { icon: <ShieldCheck />, text: "Escalates urgent calls" },
    { icon: <Sparkles />, text: "Never calls in sick" },
    { icon: <Globe />, text: "Never takes a day off" }
  ];

  return (
    <section id="features" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Eman's AI Receptionist handles for you.</h2>
          <div className="w-20 h-1.5 bg-teal-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col items-center text-center gap-4"
            >
              <div className="text-teal-accent w-12 h-12 flex items-center justify-center bg-teal-accent/10 rounded-2xl">{cap.icon}</div>
              <span className="font-bold text-navy-900">{cap.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const stats = [
    { value: "500+", label: "Calls handled per week" },
    { value: "99%", label: "Client satisfaction" },
    { value: "30+", label: "Hours saved per client/mo" }
  ];

  const testimonials = [
    {
      name: "James R.",
      role: "Plumber",
      text: "I used to miss calls every evening. Now Eman's AI handles everything and I wake up to a summary in my Gmail every morning.",
      result: "Never missed a night call"
    },
    {
      name: "Sarah L.",
      role: "Real Estate Agent",
      text: "Eman set everything up for me in a day. I didn't have to learn any new apps. My clients love the professional greeting.",
      result: "100% automated booking"
    },
    {
      name: "David K.",
      role: "Lawyer",
      text: "The call summaries are incredibly accurate. I can prioritize my callbacks without listening to long voicemails.",
      result: "Saved 5 hours/week"
    }
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What my clients say.</h2>
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current w-6 h-6" />)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
            >
              <p className="text-gray-600 italic mb-8 flex-grow">"{t.text}"</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-50 text-teal-accent font-bold text-sm">
                Result: {t.result}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-12 bg-navy-900 rounded-[3rem] p-12 text-white">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black text-teal-accent mb-2">{stat.value}</div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onOpenForm }: { onOpenForm: () => void }) => {
  const tiers = [
    {
      name: "Business",
      price: "599",
      calls: "Up to 500 calls/mo",
      features: ["I build your AI", "I manage everything", "24/7 Answering", "Gmail Summaries", "Appointment Booking", "Custom FAQ Training", "Priority Support", "Weekly Optimization"],
      cta: "Get Started — Email Eman",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, honest pricing.</h2>
          <p className="text-gray-500">I handle the work, you get the results.</p>
        </div>

        <div className="max-w-xl mx-auto mb-20">
          {tiers.map((tier, i) => (
            <div 
              key={i}
              className="relative p-10 rounded-[2.5rem] border border-teal-accent shadow-2xl bg-navy-900 text-white"
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black">${tier.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="text-sm font-bold mb-8 text-teal-accent">{tier.calls}</p>
              
              <ul className="space-y-4 mb-10">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-accent" />
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenForm}
                className="w-full py-4 rounded-xl font-bold transition-all bg-teal-accent text-navy-900 hover:bg-teal-hover"
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {["No contracts", "I set everything up for you", "Cancel anytime", "Up and running within 24 hours"].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <ShieldCheck className="text-teal-accent w-5 h-5" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: "What do I actually need to provide?", a: "Just your Gmail address. I handle the entire technical setup, AI training, and ongoing management. You don't need to learn any new software." },
    { q: "How long does setup take?", a: "I usually have your custom AI receptionist up and running within 24 hours of receiving your Gmail." },
    { q: "Will it sound like a robot?", a: "No. I personally train and fine-tune your AI to sound natural, professional, and perfectly on-brand for your specific business." },
    { q: "What happens after each call?", a: "I send you a full, clear summary of the call straight to your Gmail instantly, so you can follow up when you're ready." },
    { q: "Can I cancel anytime?", a: "Yes. I don't believe in locking people into contracts. You can cancel at any time if you're not 100% satisfied." }
  ];

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Questions I get asked a lot.</h2>
          <p className="text-gray-500">Everything you need to know about working with me.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-lg mb-3">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const industries = [
    { icon: <Stethoscope />, name: "Dental", quote: "No more patient calls going to voicemail during surgery." },
    { icon: <Scale />, name: "Legal", quote: "Capture every new client inquiry, even after hours." },
    { icon: <Building2 />, name: "Real Estate", quote: "Instant booking for property viewings 24/7." },
    { icon: <Home />, name: "Home Services", quote: "Emergency calls handled while you're on the job." },
    { icon: <Sparkles />, name: "Med Spa", quote: "Seamlessly booking consultations and treatments." },
    { icon: <Utensils />, name: "Restaurants", quote: "Reservation management without distracting the staff." }
  ];

  return (
    <section id="industries" className="section-padding bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Eman's AI Receptionist is built for your industry.</h2>
          <p className="text-gray-400">Tailored solutions for every business vertical.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-3xl bg-navy-800 border border-white/5 hover:border-teal-accent/50 transition-all group"
            >
              <div className="w-14 h-14 bg-teal-accent/10 rounded-2xl flex items-center justify-center text-teal-accent mb-6 group-hover:bg-teal-accent group-hover:text-navy-900 transition-all">
                {ind.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{ind.name}</h3>
              <p className="text-sm text-gray-400 italic">"{ind.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const rows = [
    { label: "Monthly Cost", eman: "$199+", human: "$3,000+", voicemail: "$0", center: "$1,500+" },
    { label: "Availability", eman: "24/7/365", human: "9-5 Mon-Fri", voicemail: "24/7", center: "24/7" },
    { label: "Response Time", eman: "Instant", human: "Variable", voicemail: "N/A", center: "2-5 mins" },
    { label: "Scalability", eman: "Infinite", human: "Limited", voicemail: "None", center: "Moderate" },
    { label: "Setup Time", eman: "2 Minutes", human: "2-4 Weeks", voicemail: "5 Minutes", center: "1-2 Weeks" }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why businesses choose Eman's AI Receptionist over the alternatives.</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-6 px-4 text-left text-gray-400 font-medium">Feature</th>
                <th className="py-6 px-4 text-center bg-teal-accent/5 text-navy-900 font-black rounded-t-3xl">Eman's AI</th>
                <th className="py-6 px-4 text-center text-gray-500 font-medium">Human</th>
                <th className="py-6 px-4 text-center text-gray-500 font-medium">Voicemail</th>
                <th className="py-6 px-4 text-center text-gray-500 font-medium">Call Center</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-6 px-4 font-bold text-navy-900">{row.label}</td>
                  <td className="py-6 px-4 text-center bg-teal-accent/5 font-bold text-teal-accent">{row.eman}</td>
                  <td className="py-6 px-4 text-center text-gray-500">{row.human}</td>
                  <td className="py-6 px-4 text-center text-gray-500">{row.voicemail}</td>
                  <td className="py-6 px-4 text-center text-gray-500">{row.center}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onOpenForm }: { onOpenForm: () => void }) => {
  return (
    <section className="py-32 px-6 bg-teal-accent relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-navy-900 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-navy-900 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-navy-900 mb-8">
          Ready to stop missing calls? Just send me your Gmail.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button 
            onClick={onOpenForm}
            className="bg-navy-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-navy-800 transition-all shadow-xl"
          >
            Get Started Now — It Takes 30 Seconds
          </button>
        </div>

        <p className="text-navy-900 font-bold text-xl mb-8">
          You send me your Gmail. I build your AI receptionist. You start getting call summaries by tomorrow.
        </p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Eman's AI Receptionist" 
                className="h-10 w-auto"
                referrerPolicy="no-referrer"
              />
              <span className="font-bold text-xl">Eman's AI Receptionist</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Built and managed personally by Eman. I handle your calls so you can handle your business.
            </p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-teal-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-teal-accent transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">© 2026 Eman's AI Receptionist. Built and managed personally by Eman.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-white">
      <Navbar onOpenForm={() => setIsFormOpen(true)} />
      <Hero onOpenForm={() => setIsFormOpen(true)} />
      <Problem />
      <HowItWorks />
      <Capabilities />
      <SocialProof />
      <Pricing onOpenForm={() => setIsFormOpen(true)} />
      <FAQSection />
      <FinalCTA onOpenForm={() => setIsFormOpen(true)} />
      <Footer />
      <LeadFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
