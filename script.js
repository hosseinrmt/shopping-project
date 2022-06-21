// All variables and constants
import { productsData } from "./products.js";
const productsDivSection = document.querySelector(".products");
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart-modal");
const backDrop = document.querySelector(".black-screen-modal");
const modalConfirmBtn = document.querySelector(".cart-confirm-btn");
const cartContent = document.querySelector(".cart-content");
const DOMtoalPrice = document.querySelector(".total-price");
const cartItem = document.querySelector(".cart-Item");
const clearCart = document.querySelector(".clear-cart");
let _cartItem = 0;
let totalCartPrice = 0;

// All Event listeners
clearCart.addEventListener("click", () => {
  cartContent.innerHTML = "";
  DOMtoalPrice.innerHTML = "your cart is empty!";
  cartItem.innerHTML = 0;
});
cartBtn.addEventListener("click", openModal);
backDrop.addEventListener("click", closeModal);
modalConfirmBtn.addEventListener("click", closeModal);
document.addEventListener("DOMContentLoaded", () => {
  displayProducts(productsData);
  getAddToCart();
});

// loop on the products and show them on the DOM
function displayProducts(products) {
  let result = "";
  products.forEach((element) => {
    result += `<div class="product bg-gray-200 rounded-md max-w-sm flex flex-col h-80 box-border">
      <img class="rounded-t-md" src=${element.imageUrl} />
      <div class="flex justify-around m-4">
        <p class="text-green-700">${element.price}</p>
        <p>${element.title}</p>
      </div>
      <button class="bg-white w-28 mx-auto rounded-md h-8 add-to-cart-btn" data-id = ${element.id}>
        add to cart
      </button>
    </div>`;
    productsDivSection.innerHTML = result;
  });
}

// get all 'add to cart' buttons and pass them to addToCart function
function getAddToCart() {
  const addToCartBtn = [...document.querySelectorAll(".add-to-cart-btn")];
  addToCartBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => addToCart(e))
  );
}

// this function pass the target product to 'displayCartProducts' function
function addToCart(e) {
  for (let i = 0; i < productsData.length; i++) {
    if (productsData[i].id == e.target.dataset.id) {
      displayCartProducts(productsData[i]);
      cartTotalPrice(productsData[i].price);
      e.target.innerHTML = "In Cart";
      _cartItem++;
      cartItem.innerHTML = _cartItem;
    }
  }
}

// this function add cart item into the DOM
function displayCartProducts(product) {
  const div = document.createElement("div");
  div.innerHTML = `<div class="grid grid-cols-6 gap-4 my-4">
  <img class="w-max rounded-md col-span-2" src=${product.imageUrl} />
  <div class="flex flex-col justify-evenly col-span-2">
    <p class="font-semibold">${product.title}</p>
    <p class="opacity-70 font-bold">${product.price} $</p>
  </div>
  </div>`;
  cartContent.appendChild(div);
}

// this function calcute the cart total price
function cartTotalPrice(price) {
  totalCartPrice += price;
  DOMtoalPrice.innerHTML = `total price: ${totalCartPrice}`;
}

// reuseable open and close modal
function openModal() {
  cartModal.style.display = "block";
  backDrop.style.display = "block";
}

function closeModal() {
  // console.log("clicked");
  cartModal.style.display = "none";
  backDrop.style.display = "none";
}
