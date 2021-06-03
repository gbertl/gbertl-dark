const bgAnimationItems = () => {
  const rows = 7,
    cols = 10;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const div = document.createElement("div");
      div.className = `col-${j + 1}`;
      document.querySelector(".bg-animation-effect").appendChild(div);
    }
  }
};

bgAnimationItems();

const filter = document.querySelector(".filter");
const filterBtns = filter.querySelectorAll(".filter__button");

filterBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter__button--active")) {
      filter
        .querySelector(".filter__button--active")
        .classList.remove("filter__button--active");
      e.target.classList.add("filter__button--active");
      filterItems(e.target);
    }
  });
});

const filterItems = (filterBtn) => {
  const selectedCategory = filterBtn.getAttribute("data-filter");
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const category = item.getAttribute("data-category").split(",");

    if (
      category.indexOf(selectedCategory) !== -1 ||
      selectedCategory === "all"
    ) {
      item.classList.add("portfolio-item--show");
    } else {
      item.classList.remove("portfolio-item--show");
    }
  });
};

filterItems(document.querySelector(".filter__button--active"));
