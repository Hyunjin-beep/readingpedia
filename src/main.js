;('use strict')

import FetchBook from './service/Fetch_Book.js'
import AuthService from './service/AuthService.js'

const bestseller_container = document.querySelector('.bestsellers')
const search_form = document.querySelector('.search-container')
const keyword_input = document.querySelector('.search-input')
const personalBtn = document.querySelector('.personal-page')
const categories = [
  'art',
  'music',
  'romance',
  'fiction',
  'POETRY',
  'DESIGN',
  'DARAMA',
  'SCIENCE',
  'GARDENING',
  'BUSINESS&ECONOMICS',
  'HISTORY',
  'crime',
]

const randomCate = randomCategories()

const fetchBook = new FetchBook()
const authService = new AuthService()

function sortingNYItem(item) {
  for (let i = 0; i < item.length; i++) {
    let isbn = ''
    if (item[i].isbns[1] == undefined) {
      isbn = ''
    } else {
      isbn = item[i].isbns[1].isbn10
    }

    fetchBook
      .fetchGoogle(isbn)
      .then(item => {
        displayBooks(item, isbn)
      })
      .catch(console.log)
  }
}

function displayBooks(bookInfor, isbn) {
  if (bookInfor !== undefined) {
    const bestseller_title = bookInfor[0].volumeInfo.title
    const bestseller_book_cover =
      bookInfor[0].volumeInfo.imageLinks.smallThumbnail
    const item_row = createItems(bestseller_book_cover, bestseller_title, isbn)
    bestseller_container.appendChild(item_row)
  }
}

function displayGenreBooks(item) {
  for (let i = 0; i < item.length; i++) {
    const title = item[i].volumeInfo.title
    const book_cover = item[i].volumeInfo.imageLinks
      ? item[i].volumeInfo.imageLinks.smallThumbnail
      : ''
    const item_row = createGenreItems(title, book_cover)
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
    directPage(isbn)
  })

  return item
}

function createGenreItems(title, book_cover) {}

function directPage(isbn) {
  if (isbn !== undefined) {
    localStorage.setItem('isbn', isbn)
    window.document.location = '../page/detail.html'
  } else {
    localStorage.setItem('keyword', keyword_input.value)
    window.document.location = '../page/search.html'
  }
}

function userCheck(user) {
  user
    ? (window.location.href = 'personal.html')
    : (window.location.href = 'signIn.html')
}

function randomCategories() {
  let arr = []
  while (arr.length < 5) {
    let r = Math.floor(Math.random() * (categories.length - 1)) + 1
    if (arr.indexOf(r) === -1) {
      arr.push(r)
    }
  }

  let randomCate = []

  for (let i = 0; i < arr.length; i++) {
    randomCate.push(categories[arr[i]])
  }

  return randomCate
}

function init() {
  // localStorage.clear()

  fetchBook
    .fetchNYBook()
    .then(item => {
      sortingNYItem(item)
    })
    .catch(console.log)

  for (let i = 0; i < randomCate.length; i++) {
    fetchBook.fetchGoogleGenre(randomCate[i]).then(item => {
      displayGenreBooks(item)
    })
  }

  search_form.addEventListener('submit', () => {
    directPage()
  })

  personalBtn.addEventListener('click', () => {
    authService.onAuthState(user => {
      userCheck(user)
    })
  })
}

init()
