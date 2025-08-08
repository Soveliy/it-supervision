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
});

const headerTl = gsap.timeline();
headerTl

  .fromTo(
    ".header",
    { y: -60, opacity: 0, filter: "blur(12px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "expo.out",
    }
  )
  .fromTo(
    ".hero__picture",
    { opacity: 0, scale: 1.1, x: 40, filter: "blur(18px)" },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "expo.out",
    },
    "-=0.9"
  )
  .fromTo(
    ".hero__title",
    { opacity: 0, y: 40, filter: "blur(12px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.3,
      ease: "power4.out",
    },
    "-=1.1"
  )
  .fromTo(
    ".hero__desc",
    { opacity: 0, y: 40, filter: "blur(12px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
    },
    "-=1.0"
  )
  .fromTo(
    ".hero__slide-wrap, .hero__button",
    { opacity: 0, y: 40, filter: "blur(12px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.18,
    },
    "-=0.8"
  );
const sections = gsap.utils.toArray(".section");
sections.forEach((section) => {
  const defaultAnimElems = section.querySelectorAll(".fadeDown");
  if (defaultAnimElems.length > 0) {
    defaultAnimElems.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          delay: i * 0.08,
        }
      );
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
  // markers: true,
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

// Функция анимации числа
function animateNumber(el, to) {
  gsap.fromTo(
    el,
    { innerText: 0 },
    {
      innerText: to,
      duration: 1.6,
      ease: "power4.out",
      snap: { innerText: 1 },
      onUpdate: function () {
        el.innerText = Math.floor(el.innerText);
      },
      onComplete: function () {
        el.innerText = to;
      },
    }
  );
}

document.querySelectorAll("[data-number-animate]").forEach((el) => {
  const value = parseInt(el.textContent.replace(/\D/g, ""), 10);
  el.innerText = 0;

  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => animateNumber(el, value),
    },
  });
});

document.querySelectorAll(".experts-item__title").forEach((el) => {
  // Сохраняем оригинальный HTML
  const nodes = Array.from(el.childNodes);
  el.innerHTML = "";
  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      Array.from(node.textContent).forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.transitionDelay = i * 10 + "ms";
        el.appendChild(span);
      });
    } else {
      el.appendChild(node);
    }
  });

  el.addEventListener("mouseenter", () => el.classList.add("active"));
  el.addEventListener("mouseleave", () => el.classList.remove("active"));
});
