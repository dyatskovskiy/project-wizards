import { data } from "./support-data";

const partnersList = document.querySelector('ol.support-list');
const scrollContainer = document.querySelector('div.support-container');
const scrollBtn = document.querySelector('button.support-btn');
const scrollUpClass = 'support-btn-up';
const scrollDownClass = 'support-btn-down';

function renderPartners() {
    const html = data.map(({ title, url, img }, i) =>
        `<li class="support-list-item">
            <div class="support-number">0${i + 1}</div>
            <a href="${url}" class="support-logo">
                <img src="${img}" class="partner-logo"
                    alt="${title}"
                    title="${title}"/>
            </a>
        </li>`)
        .join('');
    partnersList.insertAdjacentHTML('beforeend', html);
}
function scrollBtnClicked(event) {
    // TODO: implement it
    scrollBtn.classList.toggle(scrollUpClass);
    scrollBtn.classList.toggle(scrollDownClass);
}

scrollBtn.addEventListener('click', scrollBtnClicked);
renderPartners();