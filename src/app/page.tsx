"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ResumeSchema, type Resume } from '@/lib/schema'
import { Sparkles, Download, FileCode2, ArrowRight } from 'lucide-react'
import { localStorageOnly } from '@/lib/storage'
import { Button } from '@/components/ui/Button'
import { Card, CardBody, CardTitle } from '@/components/ui/Card'
import { FileUploadZone } from '@/components/FileUploadZone'
import { UploadModal, type UploadStatus } from '@/components/UploadModal'

export default function HomePage() {
  const router = useRouter()
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
  const [uploadMessage, setUploadMessage] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const handleUpload = async (file: File) => {
    // Validate file type
    if (!file.type.includes('json') && !file.name.endsWith('.json')) {
      setUploadStatus('failure')
      setUploadMessage('Please upload a valid JSON file')
      return
    }

    setUploadStatus('uploading')
    setUploadProgress(0)
    setUploadMessage('Reading file...')

    try {
      // Simulate file reading progress (0-20%)
      await new Promise(resolve => setTimeout(resolve, 300))
      setUploadProgress(20)
      
      const text = await file.text()
      
      // Simulate parsing progress (20-60%)
      setUploadProgress(40)
      setUploadMessage('Parsing JSON...')
      await new Promise(resolve => setTimeout(resolve, 200))
      
      const json = JSON.parse(text)
      setUploadProgress(60)
      setUploadMessage('Validating data...')
      
      // Simulate validation progress (60-85%)
      await new Promise(resolve => setTimeout(resolve, 150))
      const parsed = ResumeSchema.parse(json) as Resume
      setUploadProgress(85)
      setUploadMessage('Saving to browser...')
      
      // Simulate storage save (85-100%) - local storage only, no server upload
      await new Promise(resolve => setTimeout(resolve, 200))
      localStorageOnly.set<Resume>('resume-builder:data', parsed)
      setUploadProgress(100)
      
      // Show success after brief delay
      await new Promise(resolve => setTimeout(resolve, 300))
      setUploadStatus('success')
      setUploadMessage('Your resume has been uploaded successfully!')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON format'
      setUploadStatus('failure')
      setUploadMessage(`Upload failed: ${msg}`)
    }
  }

  const closeModal = () => {
    setUploadStatus('idle')
    setUploadMessage('')
    setUploadProgress(0)
  }

  const handleProceed = () => {
    closeModal()
    router.push('/preview?uploaded=1')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-100 opacity-20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 mb-6">
              ✨ Build Your Professional Resume
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Create Your Perfect Resume in Minutes
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Upload a JSON file, customize your details, and export as PDF or DOCX. No design skills required.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/builder" className="inline-block">
                <Button variant="primary" size="lg">
                  <Sparkles className="h-5 w-5" />
                  Start Building
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/preview" className="inline-block">
                <Button variant="outline" size="lg">
                  <FileCode2 className="h-5 w-5" />
                  View Template
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Card variant="elevated">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Easy Import</CardTitle>
            <CardBody className="mt-2 text-sm">
              Upload your JSON resume and it will be instantly loaded into the builder with all your data preserved.
            </CardBody>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
              <FileCode2 className="h-6 w-6 text-indigo-600" />
            </div>
            <CardTitle>Modern Design</CardTitle>
            <CardBody className="mt-2 text-sm">
              Professional, clean templates that make your resume stand out while keeping the focus on your content.
            </CardBody>
          </Card>

          <Card variant="elevated">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Multiple Exports</CardTitle>
            <CardBody className="mt-2 text-sm">
              Export your resume as PDF or DOCX with a single click. Perfect for any application.
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Upload Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>
          <p className="mt-4 text-gray-600">Upload your resume JSON file to begin</p>
        </div>

        <FileUploadZone
          onUpload={handleUpload}
          isLoading={uploadStatus === 'uploading'}
          accept=".json,application/json"
        />

        {/* Sample File Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">Need a sample file to get started?</p>
          <a
            href="/sample-resume.json"
            download
            className="mt-2 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Download className="h-4 w-4" />
            Download Sample Resume
          </a>
        </div>
      </section>

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadStatus !== 'idle'}
        status={uploadStatus}
        message={uploadMessage}
        progress={uploadProgress}
        onClose={closeModal}
        onRetry={() => setUploadStatus('idle')}
        onProceed={handleProceed}
      />
    </div>
  )
}
