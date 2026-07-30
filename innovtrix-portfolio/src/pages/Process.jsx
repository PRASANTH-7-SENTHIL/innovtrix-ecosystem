export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Consultation',
      desc: 'We research your target sectors (e.g., Textile, Retail, Jewellery) to understand product attributes and buyer journeys, aligning budgets and key deliverables.'
    },
    {
      num: '02',
      title: 'UI/UX Wireframing & Prototyping',
      desc: 'We design premium, Vercel/Stripe-styled mockups. We optimize navigation flows, product grids, checkout structures, and lead generation banners.'
    },
    {
      num: '03',
      title: 'Frontend Component Architecture',
      desc: 'Using React 19 and Vite, we code the frontend components, applying Tailwind CSS styles and fluid Framer Motion / GSAP animations.'
    },
    {
      num: '04',
      title: 'Backend Logic & DB Integration',
      desc: 'We configure FastAPI Python routers and connect them to MySQL tables. We build secure JWT authorization headers and automated invoicing routes.'
    },
    {
      num: '05',
      title: 'Lighthouse Audits & Security Reviews',
      desc: 'We verify performance, SEO metadata, and accessibility tags. We test payment transactions in staging, ensuring the codebase scores 90+ across categories.'
    },
    {
      num: '06',
      title: 'Vercel / Render Deployment',
      desc: 'We compile and build the final static assets for Vercel, and provision FastAPI services to Render, enabling continuous deployment from Git.'
    }
  ]


  return (
    <div className="font-sans bg-[#050505] text-zinc-100 min-h-screen bg-grid-pattern">
      {/* Intro Banner */}
      <section className="bg-[#050505] py-28 px-6 relative border-b border-white/10 bg-grid-pattern">
        <div className="glow-bg bg-brand-primary/10 top-0 left-10"></div>
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 rounded-full">DEVELOPMENT LIFECYCLE</span>
          <h1 className="text-4xl md:text-7xl font-black text-white mt-8 tracking-tight uppercase leading-[1.1]">
            Our Development <br />
            <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Process</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            From your initial idea to server launch, here is how we partner with you to engineer your digital flagship.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-[#050505] px-6">
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-px bg-zinc-800 pointer-events-none"></div>

          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-start ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
                data-aos={idx % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-primary rounded-full border-4 border-black z-10 top-2 shadow-[0_0_15px_rgba(255,186,0,0.6)]"></div>
                
                {/* Content card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="premium-card p-6 border border-white/5 transition-all duration-300 relative bg-zinc-950/80 glow-gold group overflow-hidden">
                    {/* Sleek Golden Accent Line on hover */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFBA00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute top-4 right-4 text-xs font-black text-zinc-500">{step.num}</span>
                    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{step.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-semibold">{step.desc}</p>
                  </div>
                </div>

                {/* Empty slot for design balance */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
