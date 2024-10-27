//* Bağlantı Kontrolü
// console.log(`Bağlantı Başarılı !!`);

import { addToCart, displayCartTotal, renderCartItems } from "./cart.js";
import { fetchProduct, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

//! HTML'den elemanlar erişiyoruz.
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");
// console.log(navLinks);

menuIcon.addEventListener("click", () => {
  //* toggle ile class'ın varlığını yokluğunu kontrol ediyoruz.
  navLinks.classList.toggle("open-menu");
});

//* Anasayfa ve cart sayfasında yapılacak işlemleri ayır
//* Sayfa yüklendiğinde çalışacak yapı
document.addEventListener("DOMContentLoaded", async () => {
  const cart = getFromLocalStorage();
  // console.log(window.location.pathname);
  //* Hangi sayfada olduğumuza karar verdik.
  if (window.location.pathname.includes("cart.html")) {
    // console.log(`Cart sayfası`);
    renderCartItems();
    displayCartTotal();
    updateCartIcon(cart);
  } else {
    updateCartIcon(cart);
    // console.log(`Html sayfası`);
    const product = await fetchProduct();
    //* Buradaki arrow function addToCartCallBack fonksiyonu oluyor
    renderProducts(product, (event) => addToCart(event, product));
  }
});
