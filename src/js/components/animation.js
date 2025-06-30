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
  y: 60,
  filter: "blur(10px)",
});

const headerTl = gsap.timeline();

setTimeout(() => {
  headerTl
    .to(
      ".hero__title, .hero__desc, .hero__slide-wrap, .hero__button",
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.12,
      },
      "-=0.5"
    )
    .to(
      ".hero__button",
      {
        scale: 1.05,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
      "-=0.4"
    )
    .to(".header", {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "expo.out",
    })
    .to(
      ".hero__picture",
      { opacity: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.3"
    );
}, 100);
