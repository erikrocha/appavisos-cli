if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
          .then(registration => {
              console.log('service worker register')
          })
          .catch(err => console.log('service worker error', err))
  })
}

if(window.Notification && Notification.permission !== 'denied'){
  Notification.requestPermission(status => {
      console.log(status)
      let n = new Notification('App Avisos', {
          body: 'Bienvenido a APP Avisos =)',
          icon: './appavisos.png'
      })
  })
}