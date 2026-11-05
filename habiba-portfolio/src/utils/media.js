/**
 * دالة مساعدة لربط مسارات ملفات الصور والفيديوهات بـ Vite Base URL
 * تتوافق تلقائياً مع التطوير المحلي (localhost) ونشر GitHub Pages (/habiba/)
 */
export const resolveMediaUrl = (path) => {
  if (!path) return '';
  
  // إذا كان الرابط خارجياً أو Data URL أو Blob URL
  if (
    path.startsWith('http://') || 
    path.startsWith('https://') || 
    path.startsWith('blob:') || 
    path.startsWith('data:')
  ) {
    return path;
  }

  // تنظيف أي سلاش في البداية لتجنب تكرار /habiba//videos
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // دمج المسار الأساسي
  return `${baseUrl}${cleanPath}`;
};

