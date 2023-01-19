const navItem = document.getElementsByClassName("nav-item");
const aboutButton = navItem[0];
const resumeButton = document.querySelector(".resume-button");
const projectButton = navItem[1];
const skillsButton = navItem[2];
const contactButton = navItem[3];
const sections = document.getElementsByClassName("section");
const about = sections[0];
const resume = sections[1];
const skills = sections[2];
const contact = sections[3];
const projectSection = document.querySelector(".project-section");
const hamburgerWrapper = document.querySelector(".hamburger-wrapper");
const hamburger = document.querySelector(".hamburger");

const submitButton = document.querySelector(".submit-button");
const form = document.querySelector("#form-id");
aboutButton.addEventListener("click", () => {
  hamburgerWrapper.click();
  about.scrollIntoView({ behavior: "smooth" });
});
projectButton.addEventListener("click", () => {
  hamburgerWrapper.click();
  projectSection.scrollIntoView({ behavior: "smooth" });
});

skillsButton.addEventListener("click", () => {
  hamburgerWrapper.click();
  skills.scrollIntoView({ behavior: "smooth" });
});
contactButton.addEventListener("click", () => {
  hamburgerWrapper.click();
  contact.scrollIntoView({ behavior: "smooth" });
});

const validateEmail = (email) => {
  const rules =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return rules.test(email);
};
const nameI = document.querySelector(".name-input");
const email = document.querySelector(".email-input");
const message = document.querySelector(".message-input");
nameI.addEventListener("focus", () => {
  nameI.classList.remove("input-error");
});
email.addEventListener("focus", () => {
  email.classList.remove("input-error");
});
message.addEventListener("focus", () => {
  message.classList.remove("input-error");
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameI.value === "") nameI.classList.add("input-error");
  else nameI.classList.remove("input-error");
  if (email.value === "" || !validateEmail(email.value))
    email.classList.add("input-error");
  else email.classList.remove("input-error");
  if (message.value === "") message.classList.add("input-error");
  else message.classList.remove("input-error");

  if (
    !nameI.classList.contains("input-error") &&
    !email.classList.contains("input-error") &&
    !message.classList.contains("input-error")
  ) {
    submitButton.value = "Thank you!";
    submitButton.classList.add("success-submit");
    emailjs.sendForm("service_2j9lp4n", "form-template", "#form-id");
    form.reset();
  }
});
resumeButton.addEventListener("click", () => {
  window.open("./resources/Justin Fisher Resume.docx.pdf");
});
document.querySelector(".download-button").addEventListener("click", () => {
  window.open("./resources/Justin Fisher Resume.docx.pdf");
});
document.querySelectorAll(".nav-link")[0].addEventListener("click", () => {
  window.open("https://github.com/justinfisherrr");
});
document.querySelectorAll(".nav-link")[1].addEventListener("click", () => {
  window.open("https://linkedin.com/in/justinthedev");
});
document.querySelectorAll(".nav-link")[2].addEventListener("click", () => {
  window.open("mailto:justinthedev@outlook.com");
});
document.querySelector(".footer").addEventListener("click", () => {
  window.open("https://github.com/justinfisherrr");
});

let active = false;
hamburgerWrapper.addEventListener("click", () => {
  let nav = document.querySelector(".nav-bar");
  let logo = document.querySelector(".logo-wrapper");
  let navItems = document.querySelector(".nav-items");
  var root = document.getElementsByTagName("html")[0];
  active = !active;
  if (active) {
    navItems.style.position = "inline-block";
    navItems.style.opacity = "1";
    navItems.style.pointerEvent = "auto";
    root.classList.add("mobile-html");
    nav.classList.add("nav-active");
    logo.classList.add("nav-logo");
    navItems.classList.add("mobile-items");
    hamburgerWrapper.classList.add("active-hamburger");
    hamburger.src = "./resources/x.svg";
  } else {
    nav.classList.remove("nav-active");
    logo.classList.remove("nav-logo");
    navItems.classList.remove("mobile-items");
    root.classList.remove("mobile-html");
    hamburgerWrapper.classList.remove("active-hamburger");
    hamburger.src = "./resources/bars.svg";
  }
});
