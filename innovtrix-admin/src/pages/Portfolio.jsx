import { useState, useEffect } from 'react'
import { FiGrid, FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiX, FiCheck, FiInfo } from 'react-icons/fi'

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Modal / Form states
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [form, setForm] = useState({
    title: '',
    category: '',
    type: 'E-Commerce',
    image_url: '',
    project_url: '',
    description: ''
  })

  const types = ['E-Commerce', 'Corporate', 'Landing Pages', 'Product Catalog', 'Wholesale']

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/portfolio`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      } else {
        setError('Failed to fetch portfolio projects.')
      }
    } catch (err) {
      console.error(err)
      setError('Connection to backend failed.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const resetForm = () => {
    setForm({
      title: '',
      category: '',
      type: 'E-Commerce',
      image_url: '',
      project_url: '',
      description: ''
    })
    setEditingId(null)
  }

  const handleOpenAdd = () => {
    resetForm()
    setModalOpen(true)
  }

  const handleOpenEdit = (proj) => {
    setForm({
      title: proj.title,
      category: proj.category,
      type: proj.type || 'E-Commerce',
      image_url: proj.image_url || '',
      project_url: proj.project_url || '',
      description: proj.description || ''
    })
    setEditingId(proj.id)
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const token = localStorage.getItem('admin_token')
    const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
    const url = editingId 
      ? `${currentApiUrl}/api/portfolio/${editingId}`
      : `${currentApiUrl}/api/portfolio`
    
    const method = editingId ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setSuccess(editingId ? 'Project updated successfully!' : 'Project added successfully!')
        setModalOpen(false)
        resetForm()
        fetchProjects()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const errData = await response.json()
        setError(errData.detail || 'Failed to save portfolio project.')
      }
    } catch (err) {
      console.error(err)
      setError('Backend communication failed.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio project showcase?')) return
    setError('')
    setSuccess('')

    const token = localStorage.getItem('admin_token')
    try {
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setSuccess('Project deleted successfully.')
        fetchProjects()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Failed to delete portfolio project.')
      }
    } catch (err) {
      console.error(err)
      setError('Backend communication failed.')
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">Client Showcase Projects</h1>
          <p className="text-slate-500 text-xs mt-1">Manage public projects displayed in the main portfolio site showcase grids.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="btn-primary py-2.5 px-4 text-xs"
        >
          <FiPlus size={14} /> Add Client Project
        </button>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider animate-pulse">
          <FiCheck /> {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider">
          <FiInfo /> {error}
        </div>
      )}

      {/* Showcase Grid */}
      {loading ? (
        <div className="text-center text-slate-500 text-xs py-12">Loading portfolio projects showcase...</div>
      ) : projects.length === 0 ? (
        <div className="dash-card text-center py-16 text-slate-400">
          No client projects added yet. Click "Add Client Project" above to build your first portfolio card!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div 
              key={proj.id}
              className="dash-card flex flex-col justify-between overflow-hidden group hover:border-brand-primary/45 relative transition-all duration-300 bg-zinc-950/60"
            >
              <div>
                {/* Image block */}
                {proj.image_url && (
                  <div className="h-44 -mx-6 -mt-6 mb-4 overflow-hidden border-b border-white/5 relative">
                    <img 
                      src={proj.image_url} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-black/80 text-brand-primary border border-white/10 px-2.5 py-1 rounded-full">
                      {proj.type || 'E-Commerce'}
                    </span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">{proj.title}</h3>
                  <p className="text-[10px] text-brand-secondary font-black uppercase tracking-wider">{proj.category}</p>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed line-clamp-3 mt-2">{proj.description}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="flex-1 btn-secondary py-2.5 text-[10px] flex items-center justify-center gap-1 font-black uppercase tracking-wider"
                >
                  <FiEdit2 size={10} /> Edit Details
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="px-3.5 py-2.5 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/20 hover:border-transparent text-rose-400 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
                  title="Delete Project"
                >
                  <FiTrash2 size={12} />
                </button>
                {proj.project_url && (
                  <a
                    href={proj.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-transparent text-emerald-400 rounded-xl transition-all duration-200 flex items-center justify-center"
                    title="Visit Site"
                  >
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="dash-card max-w-xl w-full relative bg-zinc-950/95 border border-white/10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto bg-grid-pattern">
            
            {/* Modal Title */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-sm font-black text-white uppercase tracking-widest">
                {editingId ? 'Modify Client Project' : 'Add New Client Project'}
              </h2>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Project Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Vogue Silk Textiles"
                    className="dash-input"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Category Filter Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="dash-input"
                  >
                    {types.map(t => (
                      <option key={t} value={t} className="bg-zinc-950 text-white">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Detailed Subtitle / Category Label</label>
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Enterprise-Grade E-Commerce"
                  className="dash-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Project Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="e.g. https://images.unsplash.com/..."
                  className="dash-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Live Project URL (Optional)</label>
                <input
                  type="url"
                  value={form.project_url}
                  onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                  placeholder="e.g. https://myclientproject.com"
                  className="dash-input"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Description Content</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Summarize the client project build scope, integrated services, design grids, etc."
                  className="dash-input h-24 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 btn-secondary py-3 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 text-xs font-black"
                >
                  Save Project Showcase
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}
