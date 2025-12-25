'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Home, Edit3 } from 'lucide-react'

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: '/' as const, label: 'Home', icon: Home },
    { href: '/builder' as const, label: 'Builder', icon: Edit3 },
    { href: '/preview' as const, label: 'Preview', icon: FileText },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-gray-900">ResumeAI</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                pathname === href
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
