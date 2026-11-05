import React, { useState, useRef } from 'react';
import { saveVideoToDB } from '../utils/videoStorage';

const AdminUploadModal = ({ isOpen, onClose, onAddProject }) => {
  const [title, setTitle] = useState('');
  const [tools, setTools] = useState('');
  const [category, setCategory] = useState('');
  
  // States للتعامل مع ملف الصورة
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // States للتعامل مع ملف ومسار الفيديو (MP4)
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // References لحقول الملفات المخفية
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  if (!isOpen) return null;

  // اختيار صورة الغلاف وتوليد المعاينة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // اختيار ملف الفيديو MP4 من الجهاز
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // إفراغ حقل الرابط اليدوي طالما تم اختيار ملف من الجهاز
      setVideoUrlInput('');
    }
  };

  // إرسال النموذج وتحديث مصفوفة المشاريع
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !imageFile) {
      alert('يرجى كتابة اسم المشروع واختيار صورة الغلاف على الأقل!');
      return;
    }

    setIsSubmitting(true);

    const finishUpload = async (finalImageUrl) => {
      const projectId = Date.now();
      let finalVideoUrl = null;
      let hasBlobVideo = false;

      // 1. إذا اختار المستخدم ملف فيديو من جهازه: ننشئ له رابط Blob ونحفظه في IndexedDB ليبقى حتى بعد الـ Refresh
      if (videoFile) {
        finalVideoUrl = URL.createObjectURL(videoFile);
        hasBlobVideo = true;
        await saveVideoToDB(projectId, videoFile);
      } else if (videoUrlInput.trim()) {
        // 2. إذا كتب مساراً أو رابطاً خارجياً يدوياً
        finalVideoUrl = videoUrlInput.trim();
      }

      const newProject = {
        id: projectId,
        title: title.toUpperCase(),
        category: category.trim().toUpperCase() || 'RECENT WORK',
        year: new Date().getFullYear().toString(),
        role: 'Editor & Creator',
        description: 'Project added via Admin Panel',
        tools: tools
          ? tools.split(',').map((t) => t.trim().toUpperCase()).filter(Boolean)
          : ['PREMIERE PRO', 'AFTER EFFECTS'],
        image: finalImageUrl,
        video: finalVideoUrl,
        hasBlobVideo: hasBlobVideo,
        videoFileName: videoFile ? videoFile.name : null,
      };

      onAddProject(newProject);

      // تفريغ الحقول وإغلاق النافذة
      setTitle('');
      setCategory('');
      setTools('');
      setImageFile(null);
      setImagePreview(null);
      setVideoFile(null);
      setVideoUrlInput('');
      setIsSubmitting(false);
      onClose();
    };

    // قراءة الصورة كـ Base64 لضمان حفظها في الـ LocalStorage وعدم اختفائها عند التحديث
    const reader = new FileReader();
    reader.onloadend = () => {
      finishUpload(reader.result);
    };
    reader.onerror = () => {
      finishUpload(URL.createObjectURL(imageFile));
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Container النافذة */}
      <div 
        className="w-full max-w-lg bg-brand-deep border border-brand-warm/30 rounded-2xl shadow-2xl p-6 md:p-8 text-brand-beige relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق (X) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-5 left-5 text-brand-beige/60 hover:text-brand-cream text-2xl transition-colors cursor-pointer leading-none"
        >
          ✕
        </button>

        {/* رأس النافذة */}
        <div className="text-center mb-6">
          <span className="font-serif text-sm text-brand-warm uppercase tracking-widest">لوحة التحكم السريعة</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-cream mt-1">رفع مشروع جديد</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
          {/* 1. اسم المشروع */}
          <div>
            <label className="block text-xs font-sans tracking-wider text-brand-beige/70 mb-2">
              اسم المشروع <span className="text-brand-warm">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: CINEMATIC PROMO"
              className="w-full bg-brand-black/50 border border-brand-dark focus:border-brand-warm rounded-lg px-4 py-3 text-sm text-brand-cream placeholder-brand-beige/30 outline-none transition-all"
            />
          </div>

          {/* 2. التصنيف والبرامج المستعملة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans tracking-wider text-brand-beige/70 mb-2">
                التصنيف
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="COMMERCIAL, MUSIC..."
                className="w-full bg-brand-black/50 border border-brand-dark focus:border-brand-warm rounded-lg px-4 py-3 text-sm text-brand-cream placeholder-brand-beige/30 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-sans tracking-wider text-brand-beige/70 mb-2">
                البرامج / التقنيات
              </label>
              <input
                type="text"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="Premiere, After Effects"
                className="w-full bg-brand-black/50 border border-brand-dark focus:border-brand-warm rounded-lg px-4 py-3 text-sm text-brand-cream placeholder-brand-beige/30 outline-none transition-all"
              />
            </div>
          </div>

          {/* 3. رفع صورة الغلاف + معاينة مصغرة */}
          <div>
            <label className="block text-xs font-sans tracking-wider text-brand-beige/70 mb-2">
              صورة الغلاف (Thumbnail) <span className="text-brand-warm">*</span>
            </label>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {imagePreview ? (
              <div className="relative group rounded-lg overflow-hidden border border-brand-warm/40 aspect-video bg-black/40">
                <img
                  src={imagePreview}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute inset-0 bg-brand-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs tracking-wider font-semibold text-brand-cream transition-opacity cursor-pointer"
                >
                  تغيير الصورة ↻
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="w-full border-2 border-dashed border-brand-dark hover:border-brand-warm/60 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-brand-beige/60 hover:text-brand-cream transition-colors cursor-pointer bg-brand-black/30"
              >
                <span className="text-2xl">📷</span>
                <span className="text-xs">اضغط لاختيار صورة الغلاف</span>
              </button>
            )}
          </div>

          {/* 4. رفع أو مسار فيديو المشروع (MP4) */}
          <div className="p-4 rounded-xl bg-brand-black/30 border border-brand-dark/40 space-y-3">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-sans tracking-wider text-brand-beige/80">
                فيديو المشروع (MP4)
              </label>
              <span className="text-[10px] text-green-400 font-sans tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                مباشر وفوري
              </span>
            </div>

            {/* الخيار أ: اختيار ملف MP4 من الجهاز مباشرة */}
            <div>
              <input
                type="file"
                ref={videoInputRef}
                accept="video/mp4,video/*"
                className="hidden"
                onChange={handleVideoChange}
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="px-4 py-2.5 bg-brand-warm hover:bg-brand-warm/80 text-brand-cream text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-brand-warm/20"
                >
                  <span>🎬</span>
                  <span>{videoFile ? 'تغيير ملف الفيديو' : 'اختيار ملف MP4 من جهازك'}</span>
                </button>

                {videoFile && (
                  <span className="text-xs text-brand-beige/80 truncate max-w-[200px]" dir="ltr">
                    ✓ {videoFile.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 my-1">
              <div className="h-px flex-1 bg-brand-dark/50"></div>
              <span className="text-[10px] text-brand-beige/40">أو</span>
              <div className="h-px flex-1 bg-brand-dark/50"></div>
            </div>

            {/* الخيار ب: كتابة مسار في public/videos أو رابط خارجي */}
            <div>
              <input
                type="text"
                value={videoUrlInput}
                onChange={(e) => {
                  setVideoUrlInput(e.target.value);
                  if (e.target.value) setVideoFile(null); // إلغاء الملف إذا كتب رابطاً
                }}
                placeholder="رابط مباشر خارجي أو videos/myvideo.mp4"
                className="w-full bg-brand-black/60 border border-brand-dark focus:border-brand-warm rounded-lg px-3 py-2 text-xs text-brand-cream placeholder-brand-beige/30 outline-none transition-all font-mono"
                dir="ltr"
              />
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-dark/40">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-xs text-brand-beige/60 hover:text-brand-cream transition-colors cursor-pointer disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-brand-warm hover:bg-brand-warm/80 text-brand-cream text-xs font-semibold tracking-wider rounded-lg shadow-lg shadow-brand-warm/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الحفظ...' : 'نشر المشروع 🚀'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadModal;
