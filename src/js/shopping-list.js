import './support/support-render';
import './header'
export const key = 'booksShopingList';
const booksArray = [];
const amazonLink = new URL('../img/stores-icons/amazon.png', import.meta.url);
const appleLink = new URL('../img/stores-icons/apple.png', import.meta.url);
const trashIcon = new URL('../public/symbol-defs.svg', import.meta.url);
const refs = {
  booksContainerShop: document.querySelector('.books-container-shop-list'),
  containerShopList: document.querySelector('.container-shop-list'),
  shoppingWrapDesk: document.querySelector('.shopping-wrap-desk'),
  // homeLink: document.querySelector('.header-link-nav-li.home'),
  // mobHomeLink: document.querySelector('.burger-link-nav-li.home'),
  // shoppingListLink: document.querySelector('.header-link-nav-li.shopping'),
  // mobShoppingListLink: document.querySelector('.burger-link-nav-li.shopping'),
};

// refs.homeLink.classList.remove('current');
// refs.shoppingListLink.classList.add('current');
// refs.mobHomeLink.classList.remove('current');
// refs.mobShoppingListLink.classList.add('current');

function getBooks(key) {
  const savedBooks = localStorage.getItem(key);
  if (savedBooks) {
    booksArray.push(...JSON.parse(savedBooks));
  }
}

function createMarkup(books) {
  const markup = books
    .map(({ img, title, category, description, author, amazon, apple }) => {
      return `
        <li class="book-card-shop-list" data-title="${title}">
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
                    >
                    <img class="amazon-img-shop-list" src="${amazonLink}" alt="Amazon">
                  </a>
                </li>
                <li>
                  <a
                    href="${apple}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img class="apple-img-shop-list" src="${appleLink}" alt="Apple">
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <button class="delete-btn-shop-list" type="button">
            <svg class="trash-icon">
             <use href="${trashIcon}#icon-trash"></use>
            </svg>
          </button>
        </li>
      `;
    })
    .join('');
  refs.booksContainerShop.insertAdjacentHTML('beforeend', markup);

  refs.booksContainerShop.addEventListener('click', onDeleteBtnClick);
}

function onDeleteBtnClick(e) {
  if (!e.target.classList.contains('delete-btn-shop-list')) {
    return;
  }

  const deletedBookCard = e.target.closest('.book-card-shop-list');
  const deletedBookTitle = deletedBookCard.getAttribute('data-title');
  deletedBookCard.remove();

  const index = booksArray.findIndex(book => book.title === deletedBookTitle);
  if (index !== -1) {
    booksArray.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(booksArray));
  }

  if (booksArray.length === 0) {
    localStorage.removeItem(key);
    refs.containerShopList.classList.add('visually-hidden');
    refs.shoppingWrapDesk.classList.remove('visually-hidden');
  }
}

getBooks(key);

if (booksArray.length === 0) {
  refs.containerShopList.classList.add('visually-hidden');
} else {
  refs.shoppingWrapDesk.classList.add('visually-hidden');
  createMarkup(booksArray);
}
