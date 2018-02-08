self.addEventListener('install', function (event) {
    var offlineRequest = new Request('/offline.html');
    event.waitUntil(
        fetch(offlineRequest).then(function (response) {
            return caches.open('offline').then(function (cache) {
                console.log('[oninstall] Cached offline page', response.url);
                return cache.put(offlineRequest, response);
            });
        })
    );
});

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (request.method === 'GET') {
        event.respondWith(
            fetch(request).catch(function (error) {
                console.error(
                    '[onfetch] Failed. Serving cached offline fallback ' +
                    error
                );
                return caches.open('offline').then(function (cache) {
                    return cache.match('/offline.html');
                });
            })
        );
    }
});



// var CACHE_NAME = 'dependencies-cache';

// var REQUIRED_FILES = [
//     '/',
//     '/gallery/1.jpg',
//     '/gallery/2.jpg',
//     '/gallery/3.jpg',
//     '/gallery/no-connection.jpg',
//     '/style.css',
//     '/index.html',
//     '/offline.html',
//     '/app.js'
// ];

// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(function (cache) {
//             console.log('[install] Caches opened, adding all core components' +
//                 'to cache');
//             return cache.addAll(REQUIRED_FILES);
//         })
//         .then(function () {
//             console.log('[install] All required resources have been cached, ' +
//                 'we\'re good!');
//             return self.skipWaiting();
//         })
//     );
// });

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//         .then(function (response) {
//             if (response) {
//                 console.log(
//                     '[fetch] Returning from ServiceWorker cache: ',
//                     event.request.url
//                 );
//                 return response;
//             }
//             console.log('[fetch] Returning from server: ', event.request.url);
//             return fetch(event.request);
//         })
//         .catch(function () {
//             return caches.match('/gallery/no-connection.jpg');
//         })
//     );
// });

// self.addEventListener('activate', function (event) {
//     console.log('[activate] Activating ServiceWorker!');
//     console.log('[activate] Claiming this ServiceWorker!');
//     event.waitUntil(self.clients.claim());
// });