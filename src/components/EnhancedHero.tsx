import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const images = [
  { src: '/lovable-uploads/background.png', className: 'parallax bg-img', data: { speedx: 0.3, speedy: 0.38, speedz: 0, rotation: 0, distance: 300 } },
  { src: '/lovable-uploads/fog_7.png', className: 'parallax fog-7', data: { speedx: 0.27, speedy: 0.32, speedz: 0, rotation: 0, distance: 850 } },
  { src: '/lovable-uploads/mountain_10.png', className: 'parallax mountain-10', data: { speedx: 0.195, speedy: 0.305, speedz: 0, rotation: 0, distance: 1100 } },
  { src: '/lovable-uploads/fog_6.png', className: 'parallax fog-6', data: { speedx: 0.25, speedy: 0.28, speedz: 0, rotation: 0, distance: 1400 } },
  { src: '/lovable-uploads/mountain_9.png', className: 'parallax mountain-9', data: { speedx: 0.125, speedy: 0.155, speedz: 0.15, rotation: 0.02, distance: 1700 } },
  { src: '/lovable-uploads/mountain_8.png', className: 'parallax mountain-8', data: { speedx: 0.1, speedy: 0.11, speedz: 0, rotation: 0.02, distance: 1800 } },
  { src: '/lovable-uploads/fog_5.png', className: 'parallax fog-5', data: { speedx: 0.16, speedy: 0.105, speedz: 0, rotation: 0, distance: 1900 } },
  { src: '/lovable-uploads/mountain_7.png', className: 'parallax mountain-7', data: { speedx: 0.1, speedy: 0.1, speedz: 0, rotation: 0.09, distance: 2000 } },
  // .text is handled separately
  { src: '/lovable-uploads/mountain_6.png', className: 'parallax mountain-6', data: { speedx: 0.065, speedy: 0.05, speedz: 0.05, rotation: 0.12, distance: 2300 } },
  { src: '/lovable-uploads/fog_4.png', className: 'parallax fog-4', data: { speedx: 0.135, speedy: 0.04, speedz: 0, rotation: 0, distance: 2400 } },
  { src: '/lovable-uploads/mountain_5.png', className: 'parallax mountain-5', data: { speedx: 0.08, speedy: 0.03, speedz: 0.13, rotation: 0.1, distance: 2550 } },
  { src: '/lovable-uploads/fog_3.png', className: 'parallax fog-3', data: { speedx: 0.11, speedy: 0.018, speedz: 0, rotation: 0, distance: 2800 } },
  { src: '/lovable-uploads/mountain_4.png', className: 'parallax mountain-4', data: { speedx: 0.059, speedy: 0.024, speedz: 0.35, rotation: 0.14, distance: 3200 } },
  { src: '/lovable-uploads/mountain_3.png', className: 'parallax mountain-3', data: { speedx: 0.04, speedy: 0.018, speedz: 0.32, rotation: 0.05, distance: 3400 } },
  { src: '/lovable-uploads/fog_2.png', className: 'parallax fog-2', data: { speedx: 0.15, speedy: 0.0115, speedz: 0, rotation: 0, distance: 3600 } },
  { src: '/lovable-uploads/mountain_2.png', className: 'parallax mountain-2', data: { speedx: 0.0235, speedy: 0.013, speedz: 0.42, rotation: 0.15, distance: 3800 } },
  { src: '/lovable-uploads/mountain_1.png', className: 'parallax mountain-1', data: { speedx: 0.027, speedy: 0.018, speedz: 0.53, rotation: 0.2, distance: 4000 } },
  { src: '/lovable-uploads/sun_rays.png', className: 'sun-rays', data: {} },
  { src: '/lovable-uploads/black_shadow.png', className: 'black-shadow', data: {} },
  { src: '/lovable-uploads/fog_1.png', className: 'parallax fog-1', data: { speedx: 0.12, speedy: 0.01, speedz: 0, rotation: 0, distance: 4200 } },
];

