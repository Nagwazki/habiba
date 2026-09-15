import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const filmStripRef = useRef(null);

  useEffect(() => {
    // Film-strip continuous movement
    const tl = gsap.to(filmStripRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1
    });

    // Reveal footer gently with a parallax effect
    const ctx = gsap.context(() => {
      // The whole footer moves down slightly and parallaxes up as you scroll to it
      gsap.fromTo(footerRef.current, 
        { yPercent: -30 }, 
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );

      gsap.fromTo('.footer-reveal', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, footerRef);

    return () => {
      tl.kill();
      ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-brand-black relative overflow-hidden py-16 md:py-24 border-t border-brand-dark">
      
      {/* Moving Film-strip Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200%] h-48 opacity-[0.03] pointer-events-none flex" ref={filmStripRef}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex-1 border-r-4 border-brand-beige h-full mx-8"></div>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top */}
        <div className="flex flex-col items-center text-center mb-24 footer-reveal">
          <div className="font-serif text-5xl md:text-8xl font-bold text-brand-beige tracking-tighter mb-4">H.</div>
          <div className="font-sans text-xs tracking-[0.4em] text-brand-beige/60 uppercase">Habiba Khidr</div>
        </div>

        {/* Center Quote */}
        <div className="text-center mb-16 footer-reveal">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-cream italic font-light tracking-tight leading-snug">
            "GOOD EDITS.<br/>BETTER STORIES."
          </h2>
        </div>

        {/* Thin Line */}
        <div className="w-full h-px bg-brand-dark/50 mb-12 footer-reveal"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-brand-beige/40 font-sans text-[10px] tracking-widest uppercase footer-reveal">
          <div className="flex items-center gap-8">
            <p>© {new Date().getFullYear()} HABIBA KHIDR</p>
            <p className="hidden md:block">ALL RIGHTS RESERVED</p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#home" className="hover:text-brand-beige transition-colors">BACK TO TOP ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
