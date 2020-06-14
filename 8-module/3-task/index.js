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
        this.onProductUpdate();
        return;
      }
    }
    this.countProducts++;
    this.totalPrice += product.price;
    this.cartItems.push({product, count:1,});
    this.onProductUpdate();
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
        this.onProductUpdate();
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

  onProductUpdate() {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

