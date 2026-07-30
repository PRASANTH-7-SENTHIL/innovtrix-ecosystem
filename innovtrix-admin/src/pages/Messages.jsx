import { useState, useEffect } from 'react'
import { FiMail, FiCheck, FiX, FiTrash2, FiBriefcase } from 'react-icons/fi'
import { adminApiFetch } from '../utils/api'

export default function Messages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const response = await adminApiFetch('/api/contact', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setMessages(data)
        }
      } catch (err) {
        console.error(err)
        setMessages([])
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  const handleConvertToActiveProject = async (msg) => {
    try {
      const token = localStorage.getItem('admin_token')

      const msgText = msg.message || ''
      const companyMatch = msgText.match(/Company:\s*(.+)/i)
      const serviceMatch = msgText.match(/Service Required:\s*(.+)/i)
      const budgetMatch = msgText.match(/Estimated Budget:\s*(.+)/i)

      const companyName = companyMatch ? companyMatch[1].trim() : 'N/A'
      const serviceType = serviceMatch ? serviceMatch[1].trim() : 'Business & Commercial Websites'
      const budgetVal = budgetMatch ? budgetMatch[1].trim() : '₹5,000 - ₹10,000'

      // 1. Post to Leads & Inquiries (/api/quotes)
      const quoteReq = adminApiFetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: msg.name,
          email: msg.email,
          phone: msg.phone || '',
          company: companyName,
          business_type: 'General',
          service_type: serviceType,
          budget: budgetVal,
          details: msg.message
        })
      })

      // 2. Post to Active Projects (/api/projects)
      const projectReq = adminApiFetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: `${msg.name} - ${serviceType}`,
          project_type: serviceType,
          client: msg.name,
          description: msg.message,
          status: 'Discovery',
          progress: 0,
          developer_assigned: 'Unassigned',
          payment_status: 'Unpaid'
        })
      })

      // 3. Update Message Status
      const statusReq = adminApiFetch(`/api/contact/${msg.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Active Project' })
      })

      await Promise.allSettled([quoteReq, projectReq, statusReq])

      setMessages(messages.map(m => m.id === msg.id ? { ...m, status: 'Active Project' } : m))
      setSuccess('Project successfully sent to Leads & Inquiries and Active Projects!')
      setTimeout(() => setSuccess(''), 4000)
    } catch (err) {
      console.error('Failed to convert inquiry to active project:', err)
    } finally {
      setSelectedMsg(null)
    }
  }

  const handleMarkReplied = async (mId) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await adminApiFetch(`/api/contact/${mId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Replied' })
      })
      if (response.ok) {
        setMessages(messages.map(m => m.id === mId ? { ...m, status: 'Replied' } : m))
      }
    } catch (err) {
      console.error('Failed to update message status:', err)
    } finally {
      setSelectedMsg(null)
    }
  }

  const handleDeleteMsg = async (mId) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await adminApiFetch(`/api/contact/${mId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== mId))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSelectedMsg(null)
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Client Messages</h1>
          <p className="text-slate-500 text-xs mt-1">Review contact form inquiries received from public users.</p>
        </div>
      </div>

      {/* Notifications */}
      {success && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider animate-pulse">
          <FiCheck /> {success}
        </div>
      )}

      {/* Messages List Table */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading message log...</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Inquiry Snippet</th>
                <th>Received Date</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                  <td>
                    <div>
                      <h4 className="font-bold text-white text-sm">{msg.name}</h4>
                      <p className="text-[10px] text-slate-500">{msg.email} | {msg.phone}</p>
                    </div>
                  </td>
                  <td className="text-xs text-slate-300 font-semibold">{msg.subject}</td>
                  <td className="text-xs text-slate-400 max-w-xs truncate">{msg.message}</td>
                  <td className="text-xs text-slate-400">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </td>
                  <td>
                    <span className={`badge ${
                      msg.status === 'Active Project'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold'
                        : msg.status === 'Unread' 
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setSelectedMsg(msg)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-white/5 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Message Reader Modal popup */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Client Inquiry</h3>
                <p className="text-xs text-slate-500">
                  {selectedMsg.name} | {selectedMsg.created_at ? new Date(selectedMsg.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                </p>
              </div>
              <button 
                onClick={() => setSelectedMsg(null)}
                className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-xs text-slate-400 space-y-1">
                <p><strong>Email:</strong> {selectedMsg.email}</p>
                {selectedMsg.phone && <p><strong>Phone:</strong> {selectedMsg.phone}</p>}
                <p><strong>Subject:</strong> {selectedMsg.subject}</p>
              </div>

              <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => handleConvertToActiveProject(selectedMsg)}
                className="btn-primary flex-grow py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <FiBriefcase size={16} /> Active Project
              </button>
              <button
                onClick={() => handleMarkReplied(selectedMsg.id)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-white/5 transition-all text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FiCheck size={16} /> Mark Replied
              </button>
              <button
                onClick={() => handleDeleteMsg(selectedMsg.id)}
                className="p-3 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl border border-rose-500/20 transition-all flex items-center justify-center cursor-pointer"
                title="Delete Inquiry"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
