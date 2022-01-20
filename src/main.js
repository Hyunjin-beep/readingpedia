;('use strict')

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'

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

const personalBtn = document.querySelector('.personal-page')
personalBtn.addEventListener('click', () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      window.location.href = 'personal.html'
    } else {
      // User is signed out
      // ...
      console.log('not signed in')
      window.location.href = 'signIn.html'
    }
  })
})

// Initialize element
const bestseller_container = document.querySelector('.bestsellers')

//Business Logics
const apiKEY = 'a5bvxgKcuKEGoqTrnDOYoon74EqWIJAz'
const nybestsellerslink =
  'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key='
const googleBooks = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'

function fetchingBooksInfor() {
  return fetch(`${nybestsellerslink}${apiKEY}`, { method: 'get' })
    .then(response => {
      return response.json()
    })
    .then(json => json.results)
}

function fetchBookInforGoogle(isbn) {
  if (isbn === '') {
    console.log('no isbn in fetch ')
  } else {
    return fetch(`${googleBooks}${isbn}`, { method: 'get' })
      .then(response => {
        return response.json()
      })
      .then(json => displayBooks(json.items, isbn))
  }
}

function sortingItem(item) {
  for (let i = 0; i < item.length; i++) {
    const bookInfor = item[i].book_details[0]
    let isbn = ''
    if (item[i].isbns[1] == undefined) {
      isbn = ''
    } else {
      isbn = item[i].isbns[1].isbn10
    }

    fetchBookInforGoogle(isbn)
  }
}

function displayBooks(bookInfor, isbn) {
  if (bookInfor === undefined) {
    console.log('no infor in dis')
  } else {
    const bestseller_title = bookInfor[0].volumeInfo.title
    const bestseller_book_cover =
      bookInfor[0].volumeInfo.imageLinks.smallThumbnail
    const item_row = createItems(bestseller_book_cover, bestseller_title, isbn)
    bestseller_container.appendChild(item_row)
  }
}

function createItems(book_cover, title, isbn) {
  const item = document.createElement('li')
  item.setAttribute('class', 'bestseller')
  item.innerHTML = `<div class="book-container" data-id="${isbn}">
  <a href="detail.html" class="img-cover"
    ><img src=${book_cover} alt=""
  /></a>
  <span class="book-title">${title}</span>
</div>`

  item.addEventListener('click', () => {
    directToDetailPage(isbn)
  })

  return item
}

function directToDetailPage(isbn) {
  localStorage.setItem('isbn', isbn)
  window.document.location = '../page/detail.html'
}

fetchingBooksInfor()
  .then(item => {
    sortingItem(item)
  })
  .catch(console.log)
