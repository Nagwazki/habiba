import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Skills = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsList = [
    { num: '01', name: 'VIDEO EDITING', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2940&auto=format&fit=crop' },
    { num: '02', name: 'COLOR GRADING', img: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=2787&auto=format&fit=crop' },
    { num: '03', name: 'SOUND DESIGN', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop' },
    { num: '04', name: 'SHORT FORM', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop' },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imgRef.current) return;
      // Animate image towards cursor
      gsap.to(imgRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = (skill) => {
    setHoveredSkill(skill);
    gsap.to(imgRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
    gsap.to(imgRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <section id="expertise" className="w-full py-16 md:py-48 bg-brand-black relative overflow-hidden" ref={containerRef}>
      
      {/* Floating Image */}
      <div 
        ref={imgRef}
        className="fixed top-0 left-0 w-100 aspect-4/3 pointer-events-none z-0 opacity-0 scale-80 overflow-hidden rounded-sm hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <img 
          src={hoveredSkill?.img || skillsList[0].img} 
          alt="Skill preview" 
          className="w-full h-full object-cover object-center filter grayscale contrast-125 mix-blend-lighten opacity-30"
        />
      </div>

      <div className="max-w-350 mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 md:mb-32">
          <h3 className="font-sans text-xs tracking-[0.3em] font-medium text-brand-beige uppercase mb-6">
            03 / Expertise
          </h3>
          <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] text-brand-cream m-0 tracking-tighter">
            WHAT I<br/>DO BEST.
          </h2>
        </div>

        <div className="flex flex-col border-t border-brand-warm/20">
          {skillsList.map((skill, index) => (
            <div 
              key={index} 
              className="skill-row group flex items-center gap-4 md:gap-16 py-6 md:py-12 border-b border-brand-warm/20 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(skill)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="font-serif text-xl md:text-4xl text-brand-beige/40 group-hover:text-brand-warm transition-colors duration-300">
                {skill.num}
              </span>
              <span className="hidden md:block w-8 md:w-16 h-px bg-brand-beige/20 group-hover:w-24 group-hover:bg-brand-warm transition-all duration-500 ease-out"></span>
              <h3 className="font-serif text-3xl md:text-7xl font-bold tracking-tight text-brand-beige group-hover:text-brand-cream transition-all duration-300 transform group-hover:translate-x-4 ease-out">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
