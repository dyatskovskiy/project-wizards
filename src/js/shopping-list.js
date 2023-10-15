const key = 'booksShopingList';
const refs = {
  booksContainerShop: document.querySelector('.books-container-shop-list'),
};

function getBooks(key) {
  try {
    const savedBooks = localStorage.getItem(key);
    return JSON.parse(savedBooks);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function createMarkup(books) {
  const markup = books
    .map(({ img, title, category, description, author, amazon, apple }) => {
      return `<div class="book-container">
        <img class="img-shop-list" src="${img}" alt="${title}" loading="lazy" />
    <p class="title-shop-list">${title}</p>
    <p class="list-name-shop-list">${category}</p>
    <p class="description-shop-list">${description}</p>
    <p class="author-shop-list">${author}</p>
    <ul class="links-shop-list">
      <li>
        <a
          href="${amazon}"
          target="_blank"
          rel="noopener noreferrer"
          >amazon</a
        >
      </li>
      <li>
        <a
          href="${apple}"
          target="_blank"
          rel="noopener noreferrer"
          >apple books</a
        >
      </li>
    </ul>
    <button class="delete-btn-shop-list" type="button">delete</button>
    </div>
    `;
    })
    .join('');

  refs.booksContainerShop.insertAdjacentHTML('beforeend', markup);
}

createMarkup(getBooks(key));
