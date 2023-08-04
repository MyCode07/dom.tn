import { isMobile } from "./isMobile.js";

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupOpenButtons = document.querySelectorAll('._open-popup');


if (popupOpenButtons.length) {
    popupOpenButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            popup.classList.add('_open');
            document.body.classList.add('_noscroll');
        })
    })

    popupClose.addEventListener('click', function () {
        popup.classList.remove('_open');
        document.body.classList.remove('_noscroll');
    })

    popup.addEventListener('click', function (e) {
        if (e.target.classList.contains('popup')) {
            popup.classList.remove('_open')
            document.body.classList.remove('_noscroll');
        }
    })
}



const auditPopup = document.querySelector('.audit-popup');
const auditPopupClose = auditPopup.querySelector('.audit-popup__close');

const houses = document.querySelectorAll('.house');
if (houses.length) {
    houses.forEach(house => {
        house.addEventListener('click', function (e) {
            e.preventDefault();

            getAuditContent(house)

            document.body.classList.add('_noscroll');
            auditPopup.classList.add('_open')
        })
    })

    auditPopupClose.addEventListener('click', function () {
        auditPopup.classList.remove('_open');
        document.body.classList.remove('_noscroll');
    })
}


function getAuditContent(elem) {
    const popupTitle = auditPopup.querySelector('.audit-popup__title')
    const popupImg = auditPopup.querySelector('.audit-popup__img')
    const popupError = auditPopup.querySelector('.audit-popup__error div')
    const popupWork = auditPopup.querySelector('.audit-popup__work div')
    const popupFix = auditPopup.querySelector('.audit-popup__fix div')


    popupImg.src = elem.querySelector('.house-img img').src
    popupImg.alt = elem.querySelector('h3').textContent
    popupTitle.textContent = elem.querySelector('h3').textContent
    popupError.innerHTML = elem.querySelector('.house-error').innerHTML
    popupWork.innerHTML = elem.querySelector('.house-work').innerHTML
    popupFix.innerHTML = elem.querySelector('.house-fix').innerHTML
}