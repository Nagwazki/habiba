import React, { useRef } from 'react';
import { handleProjectHover } from '../animations/projectAnimations';
import { resolveMediaUrl } from '../utils/media';

const ProjectCard = ({ project, layoutClass, imageClass, isAdmin, onDelete, onPlayVideo }) => {
  const videoRef = useRef(null);

  const imageUrl = resolveMediaUrl(project.image);
  const videoUrl = project.video ? resolveMediaUrl(project.video) : null;

  // تشغيل معاينة الفيديو عند الـ hover
  const onMouseEnterHandler = (e) => {
    handleProjectHover(e, true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const onMouseLeaveHandler = (e) => {
    handleProjectHover(e, false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // عند الضغط على الكرت أو زر المشاهدة
  const handleCardClick = () => {
    if (videoUrl && onPlayVideo) {
      onPlayVideo(videoUrl, project.title);
    }
  };

  return (
    <div 
      className={`editorial-project w-full flex flex-col ${layoutClass} mb-8 md:mb-16 group cursor-pointer relative`}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={handleCardClick}
      data-cursor-text={videoUrl ? "PLAY" : "VIEW"}
    >
      {/* زر حذف المشروع للأدمن فقط */}
      {isAdmin && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`هل أنتِ متأكدة من حذف مشروع "${project.title}"؟`)) {
              onDelete(project.id);
            }
          }}
          title="حذف هذا المشروع"
          className="absolute -top-2 -right-2 z-30 w-7 h-7 rounded-full bg-red-950/90 hover:bg-red-700 text-red-200 border border-red-500/50 flex items-center justify-center text-xs font-bold shadow-lg transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-110"
        >
          ✕
        </button>
      )}

      {/* الرأس بحجم مصغر ومناسب */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-2 md:mb-3 gap-1 md:gap-3">
        <span className="font-serif text-xs md:text-lg text-brand-warm/70">{project.number}</span>
        
        <div className="flex flex-col md:items-end">
          <h3 className="project-title font-serif text-sm md:text-xl lg:text-2xl text-brand-beige font-bold tracking-tight uppercase leading-snug">
            {project.title}
          </h3>
          <span className="font-sans text-[7px] md:text-[9px] tracking-widest text-brand-beige/50 uppercase mt-0.5">
            {project.category}
          </span>
        </div>
      </div>

      {/* الحاوية البصرية للكرت (أقصى ارتفاع محدد لمنع الضخامة) */}
      <div className={`img-container relative overflow-hidden rounded-md bg-brand-deep ${imageClass} max-h-[360px] md:max-h-[420px]`}>
        {/* Subtle noise on hover */}
        <div 
          className="hover-grain absolute inset-0 z-20 pointer-events-none opacity-0 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"/%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"/%3E%3C/svg%3E")' }}
        ></div>
        
        {/* صورة الغلاف الأساسية */}
        <img 
          src={imageUrl} 
          alt={project.title}
          className="w-full h-[115%] object-cover object-center transform translate-y-[-8%]"
        />

        {/* تشغيل فيديو MP4 كمعاينة صامتة وسلسة عند الـ Hover */}
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
          />
        )}
        
        {/* طبقة تظليل جمالية */}
        <div className="absolute inset-0 bg-brand-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>

        {/* مؤشر تشغيل الفيديو MP4 في الركن */}
        {videoUrl && (
          <div className="absolute bottom-2.5 right-2.5 z-20 bg-brand-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-sans tracking-wider text-brand-cream border border-brand-warm/30 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-warm animate-pulse"></span>
            <span>MP4</span>
          </div>
        )}
      </div>

      {/* الشريط السفلي والزر */}
      <div className="mt-3 flex justify-between items-center">
        <div className="hidden md:flex gap-2">
          {project.tools && project.tools.slice(0, 2).map((tool, i) => (
            <span key={i} className="font-sans text-[9px] tracking-wider text-brand-beige/60 uppercase border border-brand-dark px-2.5 py-0.5 rounded-sm">
              {tool}
            </span>
          ))}
        </div>
        
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
          className="flex items-center gap-1 md:gap-2 font-sans text-[8px] md:text-[11px] tracking-widest font-semibold text-brand-beige group-hover:text-brand-cream transition-colors"
        >
          <span className="hidden md:inline-block">{videoUrl ? 'WATCH VIDEO' : 'VIEW PROJECT'}</span>
          <span className="md:hidden">{videoUrl ? 'PLAY' : 'VIEW'}</span>
          <svg className="project-arrow w-3 h-3 text-brand-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
