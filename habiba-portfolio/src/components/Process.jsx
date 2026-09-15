import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const steps = [
    { num: '01', title: 'RAW FOOTAGE', desc: 'Finding the hidden gems in the raw material.' },
    { num: '02', title: 'THE EDIT', desc: 'Building the foundation. Cutting for rhythm and emotion.' },
    { num: '03', title: 'THE POLISH', desc: 'Color grading, sound design, and refining the narrative.' },
    { num: '04', title: 'FINAL CUT', desc: 'The finished piece, ready to be experienced.' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical line progress
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );

      // Animate each step and dim the others
      const stepElements = gsap.utils.toArray('.process-step');
      
      stepElements.forEach((step, i) => {
        gsap.to(step, {
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleClass: 'is-active',
            onEnter: () => {
              gsap.to(step, { opacity: 1, duration: 0.5 });
              if (i > 0) gsap.to(stepElements[i-1], { opacity: 0.3, duration: 0.5 });
            },
            onEnterBack: () => {
              gsap.to(step, { opacity: 1, duration: 0.5 });
              if (i < stepElements.length - 1) gsap.to(stepElements[i+1], { opacity: 0.3, duration: 0.5 });
            }
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-48 bg-brand-black relative">
      <div className="max-w-350 mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between">
        
        {/* Left Side: Header */}
        <div className="w-full md:w-1/3 sticky top-32 self-start mb-16 md:mb-0">
          <div className="flex items-start gap-4 mb-6">
            <span className="font-serif text-xl text-brand-warm">04 /</span>
            <h3 className="font-sans text-xs tracking-[0.3em] font-medium text-brand-beige uppercase mt-1">Process</h3>
          </div>
          <h2 className="font-serif text-4xl md:text-7xl leading-none text-brand-beige m-0 tracking-tighter">
            FROM RAW<br/>TO FINAL.
          </h2>
        </div>

        {/* Right Side: Timeline */}
        <div className="w-full md:w-1/2 relative pb-16 md:pb-32">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-brand-dark overflow-hidden z-0">
            <div ref={lineRef} className="w-full h-full bg-brand-warm origin-top"></div>
          </div>

          <div className="flex flex-col gap-16 md:gap-32">
            {steps.map((step, index) => (
              <div key={index} className="process-step opacity-30 transition-opacity flex items-start gap-6 md:gap-16 relative z-10">
                
                {/* Number / Dot */}
                <div className="shrink-0 flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-full bg-brand-black border border-brand-warm/50 -mt-1 md:-mt-4">
                  <span className="font-serif text-lg md:text-2xl text-brand-warm">{step.num}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <h3 className="font-sans text-xl md:text-4xl font-bold tracking-tight text-brand-beige mb-2 md:mb-6 uppercase">
                    {step.title}
                  </h3>
                  <p className="font-serif text-brand-cream/70 text-base md:text-xl italic font-light leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
