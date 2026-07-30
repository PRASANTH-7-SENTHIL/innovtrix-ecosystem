import { useState, useEffect } from 'react'

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        const response = await fetch(`${currentApiUrl}/api/payments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setPayments(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  return (
    <div className="space-y-8 font-sans">
      
      {/* Module Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Payment Transactions</h1>
        <p className="text-slate-500 text-xs mt-1">Audit trail of bank wires and API credit transactions.</p>
      </div>

      {/* Table grid */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading transactions...</p>
      ) : payments.length === 0 ? (
        <p className="text-slate-400 text-sm">No transaction records found.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Invoice Ref</th>
                <th>Amount Settled</th>
                <th>Payment Channel</th>
                <th>Clearance Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-white/5 transition-colors">
                  <td className="font-bold text-white text-xs">{pay.transaction_id || `TXN-${pay.id}`}</td>
                  <td className="text-xs text-slate-300 font-medium">{pay.invoice_number || 'N/A'}</td>
                  <td className="text-xs text-emerald-400 font-semibold">{pay.amount}</td>
                  <td className="text-xs text-slate-400">{pay.payment_method || 'Online'}</td>
                  <td className="text-xs text-slate-400">{new Date(pay.created_at).toLocaleDateString()}</td>
                  <td>
                    <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}
