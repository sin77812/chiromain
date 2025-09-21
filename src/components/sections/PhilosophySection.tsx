'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface PhilosophySectionProps {
  id?: string;
}

export default function PhilosophySection({ id }: PhilosophySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // 화면을 따라 내려오도록 긴 핀 구간: 섹션 시작부터 거의 끝까지
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 50%', // 섹션 끝에서 50% 위 지점에서 해제 (더 일찍 해제)
          pin: titleRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // markers: true,
        });

        // 배경 그리드 패럴랙스 유지
        gsap.to(gridRef.current, {
          y: -500,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(titleRef.current, { clearProps: 'all', opacity: 1, y: 0 });
      });

      // 모바일: 간단 패럴랙스만 유지
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = Array.from({ length: 6 }, (_, i) => {
    // 더 자연스러운 비규칙적 배치
    const positions = [
      { col: 1, row: 1, offsetX: -30, offsetY: 20 },
      { col: 3, row: 1, offsetX: 40, offsetY: -10 },
      { col: 2, row: 2, offsetX: -20, offsetY: 30 },
      { col: 1, row: 3, offsetX: 50, offsetY: -20 },
      { col: 3, row: 2, offsetX: -40, offsetY: 40 },
      { col: 2, row: 3, offsetX: 30, offsetY: -30 }
    ];
    
    const pos = positions[i];
    
    return {
      id: i,
      src: [
        'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_1ly01s1ly01s1ly0.png',
        'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_2c6n652c6n652c6n.png',
        'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_5j3ail5j3ail5j3a.png',
        'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_6j5awf6j5awf6j5a.png',
        'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_abb91abb91abb91a.png',
        'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_ag5lalag5lalag5l.png'
      ][i],
      style: {
        gridColumn: pos.col,
        gridRow: pos.row,
        transform: `translate(${pos.offsetX}px, ${pos.offsetY}px)`,
      }
    };
  });

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="hidden lg:block relative h-[200vh] w-full overflow-hidden bg-void-white"
      style={{ zIndex: 10 }}
    >
      <div 
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-lg p-2xl will-change-transform"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[3/4] overflow-hidden"
            style={image.style}
          >
            <div 
              className="w-full h-full bg-void-marble"
              style={{
                backgroundImage: `url('${image.src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-void-black/10" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-void-white/30 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <h2 
          ref={titleRef}
          className="absolute left-1/2 -translate-x-1/2 top-[12vh] text-h1 lg:text-display font-black-han tracking-tighter leading-none text-void-black text-center will-change-transform px-md"
        >
          시간이 멈춘 듯한<br />공간을 창조합니다
        </h2>
      </div>
    </section>
  );
}
