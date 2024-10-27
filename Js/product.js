//* Veriyi API dan alan function
export const fetchProduct = async () => {
  try {
    //* API istek at
    const res = await fetch("db.json");
    //* Hata durumunu kontrol et
    if (!res.ok) {
      //* Hata varsa fırlat
      throw new Error(`URL Not Found 404 !!! `);
    }
    //* Hata yoksa veriyi console a yazdır.
    return await res.json();
    // console.log(data);
  } catch (error) {
    //* Hatayı yazdır.
    console.error(error);
    return [];
  }
};

//* Products render eden function
export const renderProducts = (product, addToCartCallBack) => {
  //* HTML den products listeleneceği kısmı seç
  const productList = document.querySelector("#product-list");
  //* Products ekrana yazdır.Map ile dönüyoruz HTML deki listi
  productList.innerHTML = product
    .map(
      (product) =>
        `
         <div class="product-box">
          <img
            class="product-image"
            src="${product.image}"
            alt="product-image"
            width="100"
          />

          <div class="product-info">
            <h2 class="product-name">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <button data-id="${product.id}" class="add-to-cart">Add To Cart</button>
          </div>
        </div>
    
    `
    )
    .join("");

  //* AddToCart buttonuna eriş
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  // console.log(addToCartButtons);
  //* Her bir addToCartButtons tıklanma olayı ekleniyor
  for (let i = 0; i < addToCartButtons.length; i++) {
    // console.log(`Button`);
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartCallBack);
  }
};
