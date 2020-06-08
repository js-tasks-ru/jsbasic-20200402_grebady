import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel__inner");

    for (let i = 0; i < slides.length; i++) {

      //Создание скелета карусели
      let slide = document.createElement("div");
      slide.dataset.id = slides[i].id;
      let slideImage = document.createElement("div");
      slideImage.setAttribute("src", `/assets/images/products/${slides[i].image}`);
      slideImage.setAttribute("alt", "slide");
      slide.append(slideImage);


      //<Наполнение caption для слайда>
      let slideCaption = document.createElement("div");

      let slidePrice = document.createElement("span");
      slidePrice.innerHTML = `€${slides[i].price.toFixed(2)}`
      let slideTitle = document.createElement("div");
      slideTitle.innerHTML = slides[i].name;
      let slideButton = document.createElement("button");
      slideButton.setAttribute("type", "button");
      let imgPlus = document.createElement("img");
      imgPlus.setAttribute("src", "/assets/images/icons/plus-icon.svg");
      imgPlus.setAttribute("alt", "icon");
      slideButton.append(imgPlus);
      slideCaption.append(slidePrice);
      slideCaption.append(slideTitle);
      slideCaption.append(slideButton);

      slide.append(slideCaption);


      //Задание классов
      let blockName = "carousel";
      slide.classList.add(`${blockName}__slide`);
      slideCaption.classList.add(`${blockName}__caption`);
      slideImage.classList.add(`${blockName}__img`);
      slidePrice.classList.add(`${blockName}__price`);
      slideTitle.classList.add(`${blockName}__title`);
      slideButton.classList.add(`${blockName}__button`);

      //Добавление слайда в обертку
      carouselInner.append(slide);
    }


    //Кнопки
    let rightArrow = document.createElement("div");
    rightArrow.className = "carousel__arrow carousel__arrow_right";
    let imgArrowRight = document.createElement("img");
    imgArrowRight.setAttribute("src", "/assets/images/icons/angle-icon.svg");
    imgArrowRight.setAttribute("alt", "icon");
    rightArrow.append(imgArrowRight);

    let leftArrow = document.createElement("div");
    leftArrow.className = "carousel__arrow carousel__arrow_left";
    let imgArrowLeft = document.createElement("img");
    imgArrowLeft.setAttribute("src", "/assets/images/icons/angle-left-icon.svg");
    imgArrowLeft.setAttribute("alt", "icon");
    leftArrow.append(imgArrowLeft);


    //Создание объекта Карусель
    let carousel = document.createElement("div");
    carousel.classList.add("carousel");
    carousel.numSlides = this.slides.length;

    //Сборка карусули
    carousel.append(rightArrow);
    carousel.append(leftArrow);
    carousel.append(carouselInner);
    this.elem = carousel;
    initCarousel();
    carousel.addEventListener("click", addToCart);


    //Переключение слайдов карусели
    function initCarousel() {
      carousel.addEventListener("click", startCarousel);

      let positionTransform = 0;
      leftArrow.style.display = 'none';

      function startCarousel(event) {
        if (event.target.closest(".carousel__arrow_right")) {
          if (leftArrow.style.display == 'none') leftArrow.style.display = "";
          positionTransform -= carouselInner.offsetWidth;
          carouselInner.style.transform = `translateX(${positionTransform}px)`;
          if (positionTransform == -(carouselInner.offsetWidth *  (this.numSlides - 1))) rightArrow.style.display = 'none';
        }

        if (event.target.closest(".carousel__arrow_left")) {
          if (rightArrow.style.display == 'none') rightArrow.style.display = "";
          positionTransform += carouselInner.offsetWidth;
          carouselInner.style.transform = `translateX(${positionTransform}px)`;
          if (positionTransform == 0) leftArrow.style.display = 'none';
        }
      };
    }

    //Добавление товара в корзину

    function addToCart(event) {
      if (event.target.closest(".carousel__button")){
        let productId = event.target.closest(".carousel__slide").dataset.id;
        carousel.dispatchEvent(new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: productId, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }));
      }
    }
  }


}
