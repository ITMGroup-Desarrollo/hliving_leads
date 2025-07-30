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
window.addEventListener("DOMContentLoaded", () => {
  const paragraph = document.querySelector(".paragraph");
  const words = paragraph.textContent.trim().split(" ");
  paragraph.innerHTML = ""; 

  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.animationDelay = `${i * 0.05}s`; // 0.1s entre palabra y palabra
    paragraph.appendChild(span);
  });
});
