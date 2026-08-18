import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlyRank — Next.js Foundation',
  description: 'Production-ready Next.js App Router application with responsive layout and Server Components.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-secondary-50 text-secondary-900 dark:bg-secondary-950 dark:text-secondary-100 antialiased selection:bg-primary-500 selection:text-white">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 app-container py-8 sm:py-10 lg:py-12">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 py-6 text-center text-xs text-secondary-500">
          <div className="app-container flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} FlyRank Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs font-medium text-secondary-600 dark:text-secondary-400">
              <span>Next.js App Router</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Server Components</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
