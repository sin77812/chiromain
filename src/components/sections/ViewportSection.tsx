'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ViewportSectionProps {
  id?: string;
}

export default function ViewportSection({ id }: ViewportSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !maskRef.current || !textRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      // 텍스트 페이드인 애니메이션
      gsap.fromTo(textRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // 비디오 표시/숨김 제어 - ViewportSection에서만 정확히 표시
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',     // 섹션 상단이 화면 하단에 닿을 때
        end: 'bottom top',       // 섹션 하단이 화면 상단에 닿을 때
        onEnter: () => gsap.set(videoRef.current, { display: 'block' }),
        onLeave: () => gsap.set(videoRef.current, { display: 'none' }),
        onEnterBack: () => gsap.set(videoRef.current, { display: 'block' }),
        onLeaveBack: () => gsap.set(videoRef.current, { display: 'none' }),
        onUpdate: (self) => {
          // 스크롤 방향에 관계없이 섹션 범위를 벗어나면 숨김
          const progress = self.progress;
          if (progress <= 0 || progress >= 1) {
            gsap.set(videoRef.current, { display: 'none' });
          } else {
            gsap.set(videoRef.current, { display: 'block' });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 고정된 배경 비디오 - 뷰포트에 고정 */}
      <div 
        ref={videoRef}
        className="fixed inset-0 w-full h-full -z-50"
        style={{ display: 'none' }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8+%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB+%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB.mp4" type="video/mp4" />
        </video>
      </div>

      <section id={id} ref={sectionRef} className="relative h-[120vh] w-full">
        {/* 뷰포트 마스크 - 가운데 구멍을 뚫은 효과 */}
        <div 
          ref={maskRef}
          className="absolute inset-0 w-full h-full bg-void-white z-10"
          style={{
            clipPath: 'polygon(0% 0%, 0% 100%, 15% 100%, 15% 70%, 85% 70%, 85% 100%, 100% 100%, 100% 0%, 85% 0%, 85% 30%, 15% 30%, 15% 0%)'
          }}
        />

        {/* 텍스트 콘텐츠 */}
        <div 
          ref={textRef}
          className="relative z-20 h-full flex flex-col justify-start pt-[10vh] px-2xl"
        >
          <div className="max-w-4xl">
            <h2 className="text-h1 lg:text-display font-black-han tracking-tighter text-void-black mb-md">
              공간을 통해 보는<br />
              새로운 시각
            </h2>
            <p className="text-body lg:text-h3 font-noto font-light text-void-black/80 leading-relaxed max-w-2xl">
              건축은 단순히 공간을 만드는 것이 아닙니다.<br />
              빛과 그림자, 열림과 닫힘의 조화로운 리듬을 통해<br />
              삶에 새로운 관점을 제시합니다.
            </p>
            <p className="text-caption lg:text-body font-noto font-light text-void-black/60 mt-lg">
              우리는 각 프로젝트마다 독특한 시각적 프레임을 만들어<br />
              일상에 특별한 순간을 선사합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}