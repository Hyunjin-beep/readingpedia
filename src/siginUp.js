// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js'
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBIqx0gW3HotiUTbpfIQ0pgsV7dkJGwPKY',
  authDomain: 'readingpedia-ada77.firebaseapp.com',
  projectId: 'readingpedia-ada77',
  storageBucket: 'readingpedia-ada77.appspot.com',
  messagingSenderId: '176004618295',
  appId: '1:176004618295:web:84b9f6e8dc3f0e2c2787b2',
  measurementId: 'G-SX3L14VT4G',
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
  let uesrInfor = new Map()
  for (let inputV of inputs) {
    uesrInfor.set(inputV.name, inputV.value)
  }
  SignUp()
  form.reset()
  name.focus()
})

function SignUp() {
  // for (let [key, value] of uesrInfor) {
  //   if (value === '') {
  //   }
  // }

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
        })

        window.location.href = 'signIn.html'
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
