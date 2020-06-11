import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    let ribbon = document.createElement("div");
    ribbon.className = "ribbon";

    let leftArrow = document.createElement("button");
    leftArrow.className = "ribbon__arrow ribbon__arrow_left";
    let imgArrowLeft = document.createElement("img");
    imgArrowLeft.setAttribute("src", "/assets/images/icons/angle-icon.svg");
    imgArrowLeft.setAttribute("alt", "icon");
    leftArrow.append(imgArrowLeft);

    let rightArrow = document.createElement("button");
    rightArrow.className = "ribbon__arrow ribbon__arrow_right ribbon__arrow_visible";
    let imgArrowRight = document.createElement("img");
    imgArrowRight.setAttribute("src", "/assets/images/icons/angle-icon.svg");
    imgArrowRight.setAttribute("alt", "icon");
    rightArrow.append(imgArrowRight);


    let ribbonInner = document.createElement("div");
    ribbonInner.className = "ribbon__inner";


    ribbon.append(leftArrow);
    ribbon.append(ribbonInner);
    ribbon.append(rightArrow);

    for (let i = 0; i < this.categories.length; i++) {
      let a = document.createElement("a");
      a.setAttribute("href", "#");
      a.className = "ribbon__item";
      a.dataset.id = this.categories[i].id;
      a.innerHTML = this.categories[i].name;
      ribbonInner.append(a);
    }

    ribbon.addEventListener("click", scrollRibbon);
    function scrollRibbon(event) {
      //Прокрутка меню
      let arrow = event.target.closest(".ribbon__arrow");
      if (arrow){
        if (arrow.classList.contains("ribbon__arrow_left")){
          ribbonInner.scrollBy(-350, 0);
          if (!rightArrow.classList.contains("ribbon__arrow_visible")){

          }
        }
        else {
          ribbonInner.scrollBy(350, 0);
          if (!leftArrow.classList.contains("ribbon__arrow_visible")){
            leftArrow.classList.add("ribbon__arrow_visible");
          }
        }
      }

      //Подгрузка категорий
      let newActiveRibbonItem = event.target.closest(".ribbon__item");
      if (newActiveRibbonItem){
        event.preventDefault();
        let previousActiveRibbonItem = document.querySelector(".ribbon__item_active");
        if(previousActiveRibbonItem) previousActiveRibbonItem.classList.remove("ribbon__item_active");


        newActiveRibbonItem.classList.add("ribbon__item_active");
        let selectEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
          detail: newActiveRibbonItem.dataset.id, // уникальный идентификатора категории из её объекта
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });
        ribbon.dispatchEvent(selectEvent);
      }
    }

    ribbonInner.addEventListener("scroll", function () {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollLeft < 1 && (leftArrow.classList.contains("ribbon__arrow_visible"))){
        leftArrow.classList.remove("ribbon__arrow_visible");
      }
      if (scrollLeft >= 1 && (!leftArrow.classList.contains("ribbon__arrow_visible"))){
        leftArrow.classList.add("ribbon__arrow_visible");
      }
      if (scrollRight < 1 && (rightArrow.classList.contains("ribbon__arrow_visible"))){
        rightArrow.classList.remove("ribbon__arrow_visible");
      }
      if (scrollRight >= 1 && (!rightArrow.classList.contains("ribbon__arrow_visible"))){
        rightArrow.classList.add("ribbon__arrow_visible");
      }
    });


    this.elem = ribbon;
  }
}
