function initCarousel() {
  document.addEventListener("click", startCarousel);
}
let positionTransform = 0;
let slaiderElem = document.querySelector(".carousel__inner");
let carouselArrowRight = document.querySelector(".carousel__arrow_right");
let carouselArrowLeft = document.querySelector(".carousel__arrow_left");
carouselArrowLeft.style.display = 'none';

function startCarousel(event) {
  if (event.target.closest(".carousel__arrow_right")){
    if (carouselArrowLeft.style.display == 'none') carouselArrowLeft.style.display = "";
    positionTransform -= slaiderElem.offsetWidth;
    slaiderElem.style.transform = `translateX(${positionTransform}px)`;
    if(positionTransform == -(slaiderElem.offsetWidth * 3) ) carouselArrowRight.style.display = 'none';
  }

  if (event.target.closest(".carousel__arrow_left")){
    if (carouselArrowRight.style.display == 'none') carouselArrowRight.style.display = "";
    positionTransform += slaiderElem.offsetWidth;
    slaiderElem.style.transform = `translateX(${positionTransform}px)`;
    if(positionTransform == 0) carouselArrowLeft.style.display = 'none';
  }
}
