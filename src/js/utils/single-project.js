const admin_url = adminajaxurl.ajaxurl;

function sendRequestImages(i) {
    let data = {
        'action': 'load_project_variant_images',
        'variant': i,
        'id': 358
    }

    if (i < 0) data.variant = 'default';
    else data.variant = i;

    jQuery.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (data) {
            if (data == '0') { }
            else {
                resetSliders(data)
            }
            projectVariants.forEach(v => v.classList.remove('_disabled'))
        }
    });
}

function resetSliders(slides) {
    const bigSlider = document.querySelector('.project__images-big .swiper').swiper;
    const thumbsSlider = document.querySelector('.project__images-thumbs .swiper').swiper;

    bigSlider.removeAllSlides()
    bigSlider.appendSlide(slides)

    thumbsSlider.removeAllSlides()
    thumbsSlider.appendSlide(slides)

    bigSlider.update()
    thumbsSlider.update()
}

const projectVariants = document.querySelectorAll('.project__variants li');
if (projectVariants.length) {
    const priceOutput = document.querySelector('.project__right-price');

    projectVariants.forEach(variant => {
        const input = variant.querySelector('input');
        const newPrice = +input.dataset.price;

        input.addEventListener('change', function () {
            projectVariants.forEach(v => v.classList.add('_disabled'))

            const i = [...variant.parentElement.children].indexOf(variant) - 1;
            sendRequestImages(i)
            priceOutput.dataset.price = newPrice
            priceOutput.querySelector('span').textContent = Intl.NumberFormat('ru-RU').format(newPrice)
        })
    })
}



const complectVariants = document.querySelectorAll('.complect__variants li');
const complectVariantsPrice = document.querySelectorAll('.complect__variants-price li');
if (complectVariants.length) {

    let i = 0;
    complectVariants.forEach(variant => {

        const input = variant.querySelector('input');
        const variantPrice = complectVariantsPrice[i];

        const newPrice = +input.dataset.price;
        const priceOutput = variantPrice.querySelector('.total-price');
        let totalPrice = +priceOutput.dataset.price;

        input.addEventListener('change', function () {
            complectVariantsPrice.forEach(item => {
                item.classList.remove('_active');
            })
            variantPrice.classList.add('_active');

            priceOutput.dataset.price = newPrice
            priceOutput.querySelector('span').textContent = Intl.NumberFormat('ru-RU').format(newPrice)
        })

        const addParams = variantPrice.querySelectorAll('.add-price');
        if (addParams.length) {
            addParams.forEach(item => {
                const input = item.querySelector('input');
                const price = +input.dataset.price;

                input.addEventListener('change', function () {
                    if (input.checked) totalPrice += price;
                    else totalPrice -= price;

                    priceOutput.querySelector('span').textContent = Intl.NumberFormat('ru-RU').format(totalPrice)
                })
            })
        }
        i++;
    })
}



const textarea = document.querySelector('.popup form textarea');
const title = document.querySelector('h1')

const variant = (vars) => {
    let text = '';
    [...vars].forEach(item => {
        const input = item.querySelector('input');
        if (input.checked) text = item.lastElementChild.innerText
        return;
    });

    return text;
}

const getOdds = () => {
    const activeVariant = document.querySelector('.complect__variants-price li._active');
    const addParams = activeVariant.querySelectorAll('.add-price');
    const priceOutput = activeVariant.querySelector('.total-price');
    let price = +priceOutput.dataset.price;


    let text = `Дом: ${title.textContent}, \nВариант отделки: ${variant(complectVariants)}\nЦена: ${price}.`;


    if (addParams.length) {
        text += '\n\nДопольнительная комплектация:\n';

        addParams.forEach(item => {
            const input = item.querySelector('input');
            const price = +input.dataset.price;

            if (input.checked) {
                text += `${item.querySelector('.field').innerText}\n- ${item.querySelector('.value').innerText}\n- ${item.querySelector('.price').innerText}\n`;
            }
        })
    }

    return text;
}

document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('_open-popup') && targetEl.closest('.project')) {
        textarea.innerHTML = '';

        const price = document.querySelector('.project__right-price').innerText
        const text = `Дом: ${title.innerText}, \nВариант отделки: ${variant(projectVariants)}\nЦена: ${price}.`;
        textarea.innerHTML = text;
    }

    if (targetEl.classList.contains('_open-popup') && targetEl.closest('.complect')) {
        textarea.innerHTML = '';
        textarea.innerHTML = getOdds();
    }
})