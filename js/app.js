const menu = document.querySelector(".header__hamburger");
const header = document.querySelector(".header");
const navBar = document.querySelector(".header__list");
const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", function () {});

menu.addEventListener("click", function () {
  navBar.classList.toggle("header__show__list");
});
