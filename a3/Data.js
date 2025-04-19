let BOOKS = [];
let AUTHORS = [];
let GENRES = [];
let genresFetched = false;
let authorsFetched = false;
let booksFetched = false;


const fetchBooks = async () => {
  if (booksFetched) return;
  try {
    const response = await fetch('https://books-ac171-default-rtdb.asia-southeast1.firebasedatabase.app/books.json');
    const data = await response.json();
    BOOKS = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    booksFetched = true;
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};
const fetchAuthors = async () => {
  try {
    const response = await fetch('https://books-ac171-default-rtdb.asia-southeast1.firebasedatabase.app/authors.json');
    const data = await response.json();
    AUTHORS = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    authorsFetched = true;
  } catch (error) {
    console.error('Error fetching authors:', error);
  }
};
const fetchGenres = async () => {
  try {
    const response = await fetch('https://books-ac171-default-rtdb.asia-southeast1.firebasedatabase.app/genres.json');
    const data = await response.json();
    GENRES = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    genresFetched = true;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};

fetchBooks();
fetchAuthors();
fetchGenres();

export async function getFeaturedBooks() {
  if (!booksFetched) await fetchBooks();
  return BOOKS.filter((book) => book.isFeatured);
}

export async function getAllBooks() {
  if (!booksFetched) await fetchBooks();
  return BOOKS;
}

export async function getBookById(id) {
  if (!booksFetched) await fetchBooks();
  return BOOKS.find((book) => book.id === id);
}

export async function getFilteredBooks(genreId) {
  if (!booksFetched) await fetchBooks();
  return BOOKS.filter((book) => book.genreId == genreId);
}

export async function getAllAuthors() {
  if (!authorsFetched) await fetchAuthors();
  return AUTHORS;
}

export async function getAllGenres() {
  if (!genresFetched) await fetchGenres();
  return GENRES;
}

export async function getAuthorById(id) {
  if (!authorsFetched) await fetchAuthors();
  return AUTHORS.find((author) => author.id == id);
}

export async function getBooksByAuthorId(authorId) {
  if (!booksFetched) await fetchBooks();
  return BOOKS.filter((book) => book.authorId == authorId);
}

export async function getAuthorByBookId(bookId) {
  if (!booksFetched) await fetchBooks();
  const book = BOOKS.find((book) => book.id == bookId);
  return getAuthorById(book.authorId);
}