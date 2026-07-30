import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
import logoImg from '../assets/logo.png'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const targetIndustries = [
    'Textile & Garments', 'Retail & Wholesale', 'Manufacturing', 
    'Jewellery & Electronics', 'Furniture Showrooms', 'Gym & Fitness',
    'Hospital & Healthcare', 'School & College', 'Restaurant & Hotel',
    'Real Estate & Construction', 'Corporate & Startups', 'SaaS Platforms'
  ]

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* About Innovtrix */}
        <div>
          <Link to="/" className="flex items-center space-x-3 mb-6">
            <img src={logoImg} alt="INNOVTRIX logo" className="h-10 w-auto object-contain" />
            <span className="text-xl font-black text-white font-sans tracking-tight">
              INNOVTRIX<span className="text-brand-primary font-black">.</span>
            </span>
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Enterprise-grade web agency specializing exclusively in E-Commerce & Commercial website engineering. We build high-performing digital stores and premium company sites.
          </p>
          <div className="flex">
            <a 
              href="https://wa.me/917200608333?text=Hello%20Innovtrix!%20I'm%20interested%20in%20building%20a%20website%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-emerald-600 text-white transition-all duration-300 flex items-center gap-2 text-xs font-semibold border border-white/10 shadow-md"
            >
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Specialized Services & Industries */}
        <div>
          <h3 className="text-white text-base font-bold mb-6">Our Focus</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">Business & Commercial Websites</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">Industry-Specific Websites</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">E-Commerce Development</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">SaaS Application Development</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">IoT & Smart Solutions</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">AI & Automation Solutions</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-brand-primary transition-colors">Custom Web Applications</Link>
            </li>
            <div className="h-px bg-white/10 my-3"></div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Industries We Serve</p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-zinc-400">
              {targetIndustries.map((ind, idx) => (
                <span key={idx} className="hover:text-white transition-colors">{ind}</span>
              ))}
            </div>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-base font-bold mb-6">Get in Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <FaEnvelope className="text-brand-primary mt-1 flex-shrink-0" />
              <span className="text-zinc-300">innovtrix30@gmail.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <FaPhoneAlt className="text-brand-primary mt-1 flex-shrink-0" />
              <div className="flex flex-col space-y-1">
                <a href="tel:+917200608333" className="text-zinc-300 hover:text-brand-primary transition-colors">+91 7200608333</a>
                <a href="tel:+917603871116" className="text-zinc-300 hover:text-brand-primary transition-colors">+91 7603871116</a>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-base font-bold mb-6">Newsletter</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Subscribe to our newsletter for insights on high-converting e-commerce and commercial web layouts.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-transparent text-sm shadow-md"
              required
            />
            <button
              type="submit"
              className="btn-primary py-2.5 text-sm w-full"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-brand-secondary text-xs mt-2 animate-pulse font-bold">
              Thank you! You have successfully subscribed.
            </p>
          )}
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs">
        <p className="text-zinc-500 mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} Innovtrix Studio. All rights reserved.
        </p>
        <div className="flex space-x-6 text-zinc-500">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

