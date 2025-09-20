'use client';

import { useEffect, useRef } from 'react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

interface GallerySectionProps {
  id?: string;
}

export default function GallerySection({ id }: GallerySectionProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const row1Images: GalleryItem[] = [
    'aix3u8aix3u8aix3', 'b3t5xmb3t5xmb3t5', 'e1ija0e1ija0e1ij', 'e2mz2fe2mz2fe2mz',
    'fkvfhyfkvfhyfkvf (1)', 'l6rzk0l6rzk0l6rz', 'n3yokhn3yokhn3yo', 'n5klvn5klvn5klvn (1)'
  ].map((name, i) => ({
    id: i,
    src: `/images/Gemini_Generated_Image_${name}.png`,
    alt: `Architectural space ${i + 1}`
  }));

  const row2Images: GalleryItem[] = [
    'na8etina8etina8e', 'o7fvd5o7fvd5o7fv (1)', 'oziex6oziex6ozie (1)', 'ud5kajud5kajud5k (1)',
    'aix3u8aix3u8aix3', 'b3t5xmb3t5xmb3t5', 'e1ija0e1ija0e1ij', 'e2mz2fe2mz2fe2mz'
  ].map((name, i) => ({
    id: i + 8,
    src: `/images/Gemini_Generated_Image_${name}.png`,
    alt: `Interior design ${i + 1}`
  }));

  useEffect(() => {
    const handleMouseEnter = (element: HTMLElement) => {
      element.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = (element: HTMLElement) => {
      element.style.animationPlayState = 'running';
    };

    const row1Element = row1Ref.current;
    const row2Element = row2Ref.current;

    if (row1Element) {
      row1Element.addEventListener('mouseenter', () => handleMouseEnter(row1Element));
      row1Element.addEventListener('mouseleave', () => handleMouseLeave(row1Element));
    }

    if (row2Element) {
      row2Element.addEventListener('mouseenter', () => handleMouseEnter(row2Element));
      row2Element.addEventListener('mouseleave', () => handleMouseLeave(row2Element));
    }

    return () => {
      if (row1Element) {
        row1Element.removeEventListener('mouseenter', () => handleMouseEnter(row1Element));
        row1Element.removeEventListener('mouseleave', () => handleMouseLeave(row1Element));
      }
      if (row2Element) {
        row2Element.removeEventListener('mouseenter', () => handleMouseEnter(row2Element));
        row2Element.removeEventListener('mouseleave', () => handleMouseLeave(row2Element));
      }
    };
  }, []);

  const renderMarqueeRow = (images: GalleryItem[]) => (
    <div className="flex will-change-transform">
      {[...images, ...images].map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          className="flex-shrink-0 w-[250px] h-[188px] lg:w-[400px] lg:h-[300px] overflow-hidden"
        >
          <div 
            className="w-full h-full bg-void-stone transition-transform duration-fast hover:scale-110"
            style={{
              backgroundImage: `url('${image.src}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id={id} className="h-screen w-full overflow-hidden bg-void-white py-xl lg:py-2xl" style={{ zIndex: 10 }}>
      <div className="h-full flex flex-col justify-center">
        <div 
          ref={row1Ref}
          className="animate-marquee-mobile lg:animate-marquee"
          style={{ animationDirection: 'normal' }}
        >
          {renderMarqueeRow(row1Images)}
        </div>
        
        <div 
          ref={row2Ref}
          className="animate-marquee-reverse-mobile lg:animate-marquee-reverse"
          style={{ animationDirection: 'reverse' }}
        >
          {renderMarqueeRow(row2Images)}
        </div>
      </div>
    </section>
  );
}