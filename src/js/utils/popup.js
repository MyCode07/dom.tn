import { isMobile } from "./isMobile.js";

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupOpenButtons = document.querySelectorAll('.popup-open');


if (popupOpenButtons.length) {
    popupOpenButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            popup.classList.add('_open');
            document.body.classList.add('_noscroll');

            if (!isMobile.any()) {
                lockPadding()
            }
        })

        popupClose.addEventListener('click', function () {
            popup.classList.remove('_open');
            document.body.classList.remove('_noscroll');

            if (!isMobile.any()) {
                unLockPadding()
            }
        })

        popup.addEventListener('click', function (e) {
            if (e.target.classList.contains('popup')) {
                popup.classList.remove('_open')
                document.body.classList.remove('_noscroll');
                unLockPadding()
            }
        })
    })
}


function lockPadding() {
    const paddingRight = 10; // scrollbarwidth
    document.body.style.paddingRight = paddingRight + 'px';
}


function unLockPadding() {
    const paddingRight = 10; // scrollbarwidth
    document.body.style.paddingRight = 0 + 'px';
}