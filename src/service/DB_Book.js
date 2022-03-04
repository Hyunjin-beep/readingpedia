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
  addToList(userID, item) {
    const listRef = ref(database, `lists/${userID}`)
    const itemRef = push(listRef)
    set(itemRef, item)
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
}
