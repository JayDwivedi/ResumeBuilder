'use client'

import { Upload } from 'lucide-react'
import { Card } from './ui/Card'

interface FileUploadZoneProps {
  onUpload: (file: File) => void
  isLoading?: boolean
  accept?: string
}

export function FileUploadZone({ onUpload, isLoading = false, accept = '.json' }: FileUploadZoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
    e.target.value = ''
  }

  return (
    <Card variant="outlined">
      <div
        className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center transition-colors hover:border-blue-400 hover:bg-blue-50"
        onDragOver={(e) => {
          e.preventDefault()
          e.currentTarget.classList.add('border-blue-400', 'bg-blue-50')
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
        }}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg font-medium text-gray-700">Drag and drop your file here</p>
        <p className="mt-1 text-sm text-gray-500">or</p>
        <label className="mt-4 inline-block cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
          {isLoading ? 'Uploading...' : 'Choose File'}
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            disabled={isLoading}
            className="hidden"
          />
        </label>
      </div>
    </Card>
  )
}
