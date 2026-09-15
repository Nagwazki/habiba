import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initAboutAnimations = (sectionRef, textRef, imageRef) => {
  const ctx = gsap.context(() => {
    // Image Parallax
    gsap.to('.about-img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Text reveal
    if (textRef.current) {
      const texts = textRef.current.querySelectorAll('.reveal-text');
      texts.forEach((text) => {
        gsap.fromTo(text, 
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: text,
              start: 'top 90%',
            }
          }
        );
      });
    }
    
    // Annotations appear
    if (imageRef.current) {
      gsap.fromTo('.annotation', 
        { opacity: 0, scale: 0.8, rotation: -10 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 1, 
          stagger: 0.3,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 60%',
          }
        }
      );
    }
  }, sectionRef);

  return () => ctx.revert();
};

export const initTransitionAnimations = (containerRef, textRef) => {
  const ctx = gsap.context(() => {
    const lines = textRef.current.querySelectorAll('.line-wrapper');
    
    gsap.fromTo(lines, 
      { 
        opacity: 0,
        y: 40,
        rotateX: -20,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        stagger: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
    
    // Subtle scale on scroll
    gsap.to(textRef.current, {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, containerRef);

  return () => ctx.revert();
};
