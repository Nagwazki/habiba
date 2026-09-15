import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ToolsMarquee = () => {
  const marqueeRef = useRef(null);
  
  const tools = [
    'PREMIERE PRO',
    'DAVINCI RESOLVE',
    'CAPCUT',
    'PHOTOSHOP'
  ];

  useEffect(() => {
    // Continuous marquee animation
    const tl = gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1
    });

    return () => tl.kill();
  }, []);

  return (
    <section className="w-full bg-brand-black py-8 md:py-16 border-t border-brand-dark/20 overflow-hidden relative">
      <div className="absolute top-0 left-6 md:left-12 -translate-y-1/2 bg-brand-black px-4">
        <span className="font-sans text-[10px] tracking-widest text-brand-beige/50 uppercase">
        </span>
      </div>
      
      <div className="w-full flex">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap items-center"
          style={{ width: 'fit-content' }}
        >
          {/* Double the items for seamless loop */}
          {[...tools, ...tools, ...tools].map((tool, index) => (
            <div key={index} className="flex items-center">
              <span className="font-serif text-3xl md:text-5xl font-light tracking-widest text-brand-beige px-6 md:px-16 uppercase">
                {tool}
              </span>
              <span className="w-4 md:w-8 h-px bg-brand-beige/30"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
