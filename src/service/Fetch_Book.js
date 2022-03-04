const NYLINK =
  'https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key='
const GOOGLEBOOKS = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'
const APIKEY = 'a5bvxgKcuKEGoqTrnDOYoon74EqWIJAz'
const GOOGLEBOOKSKEYWORDS =
  'https://www.googleapis.com/books/v1/volumes?q=intitle:'
export default class FetchBook {
  async fetchNYBook() {
    const response = await fetch(`${NYLINK}${APIKEY}`, { method: 'get' })
    const json = await response.json()
    return json.results
  }

  async fetchGoogle(isbn) {
    if (isbn !== '') {
      const response = await fetch(`${GOOGLEBOOKS}${isbn}`, { method: 'get' })
      const json = await response.json()
      return json.items
    }
  }

  async fetchGoolgeKeywords(keywords) {
    if (keywords !== '') {
      const response = await fetch(`${GOOGLEBOOKSKEYWORDS}${keywords}`, {
        method: `get`,
      })
      const json = await response.json()
      return json.items
    }
  }
}
