;('use strict')

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  child,
  ref,
  set,
  get,
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

const written_review_container = document.querySelector(
  '.write-my-thoughts-container'
)
const review = document.querySelector('.my-thoughts-textarea')
const save_btn = document.querySelector('.review-submit')

const saved_review = document.querySelector('.written-my-thoughts-container')
const review_container = document.querySelector('.my-thoughts')
const edit_btn = document.querySelector('.my-thoughts-edit')

const isbn = localStorage.getItem('isbn')

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

function saveReview(item) {
  onAuthStateChanged(auth, user => {
    const pageCount = item.volumeInfo.pageCount
    const book_cover_img = item.volumeInfo.imageLinks.thumbnail
    const today = new Date()
    const todayDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    set(ref(database, `reviews/${user.uid}/${isbn}`), {
      isbn,
      pageCount,
      book_cover_img,
      review: review.value,
      todayDate,
    })

    review.value = ''
    console.log('success')
  })

  window.location.reload()
}

function retrieve_review_data() {
  onAuthStateChanged(auth, user => {
    if (user) {
      get(child(ref(database), `reviews/${user.uid}/${isbn}`)).then(
        snapshot => {
          if (snapshot.exists()) {
            showReview(snapshot.val())
          }
        }
      )

      get(child(ref(database), `reviews/${user.uid}`)).then(snapshot => {
        if (snapshot.exists()) {
          if (isbn in snapshot.val()) {
            written_review_container.style.display = 'none'
            saved_review.style.display = 'block'
          } else {
            written_review_container.style.display = 'block'
            saved_review.style.display = 'none'
          }
        }
      })
    }
  })
}

function showReview(snapshot) {
  written_review_container.style.display = 'none'
  const review = snapshot.review
  review_container.innerText = review
}

function editReview() {
  written_review_container.style.display = 'block'
  saved_review.style.display = 'none'

  onAuthStateChanged(auth, user => {
    if (user) {
      get(child(ref(database), `reviews/${user.uid}/${isbn}`)).then(
        snapshot => {
          if (snapshot.exists()) {
            review.innerText = snapshot.val().review
          } else {
            console.log('dfd in edit')
          }
        }
      )
    }
  })
}

function init() {
  fetchBookDetails().then(item => {
    displayBookDetails(item)
    save_btn.addEventListener('click', () => {
      saveReview(item)
    })
  })

  retrieve_review_data()

  edit_btn.addEventListener('click', () => {
    editReview()
  })
}

init()
