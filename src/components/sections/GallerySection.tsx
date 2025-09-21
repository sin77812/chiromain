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
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_aix3u8aix3u8aix3.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_b3t5xmb3t5xmb3t5.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_e1ija0e1ija0e1ij.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_e2mz2fe2mz2fe2mz.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_fkvfhyfkvfhyfkvf+(1).png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_l6rzk0l6rzk0l6rz.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_1ly01s1ly01s1ly0.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_n5klvn5klvn5klvn+(1).png'
  ].map((src, i) => ({
    id: i,
    src,
    alt: `Architectural space ${i + 1}`
  }));

  const row2Images: GalleryItem[] = [
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_na8etina8etina8e.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_o7fvd5o7fvd5o7fv+(1).png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_oziex6oziex6ozie+(1).png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_ud5kajud5kajud5k+(1).png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_2c6n652c6n652c6n.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_5j3ail5j3ail5j3a.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_6j5awf6j5awf6j5a.png',
    'https://chiro-web.s3.ap-northeast-2.amazonaws.com/chiromain/Gemini_Generated_Image_abb91abb91abb91a.png'
  ].map((src, i) => ({
    id: i + 8,
    src,
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