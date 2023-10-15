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
      return `
        <li class="book-card-shop-list">
          <img class="img-shop-list" src="${img}" alt="${title}" loading="lazy" />
          <div class="right-card-part">
            <div class="card-top-shop-list">
              <p class="title-shop-list">${title}</p>
              <p class="category-shop-list">${category}</p>
              <p class="description-shop-list">${description}</p>
            </div>
            <div class="card-bottom-shop-list">
              <p class="author-shop-list">${author}</p>
              <ul class="links-shop-list">
                <li>
                  <a
                    href="${amazon}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >amaz</a
                  >
                </li>
                <li>
                  <a
                    href="${apple}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >app</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <button class="delete-btn-shop-list" type="button"></button>
        </li>
      `;
    })
    .join('');

  refs.booksContainerShop.insertAdjacentHTML('beforeend', markup);
}

createMarkup(getBooks(key));
