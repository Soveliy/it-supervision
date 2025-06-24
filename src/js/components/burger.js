const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
if (burger && menu) {
  burger.addEventListener("click", () => {
    document.body.classList.toggle("lock-scroll");
    burger.classList.toggle("burger--active");
    menu.classList.toggle("header__menu--active");
  });
}
