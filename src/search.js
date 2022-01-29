const googleBooks = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
const result_container = document.querySelector('.search-result-grid-container')

function fetchBookResults() {
  const keyword = localStorage.getItem('keyword')
  localStorage.removeItem('keyword')
  return fetch(`${googleBooks}${keyword}`, { method: 'get' }) //
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json.items
    })
}

function displayItem(items) {
  items.map(item => {
    const item_row = createItems(item)
    result_container.appendChild(item_row)
  })
}

function createItems(item) {
  const isbn = item.volumeInfo.industryIdentifiers[0]['identifier']
  const author = item.volumeInfo.authors[0]
  const title = item.volumeInfo.title
  const publishDate =
    item.volumeInfo.publishedDate !== undefined
      ? item.volumeInfo.publishedDate
      : 'No Information'
  const book_cover =
    item.volumeInfo.imageLinks !== undefined
      ? item.volumeInfo.imageLinks['thumbnail']
      : ''

  const result = document.createElement('div')
  result.setAttribute('class', 'grid-item')
  result.innerHTML = `<div class="book-container-grid">
      <div class="book-infor-grid img-cover-grid">
        <a href="detail.html"><img src=${book_cover} alt="" /></a>
      </div>
      <div class="book-infor">
        <a href="detail.html"
          ><span class="book-title-grid book-infor-grid"
            >${title}</span
          ></a
        >
        <span class="book-author-grid book-infor-grid">${author}</span>
        <span class="book-date-grid book-infor-grid">${publishDate}</span>
      </div>
    </div>`

  result.addEventListener('click', () => {
    directToDetailPage(isbn)
  })
  return result
}

function directToDetailPage(isbn) {
  localStorage.setItem('isbn', isbn)
  window.document.location = '../page/detail.html'
}

function init() {
  fetchBookResults().then(item => {
    displayItem(item)
  })
  // .catch(console.log)
}
init()
