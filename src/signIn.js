'use strict'

import AuthService from './service/AuthService.js'

const email = document.querySelector('.email')
const password = document.querySelector('.password')
const signInBtn = document.querySelector('.signIn')

function LogIn(email, password) {
  const auth = new AuthService()
  auth.logIn(email, password)
}

function init() {
  signInBtn.addEventListener('click', event => {
    event.preventDefault()
    LogIn(email.value, password.value)
  })
}

init()
