'use client';

import { useEffect, useRef } from 'react';
import { initSmoothScroll } from '@/lib/lenis';
import { ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<ReturnType<typeof initSmoothScroll> | null>(null);

  useEffect(() => {
    // Initialize Lenis with proper GSAP integration
    lenisRef.current = initSmoothScroll();

    // Refresh ScrollTrigger after initialization
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{children}</>;
}