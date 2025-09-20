'use client';

import { useRef, useState } from 'react';

interface ContactSectionProps {
  id?: string;
}

export default function ContactSection({ id }: ContactSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-void-white"
      style={{ zIndex: 10 }}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 파동 애니메이션 동그라미들 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute rounded-full border-2 border-void-black
                transition-all duration-1000 ease-out
                ${isHovered 
                  ? `scale-[${3 + i * 2}] opacity-0` 
                  : 'scale-0 opacity-100'
                }
              `}
              style={{
                width: '200px',
                height: '200px',
                animationDelay: `${i * 200}ms`,
                transitionDelay: isHovered ? `${i * 100}ms` : `${(2 - i) * 100}ms`
              }}
            />
          ))}
        </div>

        {/* 배경 색상 변화 */}
        <div
          className={`
            absolute rounded-full transition-all duration-700 ease-out
            ${isHovered 
              ? 'scale-150 bg-void-black w-[600px] h-[600px]' 
              : 'scale-0 bg-transparent w-[200px] h-[200px]'
            }
          `}
        />
        
        <h2 
          className={`
            relative z-10 font-thin leading-none text-center tracking-tighter
            transition-colors duration-700 ease-out
            ${isHovered ? 'text-void-white' : 'text-void-black'}
          `}
          style={{ 
            fontSize: 'clamp(36px, 8vw, 120px)'
          }}
        >
          CONTACT US
        </h2>
      </div>
    </section>
  );
}