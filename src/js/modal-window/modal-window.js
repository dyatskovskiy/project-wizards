import { fetchBookById } from '../books-api/books-api';
import {  Loading } from 'notiflix';
const booksContainer = document.querySelector('.books-container');
export const STORAGE_KEY = 'booksShopingList';

Loading.dots( {
  backgroundColor: '#11111130',
  svgColor: '#4F2EE8',
  svgSize: '150px',
});

const loaderIcon = document.querySelector('.notiflix-loading');


// Вибір елементів DOM для модального вікна
const modalWindow = document.querySelector('.backdrop');
const modalCloseButton = document.querySelector('.modal-close');
const bookWrapper = document.querySelector('.book-data');
let shopingList = [];
const savedShoppingList = localStorage.getItem(STORAGE_KEY);
const body = document.querySelector('body');

const amazonLink = new URL('../../img/stores-icons/image-am.png', import.meta.url);
const appleLink = new URL('../../img/stores-icons/image-ap.png', import.meta.url);

// Проверяем есть ли в localStorage массив с книгами, если есть присваиваем его значение массиву shopingList
if (savedShoppingList) {
  shopingList = JSON.parse(savedShoppingList);
}

booksContainer.addEventListener('click', onBookClick);

// Функція для відкриття модального вікна з інформацією про книгу
function openModal() {
  modalWindow.style.display = 'block';

  // Добавляем класс 'noscroll' к элементу body, чтобы предотвратить прокрутку фонового контента
  body.classList.add('noscroll');

  // Додаємо обробник події для кнопки закриття модального вікна
  modalCloseButton.addEventListener('click', closeModal);
}

// Обробник події для кліку на .backdrop
modalWindow.addEventListener('click', function (e) {
  if (e.target === modalWindow) {
    closeModal();
  }
});

// Функція для закриття модального вікна
function closeModal() {
  modalWindow.style.display = 'none'; // Сховуємо модальне вікно

  // Убираем класс 'noscroll' с элемента body, чтобы разрешить прокрутку фонового контента
  body.classList.remove('noscroll');

  // Видаляємо обробник події для кнопки закриття модального вікна
  modalCloseButton.removeEventListener('click', closeModal);
}
// Обробник події для клавіші "ESC"
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal();
  }
});
///////////
// Функція для обробки кліку на книгу
function onBookClick(e) {

  e.preventDefault();
  const bookLink = e.target.closest('.book_link');
  if (!bookLink) {
    return;
  }
  loaderIcon.classList.remove('visually-hidden');

  fetchBookById(bookLink.id).then(bookData => {
    bookRender(bookData);
  });

  openModal();
}

function bookRender({
  title,
  author,
  book_image,
  description,
  buy_links,
  list_name,
}) {
  const markup = `<div class="modal-cont">
  <img class="modal-book-img" src="${book_image}" alt="${title}" />
      <div class="info-cont">
      <h2 class="title">${title}</h2>
      <p class="author">${author}</p>
      <p class="description" data-category="${list_name}">${description}</p>
      <div class="link-wraper">
        <a class="book-link link amazon-by-link" href="${buy_links[0].url}" target="_blank" rel="noopener noreferrer"><img src="${amazonLink}" alt="Amazon" /></a>
        <a class="book-link link apple-books-by-link" href="${buy_links[1].url}" target="_blank" rel="noopener noreferrer"><img src="${appleLink}" alt="Apple" /></a>
      </div>
      </div>
      </div>
      <div class="button-cont">
      <button type="button" class="book-button book-btn ">add to shopping list</button>
      <button type="button" class="remove-button book-btn  visually-hidden">remove from the shopping list</button>
      <p class="congrats-text visually-hidden">Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.</p>
      </div>
      `;

  bookWrapper.innerHTML = markup;

  const bookButton = document.querySelector('.book-button');
  const removeButton = document.querySelector('.remove-button');
  const congratsTextEl = document.querySelector('.congrats-text');
  const bookImgEl = document.querySelector('.modal-book-img'); //+
  const bookTitleEl = document.querySelector('.title');
  const bookAuthorEl = document.querySelector('.author');
  const bookDescriptionEl = document.querySelector('.description'); //+
  const amazonLinkEl = document.querySelector('.amazon-by-link');
  const appleLinkEl = document.querySelector('.apple-books-by-link');

  // Проверяем, если книга уже добавлена в список покупок
  if (isBookInShoppingList(title)) {
    bookButton.classList.add('visually-hidden');
    removeButton.classList.remove('visually-hidden');
  }

  bookButton.addEventListener('click', setShopingListToLocalStorage);
  removeButton.addEventListener('click', removeFromShoppingList);

  function setShopingListToLocalStorage() {
    const bookData = {
      img: bookImgEl.src,
      category: bookDescriptionEl.dataset.category,
      title: bookTitleEl.textContent,
      author: bookAuthorEl.textContent,
      amazon: amazonLinkEl.href,
      apple: appleLinkEl.href,
      description: bookDescriptionEl.textContent,

    };


    shopingList.push(bookData);
    setLocalStorage(STORAGE_KEY, shopingList);

    bookButton.classList.toggle('visually-hidden');
    removeButton.classList.toggle('visually-hidden');
    congratsTextEl.classList.toggle('visually-hidden');
  }

  function removeFromShoppingList() {
    const bookTitle = bookTitleEl.textContent;
    // Находим индекс книги в массиве shopingList
    const index = shopingList.findIndex(item => item.title === bookTitle);
    if (index !== -1) {
      shopingList.splice(index, 1); // Удаляем книгу из массива
      setLocalStorage(STORAGE_KEY, shopingList);
    }

    // Показываем кнопку "add to shopping list" и скрываем "remove from the shopping list"
    bookButton.classList.remove('visually-hidden');
    removeButton.classList.add('visually-hidden');
    // Приховуємо текст 'congrats-text'
    congratsTextEl.classList.add('visually-hidden');

    let savedShoppingList = localStorage.getItem(STORAGE_KEY);
    if (JSON.parse(savedShoppingList).length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  loaderIcon.classList.add('visually-hidden');
}

// Функция для проверки, добавлена ли книга в список покупок
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error.message);
  }
}

function isBookInShoppingList(title) {
  return shopingList.some(book => book.title === title);
}


