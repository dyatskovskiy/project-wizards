import axios from 'axios';

export async function fetchTopBooks() {
  try {
    const response = await axios.get(
      'https://books-backend.p.goit.global/books/top-books'
    );
    return response.data;
  } catch (error) {}
}
export async function fetchBooksOfSelectedCategory(selectedCategory) {
  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
    );
    return response.data;
  } catch (error) {}
}
