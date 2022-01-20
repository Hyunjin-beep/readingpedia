;('use strict')

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  update,
  ref,
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

// // Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

const bookcover_img = document.querySelector('.book-cover-img')
const book_metadata = document.querySelector('.book-metadata')
const purchase_btn = document.querySelector('.purchase-button')
const add_my_list = document.querySelector('.add-my-list')

function fetchBookDetails() {
  const googleBooks = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
  const isbn = localStorage.getItem('isbn')
  return fetch(`${googleBooks}${isbn}`, { method: 'get' })
    .then(response => {
      return response.json()
    })
    .then(json => json.items[0])
}

function addBookToList(event) {
  event.preventDefault()
  onAuthStateChanged(auth, user => {
    if (user) {
      const isbn = localStorage.getItem('isbn')

      const ref = ref(database, 'users/' + user.uid)
      //https://stackoverflow.com/questions/66533350/add-new-item-to-realtime-database-array
    } else {
      console.log('not signed in')
      window.location.href = 'signIn.html'
    }
  })
}

function displayBookDetails(item) {
  console.log(item.volumeInfo.infoLink)
  const title = item.volumeInfo.title
  const overview = item.volumeInfo.description
  const author = item.volumeInfo.authors[0]
  const book_cover_img = item.volumeInfo.imageLinks.thumbnail
  const purhcase_link = item.volumeInfo.infoLink

  const book_cover = document.createElement('img')
  book_cover.setAttribute('class', 'book-cover-myThoughts')
  book_cover['src'] = book_cover_img
  bookcover_img.appendChild(book_cover)

  book_metadata.innerHTML = `<span class="book-title-personal">${title}</span>
  <span class="book-autho">${author}</span>
  <p class="book-overview">
   ${overview}
  </p>`

  purchase_btn.innerHTML = `<a href=${purhcase_link}>Go to buy this book</a>`
}

function init() {
  fetchBookDetails().then(item => {
    displayBookDetails(item)
  })

  add_my_list.addEventListener('click', event => {
    addBookToList(event)
  })
}

init()
