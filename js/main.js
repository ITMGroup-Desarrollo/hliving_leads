window.addEventListener("scroll", () => {
  const header = document.querySelector(".header-content");
  const scrollY = window.scrollY;

  if (scrollY < window.innerHeight) {
    const opacity = 1 - scrollY / window.innerHeight;
    header.style.opacity = opacity;
  } else {
    header.style.opacity = 0;
  }
});
AOS.init();
