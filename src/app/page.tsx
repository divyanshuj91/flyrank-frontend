import Link from 'next/link'
import { ArrowRight, Layers, Cpu, Globe, CheckCircle2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800">
          <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
          Next.js App Router Architecture
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-secondary-900 dark:text-white max-w-3xl mx-auto leading-tight">
          Next-Generation Frontend with{' '}
          <span className="text-primary-600">React Server Components</span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
          Fully responsive from <span className="font-semibold text-secondary-900 dark:text-white">375px mobile viewports</span> up to <span className="font-semibold text-secondary-900 dark:text-white">1280px desktop screens</span>, built with custom Tailwind design tokens.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/20 transition-all hover:scale-[1.02]"
          >
            Explore Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/health-check"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 border border-secondary-200 dark:border-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
          >
            Run Health Check
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Server Components</h2>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Zero client-side JS bundle overhead for rendering views, ensuring instant page loads.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm hover:shadow-md transition-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/60 text-accent-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Custom Design Tokens</h2>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Fine-tuned Tailwind tokens for primary, secondary, and accent palettes plus custom scale spacing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 shadow-sm hover:shadow-md transition-shadow space-y-3 sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-secondary-900 dark:text-white">Strict Responsiveness</h2>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Tested and optimized for tight 375px mobile screens up to expansive 1280px desktop displays.
          </p>
        </div>
      </section>

      {/* Quick Checklist */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-900/40 border border-primary-100 dark:border-primary-900/30">
        <h2 className="text-base font-bold text-secondary-900 dark:text-white mb-4">Architecture Highlights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-secondary-700 dark:text-secondary-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-600 flex-shrink-0" />
            <span>Next.js App Router (File-based routing)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-600 flex-shrink-0" />
            <span>Strict TypeScript compilation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-600 flex-shrink-0" />
            <span>Async Server Components for Data Fetching</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent-600 flex-shrink-0" />
            <span>Zero leaked environment variables</span>
          </div>
        </div>
      </section>
    </div>
  )
}
