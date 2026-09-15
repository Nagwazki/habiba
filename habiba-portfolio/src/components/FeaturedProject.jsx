import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProject = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.featured-img',
        { scale: 1.1 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-brand-black py-32 md:py-48 overflow-hidden relative">
      <div className="max-w-[1800px] w-full mx-auto px-0 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
        
        {/* Left: Huge Image (8 cols = ~65%) */}
        <div className="md:col-span-8 relative w-full h-[60vh] md:h-[90vh] overflow-hidden -ml-6 md:-ml-12" data-cursor-text="PLAY">
          <div className="absolute inset-0 bg-brand-black/20 z-10"></div>
          <video 
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            autoPlay 
            loop 
            muted 
            playsInline
            className="featured-img w-full h-full object-cover object-center"
          ></video>
        </div>

        {/* Right: Info (4 cols = ~35%) */}
        <div className="md:col-span-4 flex flex-col justify-center px-6 md:px-0">
          <div className="font-serif text-3xl text-brand-warm/60 mb-8">01</div>
          
          <h4 className="font-sans text-[10px] tracking-widest text-brand-beige/50 uppercase mb-4">
            FEATURED PROJECT
          </h4>
          
          <h3 className="font-serif text-5xl md:text-6xl text-brand-beige font-bold tracking-tight uppercase mb-8">
            CINEMATIC EDIT
          </h3>
          
          <p className="font-serif text-xl md:text-2xl text-brand-cream/80 italic font-light mb-12 leading-relaxed">
            "An atmospheric edit built around rhythm, emotion and visual storytelling."
          </p>
          
          <div className="mb-16">
            <h5 className="font-sans text-[10px] tracking-widest text-brand-beige/40 uppercase mb-6">TOOLS:</h5>
            <div className="flex flex-col gap-4">
              {['PREMIERE PRO', 'AFTER EFFECTS', 'DAVINCI'].map((tool, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-4 h-px bg-brand-warm"></span>
                  <span className="font-sans text-xs tracking-widest text-brand-beige uppercase">{tool}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="group relative inline-flex items-center gap-4 font-sans text-xs tracking-[0.2em] font-bold text-brand-warm hover:text-brand-beige transition-colors">
            VIEW PROJECT
            <span className="w-12 h-px bg-brand-warm group-hover:bg-brand-beige group-hover:w-16 transition-all duration-300"></span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProject;
