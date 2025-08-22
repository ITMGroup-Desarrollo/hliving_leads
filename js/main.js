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

    // Crear los spans con animaciones pausadas
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.animationDelay = `${i * 0.05}s`;
      span.classList.add("word-span");
      paragraph.appendChild(span);
    });

    // Pausar animación al inicio
    const spans = paragraph.querySelectorAll(".word-span");
    spans.forEach(span => {
      span.style.animationPlayState = "paused";
    });


    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            spans.forEach(span => {
              span.style.animationPlayState = "running";
            });
            observer.unobserve(paragraph); // Solo una vez
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(paragraph);
  });
