  let slides = document.querySelectorAll(".slideshow img");
  let index = 0;

  function showSlide() {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
    index = (index + 1) % slides.length;
  }

  setInterval(showSlide, 3000); // đổi ảnh sau mỗi 3 giây