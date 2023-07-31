import dhx from 'dhx-suite'

const rangeSquare = range(document.querySelector('#range-slider-square'))
const rangePrice = range(document.querySelector('#range-slider-price'))

function range(rangeElem) {
    if (rangeElem) {
        const min = +rangeElem.dataset.min ? +rangeElem.dataset.min : 0;
        const max = +rangeElem.dataset.max ? +rangeElem.dataset.max : 0;
        const step = +rangeElem.dataset.step ? +rangeElem.dataset.step : 1;
        const inputMin = rangeElem.closest('.filter-item').querySelector('.range-field__min');
        const inputMax = rangeElem.closest('.filter-item').querySelector('.range-field__max');
        const reset = rangeElem.closest('.filter-item').querySelector('.filter-range__reset');

        const sliderRange = new dhx.Slider(rangeElem, {
            min: min,
            max: max,
            step: step,
            range: true,
            value: [min, max]
        });


        sliderRange.events.on('change', function () {
            inputMin.value = sliderRange.getValue()[0]
            inputMax.value = sliderRange.getValue()[1]
        });

        inputMin.addEventListener('input', function () {
            if (this.value >= this.min && this.value <= this.max)
                sliderRange.setValue([+this.value, +inputMax.value]);
        });

        inputMax.addEventListener('input', function () {
            if (this.value >= this.min && this.value <= this.max)
                sliderRange.setValue([+inputMin.value, +this.value]);
        });

        reset.addEventListener('click', function () {
            inputMin.value = inputMin.min
            inputMax.value = inputMax.max
            sliderRange.setValue([+inputMin.min, +inputMax.max]);
        });

        return sliderRange;
    }
}


function resetRanges(rangeElem, rangeSlide) {
    const inputMin = rangeElem.closest('.filter-item').querySelector('.range-field__min');
    const inputMax = rangeElem.closest('.filter-item').querySelector('.range-field__max');

    inputMin.value = inputMin.min
    inputMax.value = inputMax.max

    rangeSlide.setValue([+inputMin.min, +inputMax.max]);
}



document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('filter-item__button')) {

        document.querySelectorAll('.filter-item').forEach(item => {
            if (item.querySelector('.filter-item__hidden'))
                item.querySelector('.filter-item__hidden').classList.remove('_active')
        });

        targetEl.closest('.filter-item').querySelector('.filter-item__hidden').classList.add('_active')
    }

    if (!targetEl.closest('.filter-item') && document.querySelector('.filter-item__hidden._active')) {
        document.querySelector('.filter-item__hidden._active').classList.remove('_active')
    }

    if (targetEl.classList.contains('filter-item__reset')) {
        if (document.querySelector('.filter-item__hidden._active'))
            document.querySelector('.filter-item__hidden._active').classList.remove('_active')

        if (document.querySelector('.projects__sorting .sorting-desc'))
            document.querySelectorAll('.projects__sorting .sorting-desc').forEach(item => {
                item.checked = false
            });

        if (document.querySelector('.projects__sorting .sorting-asc'))
            document.querySelectorAll('.projects__sorting .sorting-asc').forEach(item => {
                item.checked = false
            });

        document.querySelectorAll('.filter-item ul li label input').forEach(item => {
            if (!item.classList.contains('default')) item.checked = false
            else item.checked = true
        });

        resetRanges(document.querySelector('#range-slider-square'), rangeSquare);
        resetRanges(document.querySelector('#range-slider-price'), rangePrice);
    }

    if (targetEl.getAttribute('name') && targetEl.getAttribute('name') === 'sorting') {

        if (!targetEl.classList.contains('clicked')) {
            targetEl.classList.add('clicked');
        }
        else {
            if (targetEl.classList.contains('sorting-desc')) {
                targetEl.classList.remove('sorting-desc');
                targetEl.classList.add('sorting-asc');
            }
            else if (targetEl.classList.contains('sorting-asc')) {
                targetEl.classList.add('sorting-desc');
                targetEl.classList.remove('sorting-asc');
            }
        }

        document.querySelectorAll('.projects__sorting label input').forEach(item => {
            if (item != targetEl)
                item.classList.remove('clicked')
        });
    }

    if (targetEl.classList.contains('mobile-sorting')) {
        document.querySelector('.projects__sorting').classList.toggle('_active');
    }

    if (targetEl.classList.contains('mobile-filter')) {
        document.querySelector('.projects__filters').classList.add('_active');
    }

    if (targetEl.classList.contains('filters-close')) {
        document.querySelector('.projects__filters').classList.remove('_active');
    }
})