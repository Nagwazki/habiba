import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initProjectsAnimations = (sectionRef) => {
  const ctx = gsap.context(() => {
    
    // Animate projects coming into view
    const projects = gsap.utils.toArray('.editorial-project');
    projects.forEach((proj) => {
      gsap.fromTo(proj, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: proj,
            start: 'top 85%',
          }
        }
      );

      // Parallax image slightly inside container
      const img = proj.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: proj,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

  }, sectionRef);

  return () => ctx.revert();
};

export const handleProjectHover = (e, isEnter) => {
  const imgContainer = e.currentTarget.querySelector('.img-container');
  const img = e.currentTarget.querySelector('img');
  const title = e.currentTarget.querySelector('.project-title');
  const arrow = e.currentTarget.querySelector('.project-arrow');
  const grain = e.currentTarget.querySelector('.hover-grain');

  if (isEnter) {
    gsap.to(img, { scale: 1.08, duration: 0.8, ease: 'power3.out' });
    if (title) gsap.to(title, { x: 15, duration: 0.5, ease: 'power2.out' });
    if (arrow) gsap.to(arrow, { rotation: 45, duration: 0.4, ease: 'power2.out' });
    if (grain) gsap.to(grain, { opacity: 0.15, duration: 0.4 });
  } else {
    gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out' });
    if (title) gsap.to(title, { x: 0, duration: 0.5, ease: 'power2.out' });
    if (arrow) gsap.to(arrow, { rotation: 0, duration: 0.4, ease: 'power2.out' });
    if (grain) gsap.to(grain, { opacity: 0, duration: 0.4 });
  }
};
