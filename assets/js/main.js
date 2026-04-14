document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".box6-swiper");
    if (!container) {
        return;
    }

    const track = container.querySelector(".swiper-wrapper");
    const slides = Array.from(container.querySelectorAll(".swiper-slide"));
    const prevButton = container.querySelector(".box6-arrow-prev");
    const nextButton = container.querySelector(".box6-arrow-next");
    const pagination = document.querySelector(".box6-pagination");

    if (!track || slides.length === 0 || !prevButton || !nextButton || !pagination) {
        return;
    }

    let currentIndex = 0;

    pagination.innerHTML = slides
        .map((_, index) => `<button class="swiper-pagination-bullet${index === 0 ? " swiper-pagination-bullet-active" : ""}" type="button" aria-label="${index + 1}번 슬라이드"></button>`)
        .join("");

    const bullets = Array.from(pagination.querySelectorAll(".swiper-pagination-bullet"));

    const updateSlider = () => {
        const containerWidth = container.clientWidth;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(track).gap || "12");
        const contentWidth = slides.length * slideWidth + gap * (slides.length - 1);
        const maxTranslate = Math.max(0, contentWidth - containerWidth);
        const offsetToCenter = currentIndex * (slideWidth + gap) - (containerWidth - slideWidth) / 2;
        const clampedOffset = Math.max(0, Math.min(offsetToCenter, maxTranslate));

        track.style.transform = `translateX(${-clampedOffset}px)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle("is-active", index === currentIndex);
        });

        bullets.forEach((bullet, index) => {
            bullet.classList.toggle("swiper-pagination-bullet-active", index === currentIndex);
        });
    };

    const moveTo = (index) => {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        updateSlider();
    };

    prevButton.addEventListener("click", () => moveTo(currentIndex - 1));
    nextButton.addEventListener("click", () => moveTo(currentIndex + 1));

    bullets.forEach((bullet, index) => {
        bullet.addEventListener("click", () => moveTo(index));
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();
});
