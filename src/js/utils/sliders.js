import { Swiper, EffectFade, Navigation, Pagination, FreeMode, Thumbs, Manipulation } from "swiper";

const projectImages = document.querySelector('.project__images');
if (projectImages) {

    const bigSlider = projectImages.querySelector('.project__images-big .swiper');
    const bigSlides = bigSlider.querySelectorAll('.project__images-big .swiper-slide');
    const thumbsSlider = projectImages.querySelector('.project__images-thumbs .swiper');

    const prevBtn = projectImages.querySelector('.project__images-prev');
    const nextBtn = projectImages.querySelector('.project__images-next');

    if (bigSlides.length) {

        const swiperThumbs = new Swiper(thumbsSlider, {
            modules: [
                FreeMode, Manipulation
            ],
            freeMode: true,
            watchSlidesProgress: true,

            breakpoints: {
                300: {
                    spaceBetween: 10,
                    slidesPerView: 4,
                },
                601: {
                    spaceBetween: 20,
                    slidesPerView: 5,
                }
            }
        });

        const swiperMain = new Swiper(bigSlider, {
            modules: [
                EffectFade, Navigation, Thumbs, Manipulation
            ],
            effect: "fade",
            slidesPerView: 1,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
            thumbs: {
                swiper: swiperThumbs,
            },
        });
    }
}



const reviewsSliderContainer = document.querySelector('.reviews-slider');
if (reviewsSliderContainer) {
    const reviewsSlider = reviewsSliderContainer.querySelector('.reviews-slider .swiper');
    const reviewsSlides = reviewsSliderContainer.querySelectorAll('.reviews-slider .swiper-slide');

    if (reviewsSlides.length) {
        const prev = reviewsSliderContainer.querySelector('.main__slider-prev');
        const next = reviewsSliderContainer.querySelector('.main__slider-next');
        const pagination = reviewsSliderContainer.querySelector('.main__slider-pagination');

        new Swiper(reviewsSlider, {
            modules: [
                Pagination, Navigation
            ],
            watchSlidesProgress: true,

            navigation: {
                prevEl: prev,
                nextEl: next
            },

            pagination: {
                el: pagination,
                clickable: true
            },

            breakpoints: {
                300: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                601: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30
                },
                1025: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 50
                }
            }
        });
    }
}