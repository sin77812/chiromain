'use client';

import { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');

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

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-lg left-1/2 -translate-x-1/2 z-50">
      <div className="bg-transparent backdrop-blur-sm rounded-full px-xl py-lg">
        <ul className="flex items-center space-x-2xl">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative group text-body font-medium tracking-wider transition-colors duration-300
                  ${activeSection === item.id 
                    ? 'text-void-white' 
                    : 'text-void-white/70 hover:text-void-white'
                  }
                `}
              >
                {item.label}
                
                {/* 호버 밑줄 애니메이션 */}
                <span 
                  className={`
                    absolute bottom-0 left-0 h-[2px] bg-void-white
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