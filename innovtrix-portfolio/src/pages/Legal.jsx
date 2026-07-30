export default function Legal({ mode }) {
  const isPrivacy = mode === 'privacy'

  return (
    <div className="font-sans min-h-[70vh] bg-[#050505] text-zinc-100 px-6 py-28 bg-grid-pattern">
      <div className="max-w-3xl mx-auto premium-card p-8 lg:p-12 border border-white/5 bg-zinc-950/80 shadow-2xl glow-silver">
        
        {isPrivacy ? (
          <div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-500 text-xs mb-8 font-bold uppercase tracking-wider">Last Updated: June 22, 2026</p>
            
            <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-semibold">
              <p>
                At Innovtrix Studio, we respect your privacy. This policy outlines how we gather, store, and process client information when you request project proposals or submit contact forms.
              </p>
              
              <h3 className="text-lg font-black text-white mt-8 uppercase tracking-tight">1. Information We Collect</h3>
              <p>
                We only collect name details, corporate phone numbers, business email addresses, company names, and estimated budget selections. We collect this data strictly to customize website proposals.
              </p>

              <h3 className="text-lg font-black text-white mt-8 uppercase tracking-tight">2. Use of Collected Data</h3>
              <p>
                We leverage your business info to contact you regarding web builds. We do not sell, rent, or lease your personal information to third parties.
              </p>

              <h3 className="text-lg font-black text-white mt-8 uppercase tracking-tight">3. Security Infrastructure</h3>
              <p>
                We use secure database encryption protocols and TLS data transmissions to store client lead information securely, preventing unauthorized access.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Terms of Service</h1>
            <p className="text-zinc-500 text-xs mb-8 font-bold uppercase tracking-wider">Last Updated: June 22, 2026</p>
            
            <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-semibold">
              <p>
                Welcome to Innovtrix. By accessing our public portfolio site or utilizing our lead forms, you agree to comply with these terms.
              </p>

              <h3 className="text-lg font-black text-white mt-8 uppercase tracking-tight">1. Use of Website Content</h3>
              <p>
                All designs, graphics, and layout files displayed in our portfolio section are the intellectual property of Innovtrix Studio. You may not replicate or scrape these portfolios for commercial purposes.
              </p>

              <h3 className="text-lg font-black text-white mt-8 uppercase tracking-tight">2. Project Consultation Agreements</h3>
              <p>
                Submitting a proposal request does not bind Innovtrix to build the project. A legally binding development contract is only established after signing a statement of work (SOW).
              </p>

              <h3 className="text-lg font-black text-white mt-8 uppercase tracking-tight">3. Limitation of Liability</h3>
              <p>
                Innovtrix provides estimates and resources based on current market rates. We are not liable for business changes occurring prior to executing a formal development agreement.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
