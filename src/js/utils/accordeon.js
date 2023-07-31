const accordions = document.querySelectorAll('.schema-faq');
if (accordions.length) {

    accordions.forEach(accordion => {
        const accordeonItems = accordion.querySelectorAll('.schema-faq-section');

        accordeonItems.forEach(item => {
            item.addEventListener('click', function (e) {
                toggleAccordion(item);
            });
        });
    });
}


function toggleAccordion(item) {
    const accordeon = item.closest('.schema-faq');
    const accordeonItems = accordeon.querySelectorAll('.schema-faq-section');

    if (!item.hasAttribute('data-open')) {
        const openitem = accordeon.querySelector('.schema-faq-section[data-open]');
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
