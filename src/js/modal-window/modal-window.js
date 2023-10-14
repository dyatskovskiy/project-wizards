import { fetchBookById } from "../books-api/books-api";
const booksContainer = document.querySelector('.books-container');

// Вибір елементів DOM для модального вікна
const modalWindow = document.querySelector('.backdrop'); // Замініть '.modal-window' на клас, який ви використовуєте для модального вікна
const modalCloseButton = document.querySelector('.modal-close'); // Замініть '.modal-close' на клас для кнопки закриття
const bookLinks = document.querySelectorAll('.book_link'); // Замініть '.book_link' на клас для посилень на книги
const bookWrapper = document.querySelector('.book-data');

booksContainer.addEventListener('click', onBookClick);

// Функція для відкриття модального вікна з інформацією про книгу
function openModal() {
  modalWindow.style.display = 'block'; // Показуємо модальне вікно

  // Додаємо обробник події для кнопки закриття модального вікна
  modalCloseButton.addEventListener('click', closeModal);

  // Додаємо обробники подій для кожної книги
  // bookLinks.forEach(bookLink => {
  //   bookLink.addEventListener('click', onBookClick);
  // });
}

// Функція для закриття модального вікна
function closeModal() {
  modalWindow.style.display = 'none'; // Сховуємо модальне вікно

  // Видаляємо обробник події для кнопки закриття модального вікна
  modalCloseButton.removeEventListener('click', closeModal);

  // Видаляємо обробники подій для кожної книги
  bookLinks.forEach(bookLink => {
    bookLink.removeEventListener('click', onBookClick);
  });
}

// Функція для обробки кліку на книгу
function onBookClick(e) {
  e.preventDefault();
  const bookLink = e.target.closest('.book_link');
  // setLocalStorage("id", bookLink.id);
  fetchBookById(bookLink.id).then(bookData => {
    bookRender(bookData);
  });
   
  // Викликаємо функцію відкриття модального вікна та передаємо їй дані про книгу
  openModal();
}
function bookRender({title, author, book_image, description, buy_links}) {
  const markup = `<img class="book-img" src="${book_image}" alt="${title}" />
      <h2 class="title">${title}</h2>
      <p class="author">${author}</p>
      <p class="description">${description}</p>
      <div class="link-wraper">
        <a class="book-link link" href="${buy_links[0].url}">свг</a>
         <a class="book-link link" href="${buy_links[1].url}">свг</a>
         </div>
         <button type="button" class="book-button">add to shopping list</button>`
  bookWrapper.innerHTML = markup;
  const bookButton = document.querySelector('.book-button');
  bookButton.addEventListener('click', setLocalStorage);
}

function setLocalStorage(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error(error.message);
  }
}
