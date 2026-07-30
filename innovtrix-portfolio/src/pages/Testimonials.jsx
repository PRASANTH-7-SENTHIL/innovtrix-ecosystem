import { useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  const localTestimonials = [
    {
      client_name: 'Harish Kumar',
      company: 'Vogue Silk & Garments',
      role: 'Operations Director',
      rating: 5,
      feedback: 'Innovtrix built our B2B wholesale fabric ordering portal. Their team understood our garment sizes and custom shipping specifications perfectly. Our sales throughput increased by 40% in the first quarter post-launch.'
    },
    {
      client_name: 'Anjali Sharma',
      company: 'Aura Fine Jewellery',
      role: 'Founder',
      rating: 5,
      feedback: 'The E-Commerce storefront is absolutely stunning! The Apple-like minimal theme fits our luxury diamond brand perfectly. Speed audits are excellent, and payment flows are solid.'
    },
    {
      client_name: 'Thomas Mercer',
      company: 'Apex Industrial Structures',
      role: 'Communications Lead',
      rating: 5,
      feedback: 'Our commercial website is generating high-value bids consistently. The project portfolio looks incredible, and the lead generation webhooks connect seamlessly with our systems. Highly recommended web studio.'
    }
  ]

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'}/api/testimonials`)
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        } else {
          throw new Error('API server offline')
        }
      } catch (error) {
        console.warn('Backend API offline, using local testimonials mock data.', error)
        setTestimonials(localTestimonials)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <div className="font-sans bg-[#050505] text-zinc-100 min-h-screen bg-grid-pattern">
      {/* Intro Banner */}
      <section className="bg-[#050505] py-28 px-6 relative border-b border-white/10 bg-grid-pattern">
        <div className="glow-bg bg-brand-primary/10 top-0 right-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">CLIENT SATISFACTION</span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            Client <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Testimonials</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            See what companies say about our custom development speed, styling design quality, and system scalability.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-32 bg-[#050505] px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-zinc-500 text-sm py-12 font-semibold animate-pulse">Loading testimonials...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <div 
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                  className="premium-card p-8 border border-white/5 transition-all duration-300 flex flex-col justify-between bg-zinc-955/85 glow-gold relative group overflow-hidden"
                >
                  {/* Sleek Golden Accent Line on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div>
                    <FaQuoteLeft className="text-brand-primary/30 text-3xl mb-6" />
                    
                    {/* Stars */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <FaStar key={i} className="text-brand-primary text-sm" />
                      ))}
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic font-semibold">
                      "{t.feedback}"
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-6">
                    <h4 className="text-white font-black text-base uppercase tracking-wide">{t.client_name}</h4>
                    <p className="text-zinc-500 text-xs mt-0.5 font-bold uppercase tracking-wider">{t.role}, {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
