'use strict'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  ref,
  get,
  update,
  child,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAi4A5QW-H3e5OfXPEuHIceIky7eWBaLkw',
  authDomain: 'readingpedia-8c5ac.firebaseapp.com',
  projectId: 'readingpedia-8c5ac',
  storageBucket: 'readingpedia-8c5ac.appspot.com',
  messagingSenderId: '100331426275',
  appId: '1:100331426275:web:b0bcdc5a2abf9a5acc50d6',
  measurementId: 'G-7CKCCLQWG7',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const database = getDatabase(app)

const nameInput = document.querySelector('.fullName')
const emailInput = document.querySelector('.email')
const nickNameInput = document.querySelector('.nickName')
const passwordInput = document.querySelector('.password')
const changeBtn = document.querySelector('.changeBtn')

function DisplayData() {
  onAuthStateChanged(auth, user => {
    if (user) {
      const dbref = ref(database)
      get(child(dbref, `users/${user.uid}`)).then(snapshot => {
        if (snapshot.exists()) {
          nameInput.value = snapshot.val().FullName
          emailInput.value = snapshot.val().Email
          nickNameInput.value = snapshot.val().NickName
        } else {
          console.log('no in displayData in change')
        }
      })
    }
  })
}

function ChangeInfor(event) {
  const changedName = nameInput.value
  const changedEmail = emailInput.value
  const changedNickName = nickNameInput.value
  const changedPassword = passwordInput.value

  const user = auth.currentUser

  event.preventDefault()
  update(ref(database, `users/${user.uid}`), {
    FullName: changedName,
    Email: changedEmail,
    NickName: changedNickName,
  })

  updateEmail(user, `${changedEmail}`)
    .then(console.log('ok with email'))
    .catch(error => console.log(error))
  updatePassword(user, changedPassword)
    .then(console.log('ok with password'))
    .catch(error => console.log(error))

  signOut(auth)
    .then(() => {
      window.location = 'signIn.html'
    })
    .catch(console.log)
}

function init() {
  DisplayData()
  changeBtn.addEventListener('click', event => {
    ChangeInfor(event)
  })
}

init()
