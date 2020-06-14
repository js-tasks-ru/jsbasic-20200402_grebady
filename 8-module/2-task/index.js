import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: "",
      vegetarian: "",
      vegeterianOnly: "",
      maxSpiciness: 4,
      category: "",
    };

    let productsGrid = createElement('<div class="products-grid">');
    let productsGridInner = createElement('<div class="products-grid__inner">');
    productsGrid.append(productsGridInner);
    for (let i = 0; i < products.length; i++) {
      let productCard = new ProductCard(this.products[i]);
      productsGridInner.append(productCard.elem);
    }

    this.elem = productsGrid;
  }


  updateFilter(filters){
    for (let filter in this.filters) {
      if(filter in filters) this.filters[filter] = filters[filter];
    }
    //let cards = this.elem.querySelectorAll(".card");
    let productsGridInner = this.elem.querySelector(".products-grid__inner");
    productsGridInner.innerHTML = "";
    for (let i = 0; i < this.products.length; i++) {
      if ((this.filters.vegetarian == true || this.filters.vegeterianOnly == true)  && this.products[i].vegeterian != true) {
        //cards[i].remove();
        continue;
      }
      if (this.filters.noNuts === true && this.products[i].nuts == true) {
        //cards[i].remove();
        continue;
      }
      if (this.products[i].spiciness > this.filters.maxSpiciness) {
        //cards[i].remove();
        continue;
      }
      if (this.filters.category != this.products[i].category && this.filters.category != "") {
        //cards[i].remove();
        continue;
      }
      let productCard = new ProductCard(this.products[i]);
      productsGridInner.append(productCard.elem);

    }

  }
}
