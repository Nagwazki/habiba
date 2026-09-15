import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [whatsappMsg, setWhatsappMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@habibamontajer.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const phone = "201000000000"; // TODO: Replace with your actual WhatsApp number including country code
    const text = encodeURIComponent(whatsappMsg || "Hi Habiba, I have a story in mind...");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle sequence reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // 1. Top label
      tl.fromTo('.habiba-contact-top-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
      // 2. Headline
      .fromTo('.habiba-contact-headline-line',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        "-=0.4"
      )
      // 3. Description
      .fromTo('.habiba-contact-desc',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.4"
      )
      // 4. Email
      .fromTo('.habiba-contact-email-block',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.4"
      )
      // 5. Socials
      .fromTo('.habiba-contact-social-row',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        "-=0.2"
      )

      // 7. CTA
      .fromTo('.habiba-contact-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        "-=0.4"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { num: '01', name: 'INSTAGRAM' },
    { num: '02', name: 'TIKTOK' },
    { num: '03', name: 'BEHANCE' },
    { num: '04', name: 'LINKEDIN' }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="habiba-contact-section w-full min-h-[100vh] relative overflow-hidden py-24 md:py-32 z-10"
      style={{ backgroundColor: '#2F1D16' }}
    >
      
      {/* Subtle Grid Lines (Barely visible) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-0 bottom-0 left-[20px] md:left-[10%] w-px bg-[#0B0A09]"></div>
        <div className="absolute top-0 bottom-0 right-[20px] md:right-[10%] w-px bg-[#0B0A09]"></div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-[20px] md:px-[40px] lg:px-12 relative z-10 flex flex-col h-full justify-between">
        
        {/* TOP ROW: Labels */}
        <div className="habiba-contact-top-label flex flex-col md:flex-row items-start md:items-center justify-between mb-16 md:mb-24 gap-6">
          <div className="flex items-center gap-4">
            <h3 className="font-sans text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-medium text-[#F3EBDD] uppercase">
              05 / CONTACT
            </h3>
            <span className="w-12 md:w-24 h-px bg-[#65443A] hidden md:block"></span>
          </div>
          <p className="font-sans text-[10px] md:text-xs text-[#E8D8C4] uppercase tracking-widest">
            AVAILABLE FOR SELECTED PROJECTS — 2026
          </p>
        </div>

        {/* MIDDLE ROW: Desktop Grid (Mobile Stacked) */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-16 md:gap-12 mb-16 md:mb-24">
          
          {/* Left Column: Headline & Description */}
          <div className="habiba-contact-header md:col-span-7 flex flex-col justify-start">
            <h2 
              className="habiba-contact-title font-serif text-[#F3EBDD] tracking-tighter leading-[0.95] mb-8" 
              style={{ fontSize: 'clamp(3rem, 10vw, 7.5rem)' }}
            >
              <span className="block habiba-contact-headline-line">LET'S MAKE</span>
              <span className="block habiba-contact-headline-line">SOMETHING</span>
              <span className="block habiba-contact-headline-line italic text-[#E8D8C4]">WORTH WATCHING.</span>
            </h2>
            <p className="habiba-contact-desc font-sans text-sm md:text-base text-[#E8D8C4] max-w-[420px] leading-relaxed">
              Available for selected editing, visual storytelling and creative projects.
            </p>
          </div>

          {/* Right Column: Email & Socials */}
          <div className="habiba-contact-details md:col-span-5 flex flex-col justify-start md:pt-4 lg:pl-12">
            
            <div className="habiba-contact-email-block mb-16 md:mb-24">
              <h4 className="font-sans text-[10px] md:text-xs tracking-widest text-[#E8D8C4]/70 uppercase mb-4">START A CONVERSATION</h4>
              <div 
                className="group relative cursor-pointer inline-flex items-center gap-4 py-2" 
                onClick={handleCopy}
              >
                <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#F3EBDD] tracking-wide transition-transform duration-300 group-hover:translate-x-2 whitespace-nowrap">
                  {copied ? 'COPIED ✓' : 'hello@habibamontajer.com'}
                </span>
                <span className="text-[#F3EBDD] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:inline-block">
                  →
                </span>
                {/* Thin underline expanding */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-[#E8D8C4]/30 overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-full bg-[#F3EBDD] transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
                </div>
              </div>
            </div>

            <div className="habiba-contact-socials flex flex-col w-full">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="habiba-contact-social-row group flex items-center justify-between py-5 md:py-6 border-b border-[#E8D8C4]/10 relative overflow-hidden"
                >
                  <div className="relative z-10 flex items-center gap-4 md:gap-6 transition-transform duration-500 ease-out group-hover:translate-x-4">
                    <span className="font-sans text-[10px] tracking-widest text-[#E8D8C4]/50">{social.num}</span>
                    <span className="font-sans text-sm md:text-base tracking-[0.2em] font-medium text-[#F3EBDD] uppercase transition-colors duration-300 group-hover:text-[#F3EBDD] group-hover:tracking-[0.25em]">
                      {social.name}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <span className="text-[#F3EBDD] text-lg transition-transform duration-500 ease-out group-hover:translate-x-2 inline-block">
                      →
                    </span>
                  </div>
                  {/* Subtle divider animation */}
                  <div className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-[#65443A] transition-all duration-700 ease-out group-hover:w-full"></div>
                </a>
              ))}
            </div>

          </div>

        </div>



        {/* BOTTOM ROW: CTA */}
        <div className="habiba-contact-cta w-full border-t border-[#E8D8C4]/10 pt-16 md:pt-24 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            
            <div className="w-full">
              <p className="font-sans text-xs tracking-widest text-[#E8D8C4]/70 uppercase mb-6">HAVE A STORY IN MIND?</p>
              
              {!showForm ? (
                <button 
                  onClick={() => setShowForm(true)}
                  className="group inline-flex flex-col relative cursor-pointer text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-2">
                    <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F3EBDD] font-light tracking-tighter uppercase transition-transform duration-500 ease-out group-hover:translate-x-4">
                      TELL ME ABOUT IT
                    </h2>
                    <span className="text-3xl md:text-5xl text-[#F3EBDD] transition-transform duration-500 ease-out transform sm:-rotate-45 group-hover:rotate-0 self-end sm:self-auto hidden sm:block">
                      →
                    </span>
                  </div>
                  <div className="w-full h-[1px] md:h-px bg-[#E8D8C4]/30 relative overflow-hidden mt-2">
                    <div className="absolute top-0 left-0 h-full w-full bg-[#F3EBDD] transform -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-0"></div>
                  </div>
                </button>
              ) : (
                <div className="w-full max-w-[800px] animate-fade-in">
                  <textarea
                    value={whatsappMsg}
                    onChange={(e) => setWhatsappMsg(e.target.value)}
                    placeholder="TELL ME ABOUT IT..."
                    className="w-full bg-transparent border-b border-[#E8D8C4]/30 text-[#F3EBDD] font-serif text-4xl sm:text-5xl md:text-6xl outline-none resize-none placeholder:text-[#E8D8C4]/30 py-4 mb-12 focus:border-[#E8D8C4] transition-colors leading-tight"
                    rows={2}
                    autoFocus
                  />
                  <button 
                    onClick={handleWhatsApp}
                    className="group relative inline-flex items-center gap-4 cursor-pointer"
                  >
                    <span className="font-sans text-xs md:text-sm tracking-[0.2em] font-medium text-[#F3EBDD] uppercase">
                      SEND VIA WHATSAPP
                    </span>
                    <span className="text-[#F3EBDD] text-xl transition-transform duration-500 ease-out group-hover:translate-x-2">
                      →
                    </span>
                    <div className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#E8D8C4] transition-all duration-500 ease-out group-hover:w-full"></div>
                  </button>
                </div>
              )}

            </div>

            <div className="hidden md:block pb-2">
               <span className="font-sans text-[10px] text-[#E8D8C4]/40 tracking-widest uppercase whitespace-nowrap">
                 EDIT / STORY / MOTION
               </span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

export default Contact;
