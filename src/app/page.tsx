import HeroSection from '@/components/sections/HeroSection';
import MobileHeroSection from '@/components/sections/MobileHeroSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PortfolioSectionSimple from '@/components/sections/PortfolioSectionSimple';
import PhilosophySection from '@/components/sections/PhilosophySection';
import MobilePhilosophySection from '@/components/sections/MobilePhilosophySection';
import ViewportSection from '@/components/sections/ViewportSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactSection from '@/components/sections/ContactSection';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Navigation from '@/components/Navigation';
import MobileNavigation from '@/components/MobileNavigation';

export default function Home() {
  const chungdamDescription = [
    "청담동의 고급 주거 공간에서 시작된 이 프로젝트는 도시적 세련미와 자연의 조화를 추구합니다.",
    "44평의 제한된 공간 안에서 최대한의 개방감을 창조하기 위해 벽체를 최소화하고 시각적 연결성을 강화했습니다.",
    "거실과 주방, 서재가 하나의 큰 공간으로 이어지면서도 각각의 독립성을 유지할 수 있도록 천장의 높이와 조명을 활용했습니다.",
    "마스터 침실에는 프라이빗 테라스를 연결하여 도심 속에서도 자연을 느낄 수 있는 휴식 공간을 마련했습니다.",
    "모든 가구와 조명은 맞춤 제작되었으며, 공간의 특성에 맞춰 정밀하게 계산된 비율과 재료로 완성되었습니다."
  ];

  const seongbukDescription = [
    "성북동 계곡가에 위치한 이 주택은 자연과의 완전한 조화를 목표로 설계되었습니다.",
    "계곡의 물소리와 사계절 변화하는 풍경을 집 안에서 온전히 느낄 수 있도록 대형 창호를 설치했습니다.",
    "1층의 거실 공간은 계곡과 같은 높이에 배치하여 마치 자연의 일부가 된 듯한 경험을 제공합니다.",
    "2층 침실에서는 나무 꼭대기와 눈높이를 맞춰 사적인 공간에서도 자연의 생동감을 느낄 수 있습니다.",
    "내부 마감재는 모두 천연 소재를 사용하여 외부 환경과의 경계를 최대한 모호하게 만들었습니다.",
    "조명 계획 역시 자연광의 패턴을 분석하여 하루 종일 부드럽고 균일한 빛이 공간을 감쌀 수 있도록 설계했습니다."
  ];

  return (
    <SmoothScrollProvider>
      <Navigation />
      <MobileNavigation />
      <main className="relative">
        <HeroSection id="hero" />
        <MobileHeroSection id="hero" />
        
        <PortfolioSectionSimple
          id="portfolio1"
          title="청담 H 레지던스"
          description={chungdamDescription}
          imageSrc="/images/portfolio1.png"
        />
        
        <PortfolioSectionSimple
          id="portfolio2"
          title="성북동 계곡 주택"
          description={seongbukDescription}
          imageSrc="/images/portfolio2.png"
          reverse={true}
        />
        
        <PhilosophySection id="philosophy" />
        <MobilePhilosophySection id="philosophy" />
        
        <ViewportSection id="viewport" />
        
        <GallerySection id="gallery" />
        
        <ContactSection id="contact" />
      </main>
    </SmoothScrollProvider>
  );
}
