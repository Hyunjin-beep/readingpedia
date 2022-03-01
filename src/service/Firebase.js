import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAi4A5QW-H3e5OfXPEuHIceIky7eWBaLkw',
  authDomain: 'readingpedia-8c5ac.firebaseapp.com',
  projectId: 'readingpedia-8c5ac',
  storageBucket: 'readingpedia-8c5ac.appspot.com',
  messagingSenderId: '100331426275',
  appId: '1:100331426275:web:b0bcdc5a2abf9a5acc50d6',
  measurementId: 'G-7CKCCLQWG7',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth()
export const database = getDatabase(firebaseApp)
