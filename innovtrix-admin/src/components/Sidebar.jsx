import { NavLink } from 'react-router-dom'
import { 
  FiHome, FiBriefcase, FiDollarSign, FiMail, FiLayers, FiSettings, 
  FiShoppingBag, FiUsers, FiFileText, FiStar, FiGrid, FiX
} from 'react-icons/fi'

export default function Sidebar({ isOpen, onClose }) {
  const menuGroups = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/', icon: <FiHome size={16} /> }
      ]
    },
    {
      title: 'Sales & Leads',
      items: [
        { name: 'Leads & Inquiries', path: '/leads', icon: <FiUsers size={16} /> },
        { name: 'Website Orders', path: '/orders', icon: <FiShoppingBag size={16} /> }
      ]
    },
    {
      title: 'Operations',
      items: [
        { name: 'Active Projects', path: '/projects', icon: <FiBriefcase size={16} /> },
        { name: 'Invoices', path: '/invoices', icon: <FiFileText size={16} /> },
        { name: 'Payments', path: '/payments', icon: <FiDollarSign size={16} /> }
      ]
    },
    {
      title: 'Content & Settings',
      items: [
        { name: 'Client Projects', path: '/portfolio', icon: <FiGrid size={16} /> },
        { name: 'Client Messages', path: '/messages', icon: <FiMail size={16} /> },
        { name: 'System Settings', path: '/settings', icon: <FiSettings size={16} /> }
      ]
    }
  ]

  const activeStyle = "bg-brand-primary/10 border-l-2 border-brand-primary text-brand-primary font-black uppercase tracking-wider text-[11px] shadow-[0_0_15px_rgba(255,186,0,0.05)]"
  const inactiveStyle = "hover:bg-white/5 border-l-2 border-transparent text-zinc-400 hover:text-white font-bold uppercase tracking-wider text-[11px]"

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950/95 border-r border-white/5 flex flex-col min-h-screen transition-transform duration-200 ease-in-out transform lg:translate-x-0 lg:static lg:block bg-grid-pattern ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } font-sans`}>
      {/* Brand Logo */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-black bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent tracking-widest uppercase">
            INNOVTRIX
          </span>
          <span className="text-[9px] px-2.5 py-0.5 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full font-black uppercase tracking-wider">
            Admin
          </span>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Close Sidebar"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Navigation Group items */}
      <nav className="flex-grow p-4 overflow-y-auto space-y-8">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-2">
            <h4 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => (
                <NavLink
                  key={itemIdx}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive ? activeStyle : inactiveStyle
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

