// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js'
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBIqx0gW3HotiUTbpfIQ0pgsV7dkJGwPKY',
  authDomain: 'readingpedia-ada77.firebaseapp.com',
  projectId: 'readingpedia-ada77',
  storageBucket: 'readingpedia-ada77.appspot.com',
  messagingSenderId: '176004618295',
  appId: '1:176004618295:web:84b9f6e8dc3f0e2c2787b2',
  measurementId: 'G-SX3L14VT4G',
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

      window.location.href = 'index.html'
      alert('success')
      // ...
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}
