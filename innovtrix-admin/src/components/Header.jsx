import { useState, useEffect } from 'react'
import { FiBell, FiSearch, FiLogOut, FiUser, FiMenu } from 'react-icons/fi'

export default function Header({ onLogout, onToggleSidebar }) {
  const [adminEmail, setAdminEmail] = useState('innovtrix30@gmail.com')
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.map(n => ({
          id: n.id,
          text: n.message,
          read: n.read_status
        })))
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
    }
  }

  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email')
    if (savedEmail) {
      setAdminEmail(savedEmail)
    }
    fetchNotifications()
    
    // Poll notifications every 30 seconds for live updates
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/notifications/read-all`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
      }
    } catch (err) {
      console.error('Failed to mark all as read:', err)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="h-20 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 font-sans">
      
      {/* Left section: Toggle Sidebar and Search Bar */}
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-slate-400 hover:text-white p-2.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-800 border border-white/5 transition-colors mr-3 cursor-pointer flex items-center justify-center"
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={18} />
        </button>
 
         {/* Search Bar */}
         <div className="relative hidden sm:block w-48 md:w-72">
           <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
           <input
             type="text"
             placeholder="Search leads, projects, orders..."
             className="w-full pl-10 pr-4 py-2 bg-zinc-900/30 border border-white/10 rounded-xl text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
           />
         </div>
       </div>
 
       {/* Action Tools */}
       <div className="flex items-center space-x-4 sm:space-x-6">
         
         {/* Notifications Icon & Panel */}
         <div className="relative">
           <button 
             onClick={() => {
               setShowNotifications(!showNotifications)
               if (!showNotifications) {
                 fetchNotifications()
               }
             }}
             className="relative p-2.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-800 text-slate-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
           >
             <FiBell size={16} />
             {unreadCount > 0 && (
               <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                 {unreadCount}
               </span>
             )}
           </button>
           
           {showNotifications && (
             <div className="fixed top-20 right-4 left-4 w-auto sm:absolute sm:top-auto sm:right-0 sm:left-auto sm:w-80 sm:max-w-sm bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 z-40 space-y-3 bg-grid-pattern">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-[10px] text-brand-primary hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center text-slate-500 text-xs py-4">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`text-xs p-2.5 rounded-lg border ${
                      n.read ? 'border-transparent text-slate-400' : 'border-brand-primary/20 bg-brand-primary/5 text-slate-200'
                    }`}>
                      {n.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 border-l border-white/5 pl-4 sm:pl-6">
          <div className="p-2 bg-slate-950/60 rounded-full text-slate-400 border border-white/5">
            <FiUser size={16} />
          </div>
          <div className="hidden md:block text-left">
            <h5 className="text-xs font-bold text-white">Innovtrix Support</h5>
            <p className="text-[10px] text-slate-500">{adminEmail}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all cursor-pointer flex items-center justify-center"
          title="Sign Out"
        >
          <FiLogOut size={16} />
        </button>

      </div>
    </header>
  )
}

