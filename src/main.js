;('use strict')

const apiKEY = 'a5bvxgKcuKEGoqTrnDOYoon74EqWIJAz'
const nybestsellerslink =
  'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key='
function fetchingBooksInfor() {
  return fetch(`${nybestsellerslink}${apiKEY}`, { method: 'get' })
    .then(response => {
      return response.json()
    })
    .then(json => json.results)
}

function sortingItem(item) {
  for (let i = 0; i < item.length; i++) {
    const bookInfor = item[i].book_details[0]
    let isbn = ''
    if (item[i].isbns[1] == undefined) {
      isbn = ''
    } else {
      isbn = item[i].isbns[1].isbn10
    }

    displayBooks(bookInfor, isbn)
  }
}

function displayBooks(bookInfor, isbn) {
  console.log(bookInfor)
  console.log(isbn)
}

fetchingBooksInfor()
  .then(item => {
    sortingItem(item)
  })
  .catch(console.log)
