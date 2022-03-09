;('use strict')

import FetchBook from './service/Fetch_Book.js'
import AuthService from './service/AuthService.js'

const bestseller_container = document.querySelector('.bestsellers')
const search_form = document.querySelector('.search-container')
const keyword_input = document.querySelector('.search-input')
const personalBtn = document.querySelector('.personal-page')
const personalBtnMedia = document.querySelector('.personal-page-media')
const genreContainerTop = document.querySelector('.genre-container-top')
const categories = [
  'Art',
  'Music',
  'Romance',
  'Fiction',
  'Poetry',
  'Drama',
  'Science',
  'History',
  'Crime',
  'Nature',
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
    directPage(isbn, 'Fiction')
  })

  return item
}

function wrappingTop(item, category) {
  const section = document.createElement('section')
  section.setAttribute('class', 'books-container')
  section.innerHTML = `<div class="genre-title books-title"><h3>${category}</h3></div>`

  const attributes = displayGenreBooks(item, category)
  const div = document.createElement('div')
  div.setAttribute('class', 'books-list')
  div.appendChild(attributes)

  section.appendChild(div)
  genreContainerTop.appendChild(section)
}

function displayGenreBooks(items, category) {
  const list = document.createElement('ul')
  list.setAttribute('class', 'genre-books')

  items.map(item => {
    const title = item.volumeInfo.title
    const book_cover = item.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks.smallThumbnail
      : ''
    const listItem = createGenreItems(title, book_cover, item.id, category)
    list.appendChild(listItem)
    return listItem
  })

  return list
}

function createGenreItems(title, book_cover, id, category) {
  const item = document.createElement('li')
  item.setAttribute('class', 'genre-book')
  item.innerHTML = `<div class="book-container">
  <a href="detail.html" class="img-cover"
    ><img src=${book_cover} alt=""
  /></a>
  <span class="book-title"
    >${title}</span
  >
</div>`

  item.addEventListener('click', () => {
    directPage(id, category)
  })

  return item
}

function directPage(id, category) {
  category = category !== undefined ? category : null
  localStorage.setItem('category', category)
  if (id !== undefined) {
    localStorage.setItem('isbn', id)
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
      wrappingTop(item, randomCate[i])
    })
  }

  search_form.addEventListener('submit', () => {
    directPage()
  })

  personalBtnMedia.addEventListener('click', () => {
    authService.onAuthState(user => {
      userCheck(user)
    })
  })

  personalBtn.addEventListener('click', () => {
    authService.onAuthState(user => {
      userCheck(user)
    })
  })
}

init()
