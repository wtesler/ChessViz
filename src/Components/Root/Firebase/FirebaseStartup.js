import {useEffect} from 'react';
import {initializeApp} from 'firebase/app';

const FirebaseStartup = () => {

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDnKvh6Tg1Ky_R6v6gvsHxZPfFl_-kH-PM",
      authDomain: "app.mivie.com",
      projectId: "mivi-321718",
      storageBucket: "mivi-321718.appspot.com",
      messagingSenderId: "153999569748",
      appId: "1:153999569748:web:7cd8001e75c51e00facec1",
      measurementId: "G-SY3DS058LP"
    };

    initializeApp(firebaseConfig);
  }, []);

  return null;
}

export default FirebaseStartup;
