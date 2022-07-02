// npm install swiper --save

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

export default new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay],
  navigation: {
    nextEl: ".btn-next",
    prevEl: ".btn-prev",
  },
  pagination: {
    el: ".carousel-reviews__dots",
    clickable: true,
  },
  grabCursor: true,
  slidesPerView: 1, //Количество слайдов для показа
  spaceBetween: 20, //Отступ между слайдами
  slidesPerGroup: 1, //Количество пролистываемых слайдов
  // centeredSlides: true, //Активный слайдер по центру
  // initialSlide: 3, //Стартовый слайд по индексу
  loop: true, //Бесконечный слайдер
  loopedSlides: 1, //Обязательно для бесконечности кол. должно быть такое как в slidesPerView
  autoplay: {
    delay: 5000, //Пауза между прокруткой
    stopOnLastSlide: true, //Закончить на последнем слайде
    disableOnInteraction: false //Отключить после ручного переключения
  },
  speed: 800, //Скорость переключения
  breakpoints: {
    320: {
      slidesPerView: 1,
      loopedSlides: 1
    },
    425: {
      slidesPerView: 2,
      loopedSlides: 2
    },
    992: {
      slidesPerView: 3,
      loopedSlides: 3
    },
  }
});

//Если слайдер находиться внутри флекс элемента то этому элементу надо добавить min-width: 0 