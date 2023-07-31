import { Swiper, EffectFade, Navigation, FreeMode, Thumbs } from "swiper";


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
                FreeMode
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
                EffectFade, Navigation, Thumbs
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
