import { data } from './support-data';

const partnersList = document.querySelector('ol.support-list');
const scrollWrapper = document.querySelector('div.scroll-wrapper');
const scrollBtn = document.querySelector('button.support-btn');

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
    scrollWrapper.classList.toggle('scroll-bottom');
    scrollBtn.classList.toggle('support-btn-up');
    scrollBtn.classList.toggle('support-btn-down');
}

scrollBtn.addEventListener('click', scrollBtnClicked);

renderPartners();
