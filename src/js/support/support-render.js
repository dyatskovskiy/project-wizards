import { data } from "./support-data";

const partnersList = document.querySelector('ol.support-list');
const scrollContainer = document.querySelector('div.support-container');
const scrollBtn = document.querySelector('button.support-btn');

function renderPartners() {
    const html = data.map(({ title, url, img }, i) =>
        `<li class="support-list-item">
            <div class="support-icon">0${i + 1}</div>
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
}

scrollBtn.addEventListener('click', scrollBtnClicked);
renderPartners();