;('use strict')

import FetchBook from './service/Fetch_Book.js'
import AuthService from './service/AuthService.js'

const bestseller_container = document.querySelector('.bestsellers')
const search_form = document.querySelector('.search-container')
const keyword_input = document.querySelector('.search-input')
const personalBtn = document.querySelector('.personal-page')

const fetchBook = new FetchBook()
const authService = new AuthService()
// Initialize element

//Business Logics

function sortingItem(item) {
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

function init() {
  // localStorage.clear()

  fetchBook
    .fetchNYBook()
    .then(item => {
      sortingItem(item)
    })
    .catch(console.log)

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
