// Корзина

class Cart {
    products;
  
    constructor() {
      this.products = [];
    }
  
    get count() {
      return this.products.length;
    }
  
    addProduct(product) {
      this.products.push(product);
    }
  
    removeProduct(index) {
      this.products.splice(index, 1);
    }
  
    get cost() {
      const prices = this.products.map((product) => {
        return toNum(product.price);
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
  
    get costDiscount() {
      const prices = this.products.map((product) => {
        return toNum(product.priceDiscount);
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
  
    get discount() {
      return this.cost - this.costDiscount;
    }
  }
  
  const myCart = new Cart();
  
  // Populate cart on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.products.length > 0) {
      myCart.products = savedCart.products;
      cartNum.textContent = myCart.count;
    }
  });
  
  // Function to handle product removal from cart
  function removeProductFromCart(index) {
    myCart.removeProduct(index);
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartNum.textContent = myCart.count;
    popupContainerFill(); // Refresh popup content after removal
  }
  
  // Event listener for adding product to cart
  cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      const product = new Product(card);
      myCart.addProduct(product);
      localStorage.setItem("cart", JSON.stringify(myCart));
      cartNum.textContent = myCart.count;
    });
  });
  