import { ShieldCheck, Activity, Globe, Clock, Server, CheckCircle } from 'lucide-react'

interface DummyPost {
  userId: number
  id: number
  title: string
  body: string
}

// Async React Server Component (No useState, No useEffect, pure Server Component fetch)
export default async function HealthCheckPage() {
  const startTime = Date.now()
  let post: DummyPost | null = null
  let status: 'healthy' | 'degraded' | 'failed' = 'healthy'
  let statusCode = 200
  let latency = 0
  let errorMessage: string | null = null

  try {
    // Native fetch with Next.js no-store cache to get live server data on every request
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      cache: 'no-store',
    })

    latency = Date.now() - startTime
    statusCode = response.status

    if (!response.ok) {
      status = 'failed'
      errorMessage = `HTTP error status ${response.status}`
    } else {
      post = (await response.json()) as DummyPost
    }
  } catch (err) {
    status = 'failed'
    latency = Date.now() - startTime
    errorMessage = err instanceof Error ? err.message : 'Unknown network error'
  }

  const timestamp = new Date().toISOString()

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 dark:bg-accent-950/60 text-accent-700 dark:text-accent-300">
          <Activity className="w-3.5 h-3.5 animate-pulse text-accent-600" />
          Live Server Diagnostics
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-secondary-900 dark:text-white">
          System Health Check
        </h1>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          Executed via an <span className="font-semibold text-primary-600 dark:text-primary-400">Async React Server Component</span>. Data is fetched on the server using native <code className="font-mono text-xs bg-secondary-100 dark:bg-secondary-800 px-1.5 py-0.5 rounded">fetch</code> without any client hooks (<code className="font-mono text-xs bg-secondary-100 dark:bg-secondary-800 px-1.5 py-0.5 rounded">useEffect</code> or <code className="font-mono text-xs bg-secondary-100 dark:bg-secondary-800 px-1.5 py-0.5 rounded">useState</code>).
        </p>
      </div>

      {/* Health Overview Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              status === 'healthy'
                ? 'bg-accent-100 dark:bg-accent-950/60 text-accent-600'
                : 'bg-red-100 dark:bg-red-950/60 text-red-600'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-secondary-500">Overall Status</div>
              <div className="text-xl font-bold text-secondary-900 dark:text-white flex items-center gap-2">
                {status === 'healthy' ? 'All Systems Operational' : 'Degraded Performance'}
                <span className="w-2.5 h-2.5 rounded-full bg-accent-500 animate-ping" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-secondary-600 dark:text-secondary-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-secondary-400" />
              <span>Latency: <strong className="text-secondary-900 dark:text-white">{latency}ms</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Server className="w-4 h-4 text-secondary-400" />
              <span>Code: <strong className="text-secondary-900 dark:text-white">{statusCode}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-secondary-500 uppercase">Upstream API</div>
          <div className="text-base font-bold text-secondary-900 dark:text-white flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-primary-500" />
            JSONPlaceholder
          </div>
          <div className="text-xs text-accent-600 font-medium">Public Mock Endpoint</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-secondary-500 uppercase">Rendering Mode</div>
          <div className="text-base font-bold text-secondary-900 dark:text-white flex items-center gap-1.5">
            <Server className="w-4 h-4 text-primary-500" />
            Async Server Component
          </div>
          <div className="text-xs text-primary-600 font-medium">No Client State / Hooks</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-secondary-500 uppercase">Timestamp</div>
          <div className="text-xs font-mono font-semibold text-secondary-900 dark:text-white truncate">
            {timestamp}
          </div>
          <div className="text-xs text-secondary-500">Server Time (UTC)</div>
        </div>
      </div>

      {/* Server Fetched Payload Display */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent-500" />
            Server Data Payload
          </h2>
          <span className="text-xs font-mono px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300">
            GET /posts/1
          </span>
        </div>

        {errorMessage ? (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm font-medium">
            {errorMessage}
          </div>
        ) : post ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary-50 dark:bg-secondary-800/40 border border-secondary-200 dark:border-secondary-700/50 space-y-2">
              <div className="text-xs uppercase tracking-wide font-semibold text-primary-600 dark:text-primary-400">
                Item Title (ID #{post.id})
              </div>
              <p className="text-base font-semibold text-secondary-900 dark:text-white capitalize">
                {post.title}
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed">
                {post.body}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold text-secondary-500 uppercase mb-2">Raw JSON Payload</div>
              <pre className="p-4 rounded-xl bg-secondary-950 text-secondary-200 font-mono text-xs overflow-x-auto border border-secondary-800">
                {JSON.stringify(post, null, 2)}
              </pre>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
