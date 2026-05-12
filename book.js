if (performance.navigation.type === 1) {
  window.scrollTo(0, 0);
}

const imgs = document.querySelectorAll(".banner-slides img");
const dotsContainer = document.querySelector(".banner-dots");
const prevBtn = document.querySelector(".banner-nav.prev");
const nextBtn = document.querySelector(".banner-nav.next");

let current = 0;
let interval;

imgs.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    showSlide(i);
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".banner-dots span");

function showSlide(index) {
  imgs[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  imgs[current].classList.add("active");
  dots[current].classList.add("active");
}

function nextSlide() {
  let index = (current + 1) % imgs.length;
  showSlide(index);
}

function prevSlide() {
  let index = (current - 1 + imgs.length) % imgs.length;
  showSlide(index);
}

function startAuto() {
  interval = setInterval(nextSlide, 7000);
}

function stopAuto() {
  clearInterval(interval);
}

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

startAuto();
