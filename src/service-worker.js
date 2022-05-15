let CACHE_NAME = "cache-" + Date.now();

self.addEventListener("install", (event) => {
  console.log("Installed SW");
  try {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
		return cache.add("/offline.html");
		})
	);
  } catch (e) {
	console.log(e);
  }
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Activated SW");
  event.waitUntil(
    // Loop through the cache
    caches.keys().then((keys) => {
      // We must return a promise so it gets awaited
      return Promise.all(
        keys.map((k) => {
          // If the key doesn't match the name of the current cache, delete it
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // We only want to send /offline.html when the user is navigating pages,
  // not when they're requesting something else like CSS files or API requests.
  if (event.request.mode !== "navigate") return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    })
  );
});
