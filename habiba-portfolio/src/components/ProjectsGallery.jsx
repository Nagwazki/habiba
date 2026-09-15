import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectsGallery = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // We only want horizontal scroll on desktop/tablet
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const scrollContainer = scrollContainerRef.current;
      const sections = gsap.utils.toArray('.project-card');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut"
          },
          // Adjust end value to control scroll distance/speed
          end: () => "+=" + scrollContainer.offsetWidth
        }
      });
    });

    return () => mm.revert();
  }, []);

  const handleMouseEnter = (e) => {
    const img = e.currentTarget.querySelector('img');
    const title = e.currentTarget.querySelector('.project-title');
    const overlay = e.currentTarget.querySelector('.project-overlay');
    
    gsap.to(img, { scale: 1.05, duration: 0.8, ease: 'power3.out' });
    gsap.to(title, { x: 10, duration: 0.5, ease: 'power2.out' });
    gsap.to(overlay, { opacity: 0.4, duration: 0.5 });
  };

  const handleMouseLeave = (e) => {
    const img = e.currentTarget.querySelector('img');
    const title = e.currentTarget.querySelector('.project-title');
    const overlay = e.currentTarget.querySelector('.project-overlay');

    gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out' });
    gsap.to(title, { x: 0, duration: 0.5, ease: 'power2.out' });
    gsap.to(overlay, { opacity: 0.2, duration: 0.5 });
  };

  return (
    <section id="work" ref={sectionRef} className="w-full bg-brand-black relative overflow-hidden md:h-svh flex flex-col pt-24 md:pt-32">
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 mb-12 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <span className="font-serif text-2xl text-brand-warm">2.</span>
              <h3 className="font-sans text-xs tracking-[0.3em] font-medium text-brand-beige uppercase mt-1">Selected Work</h3>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] text-brand-beige m-0">
              Projects<br/>that tell<br/>stories.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-brand-beige/50 text-xs font-sans tracking-widest uppercase">
            <span>Scroll</span>
            <div className="w-12 h-px bg-brand-beige/30"></div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef} 
        className="flex md:h-full w-full md:w-[400vw] flex-col md:flex-row gap-12 md:gap-0 px-6 md:px-0 pb-24 md:pb-0"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card w-full md:w-screen shrink-0 flex items-center justify-center md:px-24"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-cursor-text="PLAY"
          >
            <div className="w-full max-w-300 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              
              {/* Image */}
              <div className="md:col-span-7 relative aspect-4/5 md:aspect-video overflow-hidden rounded-sm group">
                <div className="project-overlay absolute inset-0 bg-brand-deep opacity-20 z-10 transition-opacity mix-blend-multiply"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <span className="font-serif text-4xl text-brand-warm/60 mb-6">{project.number}</span>
                
                <h3 className="project-title font-serif text-4xl md:text-5xl text-brand-beige mb-6 font-bold tracking-tight">
                  {project.title}
                </h3>
                
                <p className="font-sans text-brand-beige/70 text-lg mb-8 leading-relaxed max-w-md">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="font-sans text-[10px] tracking-widest text-brand-cream border border-brand-warm/30 px-3 py-1.5 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
                
                <div>
                  <button className="group relative inline-flex items-center gap-4 font-sans text-xs tracking-[0.2em] font-bold text-brand-beige">
                    VIEW PROJECT
                    <span className="w-8 h-px bg-brand-beige group-hover:w-12 transition-all duration-300"></span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsGallery;
