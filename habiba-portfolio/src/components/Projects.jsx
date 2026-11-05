import React, { useState, useEffect, useRef } from 'react';
import { initProjectsAnimations } from '../animations/projectAnimations';
import ProjectCard from './ProjectCard';
import AdminUploadModal from './AdminUploadModal';
import VideoModal from './VideoModal';
import { getVideoFromDB, deleteVideoFromDB } from '../utils/videoStorage';

const Projects = () => {
  const sectionRef = useRef(null);
  
  // 1. مصفوفة المشاريع: تبدأ فارغة أو تسترجع المشاريع من localStorage
  const [projectsList, setProjectsList] = useState(() => {
    try {
      const saved = localStorage.getItem('habiba_portfolio_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // استعادة روابط الفيديوهات المحفوظة في IndexedDB بعد الـ Refresh
  useEffect(() => {
    let isMounted = true;

    const restoreVideos = async () => {
      const updated = await Promise.all(
        projectsList.map(async (project) => {
          if (project.hasBlobVideo) {
            const blob = await getVideoFromDB(project.id);
            if (blob && isMounted) {
              return {
                ...project,
                video: URL.createObjectURL(blob),
              };
            }
          }
          return project;
        })
      );

      if (isMounted) {
        // تحديث فقط إذا كان هناك تغيير فعلي في الروابط
        const hasChange = updated.some(
          (p, idx) => p.video !== projectsList[idx]?.video
        );
        if (hasChange) {
          setProjectsList(updated);
        }
      }
    };

    if (projectsList.some((p) => p.hasBlobVideo)) {
      restoreVideos();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // حفظ المشاريع في LocalStorage (باستثناء روابط الـ blob المؤقتة حتى لا تنكسر)
  useEffect(() => {
    try {
      const cleanToSave = projectsList.map((p) => ({
        ...p,
        // إذا كان رابط الـ video عبارة عن blob: لا نحفظ نص blob في localStorage لأننا نسترده من IndexedDB
        video: p.hasBlobVideo ? null : p.video,
      }));
      localStorage.setItem('habiba_portfolio_projects', JSON.stringify(cleanToSave));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [projectsList]);

  // 2. حالة الـ Admin واسترجاعها من sessionStorage
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });

  // حالة فتح/إغلاق نافذة الرفع
  const [isModalOpen, setIsModalOpen] = useState(false);

  // حالة نافذة تشغيل الفيديو (Video Player Modal)
  const [activeVideo, setActiveVideo] = useState({
    isOpen: false,
    videoSrc: null,
    title: '',
  });

  const handlePlayVideo = (videoSrc, title) => {
    setActiveVideo({
      isOpen: true,
      videoSrc,
      title,
    });
  };

  const handleCloseVideo = () => {
    setActiveVideo({
      isOpen: false,
      videoSrc: null,
      title: '',
    });
  };

  // 3. التحقق من الرابط عبر window.location.search (?secret_pass=12345)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secretPass = params.get('secret_pass');

    if (secretPass === '12345') {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // تشغيل وتحديث تحريكات GSAP عند إضافة أو حذف مشاريع
  useEffect(() => {
    const cleanup = initProjectsAnimations(sectionRef);
    return cleanup;
  }, [projectsList.length]);

  // إضافة المشروع الجديد بنفس الترتيب التتابعي وتعيين الرقم (01, 02, 03...)
  const handleAddNewProject = (newProject) => {
    setProjectsList((prev) => {
      const nextNumber = String(prev.length + 1).padStart(2, '0');
      return [...prev, { ...newProject, number: nextNumber }];
    });
  };

  // حذف مشروع وإعادة ترقيم باقي المشاريع ومسح الفيديو من IndexedDB
  const handleDeleteProject = (id) => {
    deleteVideoFromDB(id);
    setProjectsList((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      return filtered.map((p, index) => ({
        ...p,
        number: String(index + 1).padStart(2, '0'),
      }));
    });
  };

  // تفريغ كافة المشاريع بضغطة زر للأدمن
  const handleClearAllProjects = () => {
    if (window.confirm('هل تريدين مسح كافة المشاريع المضافة والبدء من جديد؟')) {
      projectsList.forEach((p) => deleteVideoFromDB(p.id));
      setProjectsList([]);
      localStorage.removeItem('habiba_portfolio_projects');
    }
  };

  // تقسيم المشاريع إلى مجموعات من 4 للحفاظ التام على التنسيق التحريري الأنيق
  const chunkedProjects = [];
  for (let i = 0; i < projectsList.length; i += 4) {
    chunkedProjects.push(projectsList.slice(i, i + 4));
  }

  return (
    <section id="work" ref={sectionRef} className="w-full bg-brand-black relative pt-12 md:pt-32 pb-12 md:pb-24 border-t border-brand-dark/20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header مع زر الرفع المخفي */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
          <div>
            <div className="flex items-start gap-4 mb-3">
              <span className="font-serif text-xl text-brand-warm">02 /</span>
              <h3 className="font-sans text-xs tracking-[0.3em] font-medium text-brand-beige uppercase mt-1">Selected Work</h3>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-brand-beige m-0 tracking-tighter">
              WORK<br/>THAT<br/>SPEAKS.
            </h2>
          </div>

          {/* أزرار الأدمن */}
          {isAdmin && (
            <div className="flex items-center flex-wrap gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-brand-deep hover:bg-brand-dark border border-brand-warm/60 hover:border-brand-warm text-brand-cream rounded-full transition-all duration-300 shadow-xl shadow-brand-warm/10 cursor-pointer text-xs"
              >
                <span className="text-brand-warm group-hover:rotate-90 transition-transform duration-300 font-bold text-base leading-none">+</span>
                <span className="font-sans tracking-wider uppercase font-semibold">رفع مشروع جديد</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              </button>

              {projectsList.length > 0 && (
                <button
                  onClick={handleClearAllProjects}
                  title="مسح جميع المشاريع"
                  className="px-3.5 py-2.5 bg-brand-deep/60 hover:bg-red-950/60 border border-brand-dark hover:border-red-500/50 text-brand-beige/60 hover:text-red-300 rounded-full transition-colors text-xs font-sans tracking-wider cursor-pointer"
                >
                  مسح الكل
                </button>
              )}

              <button
                onClick={() => {
                  sessionStorage.removeItem('isAdmin');
                  setIsAdmin(false);
                }}
                title="تسجيل الخروج من وضع الأدمن"
                className="px-3 py-2.5 bg-brand-deep/60 hover:bg-brand-dark border border-brand-dark text-brand-beige/60 hover:text-brand-cream rounded-full transition-colors text-xs cursor-pointer"
              >
                ✕ خروج
              </button>
            </div>
          )}
        </div>

        {/* إذا لم تكن هناك مشاريع بعد */}
        {projectsList.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center border border-dashed border-brand-dark/40 rounded-2xl bg-brand-deep/10 text-center px-4">
            <span className="text-3xl mb-3">🎬</span>
            <h3 className="font-serif text-xl text-brand-beige mb-2">لا توجد مشاريع مضافة حالياً</h3>
            {isAdmin ? (
              <p className="font-sans text-xs tracking-wider text-brand-beige/60 max-w-md">
                اضغطي على زر <span className="text-brand-warm font-semibold">"رفع مشروع جديد"</span> بالأعلى لإضافة أول مشروع إلى معرض أعمالك.
              </p>
            ) : (
              <p className="font-sans text-xs tracking-wider text-brand-beige/60 max-w-md">
                يتم العمل على تجهيز ونشر المشاريع قريباً...
              </p>
            )}
          </div>
        ) : (
          /* Editorial Grid */
          <div className="flex flex-col w-full">
            {chunkedProjects.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="flex flex-col w-full">
                
                {/* Row 1 */}
                {(chunk[0] || chunk[1]) && (
                  <div className="flex flex-row w-full gap-4 md:gap-14 items-start">
                    {chunk[0] && (
                      <ProjectCard 
                        project={chunk[0]} 
                        layoutClass="w-[52%] md:w-[54%]" 
                        imageClass="aspect-[4/3]"
                        isAdmin={isAdmin}
                        onDelete={handleDeleteProject}
                        onPlayVideo={handlePlayVideo}
                      />
                    )}
                    {chunk[1] && (
                      <ProjectCard 
                        project={chunk[1]} 
                        layoutClass="w-[44%] md:w-[42%] mt-6 md:mt-16" 
                        imageClass="aspect-[3/4]"
                        isAdmin={isAdmin}
                        onDelete={handleDeleteProject}
                        onPlayVideo={handlePlayVideo}
                      />
                    )}
                  </div>
                )}

                {/* Row 2 */}
                {(chunk[2] || chunk[3]) && (
                  <div className="flex flex-row w-full gap-4 md:gap-14 items-start -mt-2 md:-mt-8">
                    {chunk[2] && (
                      <ProjectCard 
                        project={chunk[2]} 
                        layoutClass="w-[44%] md:w-[42%]" 
                        imageClass="aspect-square"
                        isAdmin={isAdmin}
                        onDelete={handleDeleteProject}
                        onPlayVideo={handlePlayVideo}
                      />
                    )}
                    {chunk[3] && (
                      <ProjectCard 
                        project={chunk[3]} 
                        layoutClass="w-[52%] md:w-[54%] mt-6 md:mt-20" 
                        imageClass="aspect-video"
                        isAdmin={isAdmin}
                        onDelete={handleDeleteProject}
                        onPlayVideo={handlePlayVideo}
                      />
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

      {/* نافذة الرفع (Modal) */}
      <AdminUploadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddNewProject}
      />

      {/* مشغل الفيديو السينمائي المصغر */}
      <VideoModal
        isOpen={activeVideo.isOpen}
        onClose={handleCloseVideo}
        videoSrc={activeVideo.videoSrc}
        title={activeVideo.title}
      />
    </section>
  );
};

export default Projects;
