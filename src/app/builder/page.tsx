"use client"
import { useEffect, useState } from 'react'
import { ResumeForm } from '@/components/ResumeForm'
import { ResumeView } from '@/components/ResumeView'
import { Resume, ResumeSchema } from '@/lib/schema'
import { localStorageOnly } from '@/lib/storage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Loader } from '@/components/ui/Loader'
import { Toast } from '@/components/ui/Toast'
import { Download, FileText } from 'lucide-react'

async function download(path: string, data: Resume, filename: string) {
  const res = await fetch(path, { method: 'POST', body: JSON.stringify(data) })
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function BuilderPage() {
  const [initial, setInitial] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    const loadResume = async () => {
      try {
        const data = localStorageOnly.get<Resume>('resume-builder:data')
        setInitial(data)
      } finally {
        setLoading(false)
      }
    }
    loadResume()
  }, [])

  const handleExport = async (fmt: 'pdf' | 'docx') => {
    const data = localStorageOnly.get<Resume>('resume-builder:data')
    if (!data) {
      setToast({ type: 'error', message: 'No resume data to export' })
      return
    }
    
    const parsed = ResumeSchema.safeParse(data)
    if (!parsed.success) {
      setToast({ type: 'error', message: 'Please complete required fields before exporting' })
      return
    }
    
    setExporting(true)
    try {
      await download(`/api/export/${fmt}`, parsed.data, `resume.${fmt}`)
      setToast({ type: 'success', message: `Resume exported as ${fmt.toUpperCase()}` })
    } catch {
      setToast({ type: 'error', message: `Failed to export ${fmt.toUpperCase()}` })
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader message="Loading your resume..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Resume Builder</h1>
          <p className="mt-2 text-gray-600">Edit your resume and see live preview</p>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-6">
            <Card variant="elevated">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Resume</h2>
                <p className="mt-1 text-sm text-gray-600">Update your information in real-time</p>
              </div>
              <div className="mt-6">
                {initial && <ResumeForm initial={initial} onChange={setInitial} />}
              </div>
            </Card>

            {/* Export Buttons */}
            <Card variant="elevated" className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900">Export Resume</h3>
                <p className="mt-1 text-sm text-gray-600">Download in your preferred format</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleExport('pdf')}
                  disabled={exporting}
                  className="flex-1"
                >
                  <Download className="h-4 w-4" />
                  {exporting ? 'Exporting...' : 'Export as PDF'}
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleExport('docx')}
                  disabled={exporting}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4" />
                  {exporting ? 'Exporting...' : 'Export as DOCX'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="sticky top-6 space-y-6">
            <Card variant="elevated">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
                <p className="mt-1 text-sm text-gray-600">See changes in real-time</p>
              </div>
              <div className="mt-6 overflow-auto max-h-[calc(100vh-300px)]">
                {initial ? (
                  <ResumeView data={initial} />
                ) : (
                  <div className="flex items-center justify-center rounded-lg bg-gray-50 p-12 text-center">
                    <div>
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-4 text-gray-600">Fill the form to see live preview</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
