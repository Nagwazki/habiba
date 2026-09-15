import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 3;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      if (currentProgress === 100) {
        clearInterval(interval);
        
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
          }
        });

        // Logo moves upward
        tl.to('.preloader-logo', {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.4
        })
        // Line disappears
        .to('.preloader-line', {
          scaleX: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut'
        }, "-=0.6")
        // Number disappears
        .to('.preloader-number', {
          opacity: 0,
          duration: 0.4,
        }, "-=0.6")
        // Screen splits vertically and slides away
        .to('.preloader-panel-left', {
          xPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut'
        }, "-=0.2")
        .to('.preloader-panel-right', {
          xPercent: 100,
          duration: 1.2,
          ease: 'expo.inOut'
        }, "<")
        // Hide container
        .set('.preloader-container', { display: 'none' });
      }
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="preloader-container fixed inset-0 z-1000 flex items-center justify-center pointer-events-none">
      
      {/* Split Panels */}
      <div className="preloader-panel-left absolute left-0 top-0 w-1/2 h-full bg-brand-black border-r border-brand-dark/20"></div>
      <div className="preloader-panel-right absolute right-0 top-0 w-1/2 h-full bg-brand-black"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        <div className="preloader-logo flex flex-col items-center mb-8">
          <div className="font-serif text-5xl md:text-7xl font-bold text-brand-beige tracking-tighter mb-4">H.</div>
          <div className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-brand-beige/70 uppercase">
            HABIBA KHIDR
          </div>
        </div>
        
        <div className="flex flex-col items-center w-50">
          <div className="preloader-line w-full h-px bg-brand-dark overflow-hidden mb-4">
            <div 
              className="h-full bg-brand-beige transition-all duration-300 ease-out origin-left"
              style={{ transform: `scaleX(${progress / 100})` }}
            ></div>
          </div>
          <div className="preloader-number font-sans text-[10px] tracking-[0.3em] text-brand-beige/50">
            LOADING {progress.toString().padStart(2, '0')}%
          </div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
