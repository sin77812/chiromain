# VOID ATELIER - Premium Interior Design Website

> **시간이 멈춘 듯한 공간을 창조하다**

VOID ATELIER는 시네마틱 웹 경험을 통해 럭셔리 인테리어 브랜드를 표현하는 웹사이트입니다.

## ✨ 핵심 기능

### 🎬 시네마틱 인터랙션
- **Hero Section**: Scale Lock 애니메이션으로 몰입감 있는 첫 인상
- **Portfolio**: Video Background + Text Scroll-Through로 스토리텔링
- **Philosophy**: Reverse Parallax로 깊이감 있는 철학 전달
- **Gallery**: Infinite Marquee로 역동적인 작품 갤러리
- **Contact**: Hover Mask Reveal로 인상적인 상담 유도

### 📱 반응형 디자인
- Desktop First 접근법으로 PC에서 최적의 경험
- 태블릿/모바일에서는 성능을 고려한 단순화된 애니메이션
- Touch 디바이스를 위한 적응형 인터랙션

### ⚡ 성능 최적화
- GSAP + ScrollTrigger로 부드러운 60fps 애니메이션
- Lenis로 매끄러운 스크롤 경험
- Intersection Observer를 활용한 지연 로딩
- WebP 이미지 포맷 지원

## 🛠 기술 스택

```
Frontend:   Next.js 14 (App Router)
Animation:  GSAP 3.12 + ScrollTrigger + Lenis
Styling:    Tailwind CSS + CSS Modules
Language:   TypeScript
```

## 🚀 개발 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx          # 홈페이지
├── components/
│   ├── sections/          # 섹션별 컴포넌트
│   │   ├── HeroSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── PhilosophySection.tsx
│   │   ├── GallerySection.tsx
│   │   └── ContactSection.tsx
│   ├── OptimizedImage.tsx # 최적화된 이미지 컴포넌트
│   └── SmoothScrollProvider.tsx
└── lib/
    ├── gsap.ts           # GSAP 설정
    ├── lenis.ts          # Lenis 스크롤 설정
    └── performance.ts    # 성능 유틸리티
```

## 🎨 디자인 시스템

### 색상 팔레트
```css
/* Primary */
--void-black:    #0A0A0A
--void-white:    #FAFAF8
--void-stone:    #6B6B68

/* Accent */
--void-gold:     #D4AF37
--void-taupe:    #3E3A35
--void-marble:   #E8E6E1
```

### 타이포그래피
```css
/* Font Stack */
font-display:    'Inter', 'Helvetica', sans-serif
font-korean:     'Pretendard', 'Apple SD Gothic Neo', sans-serif

/* Scale */
display:         72px / 1.1 / -0.02em
h1:              48px / 1.2 / -0.01em
h2:              36px / 1.3 / 0
body:            16px / 1.8 / 0.02em
```

### 애니메이션 타이밍
```css
--ease-luxury:   cubic-bezier(0.23, 1, 0.32, 1)
--ease-smooth:   cubic-bezier(0.4, 0.0, 0.2, 1)
--ease-dramatic: cubic-bezier(0.76, 0, 0.24, 1)
```

## 📸 미디어 에셋

### 이미지 최적화
- **Format**: WebP (fallback: JPEG)
- **Quality**: 80%
- **Sizes**: 
  - Hero: 1920×1080
  - Portfolio: 1600×1200
  - Gallery: 400×300
  - Philosophy: 600×800

### 비디오 최적화
- **Format**: WebM (fallback: MP4)
- **Size**: 5MB 이하
- **Resolution**: 1080p

## 🔧 빌드 및 배포

### 개발 빌드
```bash
npm run build
```

### 프로덕션 시작
```bash
npm start
```

### 타입 체크
```bash
npm run type-check
```

## 📱 브라우저 지원

- **Desktop**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2020+, CSS Grid, Intersection Observer

## 🎯 성능 목표

- **LCP**: < 2.5s
- **FID**: < 100ms  
- **CLS**: < 0.1
- **FPS**: 60fps constant

## 🔨 개발 팁

### 플레이스홀더 이미지 생성
```bash
# create-placeholders.html 파일을 브라우저에서 열고
# "모든 이미지 생성" 버튼을 클릭하여 개발용 이미지들을 다운로드
```

### GSAP 디버깅
```javascript
// 개발자 도구에서 ScrollTrigger 상태 확인
ScrollTrigger.getAll()
```

### 성능 프로파일링
```javascript
// 개발자 도구 > Performance 탭에서 스크롤 성능 측정
// Lighthouse를 사용한 성능 점수 확인
```

## 📄 라이선스

이 프로젝트는 VOID ATELIER의 상업적 목적으로 제작되었습니다.

---

**VOID ATELIER** - Where Silence Speaks Volumes
