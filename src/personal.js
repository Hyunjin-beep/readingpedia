'use strict'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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
const user = auth.currentUser

const userName = document.querySelector('.personal-name')

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const dbref = ref(database)
    get(child(dbref, 'users/' + user.uid)).then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val().NickName)
        userName.innerText = `Hi, ${snapshot.val().NickName} `
      } else {
        console.log('no   ')
      }
    })

    console.log(user.uid)
    // ...
  }
})
