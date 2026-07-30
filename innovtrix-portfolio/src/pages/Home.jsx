import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { gsap } from 'gsap'
import { FiArrowRight, FiGlobe, FiShoppingBag, FiSmartphone, FiCpu, FiCheck } from 'react-icons/fi'

const TagCard = ({ number, title, tag, text, className, aosDelay, aosType, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;
    
    const triggerY = cardTopRelativeToContainer + 55;
    const lineTipY = latest * containerHeight;
    
    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      data-aos-once="true"
      className={`z-10 w-full max-w-[310px] sm:max-w-[350px] ${className}`}
    >
      <div className={`w-full rounded-[2rem] p-2.5 relative flex flex-col items-center hover:scale-[1.02] transition-all duration-700 ${
        isActive 
          ? 'bg-zinc-900 border-2 border-brand-primary shadow-[0_20px_50px_rgba(255,186,0,0.15)]' 
          : 'bg-zinc-955 border border-white/5 shadow-2xl hover:border-brand-primary/30'
      }`}>
        {/* Hole Punch */}
        <div className="w-5 h-5 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute top-4 border border-zinc-800 z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full opacity-40"></div>
        </div>
        
        {/* Inner Card */}
        <div className={`w-full h-full rounded-[1.5rem] mt-8 p-6 flex flex-col min-h-[220px] transition-colors duration-700 ${
          isActive ? 'bg-brand-primary/5' : 'bg-zinc-900/40'
        }`}>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-xl font-black italic transition-colors duration-700 ${
              isActive ? 'text-brand-primary' : 'text-zinc-650'
            }`}>{number}</span>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors duration-700 ${
              isActive 
                ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                : 'bg-zinc-900 text-zinc-500 border-white/5'
            }`}>{tag}</span>
          </div>
          
          <h3 className={`text-xl font-black mb-3 uppercase tracking-tight transition-colors duration-700 ${
            isActive ? 'text-white' : 'text-zinc-300'
          }`}>{title}</h3>
          
          <p className={`text-xs leading-relaxed font-semibold transition-colors duration-700 ${
            isActive ? 'text-zinc-300' : 'text-zinc-400'
          }`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

const Counter = ({ value }) => {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    let start = 0
    const duration = 1500 // ms
    const steps = 60
    const stepTime = duration / steps
    
    const timer = setInterval(() => {
      start += 1 / steps
      if (start >= 1) {
        clearInterval(timer)
        setProgress(1)
      } else {
        setProgress(start)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [started])

  // Parse the value string into tokens
  const tokens = []
  const regex = /(\d+(?:\.\d+)?)|([^\d.]+)/g
  let match
  while ((match = regex.exec(value)) !== null) {
    if (match[1] !== undefined) {
      const numStr = match[1]
      tokens.push({
        type: 'number',
        value: numStr,
        targetVal: parseFloat(numStr),
        isFloat: numStr.includes('.')
      })
    } else if (match[2] !== undefined) {
      tokens.push({
        type: 'text',
        value: match[2]
      })
    }
  }

  const renderedText = tokens.map((token) => {
    if (token.type === 'text') {
      return token.value
    }
    const currentVal = token.targetVal * progress
    if (token.isFloat) {
      return currentVal.toFixed(1)
    } else {
      return Math.round(currentVal).toString()
    }
  }).join('')

  return (
    <span ref={ref}>
      {renderedText}
    </span>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  const roadmapSteps = [
    {
      number: "01",
      title: "Discovery & Consultation",
      tag: "PHASE 1 - ALIGNMENT",
      text: "We research your target sectors (Textile, Retail, etc.) to understand product attributes and buyer journeys, aligning budgets and key deliverables.",
      className: "md:absolute md:top-[300px] md:right-[5%] lg:right-[10%] md:rotate-4",
      delay: "100"
    },
    {
      number: "02",
      title: "UI/UX Wireframing",
      tag: "PHASE 2 - DESIGN",
      text: "We design premium, high-conversion mockups. We optimize navigation flows, product grids, checkout structures, and lead generation banners.",
      className: "md:absolute md:top-[650px] md:left-[5%] lg:left-[10%] md:-rotate-4",
      delay: "150"
    },
    {
      number: "03",
      title: "Frontend Architecture",
      tag: "PHASE 3 - FRONTEND",
      text: "Using React 19 and Vite, we code the frontend components, applying Tailwind CSS styles and fluid Framer Motion / GSAP animations.",
      className: "md:absolute md:top-[1000px] md:right-[5%] lg:right-[15%] md:rotate-3",
      delay: "200"
    },
    {
      number: "04",
      title: "Backend & DB Logic",
      tag: "PHASE 4 - SERVICES",
      text: "We configure FastAPI Python routers and connect them to MySQL tables. We build secure JWT authorization headers and automated invoicing routes.",
      className: "md:absolute md:top-[1350px] md:left-[5%] lg:left-[15%] md:-rotate-3",
      delay: "250"
    },
    {
      number: "05",
      title: "Lighthouse & Security",
      tag: "PHASE 5 - AUDITS",
      text: "We verify performance, SEO metadata, and accessibility tags. We test payment transactions in staging, ensuring the codebase scores 90+ across categories.",
      className: "md:absolute md:top-[1700px] md:right-[5%] lg:right-[12%] md:rotate-4",
      delay: "300"
    },
    {
      number: "06",
      title: "Cloud Deployment",
      tag: "PHASE 6 - LAUNCH",
      text: "We compile and build the final static assets for Vercel, and provision FastAPI services to Render, enabling continuous deployment from Git.",
      className: "md:absolute md:top-[2050px] md:left-[5%] lg:left-[12%] md:-rotate-4",
      delay: "350"
    }
  ]

  const [stats, setStats] = useState([
    { value: '150+', label: 'Websites Built' },
    { value: '99.9%', label: 'Uptime Guaranteed' },
    { value: '18+', label: 'Industries Served' },
    { value: '24/7', label: 'Tech Support' }
  ])

  useEffect(() => {
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    )
    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.4 }
    )
    gsap.fromTo('.hero-actions', 
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.6 }
    )

    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'}/api/settings/stats`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.value) {
            setStats(JSON.parse(data.value))
          }
        }
      } catch (err) {
        console.warn('Failed to query statistics setting from backend, displaying defaults.', err)
      }
    }
    fetchStats()
  }, [])

  const coreServices = [
    {
      title: 'Business & Commercial Websites',
      description: 'Premium corporate sites, company presentations, startup pages, and professional service portfolios engineered for lead capture and digital authority.',
      features: ['Corporate Websites', 'Company Websites', 'Startup Platforms', 'Stripe/Vercel Design Styles']
    },
    {
      title: 'Industry-Specific Websites',
      description: 'Custom layouts and templates optimized for specific sectors, integrating sector-specific tools like bookings and media grids.',
      features: ['Gyms & Fitness Portals', 'Hospital & Healthcare Sites', 'School & College Portals', 'Real Estate Showcases']
    },
    {
      title: 'E-Commerce Development',
      description: 'High-performance online storefronts, multi-vendor marketplaces, product catalog options, and payment gateway sync built to scale.',
      features: ['Online Stores & Carts', 'Multi-Vendor Marketplaces', 'Payment Gateway Sync', 'Inventory & Order Panels']
    },
    {
      title: 'SaaS Application Development',
      description: 'Full-stack software as a service web apps featuring secure client login portals, subscriptions billing, and administrative data views.',
      features: ['Custom SaaS Platforms', 'Subscription-Based Apps', 'Admin Dashboards', 'Customer Portals']
    },
    {
      title: 'IoT Applications & Smart Solutions',
      description: 'Connect hardware sensors, smart devices, and telemetry modules directly to beautiful real-time data dashboards using WebSockets.',
      features: ['Smart Agriculture', 'Industrial Telemetry', 'Live Data Dashboards', 'Hardware Cloud Gateways']
    },
    {
      title: 'Cloud Deployment & Monitoring',
      description: 'AWS deployment, server provisioning, load balancers, CDN setups, and automated app monitoring ensuring 99.9% uptime.',
      features: ['AWS Cloud Setup', 'Server & Nginx Config', 'Application Monitoring', 'Security Hardening']
    },
    {
      title: 'AI & Automation Solutions',
      description: 'Streamline operations by integrating LLMs, AI chatbot support, automated workflow engines, and complex API pipes.',
      features: ['AI Chatbots & Agents', 'Workflow Automation', 'API & Webhook Pipes', 'Process Automation']
    },
    {
      title: 'Custom Web Applications',
      description: 'Bespoke management systems, tailored CRM & ERP solutions, interactive analytics boards, and specialized automation utilities.',
      features: ['Internal Management Systems', 'CRM & ERP Solutions', 'Analytics Dashboards', 'Data Export Engines']
    }
  ]

  const serviceBadges = [
    'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'bg-teal-500/10 text-teal-400 border-teal-500/20',
    'bg-pink-500/10 text-pink-400 border-pink-500/20',
    'bg-zinc-500/10 text-zinc-300 border-zinc-500/20'
  ]

  const bulletColors = [
    'bg-[#FFBA00]',
    'bg-[#FFBA00]',
    'bg-[#FFBA00]',
    'bg-[#FFBA00]',
    'bg-[#FFBA00]',
    'bg-[#FFBA00]',
    'bg-[#FFBA00]',
    'bg-[#FFBA00]'
  ]

  const selectedProjects = [
    {
      title: 'Vogue Silk Textiles',
      category: 'E-Commerce Storefront',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      desc: 'Enterprise-grade catalog and retail store custom designed for a high-fashion textile exporter.',
      link: 'https://ps-tex-production.up.railway.app'
    },
    {
      title: 'Aura Luxury Jewellery',
      category: 'Product Catalog Website',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop',
      desc: 'High-end visual showroom layout showcasing premium diamonds and custom ordering widgets.'
    },
    {
      title: 'Constructo Global',
      category: 'Commercial Business Site',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
      desc: 'A premium portfolio and lead capture portal for an international industrial contractor.'
    }
  ]

  const plans = [
    {
      name: 'Basic Business Website',
      price: '₹5,000 – ₹10,000',
      suitable: 'Gym, Clinic, Salon, Restaurant, Small Business, Freelancers',
      delivery: '3–7 Days',
      features: [
        'Home Page Layout',
        'About Us Page',
        'Services Page',
        'Contact Page Layout',
        'WhatsApp Integration',
        'Mobile Responsive Design'
      ]
    },
    {
      name: 'Professional Business Website',
      price: '₹10,000 – ₹25,000',
      suitable: 'Growing Businesses, Agencies, Consultants, Educational Institutes',
      delivery: '7–15 Days',
      features: [
        'Everything in Basic Package',
        'Custom Premium Design',
        'Active Blog Section Layout',
        'Interactive Gallery Page',
        'Structured SEO Optimization',
        'Lead Capture Contact Forms',
        'Google Maps Integration'
      ],
      popular: true
    },
    {
      name: 'E-Commerce Website',
      price: '₹25,000 – ₹50,000+',
      suitable: 'Online Stores, Fashion Brands, Organic Products, Electronics Shops',
      delivery: '10–15 Days',
      features: [
        'Dynamic Product Listings',
        'Interactive Shopping Cart',
        'Online Payment Gateway Sync',
        'Secure Order Management',
        'Customer Registration',
        'Inventory Management'
      ]
    }
  ]

  return (
    <div className="font-sans overflow-x-hidden bg-[#050505] text-zinc-100 min-h-screen bg-grid-pattern relative">
      {/* Premium Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center bg-transparent px-6 py-24 border-b border-white/10 overflow-hidden">
        {/* Localized Gold Glow Effect (matches other pages) */}
        <div className="glow-bg bg-brand-primary/15 top-0 right-10"></div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="px-5 py-2 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-widest rounded-full"
          >
            ENTERPRISE-GRADE WEB ENGINEERING
          </motion.span>
          
          <h1 className="hero-title text-4xl sm:text-6xl md:text-8xl font-black text-white mt-8 tracking-tight leading-[1.05] opacity-0 uppercase">
            We Engineer High-Performing <br />
            <span className="block mt-4 text-transparent [-webkit-text-stroke:1.5px_white] hover:[-webkit-text-stroke:1.5px_#FFBA00] transition-all duration-500 font-black tracking-tighter">
              Digital Flagships
            </span>
          </h1>
          
          <p className="hero-subtitle text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mt-8 leading-relaxed font-semibold opacity-0">
            Innovtrix specializes in building modern E-Commerce platforms and professional commercial websites that are fast, secure, scalable, and designed to help businesses grow in the digital world.
          </p>

          <div className="hero-actions flex flex-col md:flex-row items-center justify-center gap-4 mt-12 opacity-0">
            <button 
              onClick={() => navigate('/contact')} 
              className="btn-primary w-full md:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold tracking-wider uppercase"
            >
              Get a Proposal <FiArrowRight />
            </button>
            <Link 
              to="/pricing" 
              className="btn-secondary w-full md:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold tracking-wider uppercase"
            >
              Explore Pricing
            </Link>
            <Link 
              to="/portfolio" 
              className="btn-secondary w-full md:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold tracking-wider uppercase"
            >
              Client Projects
            </Link>
            <a 
              href="https://ps-tex-production.up.railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full md:w-auto px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold tracking-wider uppercase bg-emerald-950/30 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-emerald-400 hover:text-white transition-all duration-300"
            >
              Sample Website
            </a>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="py-20 bg-[#070707] border-b border-white/10 px-6 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center p-6 rounded-2xl bg-zinc-900/40 border border-white/5 shadow-md hover:border-brand-primary/20 hover:shadow-[0_10px_25px_rgba(255,186,0,0.08)] transition-all duration-300 animate-fade-in"
            >
              <div className="text-4xl md:text-6xl font-black text-white">
                <Counter value={stat.value} />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-zinc-500 font-bold mt-3">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Intro & Why Choose Us */}
      <section className="py-28 bg-[#050505] px-6 relative bg-grid-pattern border-b border-white/10">
        <div className="glow-bg bg-brand-primary/5 top-40 left-10"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-right">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">WHO WE ARE</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-8 leading-tight">
              Building Digital Solutions <br />That Drive Business Growth
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed bg-zinc-900/20 border border-white/5 p-6 rounded-2xl font-semibold">
              At Innovtrix, we were founded by a group of passionate friends dedicated to helping businesses grow through innovative technology. We specialize in E-Commerce Websites, Commercial Websites, Mobile Applications, and Electronics Projects, delivering modern, secure, and high-performance solutions tailored to every client's needs. Our mission is to transform ideas into impactful digital experiences that drive success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-aos="fade-left">
            <div className="premium-card premium-card-hover relative overflow-hidden group p-6 bg-zinc-950/90 border border-white/5 glow-gold">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FiGlobe className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">Premium Website Development</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-semibold">Modern, responsive, and high-performance websites designed to help businesses grow and create a strong online presence.</p>
            </div>
            <div className="premium-card premium-card-hover relative overflow-hidden group p-6 bg-zinc-950/90 border border-white/5 glow-gold">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FiShoppingBag className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">E-Commerce Solutions</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-semibold">Secure online stores with product management, payment gateways, shopping carts, and seamless customer experiences.</p>
            </div>
            <div className="premium-card premium-card-hover relative overflow-hidden group p-6 bg-zinc-950/90 border border-white/5 glow-gold">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FiSmartphone className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">Mobile App Development</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-semibold">Custom Android and iOS applications with intuitive interfaces, high performance, and scalable architecture.</p>
            </div>
            <div className="premium-card premium-card-hover relative overflow-hidden group p-6 bg-zinc-950/90 border border-white/5 glow-gold">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FiCpu className="text-brand-primary text-3xl mb-4" />
              <h3 className="text-white font-black text-base mb-2">Electronics & IoT Projects</h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-semibold">Innovative electronics, IoT systems, embedded solutions, and custom hardware prototypes for students, startups, and industries.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Core Services Overview */}
      <section className="py-28 bg-[#070707] border-b border-white/10 px-6 bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">WHAT WE BUILD</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Specialized Web Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <div 
                key={index}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                className="premium-card p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden group glow-gold bg-zinc-950/90"
              >
                {/* Sleek Golden Accent Line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${serviceBadges[index]}`}>
                      Service 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-white mb-4 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-zinc-400 mb-8 text-sm sm:text-base leading-relaxed font-semibold">{service.description}</p>
                  
                  <ul className="space-y-3 mb-10">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-zinc-300">
                        <span className={`w-2 h-2 ${bulletColors[index]} rounded-full mt-2 flex-shrink-0`}></span>
                        <span className="text-sm font-semibold">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => navigate('/services')}
                  className="btn-primary w-full py-4 mt-auto z-10"
                >
                  Learn More About Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Animated Roadmap (Service Process) */}
      <section 
        id="roadmap"
        ref={containerRef}
        className="bg-[#050505] pt-28 pb-48 px-6 md:px-12 w-full relative overflow-hidden font-sans bg-grid-pattern border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto relative md:h-[2450px]">
          
          {/* Header Content */}
          <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-20 md:mb-0">
            <span className="inline-block bg-brand-primary/10 border border-brand-primary/20 rounded-full px-5 py-2 text-xs font-black uppercase text-brand-primary mb-6 shadow-sm">
              Our service process
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tight relative">
              Development <br />
              <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Roadmap</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-sm font-semibold leading-relaxed">
              A timeline of our design, engineering, and cloud deployment procedures tailored to deliver enterprise-grade results under strict guidelines.
            </p>
          </div>

          {/* Desktop SVG Animated Dashed Line */}
          <svg 
            className="hidden md:block absolute top-0 left-0 w-full h-[2350px] pointer-events-none z-0" 
            viewBox="0 0 1000 2350" 
            preserveAspectRatio="none"
          >
            {/* Faint background path */}
            <path 
              d="M 650,300 C 400,450 200,600 300,850 C 400,1100 750,1250 700,1500 C 650,1750 400,1900 300,2200" 
              fill="none" 
              stroke="#27272a" 
              strokeWidth="3" 
              strokeDasharray="8 10" 
            />

            {/* Mask to reveal the dashed path based on scroll */}
            <mask id="roadmap-path-mask">
              <motion.path 
                d="M 650,300 C 400,450 200,600 300,850 C 400,1100 750,1250 700,1500 C 650,1750 400,1900 300,2200" 
                fill="none" 
                stroke="white" 
                strokeWidth="20" 
                style={{ pathLength }}
              />
            </mask>

            {/* The actual dashed line that gets revealed */}
            <path 
              d="M 650,300 C 400,450 200,600 300,850 C 400,1100 750,1250 700,1500 C 650,1750 400,1900 300,2200" 
              fill="none" 
              stroke="#FFBA00" 
              strokeWidth="3" 
              strokeDasharray="8 10" 
              mask="url(#roadmap-path-mask)"
              className="drop-shadow-[0_0_8px_rgba(255,186,0,0.5)]"
            />
          </svg>

          {/* Mobile Animated Vertical Dashed Line */}
          <svg 
            className="md:hidden absolute top-0 left-6 w-4 h-[100%] pointer-events-none z-0" 
            viewBox="0 0 4 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="#27272a" 
              strokeWidth="4" 
              strokeDasharray="4 6" 
              vectorEffect="non-scaling-stroke"
            />
            <mask id="roadmap-path-mask-mobile">
              <motion.path 
                d="M 2,0 L 2,100" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                style={{ pathLength }}
                vectorEffect="non-scaling-stroke"
              />
            </mask>
            <path 
              d="M 2,0 L 2,100" 
              fill="none" 
              stroke="#FFBA00" 
              strokeWidth="4" 
              strokeDasharray="4 6" 
              mask="url(#roadmap-path-mask-mobile)"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Cards Container */}
          <div className="flex flex-col gap-8 md:gap-12 items-start pl-14 pr-4 md:pl-0 md:pr-0 md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
            {roadmapSteps.map((step, idx) => (
              <TagCard 
                key={idx}
                number={step.number}
                title={step.title}
                tag={step.tag}
                text={step.text}
                className={step.className}
                aosType={idx % 2 === 0 ? "fade-left" : "fade-right"}
                aosDelay={step.delay}
                pathLength={pathLength}
                containerRef={containerRef}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Selected Completed Projects */}
      <section className="py-28 bg-[#050505] px-6 bg-grid-pattern border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
            <div data-aos="fade-right">
              <span className="text-xs font-black tracking-widest text-brand-primary uppercase">OUR WORK</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Selected Projects</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-0 z-10" data-aos="fade-left">
              <a 
                href="https://ps-tex-production.up.railway.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3 text-xs bg-emerald-950/30 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-emerald-400 hover:text-white flex items-center gap-2 font-black uppercase tracking-wider"
              >
                Sample Website <FiArrowRight size={14} />
              </a>
              <Link 
                to="/portfolio" 
                className="text-brand-primary hover:text-white font-black flex items-center gap-2 transition-colors text-sm uppercase tracking-wider font-bold"
              >
                Client Projects <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {selectedProjects.map((project, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="premium-card overflow-hidden group relative glow-gold bg-zinc-955/90"
              >
                {/* Sleek Golden Accent Line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                  <span className="absolute top-4 left-4 text-xs font-black tracking-widest uppercase bg-black/85 backdrop-blur-md text-brand-primary px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 bg-zinc-950/50">
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{project.title}</h3>
                  <p className="text-zinc-450 text-xs sm:text-sm leading-relaxed mb-4 font-semibold">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-28 bg-[#070707] border-b border-white/10 px-6 bg-grid-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <span className="text-xs font-black tracking-widest text-brand-primary uppercase">TRANSPARENT PLANS</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase font-sans">Web Development Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`premium-card p-8 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group ${
                  plan.popular 
                    ? 'border-brand-primary border-2 shadow-[0_20px_50px_rgba(255,186,0,0.15)] bg-zinc-950 glow-gold' 
                    : 'border-white/5 bg-zinc-955/60 hover:border-brand-primary/45 glow-gold'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Sleek Golden Accent Line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {plan.popular && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      Popular Choice
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{plan.name}</h3>
                  <p className="text-[10px] text-zinc-400 mb-6 font-bold uppercase tracking-wider truncate">
                    Fits: {plan.suitable}
                  </p>
                  <div className="flex items-baseline mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-white">{plan.price}</span>
                  </div>
                  <p className="text-xs font-bold text-brand-primary mb-6 uppercase tracking-wider">
                    Timeline: {plan.delivery}
                  </p>
                  <div className="h-px bg-white/10 mb-6"></div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-3 text-zinc-300">
                        <FiCheck className="text-brand-primary mt-1 flex-shrink-0" />
                        <span className="text-xs leading-relaxed font-semibold">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => navigate('/contact')}
                  className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  Request Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-24 bg-gradient-to-r from-zinc-950 via-[#FFBA00]/5 to-black border-t border-white/10 px-6 relative bg-grid-pattern">
        <div className="glow-bg bg-brand-primary/5 top-10 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative" data-aos="zoom-in">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Ready to Build Your Digital Flagship?</h2>
          <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-semibold">
            Partner with Innovtrix to create a premium, high-converting E-Commerce portal or commercial business website configured for enterprise scale.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary px-10 py-5 mx-auto font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
          >
            Launch Your Project Proposal
          </button>
        </div>
      </section>

    </div>
  )
}
