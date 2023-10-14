import { fetchBookById } from '../books-api/books-api';
const booksContainer = document.querySelector('.books-container');

// Вибір елементів DOM для модального вікна
const modalWindow = document.querySelector('.backdrop'); // Замініть '.modal-window' на клас, який ви використовуєте для модального вікна
const modalCloseButton = document.querySelector('.modal-close'); // Замініть '.modal-close' на клас для кнопки закриття
const bookWrapper = document.querySelector('.book-data');
const shopingList = [];

booksContainer.addEventListener('click', onBookClick);

// Функція для відкриття модального вікна з інформацією про книгу
function openModal() {
  modalWindow.style.display = 'block'; // Показуємо модальне вікно

  // Додаємо обробник події для кнопки закриття модального вікна
  modalCloseButton.addEventListener('click', closeModal);
}

// Функція для закриття модального вікна
function closeModal() {
  modalWindow.style.display = 'none'; // Сховуємо модальне вікно

  // Видаляємо обробник події для кнопки закриття модального вікна
  modalCloseButton.removeEventListener('click', closeModal);
}

// Функція для обробки кліку на книгу
function onBookClick(e) {
  e.preventDefault();
  const bookLink = e.target.closest('.book_link');
  fetchBookById(bookLink.id).then(bookData => {
    bookRender(bookData);
  });

  // Викликаємо функцію відкриття модального вікна та передаємо їй дані про книгу
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
  const markup = `<img class="book-img" src="${book_image}" alt="${title}" />
      <h2 class="title">${title}</h2>
      <p class="author">${author}</p>
      <p class="description" data-category="${list_name}">${description}</p>
      <div class="link-wraper">
        <a class="book-link link amazon-by-link" href="${buy_links[0].url}">свг</a>
        <a class="book-link link apple-books-by-link" href="${buy_links[1].url}">свг</a>
      </div>
      <button type="button" class="book-button">add to shopping list</button>
      <button type="button" class="book-button visually-hidden">remove from the shopping list</button>`;
  bookWrapper.innerHTML = markup;

  const bookButton = document.querySelector('.book-button');
  const bookImgEl = document.querySelector('.book-img'); //+
  const bookTitleEl = document.querySelector('.title');
  const bookAuthorEl = document.querySelector('.author');
  const bookDescriptionEl = document.querySelector('.description'); //+
  const amazonLinkEl = document.querySelector('.amazon-by-link');
  const appleLinkEl = document.querySelector('.apple-books-by-link');

  bookButton.addEventListener('click', setShopingListToLocalStorage);

  function setShopingListToLocalStorage() {
    const bookData = {
      img: bookImgEl.src,
      category: bookDescriptionEl.dataset.category,
      //other elements
    };
    shopingList.push(bookData);
    localStorage.setItem('booksShopinkList', JSON.stringify(shopingList));
  }
}

function setLocalStorage(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(error.message);
  }
}
// {
//   image:ссылка на изображение в карточке,
//     title: значение h2 с классом title,
//     author: значение p с классом автор,
//     category: значение дата категори p с классом description,
//     description: значение p с классом description,
// }
