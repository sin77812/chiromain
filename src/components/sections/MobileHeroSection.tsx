'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface MobileHeroSectionProps {
  id?: string;
}

export default function MobileHeroSection({ id }: MobileHeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current) return;

    const ctx = gsap.context(() => {
      // 모바일에서만 실행
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        // 스크롤 시 텍스트 핀 효과
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

        // 메인 텍스트 고정, 서브텍스트 상승
        tl.fromTo(subtitleRef.current, 
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
          }
        );
      });

      // 초기 애니메이션
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

      // 서브텍스트 초기 숨김
      gsap.set(subtitleRef.current, {
        y: 100,
        opacity: 0
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="lg:hidden relative min-h-[100svh] w-full overflow-hidden gpu-accelerated bg-void-white"
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
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tighter leading-none text-void-white text-center korean will-change-transform"
        >
          당신이 머무를,<br />당신만의 공간
        </h1>
        
        <p 
          ref={subtitleRef}
          className="mt-8 text-lg sm:text-xl font-light tracking-wide leading-relaxed text-void-white/90 text-center max-w-md korean will-change-transform"
        >
          시간이 멈춘 듯한<br />
          고요함 속에서<br />
          당신만의 이야기가 시작됩니다
        </p>
      </div>
    </section>
  );
}