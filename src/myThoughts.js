;('use strict')

import FetchBook from './service/Fetch_Book.js'
import DB_Book from './service/DB_Book.js'

const bookcover_img = document.querySelector('.book-cover-img')
const book_metadata = document.querySelector('.book-metadata')

const written_review_container = document.querySelector(
  '.write-my-thoughts-container'
)
const review = document.querySelector('.my-thoughts-textarea')
const save_btn = document.querySelector('.review-submit')

const saved_review = document.querySelector('.written-my-thoughts-container')
const review_container = document.querySelector('.my-thoughts')
const review_date = document.querySelector('.review-date')
const edit_btn = document.querySelector('.my-thoughts-edit')

const isbn = localStorage.getItem('isbn')
const userID = localStorage.getItem('userID')

const fetchBook = new FetchBook()
const db_book = new DB_Book()

function displayBookDetails(item) {
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
  const pageCount = item.volumeInfo.pageCount ? item.volumeInfo.pageCount : 0
  const book_cover_img = item.volumeInfo.imageLinks.thumbnail
  const today = new Date()
  const todayDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const review_data = {
    isbn,
    pageCount,
    book_cover_img,
    review: review.value,
    todayDate,
  }

  db_book.saveReview(review_data, isbn)
  review.value = ''

  window.location.reload()
}

function retrieve_review_data() {
  db_book.get_data(`reviews/${userID}/${isbn}`, item => {
    if (item) {
      showReview(item)
    } else {
      console.log('nope')
      saved_review.style.display = 'none'
    }
  })
}

function showReview(snapshot) {
  written_review_container.style.display = 'none'
  const review = snapshot.review
  console.log(snapshot.todayDate)
  review_container.innerText = review
  review_date.innerText = snapshot.todayDate
}

function editReview() {
  written_review_container.style.display = 'block'
  saved_review.style.display = 'none'

  db_book.get_data(`reviews/${userID}/${isbn}`, item => {
    item && (review.innerText = item.review)
  })
}

function init() {
  fetchBook.fetchGoogle(isbn).then(item => {
    displayBookDetails(item[0])
    save_btn.addEventListener('click', () => {
      saveReview(item[0])
    })
  })

  retrieve_review_data()

  edit_btn.addEventListener('click', () => {
    editReview()
  })
}

init()
