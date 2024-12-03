import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

function Image({ className, src, alt, fallback = '/game-placeholder.png', ...props }: ImageProps) {
  const [error, setError] = useState(false)

  return (
    <img
      className={cn('duration-300 ease-in-out', error ? 'blur-sm' : '', className)}
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  )
}

export default Image 
