import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Shell components
import Sidebar from './components/Sidebar'
import Header from './components/Header'

// Core pages
import Login from './pages/Login'
import DashboardOverview from './pages/DashboardOverview'
import Leads from './pages/Leads'
import Orders from './pages/Orders'
import Projects from './pages/Projects'
import Invoices from './pages/Invoices'
import Payments from './pages/Payments'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Portfolio from './pages/Portfolio'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setCheckingAuth(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_email')
    setIsAuthenticated(false)
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black bg-grid-pattern flex items-center justify-center text-slate-400 text-sm">
        Checking session authenticity...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <Router>
      <div className="flex bg-black bg-grid-pattern min-h-screen font-sans overflow-x-hidden">
        
        {/* Mobile Sidebar Backdrop Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Persistent Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Dashboard Content Container */}
        <div className="flex-grow flex flex-col min-w-0">
          
          {/* Header */}
          <Header onLogout={handleLogout} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Module Views */}
          <main className="p-4 sm:p-6 lg:p-8 flex-grow">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
        </div>

      </div>
    </Router>
  )
}
