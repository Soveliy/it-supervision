import Typed from "typed.js";
var typed = new Typed(".hero__slide", {
  strings: [
    "Отслеживаем каждый шаг проекта",
    "Оцениваем эффективность подрядчиков",
    "Проводим тотальные аудиты",
    "Ликвидируем риски",
  ],
  typeSpeed: 30,
  backDelay: 700,
  loop: true,
});
import { gsap } from "gsap";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin
);

console.log(gsap);
