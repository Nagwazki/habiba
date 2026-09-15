import React from 'react';
import { handleProjectHover } from '../animations/projectAnimations';

const ProjectCard = ({ project, layoutClass, imageClass }) => {
  return (
    <div 
      className={`editorial-project w-full flex flex-col ${layoutClass} mb-16 md:mb-32 group cursor-pointer`}
      onMouseEnter={(e) => handleProjectHover(e, true)}
      onMouseLeave={(e) => handleProjectHover(e, false)}
      data-cursor-text="PLAY"
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-2 md:mb-6 gap-1 md:gap-4">
        <span className="font-serif text-sm md:text-2xl text-brand-warm/60">{project.number}</span>
        
        <div className="flex flex-col md:items-end">
          <h3 className="project-title font-serif text-base md:text-5xl text-brand-beige font-bold tracking-tight uppercase leading-tight">
            {project.title}
          </h3>
          <span className="font-sans text-[8px] md:text-[10px] tracking-widest text-brand-beige/50 uppercase mt-1 md:mt-2">
            {project.category}
          </span>
        </div>
      </div>

      <div className={`img-container relative overflow-hidden rounded-sm bg-brand-deep ${imageClass}`}>
        {/* Subtle noise on hover */}
        <div className="hover-grain absolute inset-0 z-20 pointer-events-none opacity-0 mix-blend-overlay"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E")' }}>
        </div>
        
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-[120%] object-cover object-center transform translate-y-[-10%]"
        />
        
        <div className="absolute inset-0 bg-brand-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>

      <div className="mt-4 md:mt-6 flex justify-between items-center">
        <div className="hidden md:flex gap-4">
          {project.tools.slice(0, 2).map((tool, i) => (
            <span key={i} className="font-sans text-[10px] tracking-widest text-brand-beige/60 uppercase border border-brand-dark px-3 py-1">
              {tool}
            </span>
          ))}
        </div>
        
        <button className="flex items-center gap-1 md:gap-3 font-sans text-[8px] md:text-xs tracking-widest font-bold text-brand-beige group-hover:text-brand-cream transition-colors">
          <span className="hidden md:inline-block">VIEW PROJECT</span>
          <span className="md:hidden">VIEW</span>
          <svg className="project-arrow w-3 h-3 md:w-4 md:h-4 text-brand-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
