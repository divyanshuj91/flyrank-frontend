import { LayoutDashboard, TrendingUp, Users, Zap, CheckCircle2 } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { title: 'Server Status', value: 'Operational', change: '100% uptime', icon: Zap, color: 'text-accent-600 bg-accent-50 dark:bg-accent-950/60' },
    { title: 'Data Pipeline', value: 'Active', change: 'Direct fetch', icon: TrendingUp, color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/60' },
    { title: 'Active Endpoints', value: '4 Routes', change: 'App Router', icon: LayoutDashboard, color: 'text-secondary-600 bg-secondary-100 dark:bg-secondary-800' },
    { title: 'Client Bundles', value: 'Minimal', change: 'RSC enabled', icon: Users, color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/60' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 mb-2">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Management Console
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-secondary-900 dark:text-white">
            System Dashboard
          </h1>
        </div>
      </div>

      {/* Stat Cards Grid (Mobile 375px: 1 col, sm: 2 cols, lg: 4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary-500 dark:text-secondary-400">{stat.title}</span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-accent-600 dark:text-accent-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* System Information Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Active Service Nodes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-secondary-600 dark:text-secondary-300">
            <thead className="text-xs uppercase bg-secondary-50 dark:bg-secondary-800/60 text-secondary-500">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Route</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Viewport Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100 dark:divide-secondary-800">
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary-900 dark:text-white">/</td>
                <td className="px-4 py-3">Server Component</td>
                <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-950 dark:text-accent-300">Active</span></td>
                <td className="px-4 py-3 text-xs">375px - 1280px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary-900 dark:text-white">/about</td>
                <td className="px-4 py-3">Server Component</td>
                <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-950 dark:text-accent-300">Active</span></td>
                <td className="px-4 py-3 text-xs">375px - 1280px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary-900 dark:text-white">/dashboard</td>
                <td className="px-4 py-3">Server Component</td>
                <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-950 dark:text-accent-300">Active</span></td>
                <td className="px-4 py-3 text-xs">375px - 1280px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-secondary-900 dark:text-white">/health-check</td>
                <td className="px-4 py-3">Async Server Component</td>
                <td className="px-4 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-950 dark:text-accent-300">Active</span></td>
                <td className="px-4 py-3 text-xs">375px - 1280px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
