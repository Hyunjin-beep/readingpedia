// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js'
import {
  getDatabase,
  ref,
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
const db = getDatabase()

const name = document.querySelector('.fullName')
const signUpbtn = document.querySelector('.signUp')

signUpbtn.addEventListener('click', e => {
  e.preventDefault()
  InserDate()
  console.log(name.value)
  name.value = ''
})

function InserDate() {
  set(ref(db, 'TheUsers/' + name.value), {
    NameOfUs: name.value,
  })
    .then(() => {
      alert('data stored successfully')
    })
    .catch(error => {
      console.log(error)
    })
}
//https://www.youtube.com/watch?v=BOITPwChVP4
