/**
 * مخزن IndexedDB مخصص للفيديوهات
 * يتيح حفظ ملفات MP4 الكبيرة (مئات الميغابايت) داخل المتصفح مباشرة
 * حتى لا تضيع الفيديوهات عند تحديث الصفحة (Refresh)
 */

const DB_NAME = 'habiba_portfolio_db';
const STORE_NAME = 'videos';

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveVideoToDB = async (projectId, file) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(file, String(projectId));
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to save video to IndexedDB:', err);
    return false;
  }
};

export const getVideoFromDB = async (projectId) => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(String(projectId));
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to read video from IndexedDB:', err);
    return null;
  }
};

export const deleteVideoFromDB = async (projectId) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(String(projectId));
  } catch (err) {
    console.warn('Failed to delete video from IndexedDB:', err);
  }
};