const EnhancedHero = () => {
  const mainRef = useRef(null);
  const parallaxRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;

    const parallaxEls = parallaxRefs.current;
    let xValue = 0, yValue = 0, rotateDegree = 0;

    function update(cursorPosition) {
      parallaxEls.forEach((el) => {
        if (!el) return;
        const speedx = parseFloat(el.dataset.speedx || 0);
        const speedy = parseFloat(el.dataset.speedy || 0);
        const speedz = parseFloat(el.dataset.speedz || 0);
        const rotateSpeed = parseFloat(el.dataset.rotation || 0);
        let isInLeft =
          parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue =
          (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;
        el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px))`;
      });
    }

    update(0);

    // GSAP entrance animation
    let timeline = gsap.timeline();
    setTimeout(() => {
      parallaxEls.forEach((el) => {
        if (el) el.style.transition = '0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)';
      });
    }, timeline.endTime() * 1000);
    Array.from(parallaxEls)
      .filter((el) => el && !el.classList.contains('text'))
      .forEach((el) => {
        timeline.from(
          el,
          {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration: 3.5,
            ease: 'power3.out',
          },
          '1'
        );
      });
    timeline
      .from(
        '.text h1',
        {
          y:
            window.innerHeight -
            document.querySelector('.text h1').getBoundingClientRect().top +
            200,
          duration: 2,
        },
        '2.5'
      )
      .from(
        '.text h2',
        {
          y: -150,
          opacity: 0,
          duration: 1.5,
        },
        '3'
      )
      .from(
        '.hide',
        {
          opacity: 0,
          duration: 1.5,
        },
        '3'
      );

    function onMouseMove(e) {
      if (timeline.isActive()) return;
      xValue = e.clientX - window.innerWidth / 2;
      yValue = e.clientY - window.innerHeight / 2;
      rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
      update(e.clientX);
    }

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
    <main ref={mainRef} className="hero-main hero-desktop">
      {/* Vignette and header are omitted for now */}
      {images.map((img, i) => (
        <img
          key={img.className + i}
          ref={el => parallaxRefs.current[i] = el}
          src={img.src}
          srcSet={img.src.replace('.png', '.webp') + ' 1x'}
          className={img.className}
          data-speedx={img.data.speedx}
          data-speedy={img.data.speedy}
          data-speedz={img.data.speedz}
          data-rotation={img.data.rotation}
          data-distance={img.data.distance}
          alt=""
          style={{ pointerEvents: 'none' }}
        />
      ))}
      <div className="text parallax" data-speedx="0.07" data-speedy="0.07" data-speedz="0" data-rotation="0.11">
        <h2><span style={{
          whiteSpace: 'nowrap',
          color: '#FFFFFF',
          fontSize: '5rem',
          textShadow: `0 2px 12px rgba(0,0,0,0.45), 0 0 24px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.35)`
        }}>Crafted by Experts</span></h2>
        <img
          src="/lovable-uploads/hero_prod.webp"
          srcSet="/lovable-uploads/hero_prod.webp 1x"
          className="parallax hero-prod-img"
          data-speedx="0.05"
          data-speedy="0.12"
          data-speedz="0.2"
          data-rotation="0.08"
          data-distance="1000"
          alt="Hero Product"
          style={{ display: 'block', margin: '2rem auto 0', maxWidth: '650px', width: '100%', pointerEvents: 'none' }}
        />
        <h1 style={{ 
          color: '#ffffff', 
          textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.9), 2px 2px 0px rgba(0, 0, 0, 0.5)', 
          fontSize: '4rem',
          fontWeight: 'bold'
        }}>
          Branded By<br />You
        </h1>
      </div>
    </main>
    <main className="hero-main hero-main-mobile hero-mobile">
      <img
        src="/lovable-uploads/hero_mobile_1x.webp"
        srcSet="/lovable-uploads/hero_mobile_1x.webp 1x, /lovable-uploads/hero_mobile_2x.webp 2x, /lovable-uploads/hero_mobile_3x.webp 3x"
        alt="Crafted by Experts, Branded by You"
        className="hero-mobile-img"
      />
    </main>
    </>
  );
};

export default EnhancedHero;