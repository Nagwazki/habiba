import React, { useEffect } from 'react';
import { resolveMediaUrl } from '../utils/media';

const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoSrc) return null;

  const fullVideoUrl = resolveMediaUrl(videoSrc);

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* تم تصغير العرض الأقصى إلى max-w-2xl / max-w-3xl مع تقليص الارتفاع ليناسب الشاشة تماماً */}
      <div 
        className="relative w-full max-w-2xl lg:max-w-3xl bg-brand-black/95 border border-brand-warm/40 rounded-xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header مصغر وأنيق */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-brand-dark/40 bg-brand-deep/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-warm animate-pulse"></span>
            <h3 className="font-serif text-sm md:text-base text-brand-cream font-semibold tracking-wide uppercase truncate max-w-[280px] md:max-w-md">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-brand-black/80 hover:bg-brand-warm text-brand-beige hover:text-brand-cream flex items-center justify-center transition-all cursor-pointer text-sm leading-none border border-brand-dark/60"
            title="إغلاق (Esc)"
          >
            ✕
          </button>
        </div>

        {/* مشغل الفيديو بحجم مريح ومحدد الارتفاع */}
        <div className="relative bg-black flex items-center justify-center max-h-[65vh]">
          <video
            src={fullVideoUrl}
            controls
            autoPlay
            playsInline
            className="w-full max-h-[65vh] object-contain mx-auto"
          >
            عذراً، متصفحك لا يدعم تشغيل هذا الفيديو بصيغة MP4.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
