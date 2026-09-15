import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to('.mobile-menu', {
        yPercent: 100,
        duration: 0.8,
        ease: 'expo.inOut'
      });
      gsap.fromTo('.mobile-link', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to('.mobile-menu', {
        yPercent: 0, // Moves back to -100% basically, see CSS class below
        duration: 0.8,
        ease: 'expo.inOut'
      });
    }
  }, [menuOpen]);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'WORK', href: '#work' },
    { name: 'SKILLS', href: '#expertise' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-4 bg-brand-black/90 backdrop-blur-md border-b border-brand-dark/30' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center mix-blend-difference">
          
          {/* LEFT */}
          <div className="w-1/3 flex justify-start">
            <a href="#home" className="font-serif text-3xl md:text-4xl font-bold text-brand-beige hover:opacity-70 transition-opacity">
              H.
            </a>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex w-1/3 justify-center items-center space-x-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="font-sans text-[10px] tracking-[0.25em] font-medium text-brand-beige hover:text-brand-cream transition-colors relative group uppercase pb-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-px bg-brand-cream transform scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"></span>
              </a>
            ))}
          </div>

          {/* RIGHT */}
          <div className="w-1/3 flex justify-end">
            <button 
              className="flex md:hidden items-center gap-3 font-sans text-[10px] tracking-widest text-brand-beige hover:text-brand-cream focus:outline-none uppercase group"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-10 h-10 rounded-full border border-brand-beige/30 flex flex-col justify-center items-center gap-1 group-hover:bg-brand-beige group-hover:text-brand-black transition-colors">
                <span className={`w-4 h-px transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.25 bg-brand-black' : 'bg-brand-beige group-hover:bg-brand-black'}`}></span>
                <span className={`w-4 h-px transition-opacity duration-300 ${menuOpen ? 'opacity-0 bg-brand-black' : 'opacity-100 bg-brand-beige group-hover:bg-brand-black'}`}></span>
                <span className={`w-4 h-px transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.25 bg-brand-black' : 'bg-brand-beige group-hover:bg-brand-black'}`}></span>
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu md:hidden fixed top-0 left-0 w-full h-svh bg-brand-black z-40 -translate-y-full flex flex-col justify-center px-12 pt-20">
        <div className="flex flex-col space-y-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="mobile-link overflow-hidden font-serif text-5xl text-brand-beige hover:text-brand-warm transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="mobile-link mt-16 font-sans text-[10px] tracking-widest text-brand-beige/50 uppercase">
          <p>Habiba Khidr</p>
          <p className="mt-2">Creative Video Editor</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
