import { fetchTopBooks } from './books-api';
import { fetchBooksOfSelectedCategory } from './books-api';
import { Notify, Loading } from 'notiflix';

const topBooksData = fetchTopBooks();
const booksContainerEl = document.querySelector('.books-container');
const booksTitleEl = document.querySelector('.books-title');
const categoryesListEl = document.querySelector('.categories__list');

categoryesListEl.addEventListener('click', onCategoryClick);

Loading.dots('Loading the books...', {
  backgroundColor: '#11111130',
  svgColor: '#4F2EE8',
  svgSize: '150px',
  messageColor: '#111111',
  messageFontSize: '16px'
});

const loaderIcon = document.querySelector('.notiflix-loading');

async function renderTopBooks(data) {
  try {
    data = await data;

    booksTitleEl.innerHTML = styleLastWordOfTitle('Best Sellers Books');
    const topBooksMarkup = await Promise.all(
      data.map(async ({ books, list_name }) => {
        return `
          <p class="books-category-name">${list_name}</p>
          <ul class="top-books-category-list books-list">
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
      loaderIcon.classList.remove('visually-hidden');

      const selectedCategory = e.target.getAttribute('data-category');
      const categoryLinksEl = document.querySelectorAll('.categories__link');

      categoryLinksEl.forEach(link => {
        link.classList.remove('current-category');
      });

      const selectedCategoryLink = Array.from(categoryLinksEl).find(
        link => link.textContent.trim() === selectedCategory
      );
      if (selectedCategoryLink) {
        selectedCategoryLink.classList.add('current-category');
      }

      const categoryBooksData = await fetchBooksOfSelectedCategory(
        selectedCategory
      );
      booksContainerEl.innerHTML = '';
      renderBooksOfSelectedCategory(selectedCategory, categoryBooksData);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    Notify.failure('The required books not found, please try again');
  }

  loaderIcon.classList.add('visually-hidden');
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
              <p class="quick-view-box">quick view</p>
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
  if (!e.target.classList.contains('categories__link')) {
    return;
  }
  loaderIcon.classList.remove('visually-hidden');

  booksContainerEl.innerHTML = '';
  const selectedCategory = e.target.textContent.trim();
  const currentCategory = document.querySelector('.current-category');

  if (selectedCategory === 'All categories') {
    renderTopBooks(topBooksData);
    setCurrentCategory(e, currentCategory);
    return;
  }

  setCurrentCategory(e, currentCategory);

  const categoryBooksData = fetchBooksOfSelectedCategory(selectedCategory);
  booksContainerEl.innerHTML = '';

  renderBooksOfSelectedCategory(selectedCategory, categoryBooksData);
}

async function renderBooksOfSelectedCategory(title, data) {
  try {
    booksTitleEl.innerHTML = styleLastWordOfTitle(title);
    const booksOfSelectedCategoryMarkup = `
  <ul class="books-category-list books-list">
    ${await renderCategoryOfBooks(await data)}
  </ul>`;
    booksContainerEl.insertAdjacentHTML(
      'beforeend',
      booksOfSelectedCategoryMarkup
    );
  } catch (error) {
    Notify.failure('The required books not found, please try again');
  }

  loaderIcon.classList.add('visually-hidden');
}

function setCurrentCategory(event, category) {
  category.classList.remove('current-category');
  event.target.classList.add('current-category');
}
