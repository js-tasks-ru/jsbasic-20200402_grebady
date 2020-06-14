import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  countProducts = 0;
  totalPrice = 0;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === product.id){
        this.cartItems[i].count++;
        this.countProducts++;
        this.totalPrice += product.price;
        this.onProductUpdate(product.id);
        return;
      }
    }
    this.countProducts++;
    this.totalPrice += product.price;
    this.cartItems.push({product, count:1,});
    this.onProductUpdate(product.id);
    this.addEventListeners();
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id === productId){
        this.cartItems[i].count += amount;
        this.countProducts += amount;
        this.totalPrice += this.cartItems[i].product.price * amount;
        if (this.cartItems[i].count == 0){
          this.cartItems.splice(i, 1);
        }
        this.onProductUpdate(productId);
        return;
      }
    }
  }

  isEmpty() {
    if(!this.countProducts) return true;
    return false;
  }

  getTotalCount() {
    return this.countProducts;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form name="order" class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");

    let div = document.createElement("div");
    for (let i = 0; i < this.cartItems.length; i++) {
      let productInCart = this.renderProduct(this.cartItems[i].product, this.cartItems[i].count);
      div.append(productInCart);
    }
    div.append(this.renderOrderForm());

    modal.setBody(div);

    modal.elem.addEventListener("click", this.plusMinusButtons);
    modal.elem.addEventListener("submit", this.onSubmit);
    modal.open();
  }

  onProductUpdate(productId) {
    this.cartIcon.update(this);
    let modalBody = document.querySelector(".modal");
    if (this.getTotalCount() == 0) {
      document.body.classList.remove("is-modal-open");
      modalBody.remove();
    }
    if (document.body.classList.contains("is-modal-open")) {
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let product;
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product.id == productId) product = this.cartItems[i];
      }
      productCount.innerHTML = product.count;
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      productPrice.innerHTML = `€${(product.count * product.product.price).toFixed(2)}`;
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    }
  }
  plusMinusButtons = (event) => {


    if (event.target.closest(".cart-counter__button_plus")){
      let productID = event.target.closest("[data-product-id]").dataset.productId;
      this.updateProductCount(productID, 1);

    }
    if (event.target.closest(".cart-counter__button_minus")){
      let productID = event.target.closest("[data-product-id]").dataset.productId;
      this.updateProductCount(productID, -1);
    }

  }

   onSubmit = async (event) => {
    event.preventDefault();
    let buttonSubmit = document.querySelector('button[type="submit"]');
    buttonSubmit.classList.add("is-loading");
    let order = document.forms.order;
    let promise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(order),
    })

      promise
      .then((response) => {
      if (response.ok){
        let modalTitle = document.querySelector(".modal__title");
        modalTitle.innerHTML = "Success!";

        let modalBody = document.querySelector(".modal__body");
        modalBody.innerHTML = "";
        modalBody.insertAdjacentHTML("beforeend", `<div class="modal__body-inner">
                                              <p>
                                                Order successful! Your order is being cooked :) <br>
                                                We’ll notify you about delivery time shortly.<br>
                                                <img src="/assets/images/delivery.gif">
                                              </p>
                                            </div>`);
        this.cartItems = [];
        this.countProducts = 0;
        this.totalPrice = 0;
        this.cartIcon.update(this);

      }
    });


  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

