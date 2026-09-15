import React, { useEffect, useRef } from 'react';
import { initHeroAnimations } from '../animations/heroAnimations';

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const title3Ref = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const scrollRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const cleanup = initHeroAnimations({
      bgRef, title1Ref, title2Ref, title3Ref, descRef, btnRef, scrollRef, imgRef
    });
    return cleanup;
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">{char}</span>
    ));
  };

  return (
    <section id="home" ref={heroRef} className="relative w-full min-h-svh overflow-hidden bg-brand-black flex flex-col justify-start md:justify-center pt-0 pb-16 md:pb-0">
      
      {/* Background (Optional, kept dark per new specs) */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-brand-black"
      ></div>

      {/* Content Container: 45/55 split */}
      <div className="relative z-10 w-full flex-1 flex flex-col md:flex-row">
        
        {/* Left Side: 45% (Text) - Bottom on mobile, Left on desktop */}
        <div className="w-full md:w-[45%] flex-1 md:h-full flex flex-col justify-center px-4 md:px-12 xl:px-24 pb-8 md:pb-32 pt-8 md:pt-32 order-2 md:order-1">
          
          <div className="flex flex-col relative w-full mb-8">
            <div className="overflow-hidden leading-[0.85] -ml-1 md:-ml-2">
              <h1 
                ref={title2Ref}
                className="font-serif text-[12vw] md:text-[8vw] font-bold text-brand-beige m-0 tracking-tight"
              >
                {splitText('HABIBA')}
              </h1>
            </div>
            {/* Khidr can extend beyond container on desktop */}
            <div className="overflow-hidden leading-[0.85] -ml-1 md:-ml-2 md:w-[150%] relative z-20 mix-blend-difference mb-6">
              <h1 
                ref={title3Ref}
                className="font-serif text-[12vw] md:text-[8vw] font-bold text-brand-cream m-0 tracking-tight"
              >
                {splitText('KHIDR')}
              </h1>
            </div>
            
            <h2 
              ref={title1Ref}
              className="opacity-0 font-sans text-sm md:text-base tracking-[0.6em] text-brand-warm uppercase mb-6 pl-1"
            >
              Monter
            </h2>
          </div>

          <p ref={descRef} className="opacity-0 font-sans text-xs md:text-sm tracking-[0.2em] text-brand-beige/70 uppercase max-w-sm mb-6 leading-relaxed border-l border-brand-warm pl-4">
            Turning raw footage<br/>into stories that feel.
          </p>
          
          {/* Scroll Indicator */}
          <div ref={scrollRef} className="opacity-0 flex items-center gap-3 mb-12">
            <span className="font-sans text-[10px] tracking-[0.3em] text-brand-beige/60 uppercase">
              Scroll
            </span>
            <div className="flex flex-col items-center mt-1">
              <div className="w-px h-6 bg-brand-beige/40"></div>
              <div className="w-2 h-2 border-b border-r border-brand-beige/40 transform rotate-45 -mt-1"></div>
            </div>
          </div>

          <div ref={btnRef} className="opacity-0">
            <a 
              href="#work" 
              className="group relative inline-flex items-center gap-3 font-sans text-xs tracking-widest text-brand-beige hover:text-brand-cream transition-colors"
              data-cursor-text="WATCH"
            >
              <div className="w-10 h-10 rounded-full border border-brand-beige flex items-center justify-center group-hover:bg-brand-beige group-hover:text-brand-black transition-all duration-300">
                <span className="transform translate-x-px">▶</span>
              </div>
              <span className="uppercase font-bold">WATCH REEL</span>
            </a>
          </div>

        </div>

        {/* Right Side: 55% (Image) - Top on mobile, Right on desktop */}
        <div className="w-full md:w-[55%] h-[50vh] md:h-full relative overflow-hidden mb-8 md:mb-0 order-1 md:order-2">
          <div className="absolute inset-0 bg-brand-deep/20 z-10 mix-blend-multiply pointer-events-none"></div>
          
          <img 
            ref={imgRef}
            src="/photo/hero.JPG" 
            alt="Habiba Khidr" 
            className="w-full h-full object-cover object-top md:object-center"
          />

          {/* Vertical Text Overlay */}
          <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 mix-blend-difference pointer-events-none hidden md:block">
            <p className="font-sans text-xs tracking-[0.4em] text-brand-cream uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              EDIT • CREATE • FEEL • REPEAT
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;