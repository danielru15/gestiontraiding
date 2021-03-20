var firebaseConfig = {
    apiKey: "AIzaSyArC8m0F7WVHEotBQPMJzzWfYNiKqwc7pk",
    authDomain: "plantraiding.firebaseapp.com",
    projectId: "plantraiding",
    storageBucket: "plantraiding.appspot.com",
    messagingSenderId: "761440565690",
    appId: "1:761440565690:web:a29e7e64cd7dd0010a0583"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db= firebase.firestore()