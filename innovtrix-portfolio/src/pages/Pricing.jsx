import { useNavigate } from 'react-router-dom'
import { FiCheck, FiInfo } from 'react-icons/fi'

export default function Pricing() {
  const navigate = useNavigate()

  const plans = [
    {
      name: 'Basic Business Website',
      price: '₹5,000 – ₹10,000',
      period: 'approx.',
      delivery: '3–7 Days',
      suitable: 'Gym, Clinic, Salon, Restaurant, Small Business, Freelancers',
      features: [
        'Home Page Layout',
        'About Us Page',
        'Services Page',
        'Contact Page Layout',
        'WhatsApp Integration API',
        'Mobile Responsive Design'
      ]
    },
    {
      name: 'Professional Business Website',
      price: '₹10,000 – ₹25,000',
      period: 'approx.',
      delivery: '7–15 Days',
      suitable: 'Growing Businesses, Agencies, Consultants, Educational Institutes',
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
      period: 'approx.',
      delivery: '10–15 Days',
      suitable: 'Online Stores, Fashion Brands, Organic Products, Electronics Shops',
      features: [
        'Dynamic Product Listings',
        'Interactive Shopping Cart',
        'Online Payment Gateway integration',
        'Secure Order Management',
        'Customer Registration & Accounts',
        'Internal Inventory Management'
      ]
    }
  ]

  const factors = [
    {
      title: 'Number of Pages',
      desc: 'More pages require additional wireframing, layout styling, and database schema mappings, which affect overall scope.'
    },
    {
      title: 'Custom UI/UX Design',
      desc: 'Specific custom styling overrides, micro-animations, single-page transitions, and customized CTA configurations require extra design hours.'
    },
    {
      title: 'Advanced Features',
      desc: 'Additional logics like booking calendars, user authentication, multi-currency modules, and third-party API configurations increase complexity.'
    },
    {
      title: 'Content Creation & Copywriting',
      desc: 'If our developers draft copy, edit product images, or formulate banners, content support fees apply.'
    },
    {
      title: 'SEO Requirements',
      desc: 'Standard schema configs are included. Advanced keyword tracking and listing optimization audits are handled separately.'
    }
  ]

  const additionalCharges = [
    { service: 'Domain Name (.com / .in)', cost: '₹800 – ₹1,500/year' },
    { service: 'Cloud Hosting Services', cost: '₹2,000 – ₹8,000/year' },
    { service: 'Monthly Support & Maintenance', cost: '₹500 – ₹2,000/month' }
  ]

  return (
    <div className="font-sans bg-[#050505] text-zinc-100 min-h-screen bg-grid-pattern">
      {/* Page Header */}
      <section className="bg-[#050505] py-28 px-6 relative border-b border-white/10 bg-grid-pattern">
        <div className="glow-bg bg-brand-primary/10 top-0 right-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">PROJECT PRICING</span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            Clear, Value-Driven <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Pricing Plans</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            Select a package suited to your current operational needs. We construct clean, secure storefronts and commercial websites.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-32 bg-[#050505] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`premium-card p-8 border transition-all duration-300 flex flex-col justify-between relative group overflow-hidden ${
                  plan.popular 
                    ? 'border-brand-primary border-2 shadow-[0_20px_50px_rgba(255,186,0,0.15)] bg-zinc-950 glow-gold' 
                    : 'border-white/5 bg-zinc-950/60 hover:border-brand-primary/45 glow-gold'
                }`}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                {/* Sleek Golden Accent Line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {plan.popular && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{plan.name}</h3>
                  <p className="text-[10px] text-zinc-400 mb-6 font-bold uppercase tracking-wider font-semibold">
                    Suitable for: {plan.suitable}
                  </p>
                  
                  <div className="flex items-baseline mb-3">
                    <span className="text-2xl sm:text-3xl font-black text-white">{plan.price}</span>
                    <span className="text-zinc-500 text-xs ml-2">/ {plan.period}</span>
                  </div>
                  
                  <p className="text-xs font-bold text-brand-primary mb-6 uppercase tracking-wider">
                    Delivery Timeline: {plan.delivery}
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
                  className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-200 rounded-xl cursor-pointer ${
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

      {/* Factors Affecting Cost */}
      <section className="py-28 bg-[#070707] border-t border-white/10 px-6 bg-grid-pattern">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-black text-brand-primary uppercase tracking-widest">VARIABLE FACTORS</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">What Affects Project Cost?</h2>
          </div>

          <div className="space-y-6">
            {factors.map((f, idx) => (
              <div key={idx} className="premium-card p-6 border-white/5 flex items-start space-x-4 bg-zinc-950/80 hover:border-brand-primary/30 transition-all duration-300 glow-gold relative overflow-hidden group">
                {/* Sleek Golden Accent Line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <FiInfo className="text-brand-primary text-xl mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-black text-sm mb-1.5 uppercase tracking-wide">{idx + 1}. {f.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-semibold">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Charges Table */}
      <section className="py-28 bg-[#050505] border-t border-white/10 px-6 relative bg-grid-pattern">
        <div className="glow-bg bg-brand-primary/10 bottom-10 left-10"></div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-black text-brand-primary uppercase tracking-widest">ANNUAL & RECURRING COSTS</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase">Additional Charges</h2>
          </div>

          <div className="overflow-hidden border border-white/10 rounded-2xl bg-zinc-950/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-white/10 text-xs font-black uppercase text-zinc-400 tracking-wider">
                  <th className="px-6 py-5">Service Category</th>
                  <th className="px-6 py-5 text-right">Estimated Cost Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {additionalCharges.map((ac, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 text-xs font-bold text-zinc-300">{ac.service}</td>
                    <td className="px-6 py-5 text-xs font-black text-[#FFBA00] text-right">{ac.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
