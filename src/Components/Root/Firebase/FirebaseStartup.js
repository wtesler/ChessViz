import {useEffect} from 'react';
import {initializeApp} from 'firebase/app';

const FirebaseStartup = () => {

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDltdVwuadcbblt1M4QAQ5SUxmpKe9YEnU",
      authDomain: "chessviz.firebaseapp.com",
      projectId: "chessviz",
      storageBucket: "chessviz.appspot.com",
      messagingSenderId: "599435579879",
      appId: "1:599435579879:web:45ab21970745c2c03ded42"
    };

    initializeApp(firebaseConfig);
  }, []);

  return null;
}

export default FirebaseStartup;
