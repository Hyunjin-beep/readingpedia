'use strict'

import AuthService from './service/AuthService.js'
import DB_Book from './service/DB_Book.js'

const logOut = document.querySelector('.logout')
const userNickName = document.querySelector('.user-nickname')
const userEmail = document.querySelector('.user-email')
const resetBtn = document.querySelector('.reset')
const userID = localStorage.getItem('userID')

const personalBtn = document.querySelector('.personal-page')
const personalBtnMedia = document.querySelector('.personal-page-media')

const authService = new AuthService()
const db_book = new DB_Book()

function checkLogInStatus() {
  db_book.get_data(`users/${userID}`, snapshot => {
    if (snapshot) {
      userEmail.innerText = `${snapshot.Email}`
      userNickName.innerText = `${snapshot.NickName}`
    } else {
      alert('Log In First, Please!')
      location.href = 'signIn.html'
    }
  })
}

function reset() {
  db_book.remove(`reviews/${userID}`)
}

function userCheck(user) {
  user
    ? (window.location.href = 'personal.html')
    : (window.location.href = 'signIn.html')
}

function init() {
  logOut.addEventListener('click', authService.logOut)
  checkLogInStatus()

  resetBtn.addEventListener('click', reset)

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
