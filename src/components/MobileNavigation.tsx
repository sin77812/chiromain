'use client';

import { useEffect, useState, useMemo } from 'react';

type MobileNavigationProps = Record<string, never>;

export default function MobileNavigation({}: MobileNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = useMemo(() => [
    { id: 'hero', label: 'HOME', href: '#hero' },
    { id: 'portfolio1', label: 'CHUNGDAM', href: '#portfolio1' },
    { id: 'portfolio2', label: 'SEONGBUK', href: '#portfolio2' },
    { id: 'philosophy', label: 'PHILOSOPHY', href: '#philosophy' },
    { id: 'viewport', label: 'PERSPECTIVE', href: '#viewport' },
    { id: 'gallery', label: 'GALLERY', href: '#gallery' },
    { id: 'contact', label: 'CONTACT', href: '#contact' }
  ], []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false); // 메뉴 닫기
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
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
    };
  }, [navigationItems]);

  // 메뉴 오픈 시 body 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const mobileDarkSections = new Set(['hero', 'portfolio1', 'portfolio2']);
  const isDarkSection = mobileDarkSections.has(activeSection);

  return (
    <>
      {/* 햄버거 버튼 - 모바일에서만 보임 */}
      <button
        onClick={toggleMenu}
        className={`
          lg:hidden fixed top-6 right-6 z-50 w-12 h-12 
          flex flex-col justify-center items-center space-y-1.5
          transition-colors duration-300
          ${isDarkSection ? 'text-void-white' : 'text-void-black'}
        `}
        aria-label="메뉴 열기"
      >
        <span 
          className={`
            w-6 h-0.5 bg-current transition-all duration-300
            ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}
          `}
        />
        <span 
          className={`
            w-6 h-0.5 bg-current transition-all duration-300
            ${isMenuOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <span 
          className={`
            w-6 h-0.5 bg-current transition-all duration-300
            ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}
          `}
        />
      </button>

      {/* 풀스크린 메뉴 오버레이 - 모바일에서만 보임 */}
      <div 
        className={`
          lg:hidden fixed inset-0 z-40 
          bg-void-black/95 backdrop-blur-sm
          transition-all duration-500 ease-out
          ${isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
      >
        <nav className="flex h-full items-center justify-center">
          <ul className="text-center space-y-8">
            {navigationItems.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    block text-2xl font-light tracking-wider 
                    text-void-white transition-all duration-300
                    transform hover:scale-105
                    ${activeSection === item.id 
                      ? 'opacity-100 font-medium' 
                      : 'opacity-70 hover:opacity-100'
                    }
                    ${isMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                    }
                  `}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}