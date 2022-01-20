// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import {
  getDatabase,
  ref,
  set,
  update,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAi4A5QW-H3e5OfXPEuHIceIky7eWBaLkw',
  authDomain: 'readingpedia-8c5ac.firebaseapp.com',
  projectId: 'readingpedia-8c5ac',
  storageBucket: 'readingpedia-8c5ac.appspot.com',
  messagingSenderId: '100331426275',
  appId: '1:100331426275:web:b0bcdc5a2abf9a5acc50d6',
  measurementId: 'G-7CKCCLQWG7',
}

// // Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

const name = document.querySelector('.fullName')
const email = document.querySelector('.email')
const nickname = document.querySelector('.nickName')
const password = document.querySelector('.password')
const confirmPassword = document.querySelector('.confirmPassword')

const signUpbtn = document.querySelector('.signUp')
const form = document.querySelector('.sign-up-information')
const inputs = document.querySelectorAll('.signUp-f')

signUpbtn.addEventListener('click', e => {
  e.preventDefault()

  SignUp()
  form.reset()
  name.focus()
})

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
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user

        set(ref(database, 'users/' + user.uid), {
          FullName: fullName,
          Email: emailValue,
          NickName: nicknameValue,
          UserID: user.uid,
        })

        set(ref(database, 'lists/' + user.uid), {
          UserID: user.uid,
          user_list: [],
        })

        console.log(`${fullName}, ${emailValue}, ${nicknameValue}`)

        alert('success')
      })

      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log(errorCode, errorMessage)
        // ..
      })
  }
}
