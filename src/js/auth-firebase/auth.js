import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAX0JTfXMuIFxfZ0Uw7U9gdUFZAWUTy4OE',
  authDomain: 'book-js-27f59.firebaseapp.com',
  databaseURL:
    'https://book-js-27f59-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'book-js-27f59',
  storageBucket: 'book-js-27f59.appspot.com',
  messagingSenderId: '710554372563',
  appId: '1:710554372563:web:18f70250290b9da4d4c726',
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Зверніть увагу, що ви повинні використовувати `app` для ініціалізації auth
const database = getDatabase(app); // І тут використовуйте `app`

const signUpBtn = [...document.querySelectorAll('.sign-up-btn')];
const userBtn = document.querySelector('.user-btn');
const signOutBtn = [...document.querySelectorAll('.sign-out-btn')];
const registrationBackdrop = document.querySelector('.registration-backdrop');
const registrationModal = document.querySelector('.registration-modal');
const registrationCloseBtn = document.querySelector('.registration-close-btn');
const signUpLink = document.querySelector('.sing-up-link');
const signInLink = document.querySelector('.sing-in-link');
let nameInput = document.querySelector('input[placeholder="NAME"]');
const registrationForm = document.querySelector('.registration-modal-form');
const signUpModalBtn = document.querySelector('.signup-btn');
const selectedBooksList = document.querySelector('.selected-books-list');

registrationForm.addEventListener('submit', signUp);

const signUpButtons = document.querySelectorAll('.sign-up-btn');
signUpButtons.forEach(button => {
  button.addEventListener('click', onOpenAuthMenu);
});

let isAuth = JSON.parse(localStorage.getItem('userAuth'));
let bookListRef;
let userRef;

if (isAuth) {
  userRef = ref(
    database,
    'users/' + JSON.parse(localStorage.getItem('userAuth'))
  );
  bookListRef = ref(
    database,
    'usersBookList/' + JSON.parse(localStorage.getItem('userAuth'))
  );
  signUpBtn.forEach(el => el.removeEventListener('click', onOpenAuthMenu));
  signOutBtn.forEach(el => el.addEventListener('click', singOut));
} else {
  signUpBtn.forEach(el => el.addEventListener('click', onOpenAuthMenu));
}

function singUpModalMarkup(event) {
  event.preventDefault();
  registrationForm.elements.userName.style.display = '';
  signUpModalBtn.textContent = 'Sign up';
  registrationForm.removeEventListener('submit', signIn);
  registrationForm.removeEventListener('submit', signUp);
  registrationForm.addEventListener('submit', signUp);
}

function singInModalMarkup(event) {
  event.preventDefault();
  registrationForm.elements.userName.style.display = 'none';
  signUpModalBtn.textContent = 'Sign in';
  registrationForm.removeEventListener('submit', signUp);
  registrationForm.removeEventListener('submit', signIn);
  registrationForm.addEventListener('submit', signIn);
}

function signUp(event) {
  event.preventDefault();
  const { userPassword, userEmail, userName } = event.target.elements;
  createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then(userCredential => {
      const user = userCredential.user;
      localStorage.setItem('userAuth', JSON.stringify(user.uid));
      userRef = ref(database, 'users/' + user.uid);
      bookListRef = ref(database, 'usersBookList/' + user.uid);
      const userData = JSON.stringify({
        userName: userName.value,
        userEmail: userEmail.value,
        userPhoto: './somePhoto/',
      });
      set(userRef, userData);
      set(bookListRef, JSON.parse(localStorage.getItem('bookList')));
      document.querySelector('.user-info').classList.remove('is-hidden');
      registrationForm.reset();
      setUserInfo();
      onCloseAuthMenu();
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      Notify.failure(
        'Sorry, you entered incorrect data. Please check the entered data for errors and try again.'
      );
    });
}

function signIn(event) {
  event.preventDefault();
  const { userPassword, userEmail } = event.target.elements;
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value, {
    remember: true,
  })
    .then(userCredential => {
      const user = userCredential.user;
      bookListRef = ref(database, 'usersBookList/' + user.uid);
      localStorage.setItem('userAuth', JSON.stringify(user.uid));
      onValue(bookListRef, snapshot => {
        const data = snapshot.val();
        localStorage.setItem('booksShoppingList', data);
        document.querySelector('.user-info').classList.remove('is-hidden');
        registrationForm.reset();
      });
      setUserInfo();
      onCloseAuthMenu();
    })
    .catch(error => {
      const errorMessage = error.message;
      console.log(errorMessage);
      Notify.failure(
        'Sorry, you entered incorrect data. Please check the entered data for errors and try again.'
      );
    });
}

function onCloseAuthMenu() {
  document.body.classList.remove('modal-open');
  registrationBackdrop.classList.add('is-hidden');
  signUpLink.removeEventListener('click', singUpModalMarkup);
  signInLink.removeEventListener('click', singInModalMarkup);
  registrationCloseBtn.removeEventListener('click', onCloseAuthMenu);
}

function onOpenAuthMenu() {
  document.body.classList.add('modal-open');
  registrationBackdrop.classList.remove('is-hidden');
  signUpLink.addEventListener('click', singUpModalMarkup);
  signInLink.addEventListener('click', singInModalMarkup);
  registrationCloseBtn.addEventListener('click', onCloseAuthMenu);
}

export function singOut() {
  signOut(auth)
    .then(() => {
      userRef = null;
      localStorage.removeItem('userAuth');
      localStorage.removeItem('userOption');
      localStorage.removeItem('booksShoppingList');
      document.querySelector('.user-info').classList.add('is-hidden');
      document.location.reload();
    })
    .catch(error => {
      console.log(error);
    });
}

function setUserInfo() {
  onValue(
    ref(database, 'users/' + JSON.parse(localStorage.getItem('userAuth'))),
    snapshot => {
      const data = snapshot.val();
      localStorage.setItem('userOption', data);
      const user = JSON.parse(data);
      window.setTimeout(() => document.location.reload(), 1000);
    }
  );
}

export function addToFirebase() {
  if (isAuth) {
    const cartDataFromLocalStorage = localStorage.getItem('booksShoppingList');
    set(bookListRef, cartDataFromLocalStorage);
  } else {
    Notify.warning(
      'If you want to save changes in your Shopping List, please log in to your account or create it'
    );
  }
}
