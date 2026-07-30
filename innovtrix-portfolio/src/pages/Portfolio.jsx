import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const defaultProjects = [
    {
      title: 'Vogue Silk Textiles',
      category: 'E-Commerce Storefront',
      type: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      desc: 'Enterprise-grade catalog and retail store custom designed for a high-fashion textile exporter.',
      link: 'https://ps-tex-production.up.railway.app'
    },
    {
      title: 'Aura Fine Jewellery',
      category: 'Online Shopping Websites',
      type: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop',
      desc: 'Elegant high-conversion digital boutique featuring Stripe checkout, inventory management, and 3D preview mockups.'
    },
    {
      title: 'Apex Construction Group',
      category: 'Corporate Websites',
      type: 'Corporate',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
      desc: 'Premium commercial website showing heavy industrial portfolios, active projects tracker, and bids portal.'
    },
    {
      title: 'Lumina Electronics Hub',
      category: 'Modern E-Commerce Websites',
      type: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop',
      desc: 'High-speed retail store built with fast search query processing for thousands of electronic items.'
    },
    {
      title: 'Verdant Real Estate',
      category: 'Landing Pages',
      type: 'Landing Pages',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      desc: 'Single-page landing page featuring dynamic properties galleries, contact forms, and booking triggers.'
    },
    {
      title: 'Apex Furniture Showroom',
      category: 'Product Catalog Websites',
      type: 'Product Catalog',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
      desc: 'Premium interactive catalog with customization configuration parameters and quotation builder tools.'
    },
    {
      title: 'Zenith Wholesale Emporium',
      category: 'Wholesale Business Websites',
      type: 'Wholesale',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
      desc: 'Portal built for wholesale B2B buyers with login restrictions, custom tier pricing structure, and bulk invoice automation.'
    }
  ]

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'}/api/portfolio`)
        if (response.ok) {
          const data = await response.json()
          if (data && data.length > 0) {
            setProjects(data.map(p => ({
              title: p.title,
              category: p.category,
              type: p.type || 'E-Commerce',
              image: p.image_url || 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
              desc: p.description || '',
              link: p.project_url || ''
            })))
          } else {
            setProjects(defaultProjects)
          }
        } else {
          setProjects(defaultProjects)
        }
      } catch (err) {
        console.warn('Backend portfolio query offline, falling back to local list.', err)
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const filterCategories = ['All', 'E-Commerce', 'Corporate', 'Landing Pages', 'Product Catalog', 'Wholesale']

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type === filter || p.category.includes(filter))


  return (
    <div className="font-sans bg-[#050505] text-zinc-100 min-h-screen bg-grid-pattern">
      {/* Intro Banner */}
      <section className="bg-transparent py-28 px-6 relative border-b border-white/10">
        <div className="glow-bg bg-brand-primary/10 top-0 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">CLIENT PROJECTS</span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            Our Client <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white] hover:text-brand-primary hover:[-webkit-text-stroke:1.5px_#FFBA00] transition-colors duration-500">Projects</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            Take a look at some of our production builds. Each project was customized to optimize speed, conversions, and layout design.
          </p>
        </div>
      </section>

      {/* Filterable Portfolio Grid */}
      <section className="py-32 bg-transparent px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-20" data-aos="fade-up">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl border transition-all duration-300 cursor-pointer ${
                  filter === cat 
                    ? 'border-brand-primary bg-brand-primary/10 text-white shadow-sm font-black' 
                    : 'border-white/10 bg-zinc-950 text-zinc-400 hover:border-brand-primary/45 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="premium-card overflow-hidden group flex flex-col justify-between bg-zinc-950/60 backdrop-blur-lg border border-white/5 glow-gold relative transition-all duration-500"
              >
                {/* Sleek Golden Accent Line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Ambient radial glow in background on hover */}
                <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-brand-primary/5 rounded-full blur-[80px] group-hover:bg-brand-primary/10 transition-all duration-700 pointer-events-none" />
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <span className="absolute top-4 left-4 text-[10px] font-black tracking-widest uppercase bg-black/85 backdrop-blur-md text-brand-primary px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6 bg-transparent">
                    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{project.title}</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-semibold">{project.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 bg-transparent flex flex-col sm:flex-row gap-3">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 btn-secondary text-xs bg-emerald-950/30 hover:bg-emerald-500 border-emerald-500/20 hover:border-transparent text-emerald-400 hover:text-white py-3 transition-all flex items-center justify-center gap-2 font-bold uppercase tracking-wider"
                    >
                      Sample Website <FiArrowRight size={12} />
                    </a>
                  )}
                  <button 
                    onClick={() => navigate('/contact')}
                    className="flex-1 btn-primary py-3"
                  >
                    Discuss Build <FiArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-zinc-500 text-sm py-12 font-semibold">
              No project listings in this category. More updates coming soon.
            </p>
          )}

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-24 bg-transparent border-t border-white/10 px-6 relative">
        <div className="glow-bg bg-brand-primary/5 top-10 left-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="zoom-in">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Want a Customized Platform?</h2>
          <p className="text-zinc-400 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed font-semibold">
            Let us review your design goals, required features, and budget ranges to build a proposal proposal.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="btn-primary px-10 py-5 mx-auto font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
          >
            Launch Your Quote Request
          </button>
        </div>
      </section>

    </div>
  )
}
