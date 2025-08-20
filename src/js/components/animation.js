import { gsap } from "gsap";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import CustomEase from "gsap/CustomEase.js";
import DrawSVGPlugin from "gsap/DrawSVGPlugin.js";

import { ScrollSmoother } from "gsap/ScrollSmoother.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  DrawSVGPlugin,
  CustomEase
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
    { opacity: 0, scale: 1.1, x: 40, filter: "blur(0)" },
    {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 1.6,
      ease: "expo.out",
    },
    "-=0.9"
  )
  .fromTo(
    ".hero__title",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: "power2.out",
    },
    "-=1.1"
  )
  .fromTo(
    ".hero__desc",
    {
      opacity: 0,
      y: 40,

      // filter: "blur(12px)"
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    },
    "-=1.0"
  )
  .fromTo(
    ".hero__slide-wrap, .hero__button",
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.18,
    },
    "-=0.8"
  );

const mm = gsap.matchMedia();

mm.add("(max-width: 1024px)", () => {
  const cards = document.querySelectorAll(".problems-item");
  const header = document.querySelector(".header");
  const tl = gsap.timeline();
  const yOffsets = [0, 30, 70, 120, 190];
  const lastOffset = yOffsets.at(-1);
  const EPS = 0.0001;

  cards.forEach((card, index) => {
    const dur = index * 0.5;

    if (index > 0) {
      gsap.set(card, { y: index * 132 });

      tl.to(
        card,
        {
          y: yOffsets[index] ?? lastOffset,
          duration: dur,
          ease: "none",
          onComplete: () => card.classList.add("is-stacked"),
          onReverseComplete: () => card.classList.remove("is-stacked"),
        },
        0
      );
    } else {
      tl.to(
        card,
        {
          duration: Math.max(dur, EPS),
          onComplete: () => card.classList.add("is-stacked"),
          onReverseComplete: () => card.classList.remove("is-stacked"),
        },
        0
      );
    }
  });

  ScrollTrigger.create({
    trigger: ".problems",
    start: "top top",
    pin: true,
    end: `+=${cards.length * 200 + header.offsetHeight}`,
    scrub: true,
    animation: tl,
    // markers: true,
  });
});

const howDist = document.querySelector(".how-we-work__grid");
let howDistWidth = howDist.offsetWidth;
let amountToScroll = howDistWidth - window.innerWidth;
function getScrollAmount() {
  let howDistWidth = howDist.scrollWidth;
  let containerOffset = 0;
  if (window.innerWidth > 1720) {
    containerOffset = window.innerWidth - 1720;
  }
  return -(howDistWidth - window.innerWidth + containerOffset);
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

document.querySelectorAll(".highlight-svg").forEach((svg) => {
  const paths = svg.querySelectorAll(
    "path, line, polyline, polygon, circle, ellipse"
  );

  gsap.set(paths, { drawSVG: "0%" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: svg,
      start: "top 70%",
      end: "bottom 20%",
    },
  });

  paths.forEach((p) => {
    tl.to(p, { drawSVG: "100%", duration: 3, ease: "none" });
  });
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document
    .querySelectorAll(".highlight-svg path")
    .forEach((p) => gsap.set(p, { drawSVG: "100%" }));
  ScrollTrigger.kill();
}

// Функция анимации числа
function animateNumber(el, to) {
  gsap.fromTo(
    el,
    { innerText: 0 },
    {
      innerText: to,
      duration: 1.6,
      ease: "power2.out",
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
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.batch(".when-need-item__text-highlight", {
  start: "top 85%",
  onEnter: (batch) => {
    gsap.to(batch, {
      backgroundSize: "100% 0.28em",
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
    });
  },
  once: true,
});
