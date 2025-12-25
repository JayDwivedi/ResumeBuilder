'use client'

import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900">ResumeAI</h3>
            <p className="mt-2 text-sm text-gray-600">
              Build beautiful, professional resumes with modern design and AI-powered features.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li><a href="/" className="hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="/builder" className="hover:text-blue-600 transition-colors">Builder</a></li>
              <li><a href="/preview" className="hover:text-blue-600 transition-colors">Preview</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-gray-900">Follow</h4>
            <div className="mt-2 flex gap-3">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2025 ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
