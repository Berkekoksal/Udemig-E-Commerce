import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getFromLocalStorage();
// console.log(cart);

export function addToCart(event, products) {
  //* Products id ye erişildi
  // console.log(parseInt(event.target.dataset.id));
  const productId = parseInt(event.target.dataset.id);
  //* Bu id ye sahip başka bir ürün var mı ?
  const product = products.find((product) => product.id === productId);
  // console.log(product);

  //* Eklenecek veri öncesinde Sepette varsa bunu yeni bir eleman olarak ekleme
  if (product) {
    //* Eğer product varsa bunu bul
    const exitingItem = cart.find((item) => item.id === productId);
    //* Product sepette varsa bunu ekleme
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      //* Eklenecek veriyi objeye çevir
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };

      cart.push(cartItem);
      //* Ekleme yapılan cart'ın içeriğini güncelle.
      event.target.textContent = "Added";
    }
    //* Sepeti localStorage'a kaydet ve UI'yi güncelle
    saveToLocalStorage(cart);
    updateCartIcon(cart);
    //* Sepeti tekrar render et ve güncellenen miktarı göster
    renderCartItems();
    displayCartTotal();
  }
}
//* Sepetten products silecek function
const removeButtons = (event) => {
  //* Silinecek elemanın id ' sine eriştik.
  // console.log(parseInt(event.target.dataset.id));
  const productID = parseInt(event.target.dataset.id);
  //* Tıklanılan product sepetten kaldır.
  cart = cart.filter((item) => item.id !== productID);
  //* LocalStorage'i güncellememiz lazım.
  saveToLocalStorage(cart);
  //* Sayfayı güncellememiz lazım.
  renderCartItems();
  //* Total miktarı hesapla
  displayCartTotal();
  //* Sepet iconu güncelledim.
  updateCartIcon(cart);
};

//* Sepetteki elemanları render edecek function

export const renderCartItems = () => {
  //* HTML de elemanların render edileceği kapsayıcıya eriş
  const cartItemsElement = document.querySelector("#cart-items");
  //* Sepetteki her bir eleman için cart item render et
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `
              <div class="cart-item">
               <img
                src="${item.image}"
                alt="cart-image"
               />
              <!--*  Product info  -->
              <div class="cart-item-info">
                <h2 class="cart-item-name">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id="${item.id}"
                />
              </div>
              <h2 class="cart-item-price">$ ${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
  `
    )
    .join("");

  //* Remove From Cart buttonuna eriş
  const removeFromCarts = document.querySelectorAll(".remove-from-cart");
  // console.log(removeFromCarts);
  for (let i = 0; i < removeFromCarts.length; i++) {
    const removeFromCart = removeFromCarts[i];
    removeFromCart.addEventListener("click", removeButtons);
  }
  //* Quantity inputlarına eriş
  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  // console.log(quantityInputs);
  for (let i = 0; i < quantityInputs.length; i++) {
    // console.log(quantityInputs);
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};
//* Inputlar değistiğinde çalışacak function
const onQuantityChange = (event) => {
  // console.log("fonk çalıştı", event.target.value);
  //* Number meetodu ile aynı görevi gören "+" metodu yaptım.
  const newQuantity = +event.target.value;
  //* Nesne yazdırır.
  // console.dir(event.target);
  //* Değişiklik yapılan products ın id'sini buldum.
  // console.log(event.target.dataset.id);
  const productId = +event.target.dataset.id;

  if (newQuantity > 0) {
    // console.log(productId);
    // console.log(cart);
    //* id'si bulunan elemanın bilgilerini bul
    const cartItem = cart.find((item) => item.id == productId);
    //* Eğer eleman sepette bulunmuyorsa.
    if (!cartItem) return;
    //* Product miktarı güncelle.
    cartItem.quantity = newQuantity;
    //* LocalStorage'e güncelle.
    saveToLocalStorage(cart);
    //* Sepet ikonunu güncelle.
    updateCartIcon(cart);
    //* Total fiyatı güncelle.
    displayCartTotal();
  }
};

export const displayCartTotal = () => {
  const cartTotalElement = document.getElementById("cartTotal");
  //* Eğer cartTotalElement yoksa fonksiyondan çık
  if (!cartTotalElement) return;
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `Total : $ ${total.toFixed(2)}`;
};
