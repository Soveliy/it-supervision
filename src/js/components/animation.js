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

gsap.registerPlugin(ScrollTrigger);

gsap.set(".hero__title, .hero__desc, .hero__slide-wrap, .hero__button", {
  opacity: 0,
  // y: 60,
  filter: "blur(10px)",
});

const headerTl = gsap.timeline();

headerTl
  .to(".hero__title, .hero__desc, .hero__slide-wrap, .hero__button", {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "expo.inOut",
    stagger: 0.12,
  })

  .to(
    ".hero__picture",
    { opacity: 1, duration: 1, x: 0, ease: "expo.inOut" },
    "-=0.8"
  )
  .to(
    ".header",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "expo.inOut",
    },
    "-=0.9"
  );

gsap.registerPlugin(ScrollTrigger);

// gsap.to(".problems .fadeDown", {
//   scrollTrigger: {
//     trigger: ".problems",
//     start: "top 50%", // когда верх блока на 80% от верха окна
//     toggleActions: "play none none none",
//   },
//   opacity: 1,
//   y: 0,
//   filter: "blur(0px)",
//   duration: 0.6,
//   ease: "expo.out",
//   stagger: 0.12,
// });

gsap.utils
  .toArray(
    ".fadeDown:not(.hero__title):not(.hero__desc):not(.hero__slide-wrap):not(.hero__button)"
  )
  .forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // когда верх элемента дойдет до 80% от окна
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "expo.inOut",
      // delay: i * 0.12,
    });
  });

// Перебираем все .highlighted-text элементы
document.querySelectorAll(".highlighted-text").forEach((highlight) => {
  const path = highlight.querySelector(".highlight-svg path");
  if (!path) return; // если внутри нет path — пропускаем

  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: "expo.inOut",
    scrollTrigger: {
      trigger: highlight,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
});
