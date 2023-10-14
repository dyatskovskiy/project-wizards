import axios from 'axios';

export async function fetchTopBooks() {
  const response = await axios.get(
    'https://books-backend.p.goit.global/books/top-books'
  );
  return response.data;
}
export async function fetchBooksOfSelectedCategory(selectedCategory) {
  const response = await axios.get(
    `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
  );
  return response.data;
}

export async function fetchBookById(bookId) {
  const response = await axios.get(
    `https://books-backend.p.goit.global/books/${bookId}`
  );
  return response.data;
}