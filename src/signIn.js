// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAi4A5QW-H3e5OfXPEuHIceIky7eWBaLkw',
  authDomain: 'readingpedia-8c5ac.firebaseapp.com',
  projectId: 'readingpedia-8c5ac',
  storageBucket: 'readingpedia-8c5ac.appspot.com',
  messagingSenderId: '100331426275',
  appId: '1:100331426275:web:b0bcdc5a2abf9a5acc50d6',
  measurementId: 'G-7CKCCLQWG7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase()
const auth = getAuth()

const email = document.querySelector('.email')
const password = document.querySelector('.password')
const signInBtn = document.querySelector('.signIn')

signInBtn.addEventListener('click', e => {
  e.preventDefault()
  LogIn(email.value, password.value)
  console.log(email.value, password.value)
})

function LogIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user

      update(ref(database, 'users/' + user.uid), {
        last_login: new Date(),
      })

      //  window.location.href = 'index.html'
      alert('success' + user.uid)
      // ...
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}
