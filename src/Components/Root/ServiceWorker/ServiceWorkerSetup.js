/**
 * Setup for Service Worker
 */
const ServiceWorkerSetup = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function (registration) {
      })
      .catch(function (error) {
        console.error('Service worker registration failed, error:', error);
      });
  }

  return null;
}

export default ServiceWorkerSetup;
