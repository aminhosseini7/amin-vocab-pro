// Simple offline-first service worker for Amin Vocab Pro

const CACHE_NAME = "amin-vocab-cache-v1";

// اگر اسم ریپو را عوض کردی، این BASE_PATH را هم عوض کن:
const BASE_PATH = "/amin-vocab-pro/";

const OFFLINE_URLS = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "hard.html",
  BASE_PATH + "words.html",
  BASE_PATH + "test.html",
  BASE_PATH + "progress.html",
  BASE_PATH + "data/vocab.js",
  BASE_PATH + "js/storage.js",
  BASE_PATH + "js/srs.js",
  BASE_PATH + "js/flashcards.js",
  BASE_PATH + "js/hard.js",
  BASE_PATH + "js/words.js",
  BASE_PATH + "js/test.js",
  BASE_PATH + "js/progress.js",
  BASE_PATH + "icon-192.png",
  BASE_PATH + "icon-512.png"
];

// نصب Service Worker و کش کردن فایل‌های اصلی
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

// پاک کردن کش‌های قدیمی در زمان فعال‌سازی
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// استراتژی fetch: اول کش، اگر نبود شبکه؛ و اگر موفق شد در کش هم ذخیره کن
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // فقط درخواست‌های GET را هندل می‌کنیم
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          // اگر پاسخ معتبر نبود، فقط برگردان
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // پاسخِ موفق را در کش ذخیره کن (clone)
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // اگر شبکه قطع بود و در کش هم چیزی نداشتیم، چیزی خاصی نداریم که نشان دهیم
          // (می‌شود اینجا صفحه آفلاین اختصاصی هم داد)
          return new Response("You are offline and this resource is not cached.", {
            status: 503,
            statusText: "Service Unavailable",
            headers: { "Content-Type": "text/plain; charset=utf-8" }
          });
        });
    })
  );
});
