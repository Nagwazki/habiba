import React, { useEffect, useRef, useState } from 'react';
import { initCursor } from '../animations/cursorAnimations';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
      return;
    }
    const cleanup = initCursor(cursorRef, textRef, isMobile);
    return cleanup;
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-brand-beige rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <span 
        ref={textRef} 
        className="text-[4px] font-sans font-bold text-brand-cream opacity-0 tracking-widest uppercase"
      ></span>
    </div>
  );
};

export default CustomCursor;
