import { auth, database } from './Firebase.js'

import {
  push,
  ref,
  set,
  child,
  get,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js'

export default class DB_Book {
  addToList(userID, item, isbn) {
    set(ref(database, `lists/${userID}/${isbn}`), item)
  }

  check_added(userID, isbn, check) {
    get(child(ref(database), `lists/${userID}/${isbn}`)) ///
      .then(snapshot => check(snapshot.val()))
  }

  saveReview(item, isbn) {
    const user = auth.currentUser.uid
    set(ref(database, `reviews/${user}/${isbn}`), item)
  }

  get_data(root, show) {
    get(child(ref(database), root)) ///
      .then(snapshot => {
        show(snapshot.val())
      })
  }

  remove(root) {
    remove(ref(database, root))
      .then(() => {
        alert('Removed All')
      })
      .catch(console.log)
  }

  removeOne(root) {
    remove(ref(database, root))
      .then(() => {
        alert('Deleted')
      })
      .catch(console.log)
  }
}
