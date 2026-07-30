import { useState, useEffect } from 'react'
import { FiUsers, FiShoppingBag, FiLayers, FiDollarSign, FiActivity } from 'react-icons/fi'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    leads: 0,
    orders: 0,
    activeProjects: 0,
    revenue: '₹0'
  })

  const [recentLogs, setRecentLogs] = useState([])
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([0, 0, 0, 0, 0, 0])
  const [buildsDistribution, setBuildsDistribution] = useState([0, 0])
  const [monthLabels, setMonthLabels] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const headers = { 'Authorization': `Bearer ${token}` }
        const currentApiUrl = localStorage.getItem('backend_url') || import.meta.env.VITE_API_URL || 'https://innovtrix-ecosystem-nine.vercel.app'
        
        const [quotesRes, projectsRes, invoicesRes, paymentsRes] = await Promise.all([
          fetch(`${currentApiUrl}/api/quotes`, { headers }),
          fetch(`${currentApiUrl}/api/projects`, { headers }),
          fetch(`${currentApiUrl}/api/invoices`, { headers }),
          fetch(`${currentApiUrl}/api/payments`, { headers })
        ])

        const quotes = quotesRes.ok ? await quotesRes.json() : []
        const projects = projectsRes.ok ? await projectsRes.json() : []
        const invoices = invoicesRes.ok ? await invoicesRes.json() : []
        const payments = paymentsRes.ok ? await paymentsRes.json() : []

        // 1. Core counters
        const activeProjectsCount = projects.filter(p => p.status !== 'Completed' && p.status !== 'Closed').length
        let totalRevenue = 0
        payments.forEach(p => {
          const val = parseFloat(p.amount.replace(/[^0-9.]/g, '')) || 0
          totalRevenue += val
        })

        setStats({
          leads: quotes.length,
          orders: invoices.length,
          activeProjects: activeProjectsCount,
          revenue: `₹${totalRevenue.toLocaleString('en-IN')}`
        })

        // 2. Generate month labels for last 6 months
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const labels = []
        const currentMonth = new Date().getMonth()
        for (let i = 5; i >= 0; i--) {
          let idx = currentMonth - i
          if (idx < 0) idx += 12
          labels.push(months[idx])
        }
        setMonthLabels(labels)

        // Sum payment clearance values per month
        const monthlyData = [0, 0, 0, 0, 0, 0]
        payments.forEach(p => {
          const date = new Date(p.created_at || new Date())
          const mName = date.toLocaleDateString('en-US', { month: 'short' })
          const idx = labels.indexOf(mName)
          if (idx !== -1) {
            monthlyData[idx] += parseFloat(p.amount.replace(/[^0-9.]/g, '')) || 0
          }
        })
        setMonthlyRevenueData(monthlyData)

        // 3. Web build distributions
        let ecommerceCount = 0
        let commercialCount = 0
        projects.forEach(p => {
          const type = (p.project_type || '').toLowerCase()
          if (type.includes('e-commerce') || type.includes('store') || type.includes('shop')) {
            ecommerceCount++
          } else {
            commercialCount++
          }
        })
        setBuildsDistribution([ecommerceCount, commercialCount])

        // 4. Generate dynamic logs
        const logs = []
        payments.slice(0, 3).forEach((p, idx) => {
          logs.push({
            id: `pay-${idx}`,
            action: 'Payment Recorded',
            details: `Received payment of ${p.amount} via ${p.payment_method || 'Online'}`,
            time: new Date(p.created_at).toLocaleDateString()
          })
        })
        invoices.slice(0, 3).forEach((inv, idx) => {
          logs.push({
            id: `inv-${idx}`,
            action: 'Invoice Generated',
            details: `Issued invoice ${inv.invoice_number} to ${inv.client_name || 'Client'}`,
            time: new Date(inv.created_at).toLocaleDateString()
          })
        })
        projects.slice(0, 3).forEach((proj, idx) => {
          logs.push({
            id: `proj-${idx}`,
            action: 'Project Milestone',
            details: `Project "${proj.title}" progress set to ${proj.progress}%`,
            time: 'Active'
          })
        })
        setRecentLogs(logs.slice(0, 5))

      } catch (err) {
        console.error(err)
      }
    }
    fetchDashboardData()
  }, [])

  // Chart 1: Monthly Sales Graph (Bar)
  const salesData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Monthly Revenue (₹)',
        data: monthlyRevenueData,
        backgroundColor: 'rgba(255, 186, 0, 0.25)',
        borderColor: '#FFBA00',
        borderWidth: 1.5,
        borderRadius: 6
      }
    ]
  }

  // Chart 2: Customer Analytics / Web builds distribution (Doughnut)
  const distributionData = {
    labels: ['E-Commerce Websites', 'Commercial Websites'],
    datasets: [
      {
        data: buildsDistribution,
        backgroundColor: ['#FFBA00', '#FACC15'],
        borderWidth: 0
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#94A3B8',
          font: { family: 'Inter', size: 11 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94A3B8' }
      }
    }
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-500 text-xs mt-1">Real-time statistics for Innovtrix operations.</p>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900 border border-white/5 px-4 py-2 rounded-xl">
          Today's Date: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="dash-card flex items-center space-x-4">
          <div className="p-3 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-xl">
            <FiUsers size={22} />
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Today's Leads</span>
            <h3 className="text-2xl font-bold text-white mt-1">{stats.leads}</h3>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="dash-card flex items-center space-x-4">
          <div className="p-3 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 rounded-xl">
            <FiShoppingBag size={22} />
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Website Orders</span>
            <h3 className="text-2xl font-bold text-white mt-1">{stats.orders}</h3>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="dash-card flex items-center space-x-4">
          <div className="p-3 bg-white/5 text-white border border-white/10 rounded-xl">
            <FiLayers size={22} />
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Active Projects</span>
            <h3 className="text-2xl font-bold text-white mt-1">{stats.activeProjects}</h3>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="dash-card flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl">
            <FiDollarSign size={22} />
          </div>
          <div>
            <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Total Revenue</span>
            <h3 className="text-2xl font-bold text-white mt-1">{stats.revenue}</h3>
          </div>
        </div>
      </div>

      {/* Chart Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="dash-card lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue Growth</h3>
          <div className="h-64 flex items-center justify-center">
            <Bar data={salesData} options={chartOptions} />
          </div>
        </div>

        {/* Website types Doughnut */}
        <div className="dash-card space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Website Builds Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={distributionData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#94A3B8',
                    font: { family: 'Inter', size: 10 }
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Recent Activity Log Module */}
      <div className="dash-card space-y-4">
        <div className="flex items-center space-x-2 border-b border-white/5 pb-4">
          <FiActivity className="text-brand-primary text-lg" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Activity Logs</h3>
        </div>
        <div className="divide-y divide-white/5">
          {recentLogs.map((log) => (
            <div key={log.id} className="py-4 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-brand-primary uppercase mr-2">[{log.action}]</span>
                <span className="text-slate-300">{log.details}</span>
              </div>
              <span className="text-slate-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
