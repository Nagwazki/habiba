import gsap from 'gsap';

export const initHeroAnimations = (refs) => {
  const { bgRef, title1Ref, title2Ref, title3Ref, descRef, btnRef, scrollRef, imgRef } = refs;
  
  // Delay animation until preloader finishes (approx 2s + initial loading)
  const tl = gsap.timeline({ delay: 3.5 });

  // Background scale down (if bg image is used)
  if (bgRef.current) {
    gsap.set(bgRef.current, { scale: 1.1 });
    tl.to(bgRef.current, {
      scale: 1,
      duration: 2,
      ease: 'power3.out'
    }, 0);
  }

  // Right side image moves into position
  if (imgRef.current) {
    gsap.set(imgRef.current, { x: 100, opacity: 0 });
    tl.to(imgRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power3.out'
    }, 0.5);
  }

  // Title 1 "VIDEO EDITOR" fade up
  if (title1Ref.current) {
    tl.fromTo(title1Ref.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.5
    );
  }

  // Title 2 "HABIBA" reveal from mask
  if (title2Ref.current) {
    tl.fromTo(title2Ref.current.querySelectorAll('.char'),
      { y: '100%' },
      { y: '0%', duration: 1, stagger: 0.05, ease: 'expo.out' },
      0.7
    );
  }

  // Title 3 "MONTAJER" reveal from mask
  if (title3Ref.current) {
    tl.fromTo(title3Ref.current.querySelectorAll('.char'),
      { y: '-100%' },
      { y: '0%', duration: 1, stagger: 0.05, ease: 'expo.out' },
      0.9
    );
  }

  // Description fade
  if (descRef.current) {
    tl.fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      1.5
    );
  }

  // Button reveal
  if (btnRef.current) {
    tl.fromTo(btnRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' },
      1.7
    );
  }

  // Scroll indicator
  if (scrollRef.current) {
    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      2
    );

    gsap.to(scrollRef.current.querySelector('.arrow'), {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    });
  }

  // Parallax effect on mouse move for the right image
  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    gsap.to(imgRef.current, {
      x,
      y,
      duration: 1,
      ease: 'power2.out'
    });
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    tl.kill();
  };
};
