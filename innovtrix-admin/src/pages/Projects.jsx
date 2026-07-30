import { useState, useEffect } from 'react'
import { FiBriefcase, FiEdit2, FiCheck, FiX, FiPlus, FiTrash2 } from 'react-icons/fi'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        const response = await fetch(`${currentApiUrl}/api/projects`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          const parsed = data.map(p => {
            const isEcommerce = (p.project_type || '').toLowerCase().includes('e-commerce')
            const defaultMilestones = isEcommerce 
              ? [
                  { name: 'Database Wireframes', done: false },
                  { name: 'Frontend Styling', done: false },
                  { name: 'Stripe Payment Hook', done: false },
                  { name: 'Testing Audits', done: false }
                ]
              : [
                  { name: 'UI layouts wireframing', done: false },
                  { name: 'Frontend content assembly', done: false },
                  { name: 'Contact and Leads setup', done: false },
                  { name: 'Launch & DNS hosting config', done: false }
                ]
            return {
              id: p.id,
              title: p.title,
              type: p.project_type || 'Custom Website',
              client: p.client || 'Individual Client',
              developer: p.developer_assigned || 'Unassigned',
              deadline: p.deadline || 'TBD',
              progress: p.progress || 0,
              payment_status: p.payment_status || 'Unpaid',
              project_url: p.project_url || '',
              milestones: p.milestones ? JSON.parse(p.milestones) : defaultMilestones
            }
          })
          setProjects(parsed)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleUpdateProject = async (updatedProj) => {
    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/projects/${updatedProj.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          developer_assigned: updatedProj.developer,
          progress: updatedProj.progress,
          payment_status: updatedProj.payment_status,
          deadline: updatedProj.deadline,
          milestones: JSON.stringify(updatedProj.milestones),
          project_url: updatedProj.project_url
        })
      })
      if (response.ok) {
        const data = await response.json()
        const parsed = {
          id: data.id,
          title: data.title,
          type: data.project_type || updatedProj.type,
          client: data.client || updatedProj.client,
          developer: data.developer_assigned || updatedProj.developer,
          deadline: data.deadline || updatedProj.deadline,
          progress: data.progress || updatedProj.progress,
          payment_status: data.payment_status || updatedProj.payment_status,
          project_url: data.project_url || updatedProj.project_url || '',
          milestones: data.milestones ? JSON.parse(data.milestones) : updatedProj.milestones
        }
        setProjects(projects.map(p => p.id === parsed.id ? parsed : p))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSelectedProject(null)
    }
  }

  const toggleMilestone = async (pId, mIdx) => {
    const project = projects.find(p => p.id === pId)
    if (!project) return

    const newMilestones = [...project.milestones]
    newMilestones[mIdx].done = !newMilestones[mIdx].done

    const doneCount = newMilestones.filter(m => m.done).length
    const totalCount = newMilestones.length
    const progress = Math.round((doneCount / totalCount) * 100)

    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/projects/${pId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          milestones: JSON.stringify(newMilestones),
          progress
        })
      })
      if (response.ok) {
        setProjects(projects.map(p => p.id === pId ? { ...p, milestones: newMilestones, progress } : p))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getPaymentBadge = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      case 'Partial': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      case 'Unpaid': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      default: return 'bg-slate-500/10 text-slate-400'
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Active Projects</h1>
          <p className="text-slate-500 text-xs mt-1">Track codebase assembly progress and milestone fulfillment.</p>
        </div>
      </div>

      {/* Grid of Projects */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading project logs...</p>
      ) : projects.length === 0 ? (
        <p className="text-slate-400 text-sm">No active projects found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="dash-card flex flex-col justify-between hover:border-brand-primary/10 transition-colors">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-primary">{project.type}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{project.title}</h3>
                  </div>
                  <span className={`badge ${getPaymentBadge(project.payment_status)}`}>
                    {project.payment_status}
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-400 border-b border-white/5 pb-4">
                  <div className="flex justify-between">
                    <span>Client:</span> <span className="font-semibold text-white">{project.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Developer:</span> <span className="font-semibold text-white">{project.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deadline:</span> <span className="font-semibold text-rose-400">{project.deadline}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400">Progress:</span>
                    <span className="text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="bg-brand-primary h-full rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Milestones Checklists */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Milestones Tracker</span>
                  {project.milestones.map((m, idx) => (
                    <label key={idx} className="flex items-center space-x-3 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={m.done}
                        onChange={() => toggleMilestone(project.id, idx)}
                        className="w-3.5 h-3.5 rounded border-white/10 bg-slate-950 text-brand-primary focus:ring-brand-primary cursor-pointer"
                      />
                      <span className={m.done ? 'line-through text-slate-500' : ''}>{m.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-grow btn-secondary py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <FiEdit2 size={12} /> Configure
                </button>
                {project.project_url && (
                  <a
                    href={project.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow btn-primary bg-emerald-600 hover:bg-emerald-500 border-transparent text-white py-2.5 text-xs flex items-center justify-center gap-2"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Project Controls</h3>
                <p className="text-xs text-slate-500">{selectedProject.title}</p>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Assigned Developer</label>
                  <input
                    type="text"
                    value={selectedProject.developer}
                    onChange={(e) => setSelectedProject({ ...selectedProject, developer: e.target.value })}
                    className="dash-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Project Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedProject.progress}
                    onChange={(e) => setSelectedProject({ ...selectedProject, progress: parseInt(e.target.value) || 0 })}
                    className="dash-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Billing State</label>
                  <select
                    value={selectedProject.payment_status}
                    onChange={(e) => setSelectedProject({ ...selectedProject, payment_status: e.target.value })}
                    className="dash-input"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Deadline Date</label>
                  <input
                    type="text"
                    value={selectedProject.deadline}
                    onChange={(e) => setSelectedProject({ ...selectedProject, deadline: e.target.value })}
                    className="dash-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Project URL / Website</label>
                <input
                  type="text"
                  value={selectedProject.project_url || ''}
                  onChange={(e) => setSelectedProject({ ...selectedProject, project_url: e.target.value })}
                  placeholder="https://example.com"
                  className="dash-input"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-white/5">
              <button
                onClick={() => handleUpdateProject(selectedProject)}
                className="btn-primary flex-grow py-3"
              >
                <FiCheck size={16} /> Save Settings
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-secondary py-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
