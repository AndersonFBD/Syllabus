import firebase from 'firebase';

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyARVtd6Afh0_fQyDjVtOmgkvZVPDAXo64s",
    authDomain: "syllabus-d37e2.firebaseapp.com",
    projectId: "syllabus-d37e2",
    storageBucket: "syllabus-d37e2.appspot.com",
    messagingSenderId: "189562997545",
    appId: "1:189562997545:web:af27991a06cc45fbf38538",
    measurementId: "G-3BLKEGP2QS"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  //firebase.analytics();