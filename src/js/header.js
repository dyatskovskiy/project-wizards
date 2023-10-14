const refs = {
  openMenuBtn: document.querySelector('.js-open-menu'),
  closeMenuBtn: document.querySelector('.js-close-menu'),
  mobileMenu: document.querySelector('.js-menu-container'),
};

console.log(refs.openMenuBtn);
console.log(refs.closeMenuBtn);
console.log(refs.mobileMenu);
refs.openMenuBtn.addEventListener('click', onOpenMenuClick);
refs.closeMenuBtn.addEventListener('click', onCloseMenuClick);

function onOpenMenuClick() {
  refs.mobileMenu.classList.add('js-is-open');
  refs.openMenuBtn.classList.add('js-is-hide');
  refs.closeMenuBtn.classList.remove('js-is-hide');
}

function onCloseMenuClick() {
  refs.mobileMenu.classList.remove('js-is-open');
  refs.openMenuBtn.classList.remove('js-is-hide');
  refs.closeMenuBtn.classList.add('js-is-hide');
}

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  refs.mobileMenu.classList.remove('js-is-open');
  refs.mobileMenu.classList.remove('js-is-hide')
  refs.closeMenuBtn.classList.add('js-is-hide');
  // openMenuBtn.setAttribute('aria-expanded', false);
  // bodyScrollLock.enableBodyScroll(document.body);
});
