import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiShoppingBag, FiGlobe, FiArrowRight, FiCheck, FiHome, FiLayers, FiCpu, FiCloud, FiCommand, FiBarChart2 } from 'react-icons/fi'

export default function Services() {
  const navigate = useNavigate()

  const serviceDetails = [
    {
      icon: <FiGlobe className="text-5xl text-brand-primary mb-6" />,
      title: 'Business & Commercial Websites',
      subtitle: 'Premium Corporate Presence & Startup Platforms.',
      description: 'We engineer high-performance commercial websites designed to establish digital authority, showcase services, and capture leads. Ideal for corporate branding, startups, and professional firms.',
      features: [
        'Corporate & Startup Websites',
        'Company & Agency Presentations',
        'Professional Service Portals',
        'Stripe & Vercel Premium Design Patterns',
        'Robust Lead Capture & CRM Connectivity',
        'SEO-Optimized Speed Structures (Lighthouse 90+)'
      ],
      type: 'commercial'
    },
    {
      icon: <FiHome className="text-5xl text-brand-primary mb-6" />,
      title: 'Industry-Specific Websites',
      subtitle: 'Tailored solutions configured for your specific sector.',
      description: 'Custom-built templates and interactive platforms optimized for unique industry user journeys, scheduling, and showcase layouts.',
      features: [
        'Gym & Fitness Portals',
        'Hospital & Healthcare Sites',
        'School & College Portals',
        'Restaurant & Hotel Systems',
        'Real Estate Showcases',
        'Interactive Bookings & Scheduling'
      ],
      type: 'industry'
    },
    {
      icon: <FiShoppingBag className="text-5xl text-brand-primary mb-6" />,
      title: 'E-Commerce Development',
      subtitle: 'High-converting custom store configurations.',
      description: 'Build fast, secure online shopping experiences tailored for retail, wholesale, and multi-vendor marketplaces.',
      features: [
        'Online Stores & Carts',
        'Multi-Vendor Marketplaces',
        'Product Catalog Systems',
        'Payment Gateway Integration (Stripe, Razorpay, PayPal)',
        'Dynamic Inventory & Order Sync',
        'Customer Portals & Automated Invoicing'
      ],
      type: 'ecommerce'
    },
    {
      icon: <FiLayers className="text-5xl text-brand-primary mb-6" />,
      title: 'SaaS Application Development',
      subtitle: 'Bespoke subscription platforms & client dashboards.',
      description: 'Full-stack software application development featuring secure multi-tenant hosting, payment integration, and administrative controls.',
      features: [
        'Custom SaaS Platforms',
        'Subscription-Based Applications',
        'Client Dashboards & Reporting Tables',
        'Customer Billing Portals & Invoicing',
        'JWT Role-Based Authorization',
        'Secure Database APIs'
      ],
      type: 'saas'
    },
    {
      icon: <FiCpu className="text-5xl text-brand-primary mb-6" />,
      title: 'IoT Applications & Smart Solutions',
      subtitle: 'Connected hardware ecosystems & real-time telemetry.',
      description: 'Integrate hardware sensors, smart controls, and embedded systems directly to beautiful, responsive web dashboards with live data streams.',
      features: [
        'Smart Agriculture Web Solutions',
        'Industrial Monitoring Systems',
        'Telemetry Data Dashboards',
        'Real-Time WebSockets Telemetry',
        'Hardware-to-Cloud Integration',
        'Embedded System Controls'
      ],
      type: 'iot'
    },
    {
      icon: <FiCloud className="text-5xl text-brand-primary mb-6" />,
      title: 'Cloud Deployment & Monitoring',
      subtitle: 'Secure infrastructure hosting & performance tuning.',
      description: 'We orchestrate AWS cloud provisioning, deploy production services, configure web servers, and manage system monitoring to ensure 99.9% uptime.',
      features: [
        'AWS Cloud Deployment & Scaling',
        'Server Setup & Nginx Configuration',
        'Application Performance Monitoring',
        'Security Auditing & Hardening',
        'SSL, CDN & Edge Caching Setup',
        'Automated Backups & DB Recovery'
      ],
      type: 'cloud'
    },
    {
      icon: <FiCommand className="text-5xl text-brand-primary mb-6" />,
      title: 'AI & Automation Solutions',
      subtitle: 'Intelligent workflow engines & smart assistants.',
      description: 'Integrate AI models, automated chatbot agents, and third-party APIs to streamline business processes and handle customer inquiries.',
      features: [
        'AI Chatbots & Assistants',
        'Workflow Automation Scripts',
        'API & Webhook Integrations',
        'Business Process Automation',
        'Large Language Model Custom Pipes',
        'Background Task Cron Jobs'
      ],
      type: 'ai'
    },
    {
      icon: <FiBarChart2 className="text-5xl text-brand-primary mb-6" />,
      title: 'Custom Web Applications',
      subtitle: 'Tailor-made internal business tooling.',
      description: 'We code custom management systems, ERP tools, CRM architectures, and visual business dashboards fitted exactly to your business logic.',
      features: [
        'Internal Management Systems',
        'CRM & ERP Solutions',
        'Analytics Dashboards & Charts',
        'Business Automation Platforms',
        'Custom Database Schema Design',
        'Advanced Reporting & Data Exports'
      ],
      type: 'custom'
    }
  ]


  const bulletColors = [
    'text-amber-400',
    'text-emerald-400',
    'text-cyan-400',
    'text-purple-400',
    'text-orange-400',
    'text-teal-400',
    'text-pink-400',
    'text-zinc-300'
  ]

  const industries = [
    'Textile & Garments', 'Retail & Wholesale', 'Manufacturing', 
    'Jewellery & Electronics', 'Furniture Showrooms', 'Gym & Fitness',
    'Hospital & Healthcare', 'School & College', 'Restaurant & Hotel',
    'Real Estate & Construction', 'Corporate Businesses', 'Startups & SaaS'
  ]

  return (
    <div className="font-sans bg-[#050505] text-zinc-100 min-h-screen bg-grid-pattern">
      {/* Intro Banner */}
      <section className="bg-transparent py-28 px-6 relative border-b border-white/10">
        <div className="glow-bg bg-brand-primary/10 top-0 right-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">WHAT WE ENGAGE IN</span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            Focused <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white] hover:text-brand-primary hover:[-webkit-text-stroke:1.5px_#FFBA00] transition-colors duration-500">Web Services</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            We engineer customized, high-performance digital architectures tailored to grow your business. Explore our targeted services.
          </p>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-32 bg-transparent px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {serviceDetails.map((service, index) => (
            <div 
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="premium-card p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-zinc-950/60 backdrop-blur-lg border border-white/5 group glow-gold relative overflow-hidden transition-all duration-500"
            >
              {/* Sleek Golden Accent Line on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Ambient radial glow in background on hover */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-[100px] group-hover:bg-brand-primary/10 transition-all duration-700 pointer-events-none" />
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 flex items-center justify-center mb-8 shadow-md group-hover:border-brand-primary/50 group-hover:shadow-[0_0_20px_rgba(255,186,0,0.2)] transition-all duration-500">
                  {React.cloneElement(service.icon, { className: "text-3xl text-brand-primary mb-0" })}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 uppercase tracking-tight">{service.title}</h2>
                <h4 className="text-brand-primary text-sm font-bold mb-8 uppercase tracking-wider">{service.subtitle}</h4>
                <p className="text-zinc-400 text-base leading-relaxed mb-8 font-semibold">{service.description}</p>
                
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn-primary w-full sm:w-auto px-8 py-4 font-black uppercase tracking-wider text-xs"
                >
                  Request Quote <FiArrowRight />
                </button>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900/50 to-black/80 border border-white/10 relative overflow-hidden group-hover:border-brand-primary/20 transition-colors duration-500 bg-grid-pattern">
                <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Key Inclusions</h3>
                <ul className="space-y-4">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-zinc-300 font-semibold animate-fade-in">
                      <FiCheck className="text-brand-primary text-xl mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Target Industries */}
      <section className="py-28 bg-transparent border-t border-white/10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest">TARGET MARKET</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4 mb-6 uppercase">Who We Build For</h2>
          <p className="text-zinc-400 text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-semibold">
            Our templates are structured to optimize user experience and conversion layouts for specific business sectors. We build tailored architectures for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, idx) => (
              <span 
                key={idx} 
                className="px-5 py-3 rounded-xl bg-zinc-950 border border-white/10 text-zinc-300 text-sm font-bold hover:border-brand-primary/50 hover:text-white transition-all duration-300 cursor-default shadow-md"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
