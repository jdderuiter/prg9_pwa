const version = 'v5'

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(version)
        .then((cache) => {
            return cache.addAll([
                'index.html',
                '/css/app.css',
                '/js/app.js',
                '/js/chunk-vendors.js',
                '/img/svg/online.svg',
                '/img/svg/offline.svg',
                '/img/nointernet.jpg'
            ])
        })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
        .then((keys) => {
            return Promise.all(keys.filter((key) => {
                return key !== version
            }).map((key) => {
                return caches.delete(key)
            }))
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((res) => {
            if (res)
                return res
            if (!navigator.onLine)
                return caches.match(new Request('/index.html'))
            
            return fetch(event.request)
            
        })
        .catch((error) => {
            console.log(error)
        })
    )
})

function fetchAndUpdate(request) {
    return fetch(request)
    .then((res) => {
        return caches.open(version)
        .then((cache) => {
            return cache.put(request, res.clone())
            .then(() => {
                return res
            })
        })
    })
}