if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('https://jorgepap.github.io/Weather-site/sw.js', { scope: 'https://jorgepap.github.io/Weather-site/' })})}