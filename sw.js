// this.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open('v1').then(function (cache) {
//             return cache.addAll([
//                 '/',
//                 '/gallery/1.jpg',
//                 '/gallery/2.jpg',
//                 '/gallery/3.jpg',
//                 '/style.css',
//                 '/index.html',
//                 '/index.js',
//                 '/app.js'
//             ]);
//         })
//     );
// });

// this.addEventListener('fetch', function (event) {
//     var response;
//     event.respondWith(
//         caches.match(event.request).catch(function () {
//             return fetch(event.request);
//         }).then(function (r) {
//             response = r;
//             caches.open('v1').then(function (cache) {
//                 cache.put(event.request, response);
//             });
//             return response.clone();
//         }).catch(function () {
//             return caches.match('/gallery/1.jpg');
//         })
//     );
// });



var CACHE_NAME = 'dependencies-cache';

var REQUIRED_FILES = [
    '/',
    '/gallery/1.jpg',
    '/gallery/2.jpg',
    '/gallery/3.jpg',
    '/gallery/no-connection.jpg',
    '/style.css',
    '/index.html',
    '/app.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('[install] Caches opened, adding all core components' +
                'to cache');
            return cache.addAll(REQUIRED_FILES);
        })
        .then(function () {
            console.log('[install] All required resources have been cached, ' +
                'we\'re good!');
            return self.skipWaiting();
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                console.log(
                    '[fetch] Returning from ServiceWorker cache: ',
                    event.request.url
                );
                return response;
            }
            console.log('[fetch] Returning from server: ', event.request.url);
            return fetch(event.request);
        })
        .catch(function(){
            return caches.match('/gallery/no-connection.jpg');
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[activate] Activating ServiceWorker!');
    console.log('[activate] Claiming this ServiceWorker!');
    event.waitUntil(self.clients.claim());
});