import Swiper from "swiper";
import { Navigation } from "swiper/modules";
Swiper.use(Navigation);
var swiper = new Swiper(".slider-default", {
  slidesPerView: 2.05,
  spaceBetween: 20,
  navigation: {
    nextEl: ".slider-default__arrow--next",
    prevEl: ".slider-default__arrow--prev",
  },
});
