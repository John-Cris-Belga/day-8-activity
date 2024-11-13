// Select elements
const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");
const productList = document.getElementById("product-list");

let cart = {};

// Function to add product to the cart
function addToCart(productName, productPrice) {
  if (cart[productName]) {
    cart[productName].quantity += 1;
  } else {
    cart[productName] = { price: productPrice, quantity: 1 };
  }
  updateCart();
}

// Function to remove product from the cart
function removeFromCart(productName) {
  delete cart[productName];
  updateCart();
}

// Function to update the cart UI and total
function updateCart() {
  cartItems.innerHTML = ""; // Clear existing cart items
  let total = 0;

  for (const productName in cart) {
    const cartItem = cart[productName];
    total += cartItem.price * cartItem.quantity;

    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>${productName} (x${cartItem.quantity}) - $${
      cartItem.price * cartItem.quantity
    }</span>
      <button class="btn btn-danger btn-sm remove-btn">Remove</button>
    `;

    li.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(productName);
    });

    cartItems.appendChild(li);
  }

  totalAmount.textContent = total.toFixed(2);
}

// Event listener for adding products to cart
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productItem = e.target.closest(".list-group-item");
    const productName = productItem
      .querySelector(".product-name")
      .textContent.trim();
    const productPrice = parseFloat(
      productItem
        .querySelector(".product-price")
        .textContent.replace("Price: $", "")
        .trim()
    );

    addToCart(productName, productPrice);
  }
});
