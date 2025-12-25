"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { ResumeSchema, type Resume } from '@/lib/schema'
import { Upload, Sparkles, Download, FileCode2 } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'failure'>('idle')
  const [uploadMessage, setUploadMessage] = useState<string>('')

  const handlePickFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
    // Reset so same file can be re-uploaded
    e.target.value = ''
  }

  const handleUpload = async (file: File) => {
    setError(null)
    setUploading(true)
    try {
      const text = await file.text()
      const json = JSON.parse(text)
      const parsed = ResumeSchema.parse(json) as Resume
      const { storage } = await import('@/lib/storage')
      await storage.set<Resume>('resume-builder:data', parsed)
      setUploadStatus('success')
      setUploadMessage('File uploaded successfully! Redirecting to preview...')
      setUploading(false)
      setTimeout(() => router.push('/preview?uploaded=1'), 2000)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON data'
      setUploadStatus('failure')
      setUploadMessage(`Upload failed: ${msg}`)
      setUploading(false)
    }
  }

  const closeModal = () => {
    setUploadStatus('idle')
    setUploadMessage('')
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-lg animate-[glow_6s_ease-in-out_infinite]">
        <div className="relative z-10 grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Build Your Resume, Fast.</h1>
            <p className="mt-3 max-w-2xl text-blue-100">
              Upload a JSON file to instantly generate a beautiful resume. Edit in the builder, then export to PDF or DOCX.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/builder" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-white/20 transition-colors">
                <Sparkles className="h-5 w-5" /> Open Builder
              </Link>
              <Link href="/preview" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-blue-700 shadow hover:bg-blue-50 transition-colors">
                <FileCode2 className="h-5 w-5" /> Preview Template
              </Link>
              <a href="/sample-resume.json" download className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-white/20 transition-colors">
                <Download className="h-5 w-5" /> Download Sample JSON
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-xl bg-white/10 p-4 text-sm text-blue-100 ring-1 ring-white/20 animate-[float_6s_ease-in-out_infinite]">
              <p className="font-semibold">How it works</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4">
                <li>Download the sample JSON</li>
                <li>Customize your details</li>
                <li>Upload to generate resume</li>
                <li>Edit and export</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      </section>

      {/* Upload Card */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-2 text-xl font-semibold">Generate from JSON</h2>
          <p className="text-sm text-gray-600">Upload a JSON file that matches our schema to auto-fill your resume.</p>

          <div
            className="mt-5 dropzone hover:border-blue-300 transition-colors cursor-pointer"
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.classList.add('border-blue-400', 'bg-blue-50')
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
              const file = e.dataTransfer.files?.[0]
              if (file && (file.type === 'application/json' || file.name.endsWith('.json'))) {
                handleUpload(file)
              } else {
                setUploadStatus('failure')
                setUploadMessage('Please upload a valid JSON file')
              }
            }}
          >
            <div>
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Drag and drop your JSON here</p>
              <p className="text-xs text-gray-500">or</p>
              <button
                onClick={handlePickFile}
                className="mt-2 btn-primary"
                disabled={uploading}
                type="button"
              >
                {uploading ? 'Uploading…' : 'Choose File'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          {error && (
            <div className="mt-3 rounded-lg bg-red-50 p-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-1 text-xs text-red-600 underline hover:text-red-700"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="mb-2 text-xl font-semibold">Get Started</h2>
          <p className="text-sm text-gray-600">Prefer editing manually? Jump into the builder or preview the layout first.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/builder" className="btn-primary">Start Building</Link>
            <Link href="/preview" className="btn-secondary">Preview Template</Link>
          </div>
        </div>
      </section>

      {/* Upload Status Modal */}
      {uploadStatus !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`rounded-lg p-8 shadow-2xl max-w-md w-full mx-4 ${
            uploadStatus === 'success' ? 'bg-white' : 'bg-white'
          }`}>
            <div className="flex items-center justify-center mb-4">
              {uploadStatus === 'success' ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className={`mb-2 text-center text-xl font-bold ${
              uploadStatus === 'success' ? 'text-green-900' : 'text-red-900'
            }`}>
              {uploadStatus === 'success' ? 'Upload Successful!' : 'Upload Failed'}
            </h3>
            <p className={`mb-6 text-center text-sm ${
              uploadStatus === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {uploadMessage}
            </p>
            <div className="flex gap-3">
              {uploadStatus === 'failure' && (
                <button
                  onClick={closeModal}
                  className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Try Again
                </button>
              )}
              {uploadStatus === 'success' && (
                <button
                  onClick={() => router.push('/preview?uploaded=1')}
                  className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                >
                  Go to Preview
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
