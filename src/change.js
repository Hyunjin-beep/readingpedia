'use strict'

import AuthService from './service/AuthService.js'
import DB_Book from './service/DB_Book.js'

const nameInput = document.querySelector('.fullName')
const emailInput = document.querySelector('.email')
const nickNameInput = document.querySelector('.nickName')
const passwordInput = document.querySelector('.password')
const changeBtn = document.querySelector('.changeBtn')

const userID = localStorage.getItem('userID')

const db_book = new DB_Book()
const authService = new AuthService()

function displayData() {
  db_book.get_data(`users/${userID}`, snapshot => {
    if (snapshot) {
      nameInput.value = snapshot.FullName
      emailInput.value = snapshot.Email
      nickNameInput.value = snapshot.NickName
    } else {
      alert('No Information')
      location.href = 'signIn.html'
    }
  })
}

function changeInfor(event) {
  event.preventDefault()
  const changedName = nameInput.value
  const changedEmail = emailInput.value
  const changedNickName = nickNameInput.value
  const changedPassword = passwordInput.value

  const user_infor = {
    FullName: changedName,
    Email: changedEmail,
    NickName: changedNickName,
  }
  authService.updateUserInfor(`users/${userID}`, user_infor)
  authService.updateChangedEmail(changedEmail)
  authService.updateChangedEmail(changedPassword)
}

function init() {
  displayData()
  changeBtn.addEventListener('click', event => {
    changeInfor(event)
  })
}

init()
