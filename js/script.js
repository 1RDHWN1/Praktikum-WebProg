document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOADING SCREEN ================= */
  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("fade");
    }, 800);
  });

  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    if(!hero) return;

    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = offset * 0.2 + "px";
  });

  const socialFloat = document.getElementById("socialFloat");
  const socialToggle = document.getElementById("socialToggle");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const themeToggle = document.getElementById("themeToggle");
  const projectImages = document.querySelectorAll(".project-demo");
  const imagePreview = document.getElementById("imagePreview");
  const imagePreviewTarget = document.getElementById("imagePreviewTarget");
  const imagePreviewClose = document.getElementById("imagePreviewClose");

  if(themeToggle){
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "light"){
      document.body.classList.add("light");
    }

    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";

    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.toggle("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      themeToggle.textContent = isLight ? "☀️" : "🌙";
    });
  }

  if(socialFloat && socialToggle){
    socialToggle.addEventListener("click", () => {
      const isOpen = socialFloat.classList.toggle("open");
      socialToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if(!socialFloat.contains(event.target)){
        socialFloat.classList.remove("open");
        socialToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if(navToggle && mainNav){
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "×" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      });
    });

    document.addEventListener("click", (event) => {
      if(!mainNav.contains(event.target) && !navToggle.contains(event.target)){
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      }
    });

    window.addEventListener("resize", () => {
      if(window.innerWidth > 768){
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      }
    });
  }

  if(projectImages.length && imagePreview && imagePreviewTarget && imagePreviewClose){
    function closeImagePreview(){
      imagePreview.classList.remove("open");
      imagePreview.setAttribute("aria-hidden", "true");
      imagePreviewTarget.src = "";
      imagePreviewTarget.alt = "Preview gambar project";
    }

    projectImages.forEach(img => {
      img.addEventListener("click", () => {
        imagePreviewTarget.src = img.src;
        imagePreviewTarget.alt = img.alt || "Preview gambar project";
        imagePreview.classList.add("open");
        imagePreview.setAttribute("aria-hidden", "false");
      });
    });

    imagePreviewClose.addEventListener("click", closeImagePreview);

    imagePreview.addEventListener("click", (event) => {
      if(event.target === imagePreview){
        closeImagePreview();
      }
    });

    document.addEventListener("keydown", (event) => {
      if(event.key === "Escape"){
        closeImagePreview();
      }
    });
  }

  /* ================= TYPING EFFECT ================= */
  const typingElement = document.getElementById("typing");
  const words = [
    "Selamat datang di Website Saya! 👋",
    "Ini adalah web portofolio saya. 💼"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect(){
    const currentWord = words[wordIndex];
    const currentText = currentWord.substring(0, charIndex);
    typingElement.textContent = currentText;

    if(!isDeleting && charIndex < currentWord.length){
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if(isDeleting && charIndex > 0){
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      isDeleting = !isDeleting;
      if(!isDeleting){
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 800);
    }
  }

  typeEffect();

  /* ================= SCROLL REVEAL ================= */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll(){
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if(elementTop < windowHeight - 100){
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

});
