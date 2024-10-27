//* LocalStorag a eleman kaydeden fuction

export function saveToLocalStorage(cart) {
  // * Localstorage a cart verisini kaydet
  localStorage.setItem("cart", JSON.stringify(cart));
}
//* LocalStorage dan verileri alan function

export const getFromLocalStorage = () => {
  //* LocalStorage dan verileri al ve JSON formatına çevir. Eğer veri yoksa boş dizi dönder.
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

//* Sepetteki product miktarını güncelle

export const updateCartIcon = (cart) => {
  // console.log(cart);i
  const cartIcon = document.querySelector("#cart-icon");
  const i = document.querySelector(".bx-shopping-bag");
  //* cart'ı reduce ile güncelledim. Bu function ile icon'u dinamik hale getirdim.
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  //* i'ye attribute ekleyerek (totalQauantity) sepetteki product miktarını güncelledim.
  i.setAttribute("data-quantity", totalQuantity);
};

export function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
