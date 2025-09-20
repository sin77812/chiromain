'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface HeroSectionProps {
  id?: string;
}

export default function HeroSection({ id }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100px',
            scrub: 1,
            pin: true,
            pinSpacing: false,
          }
        });

        tl.to(sectionRef.current, {
          scale: 0.9,
          transformOrigin: 'center center',
          ease: 'power2.out',
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(sectionRef.current, { scale: 1 });
      });

      gsap.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 50 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden gpu-accelerated bg-void-white"
      style={{ zIndex: 10 }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/benner.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-void-black/30" />
      
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 
          ref={titleRef}
          className="text-display lg:text-display md:text-h1 sm:text-h2 font-thin tracking-tighter leading-none text-void-white text-center px-md korean will-change-transform"
        >
          당신이 머무를,<br />당신만의 공간
        </h1>
      </div>
    </section>
  );
}