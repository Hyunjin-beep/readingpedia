;('use strict')

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  update,
  push,
  ref,
  set,
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

// // Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get a reference to the database service
const database = getDatabase(app)
const auth = getAuth()

const bookcover_img = document.querySelector('.book-cover-img')
const book_metadata = document.querySelector('.book-metadata')
const review = document.querySelector('.my-thoughts-textarea')
const save_btn = document.querySelector('.review-submit')

function fetchBookDetails() {
  const googleBooks = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
  const isbn = localStorage.getItem('isbn')
  return fetch(`${googleBooks}${isbn}`, { method: 'get' })
    .then(response => {
      return response.json()
    })
    .then(json => json.items[0])
}

function displayBookDetails(item) {
  // console.log(item.volumeInfo.infoLink)
  const title = item.volumeInfo.title
  const overview = item.volumeInfo.description
  const author = item.volumeInfo.authors[0]
  const book_cover_img = item.volumeInfo.imageLinks.thumbnail

  const book_cover = document.createElement('img')
  book_cover.setAttribute('class', 'book-cover-myThoughts')
  book_cover['src'] = book_cover_img
  bookcover_img.appendChild(book_cover)

  book_metadata.innerHTML = `<span class="book-title-personal">${title}</span>
    <span class="book-autho">${author}</span>
    <p class="book-overview">
     ${overview}
    </p>`
}

function saveReview() {
  onAuthStateChanged(auth, user => {
    const isbn = localStorage.getItem('isbn')

    const reviewRef = ref(database, `reviews/${user.uid}/${isbn}`)
    const newReview = push(reviewRef)
    set(newReview, {
      review: review.value,
    })

    review.value = ''
    console.log('success')
  })
}

function init() {
  fetchBookDetails().then(item => {
    displayBookDetails(item)
  })
  save_btn.addEventListener('click', event => {
    saveReview()
  })
}

init()
