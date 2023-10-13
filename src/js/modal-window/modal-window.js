
  // Отримуємо посилання на модальне вікно і інші необхідні елементи
  const modal = document.getElementById("bookModal");
  const closeModalButton = document.getElementById("closeModal");
  const bookCover = document.querySelector(".book-cover");
  const bookTitle = document.querySelector(".book-title");
  const bookAuthor = document.querySelector(".book-author");
  const bookDescription = document.querySelector(".book-description");
  const tradeLink = document.querySelector(".trade-link");
  const addToShoppingListButton = document.getElementById("addToShoppingList");

  // Функція відкриття модального вікна
  function openModal(bookData) {
    bookCover.src = bookData.coverImageUrl;
    bookTitle.textContent = bookData.title;
    bookAuthor.textContent = bookData.author;
    bookDescription.textContent = bookData.description;
    tradeLink.href = bookData.tradeLink;
    modal.style.display = "block";

    // Додати/видалити з Shopping List
    addToShoppingListButton.addEventListener("click", () => {
      // Додайте код для додавання книги до Shopping List та збереження інформації в localStorage.
      // Наприклад, ви можете створити об'єкт для зберігання обраних книг і зберігати його в localStorage.
      const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
      shoppingList.push(bookData);
      localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
      alert("Книга додана до Shopping List!");
    });

    // Закриття модального вікна
    closeModalButton.addEventListener("click", closeModal);
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  // Функція закриття модального вікна
  function closeModal() {
    modal.style.display = "none";
    addToShoppingListButton.removeEventListener("click", () => {
      // Видаліть слухача подій для уникнення витоку пам'яті
    });
    closeModalButton.removeEventListener("click", closeModal);
    window.removeEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  // Обробник кліку на книгу
  const bookCardLinks = document.querySelectorAll(".book_link");
  bookCardLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Отримати дані про книгу і передайте їх до функції openModal
      const bookData = {
        coverImageUrl: link.querySelector(".book-img").src,
        title: link.querySelector(".book-title").textContent,
        author: link.querySelector(".book-author").textContent,
        description: "Короткий опис книги", // Замінити
        tradeLink: "https://example.com", // Посилання на покупку
      };
      openModal(bookData);
    });
  });