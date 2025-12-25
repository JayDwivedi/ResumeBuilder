'use client'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export function Loader({ size = 'md', message }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeMap[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`} />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader size="lg" message="Loading..." />
    </div>
  )
}
