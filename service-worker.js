// service-worker.js  – نسخه تمیز برای GitHub Pages

const CACHE_NAME = "amin-vocab-pro-v1";
const OFFLINE_RESOURCES = [
  "./",
  "./index.html",
  "./hard.html",
  "./test.html",
  "./words.html",
  "./progress.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./data/vocab.js",
  "./js/storage.js",
  "./js/srs.js",
  "./js/flashcards.js",
  "./js/hard.js",
  "./js/test.js",
  "./js/words.js",
  "./js/progress.js"
];

// فقط آدرس‌های خود سایت (http/https و همان origin) را کش می‌کنیم
function isCachableRequest(request) {
  const url = new URL(request.url);

  // درخواست‌های افزونه‌ها مثل chrome-extension:// را نادیده بگیر
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return false;
  }

  // فقط فایل‌هایی که از همین دامنه‌ی PWA هستند
  if (url.origin !== self.location.origin) {
    return false;
  }

  return true;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_RESOURCES);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // اگر کش‌کردن این request منطقی نیست (مثلاً chrome-extension) اصلاً دخالت نکن
  if (!isCachableRequest(request)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request)
        .then((response) => {
          // فقط response معتبر را کش کن
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone).catch(() => {
              // اگر put روی cache به خاطر محدودیت‌ها خطا داد، نادیده بگیر
            });
          });
          return response;
        })
        .catch(() => {
          // اگر آفلاین بودیم و چیزی در cache نبود، همون خطا می‌مونه
          return caches.match("./index.html");
        });
    })
  );
});
