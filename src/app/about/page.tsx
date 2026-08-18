import { Info, Code, ShieldCheck, Check } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary-100 dark:bg-secondary-800 text-secondary-800 dark:text-secondary-200">
          <Info className="w-3.5 h-3.5" />
          Overview
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-secondary-900 dark:text-white">
          About FlyRank Platform
        </h1>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          A modern Next.js App Router architecture leveraging React Server Components, customized Tailwind CSS tokens, and cloud deployment ready.
        </p>
      </div>

      {/* Architecture Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-950/60 text-primary-600 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Tech Stack</h2>
          </div>
          <ul className="space-y-2.5 text-sm text-secondary-600 dark:text-secondary-300">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>Next.js App Router</strong> for declarative routing</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>React Server Components</strong> for zero-bundle data rendering</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>Tailwind CSS</strong> with custom design tokens</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>TypeScript</strong> with strict compiler checks</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-100 dark:bg-accent-950/60 text-accent-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Design Criteria</h2>
          </div>
          <ul className="space-y-2.5 text-sm text-secondary-600 dark:text-secondary-300">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>Mobile target:</strong> 375px viewport optimized</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>Desktop target:</strong> 1280px maximum container</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>Server-first:</strong> Client components only when required</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-accent-500" />
              <span><strong>Zero config:</strong> Instant Vercel/Netlify deployment</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
