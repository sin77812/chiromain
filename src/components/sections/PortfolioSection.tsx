'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface PortfolioSectionProps {
  title: string;
  description: string[];
  videoSrc?: string;
  imageSrc?: string;
  reverse?: boolean;
  index?: number;
}

export default function PortfolioSection({ 
  title, 
  description, 
  videoSrc, 
  imageSrc,
  reverse = false,
  index = 0
}: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Pin the entire section for scroll lock
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        // Set initial states
        if (!titleRef.current || !contentRef.current) return;
        
        gsap.set(titleRef.current, { y: '100vh' });
        gsap.set(contentRef.current, { 
          y: '120vh', 
          x: reverse ? '50vw' : '-50vw' 
        });
        if (titleRef.current.parentElement) {
          gsap.set(titleRef.current.parentElement, { opacity: 0 });
        }

        // Create timeline for coordinated animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            markers: true, // Debug markers
            id: `portfolio-${index}`,
          }
        });

        // Show title container first
        if (titleRef.current?.parentElement) {
          tl.to(titleRef.current.parentElement, { 
            opacity: 1, 
            duration: 0.1 
          }, 0);
        }

        // Main title animation - moves up and stops in center
        tl.to(titleRef.current, {
          y: '0vh',
          ease: 'none',
          duration: 0.5
        }, 0);

        // Detail text animation - starts later, moves slower
        tl.to(contentRef.current, {
          y: '-150vh',
          x: 0,
          ease: 'none',
          duration: 0.7
        }, 0.3); // Starts 30% later

        // Individual paragraph fade in
        const paragraphs = contentRef.current?.children;
        if (paragraphs) {
          Array.from(paragraphs).forEach((paragraph, index) => {
            gsap.set(paragraph, { opacity: 0 });
            tl.to(paragraph, {
              opacity: 1,
              duration: 0.1,
              ease: 'none'
            }, 0.4 + index * 0.05);
          });
        }
      });

      // Mobile: Simple scroll animations
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(contentRef.current?.children || [], 
          { 
            opacity: 0, 
            y: 50 
          },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [index, reverse]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[300vh] overflow-hidden"
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-screen">
        {videoSrc ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoSrc} type="video/webm" />
            <source src="/videos/placeholder.mp4" type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-void-stone"
            style={{
              backgroundImage: imageSrc ? `url('${imageSrc}')` : 'linear-gradient(45deg, #6B6B68, #3E3A35)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        <div className="absolute inset-0 bg-void-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-screen flex">
        {/* Title Side */}
        <div className={`w-1/2 flex items-center justify-center overflow-hidden ${reverse ? 'order-2' : 'order-1'}`}>
          <div 
            className="opacity-0"
            style={{ 
              willChange: 'opacity',
              zIndex: 20 + index
            }}
          >
            <h2 
              ref={titleRef}
              className="text-h1 font-light tracking-tight text-void-white korean text-center will-change-transform"
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Scrolling Text Side */}
        <div className={`w-1/2 relative overflow-hidden ${reverse ? 'order-1' : 'order-2'}`}>
          <div 
            ref={contentRef}
            className="absolute inset-0 flex flex-col justify-center space-y-8 p-2xl will-change-transform"
          >
            {description.map((paragraph, index) => (
              <p 
                key={index}
                className="text-body font-regular tracking-wide text-void-white korean leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
