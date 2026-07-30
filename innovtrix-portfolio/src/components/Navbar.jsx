import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import logoImg from '../assets/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Force dark mode theme globally by adding dark class to document element
    const root = window.document.documentElement
    root.classList.add('dark')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Client Projects', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ]

  const activeStyle = "text-brand-primary font-black border-b-2 border-brand-primary"
  const inactiveStyle = "text-zinc-400 hover:text-brand-primary transition-colors"

  const isHome = location.pathname === '/'
  const showBackground = scrolled || !isHome || isOpen

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      showBackground 
        ? 'py-4 backdrop-blur-md bg-black/80 border-b border-white/10 shadow-lg' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logoImg} alt="INNOVTRIX logo" className="h-10 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="text-xl font-black text-white font-sans tracking-tight leading-none flex items-center">
              INNOVTRIX<span className="text-brand-primary font-black">.</span>
            </span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `${isActive ? activeStyle : inactiveStyle} text-sm font-semibold py-1`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => navigate('/contact')}
            className="btn-primary py-2 px-5 text-sm"
          >
            Get Proposal
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-white bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 shadow-xl flex flex-col space-y-4 transition-all duration-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `${isActive ? activeStyle : inactiveStyle} text-base font-semibold py-1 w-fit`}
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setIsOpen(false)
              navigate('/contact')
            }}
            className="btn-primary w-full py-3"
          >
            Get Proposal
          </button>
        </div>
      )}
    </nav>
  )
}

