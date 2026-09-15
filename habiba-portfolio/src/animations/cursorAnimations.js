import gsap from 'gsap';

export const initCursor = (cursorRef, textRef, isMobile) => {
  if (isMobile || !cursorRef.current || !textRef.current) return () => {};

  const cursor = cursorRef.current;
  const text = textRef.current;
  
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  const moveCursor = (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15,
      ease: 'power2.out'
    });
  };

  const handleMouseOver = (e) => {
    const target = e.target;
    const interactiveText = target.getAttribute('data-cursor-text');
    
    if (interactiveText) {
      text.innerText = interactiveText;
      gsap.to(cursor, {
        scale: 4,
        backgroundColor: '#65443A', // Warm brown
        mixBlendMode: 'normal',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(text, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'transparent',
        border: '1px solid #E8D8C4', // Beige
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseOut = (e) => {
    const target = e.target;
    if (target.getAttribute('data-cursor-text')) {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#E8D8C4',
        mixBlendMode: 'difference',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(text, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#E8D8C4',
        border: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  window.addEventListener('mousemove', moveCursor);
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);

  return () => {
    window.removeEventListener('mousemove', moveCursor);
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
  };
};
