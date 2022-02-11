'use strict'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  ref,
  update,
  get,
  child,
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

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase(app)

const logOut = document.querySelector('.logout')
const userNickName = document.querySelector('.user-nickname')
const userEmail = document.querySelector('.user-email')

function checkLogInStatus() {
  onAuthStateChanged(auth, user => {
    if (user) {
      const dbref = ref(database)
      get(child(dbref, 'users/' + user.uid)).then(snapshot => {
        if (snapshot.exists()) {
          userEmail.innerText = `${snapshot.val().Email}`
          userNickName.innerText = `${snapshot.val().NickName}`
        } else {
          console.log('no   in onAuthStateChanged in setting.js')
        }
      })
    } else {
      window.location = 'signIn.html'
    }
  })
}

function LogOut() {
  signOut(auth)
    .then(() => {
      console.log('success')
      window.location = 'index.html'
    })
    .catch(console.log)
}

function init() {
  logOut.addEventListener('click', LogOut)
  checkLogInStatus()
}

init()
