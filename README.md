<h1>Udemig-E-Commerce</h1>

This project is a modern shopping cart application where users can add products to a virtual cart and manage them. The application supports adding and removing products, updating quantities, and calculating the total price. It is developed entirely in JavaScript with Local Storage integration, ensuring that the cart status persists even if the page is reloaded.

<h2>Features</h2>

- Add and Remove Products: Products can be added to the cart by clicking the "Add to Cart" button. They can be removed from the cart on the cart page by clicking the "Remove" button.

- Update Quantity: Quantity input on the cart page allows users to adjust the quantity of products.

- Display Total Price: Shows the calculated total price of all items in the cart based on their quantities.

- Local Storage Integration: The cart data is stored in the browser’s Local Storage to maintain the cart’s state even after the page is reloaded.

- Dynamic Cart Icon: The cart icon updates dynamically to show the total quantity of products added.

<h2>Technologies Used</h2>

- HTML5: For the structure.

- CSS3 (Flexbox and Grid): For layout and responsive design.

- JavaScript (ES6+): For functionality and data management.

- Local Storage: For persistent cart data.

<h2>Functions and Structure/h2>

- addToCart: Adds a product to the cart. If the product is already in the cart, increases its quantity.

- removeButtons: Removes a specific product from the cart.

- renderCartItems: Renders cart items on the cart page dynamically.

- displayCartTotal: Calculates and displays the total price of items in the cart.

- saveToLocalStorage and getFromLocalStorage: Save the cart data to Local Storage and retrieve it from Local Storage.

- updateCartIcon: Updates the quantity displayed in the cart icon.
