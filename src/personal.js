'use strict'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  ref,
  get,
  child,
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
const database = getDatabase(app)
const auth = getAuth()

const userName = document.querySelector('.personal-name')

const listBooksCotainer = document.querySelector('.in-stack-books')
const reviewedBooksContainer = document.querySelector('.reviewed-books')

const book_height = document.querySelector('.personal-knowledge-hegiht')

function onAuth() {
  onAuthStateChanged(auth, user => {
    if (user) {
      const dbref = ref(database)
      get(child(dbref, 'users/' + user.uid)).then(snapshot => {
        if (snapshot.exists()) {
          userName.innerText = `Hi, ${snapshot.val().NickName} `
          displayLists(user.uid)
        } else {
          console.log('no   in onAuthStateChanged in personal.js')
        }
      })
    }
  })
}

function displayLists(userID) {
  // get data
  const dbref = ref(database)
  get(child(dbref, `lists/${userID}`)).then(snapshot => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val())
      const book_infor = keys.map(key => {
        return snapshot.val()[key]
      })

      const bookelement = book_infor
        .map(book => {
          return `<div class="in-stack-grid-item personal-book-item">
        <a href="detail.html"
         ><img src="${book.book_cover_img}" alt="" class="reviewed-cover"
       /></a>
     </div>`
        })
        .join('')

      listBooksCotainer.innerHTML = bookelement
    } else {
      console.log('no snap  ')
    }
  })

  get(child(dbref, `reviews/${userID}`)).then(snapshot => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val())
      const reviewed_book_infor = keys.map(key => {
        return snapshot.val()[key]
      })

      const book_element = reviewed_book_infor
        .map(book => {
          return `<div class="reviewed-grid-item personal-book-item">
        <a href="myThoughts.html"
          ><img src=${book.book_cover_img} alt="" class="reviewed-cover"
        /></a>
      </div>`
        })
        .join('')

      reviewedBooksContainer.innerHTML = book_element

      const page_count = reviewed_book_infor
        .map(book => {
          return book.pageCount
        })
        .reduce((x, y) => {
          return x + y
        })
      book_height.innerText = `Your knowledge height is ${page_count} cm`
    } else {
      console.log('no')
    }
  })
}

function init() {
  onAuth()
}
init()
