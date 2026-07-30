import { useState, useEffect } from 'react'
import { FiEdit2, FiCheck, FiX, FiUsers } from 'react-icons/fi'

export default function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)
  
  // Developer assignment lists
  const developers = ['Harish Kumar', 'Anjali Sharma', 'Thomas Mercer', 'Sanjay Patel']

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        const response = await fetch(`${currentApiUrl}/api/quotes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setLeads(data)
        } else {
          throw new Error('API server offline or invalid response')
        }
      } catch (err) {
        console.error(err)
        setLeads([])
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  const handleUpdateLead = async (updatedLead) => {
    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/quotes/${updatedLead.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: updatedLead.status,
          assigned_developer: updatedLead.assigned_developer,
          notes: updatedLead.notes
        })
      })
      if (response.ok) {
        const data = await response.json()
        setLeads(leads.map(l => l.id === data.id ? data : l))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSelectedLead(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
      case 'Contacted': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      case 'In Progress': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      case 'Closed': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
      default: return 'bg-slate-500/10 text-slate-400'
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads & Inquiries</h1>
          <p className="text-slate-500 text-xs mt-1">Manage quote proposals and customer consultations.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400 text-sm">Loading lead records...</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer / Company</th>
                <th>Service Type</th>
                <th>Business Type</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Assigned Dev</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td>
                    <div>
                      <h4 className="font-bold text-white">{lead.name}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{lead.company || 'Individual'}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{lead.email} | {lead.phone}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs font-medium text-slate-300">{lead.service_type}</span>
                  </td>
                  <td>
                    <span className="text-xs text-slate-400">{lead.business_type}</span>
                  </td>
                  <td>
                    <span className="text-xs font-semibold text-white">{lead.budget}</span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-brand-primary font-medium">{lead.assigned_developer}</span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-white/5 transition-colors"
                      title="Edit Lead Details"
                    >
                      <FiEdit2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assignment & Edit Popup Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Modify Inquiry</h3>
                <p className="text-xs text-slate-500">{selectedLead.company || 'Individual'}</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Lead Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => setSelectedLead({ ...selectedLead, status: e.target.value })}
                  className="dash-input"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Assign Developer</label>
                <select
                  value={selectedLead.assigned_developer}
                  onChange={(e) => setSelectedLead({ ...selectedLead, assigned_developer: e.target.value })}
                  className="dash-input"
                >
                  <option value="Unassigned">Unassigned</option>
                  {developers.map((dev) => (
                    <option key={dev} value={dev}>{dev}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Internal Notes</label>
                <textarea
                  value={selectedLead.notes}
                  onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                  rows="3"
                  className="dash-input resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-white/5">
              <button
                onClick={() => handleUpdateLead(selectedLead)}
                className="btn-primary flex-grow py-3"
              >
                <FiCheck size={16} /> Save Changes
              </button>
              <button
                onClick={() => setSelectedLead(null)}
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
