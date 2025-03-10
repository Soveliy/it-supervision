import marquee from "vanilla-marquee";

window.addEventListener("load", () => {
  new marquee(document.querySelector("[data-marq-left]"), {
    speed: 100,
    pauseOnHover: true,
  });
  new marquee(document.querySelector("[data-marq-right]"), {
    speed: 100,
    direction: "right",
    pauseOnHover: true,
  });
});
