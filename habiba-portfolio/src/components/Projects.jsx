import React, { useState, useEffect, useRef } from 'react';
import { initProjectsAnimations } from '../animations/projectAnimations';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const Projects = () => {
  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const hasMore = projects.length > 4;

  useEffect(() => {
    const cleanup = initProjectsAnimations(sectionRef);
    return cleanup;
  }, []);

  return (
    <section id="work" ref={sectionRef} className="w-full bg-brand-black relative pt-16 md:pt-48 pb-16 md:pb-24 border-t border-brand-dark/20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32">
          <div>
            <div className="flex items-start gap-4 mb-4">
              <span className="font-serif text-2xl text-brand-warm">02 /</span>
              <h3 className="font-sans text-xs tracking-[0.3em] font-medium text-brand-beige uppercase mt-1">Selected Work</h3>
            </div>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.9] text-brand-beige m-0 tracking-tighter">
              WORK<br/>THAT<br/>SPEAKS.
            </h2>
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="flex flex-col w-full">
          {/* Row 1 */}
          <div className="flex flex-row w-full gap-4 md:gap-24">
            {projects[0] && (
              <ProjectCard 
                project={projects[0]} 
                layoutClass="w-[55%] md:w-[65%]" 
                imageClass="aspect-[4/3]"
              />
            )}
            {projects[1] && (
              <ProjectCard 
                project={projects[1]} 
                layoutClass="w-[40%] md:w-[35%] mt-16 md:mt-48" 
                imageClass="aspect-[3/4]"
              />
            )}
          </div>

          {/* Row 2 */}
          <div className="flex flex-row w-full gap-4 md:gap-24 -mt-4 md:-mt-32">
            {projects[2] && (
              <ProjectCard 
                project={projects[2]} 
                layoutClass="w-[40%] md:w-[35%]" 
                imageClass="aspect-square"
              />
            )}
            {projects[3] && (
              <ProjectCard 
                project={projects[3]} 
                layoutClass="w-[55%] md:w-[65%] mt-24 md:mt-64" 
                imageClass="aspect-video"
              />
            )}
          </div>
          
          {/* More Projects */}
          {showAll && hasMore && (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-24 mt-8 md:mt-24">
              {projects.slice(4).map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project} 
                  layoutClass="w-full" 
                  imageClass="aspect-video"
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        {hasMore && !showAll && (
          <div className="flex justify-center md:justify-end mt-12 md:mt-32">
            <button 
              onClick={() => setShowAll(true)}
              className="font-sans text-xs tracking-widest text-brand-beige/60 hover:text-brand-cream transition-colors group flex items-center gap-4 cursor-pointer"
            >
              VIEW ALL
              <span className="w-12 h-px bg-brand-beige/30 group-hover:bg-brand-cream transition-colors"></span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
