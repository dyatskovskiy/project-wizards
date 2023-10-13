// modal-window.js

// Вибір елементів DOM
const backdrop = document.querySelector('[data-first-modal]');
const modalCloseButton = document.querySelector('[data-first-modal-close]');

// Функція для закриття модального вікна
function closeFirstModal() {
  backdrop.classList.add('is-hidden'); // Додаємо клас для сховання модального вікна
  // Видаляємо обробники подій
  backdrop.removeEventListener('click', closeFirstModal);
  modalCloseButton.removeEventListener('click', closeFirstModal);
  document.removeEventListener('keydown', handleKeyPress);
}

// Функція для обробки клавіші ESC
function handleKeyPress(event) {
  if (event.key === 'Escape') {
    closeFirstModal();
  }
}

// Додавання обробників подій
backdrop.addEventListener('click', closeFirstModal);
modalCloseButton.addEventListener('click', closeFirstModal);
document.addEventListener('keydown', handleKeyPress);

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Вибір елементів DOM для модального вікна
const modalWindow = document.querySelector('.modal-window'); // Замініть '.modal-window' на клас, який ви використовуєте для модального вікна
const modalCloseButton = document.querySelector('.modal-close'); // Замініть '.modal-close' на клас для кнопки закриття
const bookLinks = document.querySelectorAll('.book_link'); // Замініть '.book_link' на клас для посилень на книги

// Функція для відкриття модального вікна з інформацією про книгу
function openModal(bookData) {
  modalWindow.style.display = 'block'; // Показуємо модальне вікно

  // Додайте код для заповнення модального вікна інформацією про книгу на основі даних bookData

  // Додаємо обробник події для кнопки закриття модального вікна
  modalCloseButton.addEventListener('click', closeModal);

  // Додаємо обробники подій для кожної книги
  bookLinks.forEach(bookLink => {
    bookLink.addEventListener('click', onBookClick);
  });
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
  const bookId = e.currentTarget.id; // Отримуємо ідентифікатор книги, яку клікнули
  const bookData = // Отримайте дані про книгу на основі bookId (наприклад, з вашого API)

  // Викликаємо функцію відкриття модального вікна та передаємо їй дані про книгу
  openModal(bookData);
}

// Додавання обробника події для відкриття модального вікна при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  // Отримайте дані про книгу (наприклад, з вашого API)
  const bookData = // Отримайте дані про книгу

  // Викликаємо функцію відкриття модального вікна та передаємо їй дані про книгу
  openModal(bookData);
});
