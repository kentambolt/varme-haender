"use strict";
(() => {
  const bar = document.querySelector("[data-design-review]");
  if (!bar) return;
  const measure = () => document.documentElement.style.setProperty("--review-height", Math.ceil(bar.getBoundingClientRect().height) + "px");
  measure();
  if (typeof ResizeObserver === "function") new ResizeObserver(measure).observe(bar);
  else window.addEventListener("resize", measure);
  const select = bar.querySelector("[data-review-select]");
  const go = bar.querySelector("[data-review-go]");
  if (select && go) {
    go.hidden = false;
    go.addEventListener("click", () => {
      const option = select.selectedOptions[0];
      if (option) window.location.assign(option.value);
    });
  }
  const overview = bar.querySelector(".review-overview");
  document.addEventListener("click", (event) => {
    if (overview && !overview.contains(event.target)) overview.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overview && overview.open) {
      overview.open = false;
      overview.querySelector("summary").focus();
    }
  });
})();
