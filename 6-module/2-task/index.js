import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    //this.product = product;

    //Создание скелета карточки товара
    let card = document.createElement("div");
    let cardTop = document.createElement("div");
    let cardBody = document.createElement("div");
    card.append(cardTop);
    card.append(cardBody);


    //<Наполнение топа карточки>
    let cardImage = document.createElement("img");
    cardImage.setAttribute("src", `/assets/images/products/${product.image}`);
    cardImage.setAttribute("alt", "product");
    let cardPrice = document.createElement("span");
    cardPrice.innerHTML=`€${product.price.toFixed(2)}`
    cardTop.append(cardImage);
    cardTop.append(cardPrice);


    //Наполнение тела карточки
    let cardTitle = document.createElement("div");
    cardTitle.innerHTML = product.name;
    let cardButton = document.createElement("button");
    cardButton.setAttribute("type", "button");
    let imgPlus = document.createElement("img");
    imgPlus.setAttribute("src", "/assets/images/icons/plus-icon.svg");
    imgPlus.setAttribute("alt", "icon");
    cardButton.append(imgPlus);
    cardBody.append(cardTitle);
    cardBody.append(cardButton);


    //Задание классов
    let blockName = "card";
    card.classList.add(blockName);

    cardTop.classList.add(`${blockName}__top`);
    cardImage.classList.add(`${blockName}__image`);
    cardPrice.classList.add(`${blockName}__price`);

    cardBody.classList.add(`${blockName}__body`);
    cardTitle.classList.add(`${blockName}__title`);
    cardButton.classList.add(`${blockName}__button`);

    //Добавление объекта продукта в DOM модель. Зачем??
    card.product = product;


    //Событие добавления в корзину
    card.addEventListener("click", addToCart);
    function addToCart(event) {
      if (event.target.closest(`.${blockName}__button`)){
        card.dispatchEvent(new CustomEvent("product-add", { // имя события должно быть именно "product-add"
          detail: this.product.id, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        }));
      }
    }

    //Ссылка на DOM-модель
    this.elem = card;
  }

}
