const fadeInOptions = {
  root: null,
  threshold: 0.3,
  rootMargin: "0px",
};
let loaded = false;

const observer = new IntersectionObserver((enteries) => {
  enteries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      if (!loaded) entry.target.classList.add("in-view");
    }
  });
}, fadeInOptions);

const sectionsHidden = document.querySelectorAll(".hidden");
const fromLeft = document.querySelector(".hidden-left");
const timeline = document.querySelector(".bar-hidden");
sectionsHidden.forEach((section) => observer.observe(section));
observer.observe(timeline);
observer.observe(fromLeft);

document.querySelector(".logo-intro").src = "./resources/type.gif";
setTimeout(animation, 3600);
document.querySelector(".hamburger-wrapper").classList.add("inactive");
document.querySelector(".content").classList.add("inactive");
function animation() {
  document.querySelector(".logo-general").style.display = "inline";
  document.querySelector(".logo-intro").style.display = "none";
  document.querySelector(".nav-items").classList.add("show-nav");
  document.querySelector(".links").classList.add("show-nav");
  document.querySelector(".nav-line-container").classList.add("show-nav");
  document.querySelector(".hamburger-wrapper").classList.add("show-nav");
}
setTimeout(() => {
  loaded = true;
  document.querySelector(".hamburger-wrapper").classList.remove("hide-nav");
  document.querySelector(".hamburger-wrapper").classList.remove("inactive");
  document.querySelector(".content").classList.remove("inactive");
  document.getElementsByTagName("html")[0].classList.remove("inactive");
}, 4000);
