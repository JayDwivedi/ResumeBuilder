'use client'

import { CheckCircle, AlertCircle } from 'lucide-react'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'failure'

interface UploadModalProps {
  isOpen: boolean
  status: UploadStatus
  message: string
  progress?: number // 0-100
  onClose: () => void
  onRetry?: () => void
  onProceed?: () => void
}

export function UploadModal({
  isOpen,
  status,
  message,
  progress = 0,
  onClose,
  onRetry,
  onProceed,
}: UploadModalProps) {
  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-600" />
      case 'failure':
        return <AlertCircle className="h-16 w-16 text-red-600" />
      case 'uploading':
        return <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      default:
        return null
    }
  }

  const getTitle = () => {
    switch (status) {
      case 'success':
        return 'Upload Successful!'
      case 'failure':
        return 'Upload Failed'
      case 'uploading':
        return 'Uploading...'
      default:
        return ''
    }
  }

  const getActions = () => {
    switch (status) {
      case 'success':
        return (
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose} fullWidth>
              Close
            </Button>
            <Button variant="primary" onClick={onProceed} fullWidth>
              Go to Preview
            </Button>
          </div>
        )
      case 'failure':
        return (
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} fullWidth>
              Close
            </Button>
            <Button variant="primary" onClick={onRetry} fullWidth>
              Try Again
            </Button>
          </div>
        )
      case 'uploading':
        return (
          <Button variant="primary" disabled fullWidth>
            Uploading...
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton={status !== 'uploading'}>
      <div className="flex flex-col items-center text-center">
        {getIcon() && <div className="mb-4">{getIcon()}</div>}
        {getTitle() && <h3 className="mb-2 text-xl font-bold">{getTitle()}</h3>}
        <p className={`mb-6 text-sm ${
          status === 'success' ? 'text-green-700' : status === 'failure' ? 'text-red-700' : 'text-gray-700'
        }`}>
          {message}
        </p>
        
        {/* Progress Bar */}
        {status === 'uploading' && (
          <div className="mb-6 w-full">
            <div className="mb-2 flex justify-between">
              <span className="text-xs font-medium text-gray-600">Progress</span>
              <span className="text-xs font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
        
        {getActions()}
      </div>
    </Modal>
  )
}
