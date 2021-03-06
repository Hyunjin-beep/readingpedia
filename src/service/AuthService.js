import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import { auth, database } from './Firebase.js'
import {
  ref,
  set,
  update,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'

export default class AuthService {
  createUser(email, password, fullName, nickName) {
    const user = createUserWithEmailAndPassword(auth, email, password) //
      .then(async userCredential => {
        const userId = userCredential.user.uid
        return userId
      })
      .then(userId => {
        alert('user created')
        localStorage.setItem('userID', userId)
        this.saveUserData(userId, fullName, email, nickName)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log(errorCode, errorMessage)
      })

    return user
  }

  logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const userId = userCredential.user.uid
        return userId
      })
      .then(userId => {
        alert('Logged In')
        this.logInTime(userId)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  saveUserData(userId, fullName, email, nickName) {
    set(ref(database, `users/${userId}`), {
      FullName: fullName,
      Email: email,
      NickName: nickName,
      UserID: userId,
    }).then(() => {
      setTimeout(1000)
      location.href = 'signIn.html'
    })
  }

  logInTime(userId) {
    update(ref(database, `users/${userId}`), {
      last_login: new Date(),
    }).then(() => {
      setTimeout(1000)
      location.href = 'index.html'
    })
  }

  async onAuthState(direct) {
    onAuthStateChanged(auth, user => {
      direct(user)
    })
  }

  logOut() {
    signOut(auth)
      .then(() => {
        location.href = 'signIn.html'
      })
      .catch(console.log)
  }

  updateUserInfor(root, item) {
    update(ref(database, root), item).then(() => {
      setTimeout(1000)
      location.href = 'index.html'
    })
  }

  updateChangedEmail(email) {
    updateEmail(auth.currentUser, email).then(
      alert('Email Changed Successfully')
    )
  }

  updateChangedPwd(password) {
    updatePassword(auth.currentUser, password).then(
      alert('Password Changed Successfully')
    )
  }
}
