const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');
const grid = document.querySelector('.grid');

function filterCards() {
  const keyword = searchInput.value.toLowerCase().trim();

  cards.forEach(card => {
    const name = (card.dataset.name || "").toLowerCase();

    if (keyword === "" || name.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


searchInput.addEventListener('input', filterCards);


searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    filterCards();
    scrollToGrid();
  }
});


document.querySelector('.search-box button').addEventListener('click', function() {
  filterCards();
  scrollToGrid();
});


function scrollToGrid() {
  document.querySelector('.container-card').scrollIntoView({
    behavior: 'smooth'
  });
}

window.onload = function () {
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    window.scrollTo(0, 0);
  }
};
