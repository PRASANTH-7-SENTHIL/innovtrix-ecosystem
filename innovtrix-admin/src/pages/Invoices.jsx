import { useState, useEffect } from 'react'
import { FiPlus, FiFileText, FiCheck, FiX } from 'react-icons/fi'

export default function Invoices() {
  const [showGenModal, setShowGenModal] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    invoice_number: 'INV-1092',
    client_name: '',
    project_title: '',
    amount: '',
    due_date: 'July 10, 2026',
    status: 'Unpaid'
  })

  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        const response = await fetch(`${currentApiUrl}/api/invoices`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setInvoices(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, [])

  const handleCreateInvoice = async (e) => {
    e.preventDefault()
    if (!newInvoice.client_name || !newInvoice.amount) return

    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          invoice_number: newInvoice.invoice_number,
          client_name: newInvoice.client_name,
          project_title: newInvoice.project_title,
          amount: newInvoice.amount,
          due_date: newInvoice.due_date,
          status: newInvoice.status
        })
      })
      if (response.ok) {
        const data = await response.json()
        setInvoices([data, ...invoices])
        setShowGenModal(false)
        setNewInvoice({
          invoice_number: 'INV-' + Math.floor(1000 + Math.random() * 9000),
          client_name: '',
          project_title: '',
          amount: '',
          due_date: 'July 10, 2026',
          status: 'Unpaid'
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      case 'Unpaid': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
      default: return 'bg-slate-500/10 text-slate-400'
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-slate-500 text-xs mt-1">Generate invoices and track client payment deadlines.</p>
        </div>
        <button
          onClick={() => setShowGenModal(true)}
          className="btn-primary"
        >
          <FiPlus size={16} /> Generate Invoice
        </button>
      </div>

      {/* Invoices List Table */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading invoice logs...</p>
      ) : invoices.length === 0 ? (
        <p className="text-slate-400 text-sm">No invoices issued yet.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Project Title</th>
                <th>Due Date</th>
                <th>Invoice Total</th>
                <th>Billing Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                  <td className="font-bold text-white text-xs">{inv.invoice_number}</td>
                  <td>
                    <span className="text-sm font-semibold text-white">{inv.client_name}</span>
                  </td>
                  <td className="text-xs text-slate-400">{inv.project_title}</td>
                  <td className="text-xs text-slate-400">{inv.due_date}</td>
                  <td className="text-xs font-semibold text-white">{inv.amount}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Generate Invoice Modal popup */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleCreateInvoice} className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Generate Client Invoice</h3>
                <p className="text-xs text-slate-500">Auto-filled: {newInvoice.invoice_number}</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowGenModal(false)}
                className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vogue Silk Textiles"
                  value={newInvoice.client_name}
                  onChange={(e) => setNewInvoice({ ...newInvoice, client_name: e.target.value })}
                  className="dash-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silk & Thread B2B Storefront"
                  value={newInvoice.project_title}
                  onChange={(e) => setNewInvoice({ ...newInvoice, project_title: e.target.value })}
                  className="dash-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Invoice Amount ($)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $4,500"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                    className="dash-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Due Date</label>
                  <input
                    type="text"
                    value={newInvoice.due_date}
                    onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
                    className="dash-input"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-white/5">
              <button
                type="submit"
                className="btn-primary flex-grow py-3"
              >
                <FiCheck size={16} /> Generate Invoice
              </button>
              <button
                type="button"
                onClick={() => setShowGenModal(false)}
                className="btn-secondary py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}
