'use strict'

import AuthService from './service/AuthService.js'

const name = document.querySelector('.fullName')
const email = document.querySelector('.email')
const nickname = document.querySelector('.nickName')
const password = document.querySelector('.password')
const confirmPassword = document.querySelector('.confirmPassword')

const signUpbtn = document.querySelector('.signUp')

function SignUp() {
  const fullName = name.value
  const emailValue = email.value
  const nicknameValue = nickname.value
  const passwordValue = password.value
  const confirmPasswordValue = confirmPassword.value

  const passwordLength = passwordValue.length >= 6 ? true : false
  const checkPassword = passwordValue === confirmPasswordValue ? true : false

  if (
    passwordLength &&
    checkPassword &&
    fullName !== '' &&
    emailValue !== '' &&
    nicknameValue !== '' &&
    passwordValue !== ''
  ) {
    const auth = new AuthService()
    auth.createUser(emailValue, passwordValue, fullName, nicknameValue) ///
  }
}

function init() {
  signUpbtn.addEventListener('click', event => {
    event.preventDefault()
    SignUp()
  })
}

init()
