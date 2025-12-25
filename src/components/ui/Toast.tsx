'use client'

import { CheckCircle, AlertCircle, InfoIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  type: ToastType
  message: string
  onClose: () => void
  duration?: number
}

const typeStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: AlertCircle,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: InfoIcon,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertCircle,
  },
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const styles = typeStyles[type]
  const Icon = styles.icon

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-lg border ${styles.bg} ${styles.border} p-4 shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4`}
      role="alert"
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${styles.text}`} />
      <p className={`flex-1 ${styles.text}`}>{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose()
        }}
        className={`flex-shrink-0 rounded p-1 hover:opacity-70 transition-opacity ${styles.text}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
