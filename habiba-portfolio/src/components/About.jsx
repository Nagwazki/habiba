import React, { useEffect, useRef } from 'react';
import { initAboutAnimations } from '../animations/scrollAnimations';

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const cleanup = initAboutAnimations(sectionRef, textRef, imageRef);
    return cleanup;
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full py-16 md:py-48 bg-brand-black relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        
        {/* Left: Text Content (5 cols) */}
        <div ref={textRef} className="md:col-span-5 flex flex-col justify-center order-2 md:order-1 pt-8 md:pt-0">
          <div className="flex items-start gap-4 mb-12 reveal-text">
            <h3 className="font-sans text-xs tracking-[0.3em] font-medium text-brand-beige uppercase mt-2">
              <span className="mr-3 text-brand-warm">01 /</span> ABOUT ME
            </h3>
          </div>

          <h2 className="font-serif text-4xl md:text-7xl lg:text-[5.5vw] leading-[1.05] text-brand-beige mb-8 md:mb-12 reveal-text tracking-tight">
            I'M HABIBA,<br/>
            A VIDEO EDITOR<br/>
            & CREATIVE MIND.
          </h2>

          <p className="font-sans text-base md:text-lg text-brand-beige/80 max-w-sm leading-relaxed reveal-text">
            I turn ideas, moments and emotions into visuals that tell a story. I'm passionate about rhythm, atmosphere, pacing and finding the emotion hidden inside every frame.
          </p>

          <div className="mt-12 reveal-text">
            <a href="#contact" className="inline-flex items-center gap-4 font-sans text-xs tracking-[0.2em] font-bold text-brand-beige hover:text-brand-warm transition-colors group">
              MORE ABOUT ME
              <span className="w-8 h-px bg-brand-beige group-hover:bg-brand-warm group-hover:w-12 transition-all duration-300"></span>
            </a>
          </div>
        </div>

        {/* Space col */}
        <div className="hidden md:block md:col-span-1 order-0"></div>

        {/* Right: Editorial Image (6 cols) */}
        <div className="md:col-span-6 relative w-full h-[40vh] md:h-[80vh] order-1 md:order-2">
          <div className="relative w-full h-full overflow-visible" ref={imageRef}>
            
            <div className="absolute inset-0 overflow-hidden bg-brand-deep rounded-sm transform -rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2071&auto=format&fit=crop" 
                alt="Habiba Editing" 
                className="about-img absolute inset-0 w-full h-[120%] object-cover object-center top-[-10%] opacity-90 mix-blend-luminosity"
                data-cursor-text="VIEW"
              />
              {/* Subtle color overlay */}
              <div className="absolute inset-0 bg-brand-warm mix-blend-overlay opacity-40"></div>
            </div>

            {/* Annotations */}
            <div className="annotation absolute -top-8 -right-4 md:-right-12 z-20 font-serif italic text-2xl md:text-3xl text-brand-beige transform rotate-[5deg]">
              good edits<br/>take time.
            </div>
            
            <div className="annotation absolute bottom-12 -left-4 md:-left-8 z-20">
              {/* SVG drawn arrow */}
              <svg width="40" height="40" viewBox="0 0 100 100" className="text-brand-warm transform rotate-[-20deg]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 90 Q 50 10 90 30 M 70 20 L 90 30 L 80 50" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="annotation absolute bottom-4 -right-4 z-20 font-sans text-[10px] uppercase tracking-widest text-brand-black bg-brand-beige border border-brand-warm px-3 py-1 -rotate-3">
              SCENE 01 / TAKE 01
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
