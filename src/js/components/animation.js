import { gsap } from "gsap";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import DrawSVGPlugin from "gsap/DrawSVGPlugin.js";

import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  DrawSVGPlugin
);

gsap.registerPlugin(ScrollTrigger);

gsap.set(".hero__title, .hero__desc, .hero__slide-wrap, .hero__button", {
  opacity: 0,
  // y: 60,
  // filter: "blur(10px)",
});

const headerTl = gsap.timeline();

headerTl
  .to(".hero__title, .hero__desc, .hero__slide-wrap, .hero__button", {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.2,
    ease: "ease",
    stagger: 0.2,
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

const sections = gsap.utils.toArray(".section");
sections.forEach((section) => {
  const defaultAnimElems = section.querySelectorAll(".fadeDown");
  if (defaultAnimElems.length > 0) {
    defaultAnimElems.forEach((el, i) => {
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
        delay: i * 0.1,
      });
    });
  }
});

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

const howDist = document.querySelector(".how-we-work__grid");
let howDistWidth = howDist.offsetWidth;
let amountToScroll = howDistWidth - window.innerWidth;
function getScrollAmount() {
  let howDistWidth = howDist.scrollWidth;
  return -(howDistWidth - window.innerWidth);
}
const tween = gsap.to(howDist, {
  x: getScrollAmount,
  duration: 3,
  ease: "none",
});

ScrollTrigger.create({
  trigger: ".how-we-work",
  start: "top 20%",
  end: () => `+=${getScrollAmount() * -1}`,
  pin: true,
  animation: tween,
  scrub: true,
  markers: true,
});

const path1 = document.querySelector(".how-we-work__path-1");
const path2 = document.querySelector(".how-we-work__path-2");
const path3 = document.querySelector(".how-we-work__path-3");
const path4 = document.querySelector(".how-we-work__path-4");

gsap.to(path1, {
  scrollTrigger: {
    trigger: ".how-we-work",
    start: "top 20%",
    end: "+=" + amountToScroll,
    scrub: true,
  },
  morphSVG: path3,
  strokeWidth: 10,
  ease: "none",
});

gsap.to(path2, {
  scrollTrigger: {
    trigger: ".how-we-work",
    start: "top 20%",
    end: "+=" + amountToScroll,
    scrub: true,
  },
  morphSVG: path4,
  strokeWidth: 20,
  ease: "none",
});
