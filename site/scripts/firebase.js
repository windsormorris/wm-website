// Import the functions you need from the SDKs you need
import { initializeApp } 
  from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithPhoneNumber, RecaptchaVerifier } 
  from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
  
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzitAnxkXi8pN_IUnClrYAH1Q34UkM70A",
  authDomain: "photo-uploads-b0812.firebaseapp.com",
  projectId: "photo-uploads-b0812",
  messagingSenderId: "333497435257",
  appId: "1:333497435257:web:2ad585a404792f136fc0a8",
  measurementId: "G-N4DF2XNNYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

window.recaptchaVerifier = new RecaptchaVerifier('phone', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
}, auth);

const appVerifier = window.recaptchaVerifier;

function handlePhoneEntry(e) {
  const phoneNumber = "+44" + e.target.value;
 
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      const code = prompt('Please enter code:');
      //confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        //const user = result.user;
      var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
      firebase.auth().signInWithCredential(credential);
      window.localStorage.setItem('credential', credential);
      window.location.href = "http://localhost:8000/members/photo-upload/";
        // ...
      //}).catch((error) => {
        //console.log(error.message);
      //});
      //window.confirmationResult = confirmationResult; // retrieve from other tab?
      
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      alert('Sorry, unable to send SMS');
      window.recaptchaVerifier.render().then(function(widgetId) {
        grecaptcha.reset(widgetId);
      });
    });
}

window.onload = function() {
  document.querySelector('#phone')
    .addEventListener('change', handlePhoneEntry);
}
