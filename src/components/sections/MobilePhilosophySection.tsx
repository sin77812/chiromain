'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface MobilePhilosophySectionProps {
  id?: string;
}

export default function MobilePhilosophySection({ id }: MobilePhilosophySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // 모바일에서만 실행
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        // 텍스트 고정
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 30%',
          pin: titleRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        // 배경 이미지 그리드 느린 패럴랙스
        gsap.to(gridRef.current, {
          y: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = Array.from({ length: 6 }, (_, i) => {
    // 모바일에서 더 큰 이미지를 위한 배치 (2x3 그리드에서 겹치게)
    const positions = [
      { col: 1, row: 1, offsetX: -40, offsetY: 50, scale: 1.3 },
      { col: 2, row: 1, offsetX: 60, offsetY: -30, scale: 1.2 },
      { col: 1, row: 2, offsetX: 40, offsetY: 80, scale: 1.4 },
      { col: 2, row: 2, offsetX: -50, offsetY: -40, scale: 1.3 },
      { col: 1, row: 3, offsetX: 80, offsetY: 20, scale: 1.5 },
      { col: 2, row: 3, offsetX: -30, offsetY: 60, scale: 1.2 }
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
        transform: `translate(${pos.offsetX}px, ${pos.offsetY}px) scale(${pos.scale})`,
      }
    };
  });

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="lg:hidden relative h-[200vh] w-full overflow-hidden bg-void-white"
      style={{ zIndex: 10 }}
    >
      <div 
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-8 p-4 will-change-transform"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-[3/4] overflow-hidden rounded-lg"
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
            <div className="absolute inset-0 bg-void-black/5" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-void-white/20 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <h2 
          ref={titleRef}
          className="absolute left-1/2 -translate-x-1/2 top-[15vh] text-3xl sm:text-4xl md:text-5xl font-black-han tracking-tighter leading-tight text-void-black text-center will-change-transform px-6"
        >
          시간이 멈춘 듯한<br />공간을 창조합니다
        </h2>
      </div>
    </section>
  );
}