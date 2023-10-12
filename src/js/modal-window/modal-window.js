// Получаем ссылки на книги
const bookLinks = document.querySelectorAll('.book_link');
const modal = document.getElementById('bookModal');

// Функция для открытия модального окна
function openModal(bookData) {
  const modalBookCover = document.getElementById('modalBookCover');
  const modalBookTitle = document.getElementById('modalBookTitle');
  const modalBookAuthor = document.getElementById('modalBookAuthor');
  const modalBookDescription = document.getElementById('modalBookDescription');
  const modalBookMarketplaces = document.getElementById('modalBookMarketplaces');
  const modalAddToShoppingList = document.getElementById('modalAddToShoppingList');

  modalBookCover.src = bookData.book_image;
  modalBookTitle.textContent = bookData.title;
  modalBookAuthor.textContent = `Автор: ${bookData.author}`;
  modalBookDescription.textContent = bookData.description;

  // Очищаем предыдущие ссылки на торговые маркетплейсы
  modalBookMarketplaces.innerHTML = '';

  // Добавляем ссылки на торговые маркетплейсы
  bookData.marketplaces.forEach((marketplace) => {
    const marketplaceLink = document.createElement('a');
    marketplaceLink.href = marketplace.url;
    marketplaceLink.target = '_blank';
    marketplaceLink.textContent = marketplace.name;

    modalBookMarketplaces.appendChild(marketplaceLink);
  });

  modal.style.display = 'block'; // Открываем модальное окно
}

// Функция для закрытия модального окна
function closeModal() {
  modal.style.display = 'none';
}

// Обработчик события клика по книге
bookLinks.forEach((bookLink) => {
  bookLink.addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    const bookId = e.currentTarget.id; // Получаем ID книги
    // Ваш код для получения данных о книге по ID и передачи их в openModal
    // Например, вы можете сделать запрос на сервер для получения данных о книге
    // и вызвать openModal с полученными данными.
  });
});

// Обработчик события клика по кнопке закрытия модального окна
const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', closeModal);

// Обработчик события нажатия клавиши "Esc" для закрытия модального окна
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
