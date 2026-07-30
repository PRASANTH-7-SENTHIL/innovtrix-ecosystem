import { useState, useEffect } from 'react'
import { FiSave, FiSettings, FiDatabase, FiTrendingUp, FiUsers, FiLock, FiInfo, FiCheck } from 'react-icons/fi'

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Innovtrix Support',
    email: 'innovtrix30@gmail.com',
    role: 'Senior Administrator'
  })
  
  const [backendUrl, setBackendUrl] = useState(
    localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
  )
  
  // Custom stats and founders state configuration
  const [stats, setStats] = useState([
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
  ])

  const [founders, setFounders] = useState([
    {
      name: '',
      role: '',
      bio: '',
      image: '',
      socials: { github: '', linkedin: '', email: '' }
    },
    {
      name: '',
      role: '',
      bio: '',
      image: '',
      socials: { github: '', linkedin: '', email: '' }
    }
  ])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('profile') // 'profile' | 'stats' | 'founders'

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        const response = await fetch(`${currentApiUrl}/api/settings`)
        if (response.ok) {
          const data = await response.json()
          if (data.stats) {
            setStats(JSON.parse(data.stats))
          }
          if (data.founders) {
            setFounders(JSON.parse(data.founders))
          }
        } else {
          setError('Failed to load current settings from backend.')
        }
      } catch (err) {
        console.error(err)
        setError('Could not establish connection with FastAPI backend.')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleProfileSave = (e) => {
    e.preventDefault()
    setSuccess('Admin profile cached successfully!')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleStatsSave = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    const token = localStorage.getItem('admin_token')
    const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
    try {
      const statsRes = await fetch(`${currentApiUrl}/api/settings/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: JSON.stringify(stats) })
      })

      if (statsRes.ok) {
        setSuccess('Homepage statistics saved successfully to database!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Error updating statistics configuration values.')
      }
    } catch (err) {
      console.error(err)
      setError('Connection to backend failed while saving statistics.')
    }
  }

  const handleFoundersSave = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    const token = localStorage.getItem('admin_token')
    const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
    try {
      const foundersRes = await fetch(`${currentApiUrl}/api/settings/founders`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ value: JSON.stringify(founders) })
      })

      if (foundersRes.ok) {
        setSuccess('Developer profiles saved successfully to database!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Error updating developer configuration values.')
      }
    } catch (err) {
      console.error(err)
      setError('Connection to backend failed while saving developer profiles.')
    }
  }

  const handleStatChange = (index, field, value) => {
    const updated = [...stats]
    updated[index] = { ...updated[index], [field]: value }
    setStats(updated)
  }

  const handleFounderChange = (index, field, value) => {
    const updated = [...founders]
    updated[index] = { ...updated[index], [field]: value }
    setFounders(updated)
  }

  const handleFounderSocialChange = (index, socialKey, value) => {
    const updated = [...founders]
    updated[index] = {
      ...updated[index],
      socials: {
        ...updated[index].socials,
        [socialKey]: value
      }
    }
    setFounders(updated)
  }

  return (
    <div className="space-y-8 font-sans max-w-4xl text-left">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">System settings</h1>
          <p className="text-slate-500 text-xs mt-1">Configure profile security, backend server addresses, homepage statistics, and developers profiles.</p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-white/5 space-x-2 overflow-x-auto pb-px scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
              : 'border-transparent text-slate-500 hover:text-slate-355 hover:bg-white/5'
          }`}
        >
          Profile & Connection
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeTab === 'stats'
              ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
              : 'border-transparent text-slate-500 hover:text-slate-355 hover:bg-white/5'
          }`}
        >
          Homepage Stats
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('founders')}
          className={`px-6 py-3 text-xs font-black uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeTab === 'founders'
              ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
              : 'border-transparent text-slate-500 hover:text-slate-355 hover:bg-white/5'
          }`}
        >
          Developer Profiles
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider">
          <FiCheck /> {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider">
          <FiInfo /> {error}
        </div>
      )}

      {loading ? (
        <div className="text-slate-500 text-xs text-center py-12">Loading customize parameters from server...</div>
      ) : (
        <div className="space-y-6">
          {/* Tab 1: Profile & Connection */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Admin Profile */}
              <form onSubmit={handleProfileSave} className="dash-card space-y-6 bg-zinc-950/60 border border-white/5">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                  <FiSettings className="text-brand-primary text-lg" />
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Admin Profile</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Display Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="dash-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Role Label</label>
                    <input
                      type="text"
                      readOnly
                      value={profile.role}
                      className="dash-input opacity-60 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="dash-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3"
                >
                  <FiSave size={14} /> Save Profile
                </button>
              </form>

              {/* Connection Settings */}
              <form onSubmit={(e) => {
                e.preventDefault()
                localStorage.setItem('backend_url', backendUrl)
                setSuccess('FastAPI connection URL saved successfully!')
                setTimeout(() => setSuccess(''), 3000)
              }} className="dash-card space-y-4 bg-zinc-950/60 border border-white/5">
                <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                  <FiDatabase className="text-brand-primary text-lg" />
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">FastAPI Connection</h3>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">FastAPI Root URL</label>
                  <input
                    type="url"
                    value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                    placeholder="http://localhost:8000"
                    className="dash-input"
                  />
                  <p className="text-[10px] text-slate-500 mt-2 font-semibold">
                    Used by dashboard clients to synchronize invoices, messages, and projects metadata with backend.
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3"
                >
                  <FiSave size={14} /> Save Connection
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Homepage Stats Customizer */}
          {activeTab === 'stats' && (
            <form onSubmit={handleStatsSave} className="dash-card space-y-6 bg-zinc-950/60 border border-white/5">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                <FiTrendingUp className="text-brand-primary text-lg" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Home Statistics Customizer</h3>
              </div>

              <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                Configure statistics showcased on the frontend hero banner (e.g. 99.9% success, 150+ projects built).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900/30 rounded-xl border border-white/5 space-y-3">
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Stat Slot 0{idx + 1}</span>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Value</label>
                        <input
                          type="text"
                          required
                          value={stat.value}
                          onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                          placeholder="150+"
                          className="dash-input px-3"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Label Text</label>
                        <input
                          type="text"
                          required
                          value={stat.label}
                          onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                          placeholder="Websites Built"
                          className="dash-input px-3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest mt-4"
              >
                <FiSave size={16} /> Save Statistics
              </button>
            </form>
          )}

          {/* Tab 3: Developer Profiles Customizer */}
          {activeTab === 'founders' && (
            <form onSubmit={handleFoundersSave} className="dash-card space-y-6 bg-zinc-950/60 border border-white/5">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
                <FiUsers className="text-brand-primary text-lg" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Developers Profiles Customizer</h3>
              </div>

              <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                Customize profile details, bio statements, and social references (LinkedIn, GitHub) for co-founders.
              </p>

              <div className="space-y-6 pt-2">
                {founders.map((founder, idx) => (
                  <div key={idx} className="p-6 bg-zinc-900/30 rounded-xl border border-white/5 space-y-4">
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Developer 0{idx + 1} Profile</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Display Name</label>
                        <input
                          type="text"
                          required
                          value={founder.name}
                          onChange={(e) => handleFounderChange(idx, 'name', e.target.value)}
                          placeholder="Developer Name"
                          className="dash-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Role & Responsibility</label>
                        <input
                          type="text"
                          required
                          value={founder.role}
                          onChange={(e) => handleFounderChange(idx, 'role', e.target.value)}
                          placeholder="e.g. DevOps Engineer / Co-Founder"
                          className="dash-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Developer Image URL</label>
                      <input
                        type="url"
                        value={founder.image || ''}
                        onChange={(e) => handleFounderChange(idx, 'image', e.target.value)}
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        className="dash-input mb-3"
                      />
                    </div>

                    <div>
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Short Biography Text</label>
                      <textarea
                        rows={2}
                        required
                        value={founder.bio}
                        onChange={(e) => handleFounderChange(idx, 'bio', e.target.value)}
                        placeholder="Founder bio details..."
                        className="dash-input h-16 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={founder.socials?.github || ''}
                          onChange={(e) => handleFounderSocialChange(idx, 'github', e.target.value)}
                          placeholder="https://github.com/..."
                          className="dash-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={founder.socials?.linkedin || ''}
                          onChange={(e) => handleFounderSocialChange(idx, 'linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="dash-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Email URL / Reference</label>
                        <input
                          type="text"
                          value={founder.socials?.email || ''}
                          onChange={(e) => handleFounderSocialChange(idx, 'email', e.target.value)}
                          placeholder="mailto:myemail@domain.com"
                          className="dash-input text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest mt-4"
              >
                <FiSave size={16} /> Save Developer Profiles
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
