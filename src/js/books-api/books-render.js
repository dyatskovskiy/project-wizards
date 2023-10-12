import { fetchTopBooks } from './books-api';
import { fetchBooksOfSelectedCategory } from './books-api';

const topBooksData = fetchTopBooks();
const booksContainerEl = document.querySelector('.books-container');
const booksTitleEl = document.querySelector('.books-title');
const categoryLink = document.querySelector('.categories__list');

categoryLink.addEventListener('click', onCategoryClick);

async function renderTopBooks(data) {
  try {
    data = await data;

    booksTitleEl.innerHTML = styleLastWordOfTitle('Best Sellers Books');
    const topBooksMarkup = await Promise.all(
      data.map(async ({ books, list_name }) => {
        return `
          <p class="books-category-name">${list_name}</p>
          <ul class="top-books-category-list category-list">
            ${await renderCategoryOfBooks(books)}
          </ul>
          <button class="see-more-btn" data-category="${list_name}" type="button">See more</button>`;
      })
    );

    booksContainerEl.insertAdjacentHTML('beforeend', topBooksMarkup.join(''));

    const seeMoreButtons = document.querySelectorAll('.see-more-btn');
    seeMoreButtons.forEach(button => {
      button.addEventListener('click', onSeeMoreClick);
    });

    async function onSeeMoreClick(e) {
      const selectedCategory = e.target.getAttribute('data-category');
      const categoryBooksData = await fetchBooksOfSelectedCategory(
        selectedCategory
      );
      booksContainerEl.innerHTML = '';
      renderBooksOfSelectedCategory(selectedCategory, categoryBooksData);
      window.scrollTo(0, 0);
    }
  } catch (error) {
    console.error(error);
  }
}

function styleLastWordOfTitle(textContent) {
  const words = textContent.split(' ');
  const lastWord = words.pop();
  return words.join(' ') + ` <span class="last-word">${lastWord}</span>`;
}

async function renderCategoryOfBooks(books) {
  const bookMarkup = await Promise.all(
    books.map(async ({ book_image, title, author, _id }) => {
      return `
        <li class="book-card">
          <a  id="${_id}" href="#" class="book_link">  
            <div class="img-wrapper">
              <img class="book-img" src="${book_image}" alt="book ${title}">
            </div>
            <p class="book-title">${title}</p>
            <p class="book-author">${author}</p>
          </a>
        </li>`;
    })
  );
  return bookMarkup.join('');
}

renderTopBooks(topBooksData);

function onCategoryClick(e) {
  e.preventDefault();
  booksContainerEl.innerHTML = '';
  const selectedCategory = e.target.textContent.trim();
  const currentCategory = document.querySelector('.current-category');
  if (selectedCategory === 'All categories') {
    renderTopBooks(topBooksData);
    return;
  }

  currentCategory.classList.remove('current-category');
  e.target.classList.add('current-category');

  const categoryBooksData = fetchBooksOfSelectedCategory(selectedCategory);
  booksContainerEl.innerHTML = '';
  renderBooksOfSelectedCategory(selectedCategory, categoryBooksData);
}

async function renderBooksOfSelectedCategory(title, data) {
  booksTitleEl.innerHTML = styleLastWordOfTitle(title);
  const booksOfSelectedCategoryMarkup = `
  <ul class="books-category-list category-list">
    ${await renderCategoryOfBooks(await data)}
  </ul>`;
  booksContainerEl.insertAdjacentHTML(
    'beforeend',
    booksOfSelectedCategoryMarkup
  );
}
