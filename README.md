# Title: ReadingPedia
### URL: https://readingpedia-8c5ac.web.app
# Languages: HTML, CSS, JavasCRIPT

# Database: Firebase

> ## TABLE OF CONTENTS

### 1. About the project

### 2. Details of project

### 3. Reference

---

## 1. About the project

This project is a web application for writing review for read books and adding the wanted books to list.
In addition to that, the main page shows 10 bestsellers and books from random categories.

Overall, there are three funtionalities :  
SignUp/SignIn, Search, Write Review/Add books

---

## 2. Why do I start this project?

After watching movies, I could write my reviews but when reading books, I could not find a good place to do that. The functionality that I want at least is containing only my review.

However, after deploying, If I am able to do, I am going to add functionality to see others' review and following system.

---

## 3. Details of project

First of all, users can see 11 bestsellers chosen by New York Times and 25 books from random categories.

_Main Page_

![index](https://user-images.githubusercontent.com/64330888/158082695-b2194068-2fd7-4524-b1f8-17164d6a0c52.png)

I used New York Times Books API with fetch() and after getting result as arrays, I used Google Books API as well for more detail including book cover image, description.

While looping list of items, create an element of each item and append them to the top container.

```
// In DB_Book.js
async fetchNYBook() {
    const response = await fetch(`${NYLINK}${APIKEY}`, { method: 'get' })
    const json = await response.json()
    return json.results
  }

// In main.js

function displayBooks(bookInfor, isbn) {
  if (bookInfor !== undefined) {
    .
    .
    .
    const item_row = createItems(bestseller_book_cover, bestseller_title, isbn)
    bestseller_container.appendChild(item_row)
  }
}


function createItems(book_cover, title, isbn) {
  const item = document.createElement('li')
  item.setAttribute('class', 'bestseller')
  item.innerHTML = `<div class="book-container" data-id="${isbn}">
  <a href="detail.html" class="img-cover"
    ><img src=${book_cover} alt=""
  /></a>
  <span class="book-title">${title}</span>
</div>`

  item.addEventListener('click', () => {
    directPage(isbn, 'Fiction')
  })

  return item
}
```

---

_SignUp & SignIn Page_

Most of functionalities such as leaving comments and adding books to my list can be used after signing up and signin in.

![signUp](https://user-images.githubusercontent.com/64330888/158083480-7e40a2b2-0cf0-4b14-add0-d444dcf4c07b.png)

I used Firebase Authentication with Email and Password. After creating a user, I saved its information in realtime database using set().

```
 In AuthService.js
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
```

![signIn](https://user-images.githubusercontent.com/64330888/158083482-e9acd6a4-cf74-4d58-b73a-8c891a4476ab.png)

SignIn functionality is also utilized by Firebase signInWithEmailAndPassword

---

_Random Categories_
![category(1)](https://user-images.githubusercontent.com/64330888/158083012-ed589e3a-7312-40f6-81de-fc999809a581.png)
![category(2)](https://user-images.githubusercontent.com/64330888/158083013-96bd09e7-10c2-4d1d-90f9-5152628d5e5b.png)

Every time reloading the main page, 25 books from five random categories are displayed.

---

_Detail Page_
![detail](https://user-images.githubusercontent.com/64330888/158083081-96928d07-8990-411c-a912-e1a9e24d61ad.png)

When a user clicks a book thumbnail, the detail page shows title, author, and description.

There are three buttons : Write reviews, add to list, and go to order link.

I used Firebase for storing user data.

Thus, clicking a button - Add to My List -, I used set() to save book data object.

```

// In DB_Book.js
addToList(userID, item, isbn) {
set(ref(database, `lists/${userID}/${isbn}`), item)
}

// In detail.js
const bookData = {
isbn,
date: todayDate,
pageCount,
book_cover_img,
}

db_book.addToList(userID, bookData, isbn)

```

---

_Add Books to List_
![addsuccss](https://user-images.githubusercontent.com/64330888/158084015-80e8a908-f6f4-47fd-9c51-0942ad80e560.png)

![deleted](https://user-images.githubusercontent.com/64330888/158084009-f4c0da32-6c5e-44a2-bc61-1c53cba3563f.png)

---

_Write My Thoughts_
![review](https://user-images.githubusercontent.com/64330888/158083278-e217f2d0-1593-41e8-b0e2-77f2202d9949.png)

![afterreview](https://user-images.githubusercontent.com/64330888/158083355-9344d361-0fe0-4c73-b566-90051c715eee.png)

Clicking a button - Write My Thoughts - , user will show the box for writing their reviews. Just like adding books to list, I used set() but different root for saving reviews.

---

_Personal Page_

The reason why users have to login is this. They can see which books they read and they add to their list.

![personal](https://user-images.githubusercontent.com/64330888/158083721-3beb5e5d-ab01-482a-95d2-79d2fc4f2af5.png)

I grabbed the page count when fetching books information and after a user writes review for books, the page count is calculated.

And when listing books, I used grid property to show four books at one line. An element for a book is created and appended to the container just like doing in Main Page.

```
 /* style.css */
 .my-books-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 2rem 4rem;
}
```

---

## 4. References

Firebase

- https://firebase.google.com/docs/auth,
- https://firebase.google.com/docs/firestore

Postman

- https://web.postman.co/

Books API

- https://developer.nytimes.com/docs/books-product/1/overview
- https://developers.google.com/books

Others

- https://stackoverflow.com/questions/46277878/how-to-get-books-of-searched-category-in-google-books-api

(keeping to add...)
