'use strict'

import DB_Book from './service/DB_Book.js'

const userName = document.querySelector('.personal-name')
const listBooksCotainer = document.querySelector('.in-stack-books')
const reviewedBooksContainer = document.querySelector('.reviewed-books')
const book_height = document.querySelector('.personal-knowledge-hegiht')
const userID = localStorage.getItem('userID')

const db_book = new DB_Book()

function onAuth() {
  db_book.get_data(`users/${userID}`, snapshot => {
    if (snapshot) {
      userName.innerText = `Hi, ${snapshot.NickName} `
      displayLists(userID)
    } else {
      console.log('no   in onAuthStateChanged in personal.js')
    }
  })
}

function displayLists(userID) {
  // get data
  db_book.get_data(`lists/${userID}`, snapshot => {
    if (snapshot) {
      const keys = Object.keys(snapshot)
      const book_infor = keys.map(key => {
        return snapshot[key]
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
    }
  })

  db_book.get_data(`reviews/${userID}`, snapshot => {
    if (snapshot) {
      const keys = Object.keys(snapshot)
      const reviewed_book_infor = keys.map(key => {
        return snapshot[key]
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

      book_height.innerText =
        page_count === 0
          ? `Start to read books!`
          : `Your knowledge height is ${page_count} cm`
    }
  })
}

function init() {
  if (localStorage.getItem('userID') !== null) {
    onAuth()
  } else {
    alert('No Accounts')
    location.href = 'signIn.html'
  }
}

init()
