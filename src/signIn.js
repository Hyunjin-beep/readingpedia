// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  ref,
  update,
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

function LogIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      const user = userCredential.user

      return update(ref(database, 'users/' + user.uid), {
        last_login: new Date(),
      })
    })
    .then(() => {
      alert('Logged In')

      location.href = 'index.html'
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

function init() {
  signInBtn.addEventListener('click', e => {
    e.preventDefault()
    LogIn(email.value, password.value)
  })
}

init()
