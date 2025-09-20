'use client';

import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  style = {}
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        ...style
      }}
    >
      {isInView && (
        <>
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            } bg-gradient-to-br from-void-stone to-void-taupe`}
          />
          <div
            className={`w-full h-full bg-cover bg-center transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onLoad={() => setIsLoaded(true)}
            role="img"
            aria-label={alt}
          />
        </>
      )}
    </div>
  );
}