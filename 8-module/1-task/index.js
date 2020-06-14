import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let fullPageWidth = document.documentElement.offsetWidth;
    let topCartIcon = document.querySelector(".cart-icon_visible");
    let h1 = document.querySelector("h1");
    if (!topCartIcon) return;

    if (fullPageWidth <= 767){
      topCartIcon.style.position = "";
      topCartIcon.style.top = "";
      topCartIcon.style.left = "";
      topCartIcon.style.right = "";
      topCartIcon.style.zIndex = "";
      return;
    }

    if (h1.getBoundingClientRect().top > 0) {
      topCartIcon.style.position = "";
      topCartIcon.style.top = "";
      topCartIcon.style.left = "";
      topCartIcon.style.right = "";
      topCartIcon.style.zIndex = "";
      return;
    }

    let widthAndLeftForContainerElement = document.querySelector(".container").getBoundingClientRect().right;
    let widthForCartIcon = topCartIcon.offsetWidth;
    let freeSpaceAfterCartIconAdding = fullPageWidth - widthAndLeftForContainerElement - widthForCartIcon;

    topCartIcon.style.position = "fixed";
    topCartIcon.style.zIndex = 3;
    topCartIcon.style.top = "50px";
    if (freeSpaceAfterCartIconAdding < 20) topCartIcon.style.left = `${widthAndLeftForContainerElement - 2 - widthForCartIcon}px` ;
    else  topCartIcon.style.left = `${widthAndLeftForContainerElement + 20}px`;


  }

}
