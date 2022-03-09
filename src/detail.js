;('use strict')
import DB_Book from './service/DB_Book.js'
import AuthService from './service/AuthService.js'
import FetchBook from './service/Fetch_Book.js'

const bookcover_img = document.querySelector('.book-cover-img')
const book_metadata = document.querySelector('.book-metadata')
const purchase_btn = document.querySelector('.purchase-button')
const add_my_list = document.querySelector('.add-my-list')
const review_btn = document.querySelector('.review-button')
const recommendations_container = document.querySelector('.recommendations')

const userID = localStorage.getItem('userID')
const category = localStorage.getItem('category')

const fetchBook = new FetchBook()
const db_book = new DB_Book()
const authService = new AuthService()

function addBookToList(event, item) {
  event.preventDefault()
  const isbn = localStorage.getItem('isbn')
  const today = new Date()
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`

  const pageCount = item.volumeInfo.pageCount
  const book_cover_img = item.volumeInfo.imageLinks.thumbnail
  const bookData = {
    isbn,
    date: todayDate,
    pageCount,
    book_cover_img,
  }

  db_book.addToList(userID, bookData)
}

function displayBookDetails(item) {
  const title = item.volumeInfo.title
  const overview =
    item.volumeInfo.description !== undefined
      ? item.volumeInfo.description
      : 'No Information'
  const author = item.volumeInfo.authors[0]
  const book_cover_img =
    item.volumeInfo.imageLinks !== undefined
      ? item.volumeInfo.imageLinks['thumbnail']
      : ''
  const purhcase_link = item.volumeInfo.infoLink

  const book_cover = document.createElement('img')
  book_cover.setAttribute('class', 'book-cover-myThoughts')
  book_cover['src'] = book_cover_img
  bookcover_img.appendChild(book_cover)

  book_metadata.innerHTML = `<div class="author_title"><span class="book-title-personal">${title}</span>
  <span class="book-autho">${author}</span></div>
  <p class="book-overview">
   ${overview}
  </p>`

  purchase_btn.innerHTML = `<a href=${purhcase_link}>Go to buy this book</a>`
}

function displayAndBtn(item) {
  displayBookDetails(item)

  add_my_list.addEventListener('click', event => {
    authService.onAuthState(user => {
      if (user) {
        addBookToList(event, item)
      } else {
        alert('not signed in')
        window.location.href = 'signIn.html'
      }
    })
  })

  review_btn.addEventListener('click', () => {
    authService.onAuthState(user => {
      if (user) {
        window.location.href = 'myThoughts.html'
      } else {
        alert('not signed in')
        window.location.href = 'signIn.html'
      }
    })
  })
}

function displayRecommendation(items) {
  items.map(item => {
    const itemInfor = item.volumeInfo
    const book_cover = itemInfor.imageLinks
      ? itemInfor.imageLinks.smallThumbnail
      : ''
    const title = itemInfor.title
    const id = item.id

    const listItem = createItems(book_cover, title, id)

    recommendations_container.appendChild(listItem)
  })
}

function createItems(book_cover, title, id) {
  const item = document.createElement('li')
  item.setAttribute('class', 'recommendation')
  item.innerHTML = `<a href="detail.html"
  ><img src=${book_cover} alt="" 
  class="recommendation-cover"
/></a> <span class="recommendation_title">${title}</span>`

  item.addEventListener('click', () => {
    directPage(id, category)
  })

  return item
}

function directPage(id, category) {
  category = category !== undefined ? category : null

  localStorage.setItem('isbn', id)
  window.document.location = '../page/detail.html'
}

function init() {
  const isbn = localStorage.getItem('isbn')

  if (isbn.length !== 10) {
    fetchBook.fetchGoogleID(isbn).then(item => {
      displayAndBtn(item)
    })
  } else {
    fetchBook.fetchGoogle(isbn).then(item => {
      localStorage.setItem('category', item[0].volumeInfo.categories[0])
      displayAndBtn(item[0])
    })
  }

  fetchBook.fetchGoogleGenre(category).then(item => {
    displayRecommendation(item)
  })
}

init()
