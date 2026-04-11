document.addEventListener("DOMContentLoaded", function() {
  let slides = document.querySelectorAll(".slideshow .slide");
  let index = 0;

  function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
  }

  setInterval(showSlide, 3000); // đổi ảnh sau mỗi 3 giây
});
