// Product Data (Example)
let products = [
  { id: 1, name: "Product 1", price: 999, image: "images/product1.jpg" },
  { id: 2, name: "Product 2", price: 1499, image: "images/product2.jpg" },
  { id: 3, name: "Product 3", price: 2999, image: "images/product3.jpg" },
  // Add more products here
];

// Function to generate product cards
function renderProducts(productsToRender) {
  const productGrid = document.querySelector(".product-grid");
  productsToRender.forEach((product) => {
    const productCard = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productGrid.innerHTML += productCard;
  });
}

// Function to simulate loading more products
function loadMoreProducts() {
  const loading = document.getElementById("loading");
  loading.style.display = "block"; // Show loading spinner

  // Simulate a delay (e.g., fetching data from a server)
  setTimeout(() => {
    // Add more products to the list
    const newProducts = [
      { id: products.length + 1, name: `Product ${products.length + 1}`, price: 999, image: "https://via.placeholder.com/300" },
      { id: products.length + 2, name: `Product ${products.length + 2}`, price: 1499, image: "https://via.placeholder.com/300" },
      { id: products.length + 3, name: `Product ${products.length + 3}`, price: 2999, image: "https://via.placeholder.com/300" },
    ];
    products = [...products, ...newProducts]; // Add new products to the existing list
    renderProducts(newProducts); // Render the new products
    loading.style.display = "none"; // Hide loading spinner
  }, 1000); // Simulate a 1-second delay
}

// Infinite Scroll Logic
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadMoreProducts(); // Load more products when the user reaches the bottom
  }
});

// Function to handle "Add to Cart"
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  alert(`Added ${product.name} to cart!`);
}

// Razorpay Integration
document.getElementById('pay-button').onclick = function (e) {
  var options = {
    key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    amount: 1000, // Amount in paise (e.g., 1000 = ₹10)
    currency: 'INR',
    name: 'MNStore',
    description: 'Payment for Order #123',
    image: 'https://yourwebsite.com/logo.png', // Your store logo
    handler: function (response) {
      alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
      // Redirect to a success page or update order status
      window.location.href = "thank-you.html"; // Replace with your thank-you page
    },
    prefill: {
      name: 'Customer Name',
      email: 'customer@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Customer Address',
    },
    theme: {
      color: '#4a90e2', // Customize the payment button color
    },
  };

  var rzp = new Razorpay(options);
  rzp.open();
  e.preventDefault();
};

// Cash on Delivery Functionality
document.getElementById('cod-button').onclick = function (e) {
  if (confirm("Are you sure you want to proceed with Cash on Delivery?")) {
    alert("Order placed successfully! You will pay when your order is delivered.");
    // Redirect to a thank-you page or update order status
