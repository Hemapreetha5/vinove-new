document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.timeline-scroll');
  const timeline = document.querySelector('.timeline');
  const car = document.querySelector('.car-wrapper');
  const progressLine = document.querySelector('.progress-line');
  const years = document.querySelectorAll('.year-block');

  function updateLineWidth() {
    const line = document.querySelector('.line');
    line.style.width = timeline.scrollWidth + "px";
  }

  function updateCar() {
    const rect = section.getBoundingClientRect();
    const winH = window.innerHeight;
    const total = section.offsetHeight - winH;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const progress = scrolled / total;

    const lineW = timeline.scrollWidth;
    const carWidth = car.offsetWidth;
    const maxCarX = lineW - carWidth;
    const x = maxCarX * progress;
    car.style.left = x + "px";
    progressLine.style.width = progress * lineW + "px";

    const maxScroll = timeline.scrollWidth - timeline.clientWidth;
    timeline.scrollLeft = maxScroll * progress;

    years.forEach((y) => {
      const center = y.offsetLeft + y.offsetWidth / 2;
      if (progress > 0 && (x + carWidth / 2) >= center - 130) {
        y.classList.add("active");
      } else {
        y.classList.remove("active");
      }
    });

    if (scrolled >= total - 1) {
      years[years.length - 1].classList.add("active");
    }
  }

  updateLineWidth();
  window.addEventListener('resize', () => {
    updateLineWidth();
    updateCar();
  });

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateCar();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateCar);
  updateCar();
});
