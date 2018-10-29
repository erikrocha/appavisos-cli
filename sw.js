const CACHE_NAME = 'appavisos'
const cache_link = [
    './',
    './index.html',
    './static/css/style.css'
]

self.addEventListener('install', e => {
    console.log('SW installed')
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('cache files')
            return cache.addAll(cache_link)
            .then( () => self.skipWaiting())
        })
        .catch(err => console.log('cache register wrong', err))
    )
})

self.addEventListener('activate', e => {
    console.log('SW activated')
    const cacheWhitelist = [CACHE_NAME]
  
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if ( cacheWhitelist.indexOf(cacheName) === -1 )
              return caches.delete(cacheName)
          })
        )
      })
      .then(() => {
        console.log('Cache actualizado')
        // Le indica al SW activar el cache actual
        return self.clients.claim()
      })
    )
  })

self.addEventListener('fetch', e => {
    console.log('SW recovery')
  
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          console.log('recovery from cache')
          if ( res ) {
            return res
          }
          return fetch(e.request)
        })
      )
  })
