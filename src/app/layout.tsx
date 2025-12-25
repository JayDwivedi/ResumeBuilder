import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResumeAI - Build Your Professional Resume',
  description: 'Create a beautiful, professional resume with modern design and AI-powered features. Export to PDF or DOCX.',
  keywords: 'resume builder, resume creator, professional resume, CV builder',
  openGraph: {
    title: 'ResumeAI - Build Your Professional Resume',
    description: 'Create a beautiful, professional resume with modern design and AI-powered features.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased bg-white flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
