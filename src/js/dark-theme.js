const root = document.documentElement;
const body = document.body;
const themeToggle = document.querySelector('.theme_checkbox');
const DARK_THEME_KEY = 'isDark'
themeToggle.addEventListener('change', onCheckboxClick)


function onCheckboxClick () {
  const darkThemeStatus = localStorage.getItem(DARK_THEME_KEY);
  if(darkThemeStatus === null) {
    localStorage.setItem(DARK_THEME_KEY, 'true')
    setDarkTheme();
  }
  if (darkThemeStatus  === 'true') {
    setLightTheme();
    localStorage.setItem(DARK_THEME_KEY, 'false');
  } else {
    setDarkTheme();
    localStorage.setItem(DARK_THEME_KEY, 'true');
  }
}

window.onload = () => {                                  // При завантаженні сторінки викликаємо скрипт для зміни теми залежно від статуса в локал сторедж
  const darkThemeStatus = localStorage.getItem(DARK_THEME_KEY);
  if (darkThemeStatus  === 'true') {
    setDarkTheme();
  } else setLightTheme();
}


function setDarkTheme () {
  body.classList.add('dark-theme');
  root.style.setProperty('--body-bg-color', '#202024');
  root.style.setProperty('--header-bg-color', '#111111');
  root.style.setProperty('--primary-text-color', '#ffffff');
  root.style.setProperty('--black-text-color', '#F3F3F3');
  root.style.setProperty('--violet-text-color', '#eac645');
  root.style.setProperty('--current-link-color', '#ffffff');
  root.style.setProperty('--categories-link-color', '#FFFFFF99');
  root.style.setProperty('--modal-window-color', '#202024');
  root.style.setProperty('--bg-shoping-list', '#111111');
  root.style.setProperty('--txt-shoping-list', '#FFFFFF99');
  root.style.setProperty('--bottomtxt-modal-window', '#FFFFFF80');
  themeToggle.setAttribute('checked', true);
}

function setLightTheme() {
  body.classList.remove('dark-theme');
  root.style.setProperty('--body-bg-color', '#f6f6f6');
  root.style.setProperty('--header-bg-color', '#ffffff');
  root.style.setProperty('--primary-text-color', '#111111');
  root.style.setProperty('--black-text-color', '#000000');
  root.style.setProperty('--violet-text-color', '#4f2ee8');
  root.style.setProperty('--current-link-color', '#111111');
  root.style.setProperty('--categories-link-color', '#11111199');
  root.style.setProperty('--modal-window-color', '#fff');
  root.style.setProperty('--bg-shoping-list', '#f6f6f6');
  root.style.setProperty('--txt-shoping-list', '#00000099');
  root.style.setProperty('--bottomtxt-modal-window', '#11111180');
}