import React, { useEffect, useRef } from 'react';
import { initTransitionAnimations } from '../animations/scrollAnimations';

const Transition = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cleanup = initTransitionAnimations(containerRef, textRef);
    return cleanup;
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-48 md:py-64 bg-brand-black flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-brand-deep/30 mix-blend-multiply"></div>
      
      {/* Tiny text in corner */}
      <div className="absolute top-12 left-6 md:left-12 z-20">
        <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] font-medium text-brand-beige/50 uppercase">
          02 / STORYTELLING
        </span>
      </div>

      <div className="max-w-300 mx-auto px-6 text-center relative z-10" ref={textRef}>
        <h2 
          className="font-serif text-5xl md:text-8xl lg:text-[10vw] leading-[1.1] text-brand-beige m-0 tracking-tight flex flex-col items-center"
          style={{ perspective: '1000px' }}
        >
          {/* Grouped into lines for animation */}
          <div className="line-wrapper overflow-hidden pb-2">
            EVERY FRAME
          </div>
          <div className="line-wrapper overflow-hidden">
            HAS A FEELING.
          </div>
        </h2>
      </div>
    </section>
  );
};

export default Transition;
