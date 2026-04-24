const imgs = document.querySelectorAll(".banner-slides img");
const dotsContainer = document.querySelector(".banner-dots");
const prevBtn = document.querySelector(".banner-nav.prev");
const nextBtn = document.querySelector(".banner-nav.next");

let current = 0;
let interval;

/* TẠO DOT */
imgs.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    showSlide(i);
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".banner-dots span");

/* HIỂN THỊ */
function showSlide(index) {
  imgs[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  imgs[current].classList.add("active");
  dots[current].classList.add("active");
}

/* NEXT */
function nextSlide() {
  let index = (current + 1) % imgs.length;
  showSlide(index);
}

/* PREV */
function prevSlide() {
  let index = (current - 1 + imgs.length) % imgs.length;
  showSlide(index);
}

/* AUTO */
function startAuto() {
  interval = setInterval(nextSlide, 7000);
}

function stopAuto() {
  clearInterval(interval);
}

/* EVENT */
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAuto();
  startAuto();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAuto();
  startAuto();
});

/* START */
startAuto();
