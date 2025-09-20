'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface PortfolioSectionSimpleProps {
  id?: string;
  title: string;
  description: string[];
  videoSrc?: string;
  imageSrc?: string;
  reverse?: boolean;
}

export default function PortfolioSectionSimple({ 
  id,
  title, 
  description, 
  videoSrc, 
  imageSrc,
  reverse = false 
}: PortfolioSectionSimpleProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stopLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !textContainerRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const section = sectionRef.current!;
        const container = textContainerRef.current!;
        const title = titleRef.current!;
        const stopLine = stopLineRef.current!;

        // 측정 전 transform 초기화
        gsap.set([container, title], { clearProps: 'transform' });

        // 스크롤 거리/목표 위치 계산 함수
        // 목표: 텍스트 그룹의 세로 중심이 'stopLine'(메인 텍스트 선상)과 정렬되면 끝남
        const getMetrics = () => {
          // 측정은 y=0 기준으로 수행
          gsap.set(container, { y: 0, xPercent: 0 });
          const vh = window.innerHeight;
          const stopRect = stopLine.getBoundingClientRect();
          const stopCenter = stopRect.top; // 선 자체를 기준(중앙 라인)
          const items = Array.from(container.children) as HTMLElement[];
          let groupTop: number;
          let groupBottom: number;
          if (items.length) {
            const firstRect = items[0].getBoundingClientRect();
            const lastRect = items[items.length - 1].getBoundingClientRect();
            groupTop = firstRect.top;
            groupBottom = lastRect.bottom;
          } else {
            const rect = container.getBoundingClientRect();
            groupTop = rect.top;
            groupBottom = rect.bottom;
          }
          const groupCenter = (groupTop + groupBottom) / 2;

          // 시작은 첫 번째 문장의 상단이 화면 아래 완전히 벗어난 위치에서 시작하도록 설정
          // 현재 groupTop은 컨테이너 기준이므로, 첫 문장이 화면 아래 여유공간에서 시작하도록 조정
          const firstItemTop = items.length > 0 ? items[0].getBoundingClientRect().top - groupTop : 0;
          const startY = Math.round(vh + 100 - firstItemTop); // 첫 문장이 화면 아래 100px 여유공간에서 시작
          // 그룹 중심을 stopLine 위치에 정렬
          const toY = Math.round(stopCenter - groupCenter);
          const travel = Math.max(1, startY - toY); // 최소 1px 보장
          return { startY, toY, travel };
        };

        let metrics = getMetrics();

        // 초기 상태: 타이틀은 아래에서 대기, 컨테이너는 화면 아래 완전히 숨김
        gsap.set(title, { yPercent: 100, autoAlpha: 0 });
        gsap.set(container, { y: metrics.startY, autoAlpha: 0 }); // 처음에는 완전히 숨김

        // Pin + 타임라인: 스크롤 길이를 travel에 맞춤(정지 지점까지 고정)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => {
              metrics = getMetrics();
              return `+=${metrics.travel}`;
            },
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true,
            onRefresh: () => {
              metrics = getMetrics();
              // refresh 시에도 초기 위치 유지
              gsap.set(container, { y: metrics.startY });
            },
          }
        });

        // 1) 메인 타이틀: 초반에 센터 정착
        tl.to(title, { yPercent: 0, autoAlpha: 1, ease: 'none', duration: 0.3 }, 0);

        // 2) 상세 텍스트: 아래(startY)→정지점(toY)으로 이동, 동시에 페이드인
        tl.fromTo(container, 
          { 
            y: () => metrics.startY,
            autoAlpha: 0
          }, 
          {
            y: () => metrics.toY,
            autoAlpha: 1,
            ease: 'none',
            duration: 1,
            immediateRender: false,
          }, 0.15);

        // 정방향 진행 중 순간이동 방지용(정지점 유지)
        if (tl.scrollTrigger?.vars) {
          tl.scrollTrigger.vars.onUpdate = (self: ScrollTrigger) => {
            if (self.direction === 1) gsap.set(container, { y: metrics.toY });
          };
        }

        // 3) 문단 페이드 없음 (항상 선명)
      });

      // Mobile: Simple animations
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(textContainerRef.current?.children || [], 
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
              trigger: textContainerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    // ScrollTrigger refresh after setup
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden isolate bg-void-white"
      style={{ zIndex: 10 }}
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
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
      <div ref={contentRef} className="relative z-10 h-full flex flex-col lg:flex-row">
        {/* Title Side */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center ${reverse ? 'lg:order-2' : 'lg:order-1'} px-md py-xl lg:px-0 lg:py-0`}>
          <div className="relative z-30">
            <h2 
              ref={titleRef}
              className="text-h1 font-light tracking-tight text-void-white korean text-center"
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Scrolling Text Side */}
        <div className={`w-full lg:w-1/2 relative overflow-hidden ${reverse ? 'lg:order-1' : 'lg:order-2'} px-md pb-2xl lg:px-0 lg:pb-0`}>
          <div 
            ref={textContainerRef}
            className="lg:absolute lg:inset-0 flex flex-col justify-center space-y-6 lg:space-y-8 p-xl lg:p-2xl"
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
          {/* 정지 기준선: 메인 타이틀과 동일 선상(세로 중앙) */}
          <div ref={stopLineRef} className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
