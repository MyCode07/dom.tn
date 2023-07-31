const accordions = document.querySelectorAll('[data-accordion]');
if (accordions.length) {

    accordions.forEach(accordion => {
        const accordeonItems = accordion.querySelectorAll('[data-accordion-item]');
        const windowWidth = +accordion.dataset.width;

        if (accordeonItems.length && window.innerWidth <= windowWidth) {
            accordeonItems.forEach(item => {
                const openBtn = item.querySelector('[data-accordion-title]')
                openBtn.addEventListener('click', function (e) {
                    toggleAccordion(item);
                });
            });
        }
    });
}


function toggleAccordion(item) {
    const accordeon = item.closest('[data-accordion]');
    const accordeonItems = accordeon.querySelectorAll('[data-accordion-item]');

    if (!item.hasAttribute('data-open')) {
        const openitem = accordeon.querySelector('[data-accordion-item][data-open]');
        if (openitem) {
            openitem.removeAttribute('data-open')
        }

        accordeonItems.forEach(item => {
            item.removeAttribute('data-open')
        })

        item.setAttribute('data-open', 'open')
    }
    else {
        item.removeAttribute('data-open')
    }
}
