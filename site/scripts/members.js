// Import the functions you need from the SDKs you need
import { initializeApp } 
  from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getStorage, ref, uploadBytes } 
  from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } 
  from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
  
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzitAnxkXi8pN_IUnClrYAH1Q34UkM70A",
  authDomain: "photo-uploads-b0812.firebaseapp.com",
  projectId: "photo-uploads-b0812",
  storageBucket: "gs://photo-uploads-b0812.appspot.com",
  messagingSenderId: "333497435257",
  appId: "1:333497435257:web:2ad585a404792f136fc0a8",
  measurementId: "G-N4DF2XNNYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// https://firebase.google.com/docs/storage/web/start
const storageService = getStorage(app);
// https://firebase.google.com/docs/storage/web/create-reference

const auth = getAuth();
let login = window.localStorage.getItem('login');
if (!login) {
  window.location.href = "https://windsormorris.org.uk";
}

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {  
  const storageRef = ref(storageService, `images/${selectedFile.name}`);
  const metadata = {
      contentType: 'image/jpeg'
    };
    
  uploadBytes(storageRef, selectedFile, metadata).then((snapshot) => {
    alert('uploaded ' + selectedFile.name);
    console.log('Uploaded a blob or file!');
  });;
}

window.onload = function() {
  document.querySelector('.file-select')
    .addEventListener('change', handleFileUploadChange);
    
  document.querySelector('.file-submit')
    .addEventListener('click', handleFileUploadSubmit);
}
