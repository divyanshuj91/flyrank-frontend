import Link from 'next/link'
import NavbarMobileMenu from './NavbarMobileMenu'
import { Activity, ShieldCheck } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Health Check', href: '/health-check' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-secondary-200 dark:border-secondary-800 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md">
      <div className="app-container flex h-16 items-center justify-between">
        {/* Brand Logo / Home link */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-md group-hover:bg-primary-700 transition-all">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-secondary-900 dark:text-white">
            Fly<span className="text-primary-600">Rank</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/health-check"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-accent-50 text-accent-700 border border-accent-200 dark:bg-accent-950/40 dark:text-accent-300 dark:border-accent-800/60 hover:bg-accent-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Status
          </Link>

          {/* Mobile menu toggle (Client Component) */}
          <NavbarMobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  )
}
