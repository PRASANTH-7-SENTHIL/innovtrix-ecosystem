import { useState, useEffect } from 'react'
import { FiEdit2, FiCheck, FiX, FiShoppingBag } from 'react-icons/fi'

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        const response = await fetch(`${currentApiUrl}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          const mapped = data.map(o => ({
            id: o.id,
            client_name: o.client_name || 'Individual Client',
            service_type: o.service_type,
            budget: o.budget || 'TBD',
            status: o.status,
            date: new Date(o.created_at).toLocaleDateString(),
            specifications: o.details || ''
          }))
          setOrders(mapped)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleUpdateStatus = async (updatedOrder) => {
    try {
      const token = localStorage.getItem('admin_token')
      const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
      const response = await fetch(`${currentApiUrl}/api/orders/${updatedOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: updatedOrder.status,
          details: updatedOrder.specifications
        })
      })
      if (response.ok) {
        const data = await response.json()
        const mappedOrder = {
          id: data.id,
          client_name: data.client_name || updatedOrder.client_name,
          service_type: data.service_type || updatedOrder.service_type,
          budget: data.budget || updatedOrder.budget,
          status: data.status,
          date: new Date(data.created_at).toLocaleDateString(),
          specifications: data.details || ''
        }
        setOrders(orders.map(o => o.id === data.id ? mappedOrder : o))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSelectedOrder(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Configuration': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      case 'In Progress': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
      case 'Active / Completed': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      default: return 'bg-slate-500/10 text-slate-400'
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Module Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Website Orders</h1>
          <p className="text-slate-500 text-xs mt-1">Review website requests, setup scopes, and payment agreements.</p>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <p className="text-slate-400 text-sm">Loading orders list...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-400 text-sm">No website orders configured yet.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client / Company</th>
                <th>Website Type</th>
                <th>Budget Value</th>
                <th>Submission Date</th>
                <th>Configuration Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="font-bold text-white text-xs">{order.id}</td>
                  <td>
                    <div>
                      <h4 className="font-bold text-white text-sm">{order.client_name}</h4>
                    </div>
                  </td>
                  <td className="text-xs text-slate-300">{order.service_type}</td>
                  <td className="text-xs font-semibold text-white">{order.budget}</td>
                  <td className="text-xs text-slate-400">{order.date}</td>
                  <td>
                    <span className={`badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-white/5 transition-colors"
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

      {/* Modify Specifications Popup Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Review Website Order</h3>
                <p className="text-xs text-slate-500">{selectedOrder.id} - {selectedOrder.client_name}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5 rounded-xl transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Build Configuration State</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
                  className="dash-input"
                >
                  <option value="Pending Configuration">Pending Configuration</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Active / Completed">Active / Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Client Specifications Summary</label>
                <textarea
                  value={selectedOrder.specifications}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, specifications: e.target.value })}
                  rows="4"
                  className="dash-input resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-white/5">
              <button
                onClick={() => handleUpdateStatus(selectedOrder)}
                className="btn-primary flex-grow py-3"
              >
                <FiCheck size={16} /> Save Changes
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
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
