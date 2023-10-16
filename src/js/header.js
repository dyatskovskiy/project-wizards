const refs = {
  openMenuBtn: document.querySelector('.js-open-menu'),
  closeMenuBtn: document.querySelector('.js-close-menu'),
  mobileMenu: document.querySelector('.js-menu-container'),
  body: document.body,
};

refs.openMenuBtn.addEventListener('click', onOpenMenuClick);
refs.closeMenuBtn.addEventListener('click', onCloseMenuClick);

function onOpenMenuClick() {
  refs.mobileMenu.classList.add('js-is-open');
  refs.openMenuBtn.classList.add('js-is-hide');
  refs.closeMenuBtn.classList.remove('js-is-hide');
  refs.body.classList.add('noscroll');
}

function onCloseMenuClick() {
  refs.mobileMenu.classList.remove('js-is-open');
  refs.openMenuBtn.classList.remove('js-is-hide');
  refs.closeMenuBtn.classList.add('js-is-hide');
  refs.body.classList.remove('noscroll');
}

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  refs.mobileMenu.classList.remove('js-is-open');
  refs.openMenuBtn.classList.remove('js-is-hide');
  refs.closeMenuBtn.classList.add('js-is-hide');
  // openMenuBtn.setAttribute('aria-expanded', false);
  // bodyScrollLock.enableBodyScroll(document.body);
});
