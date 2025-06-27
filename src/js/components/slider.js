import Swiper from "swiper";
import { Navigation } from "swiper/modules";
Swiper.use(Navigation);
var swiper = new Swiper(".slider-default", {
  slidesPerView: 1.1,
  spaceBetween: 12,
  navigation: {
    nextEl: ".slider-default__arrow--next",
    prevEl: ".slider-default__arrow--prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.05,
      spaceBetween: 20,
    },
  },
});
