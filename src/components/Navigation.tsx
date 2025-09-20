'use client';

import { useEffect, useState } from 'react';

interface NavigationProps {
  // No props currently
}

export default function Navigation({}: NavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    { id: 'hero', label: 'HOME', href: '#hero' },
    { id: 'portfolio1', label: 'CHUNGDAM', href: '#portfolio1' },
    { id: 'portfolio2', label: 'SEONGBUK', href: '#portfolio2' },
    { id: 'philosophy', label: 'PHILOSOPHY', href: '#philosophy' },
    { id: 'viewport', label: 'PERSPECTIVE', href: '#viewport' },
    { id: 'gallery', label: 'GALLERY', href: '#gallery' },
    { id: 'contact', label: 'CONTACT', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    // 모바일 여부 감지 (<=1023px)
    const mql = window.matchMedia('(max-width: 1023px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Safari 호환: MediaQueryListEvent | MediaQueryList 모두 지원
      const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches;
      setIsMobile(matches);
    };
    handleChange(mql);
    mql.addEventListener?.('change', handleChange as EventListener);
    // Safari fallback
    if ('addListener' in mql && mql.addListener) {
      mql.addListener(handleChange as EventListener);
    }

    // 현재 보이는 섹션 감지
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // 각 섹션 관찰 시작
    navigationItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      mql.removeEventListener?.('change', handleChange as EventListener);
      // Safari fallback
      if ('removeListener' in mql && mql.removeListener) {
        mql.removeListener(handleChange as EventListener);
      }
    };
  }, [navigationItems]);

  const blendAllowed = !['hero', 'portfolio1', 'portfolio2'].includes(activeSection);

  return (
    <nav className={`hidden lg:block fixed top-lg left-1/2 -translate-x-1/2 z-50 ${blendAllowed ? 'mix-blend-difference' : ''}`}>
      <div className="bg-transparent rounded-full px-xl py-sm">
        <ul className="flex items-center space-x-2xl">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative group text-body font-medium tracking-wider transition-opacity duration-300 text-white
                  ${activeSection === item.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                `}
              >
                {item.label}
                
                {/* 호버 밑줄 애니메이션 */}
                <span 
                  className={`
                    absolute bottom-0 left-0 h-[2px] bg-current
                    transition-all duration-300 ease-out
                    ${activeSection === item.id 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                    }
                  `}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
