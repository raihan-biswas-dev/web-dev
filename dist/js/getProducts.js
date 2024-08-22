document.addEventListener("DOMContentLoaded", async () => {
  const productListElement = document.getElementById("productList");
  const spinner = document.getElementById("spinner");

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:9000/products");

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = await response.json();

      console.log(products);

      displayProducts(products);
    } catch (error) {
      console.error("Error:", error);
      showError("Error: Unable to fetch products. Please try again later.");
    } finally {
      spinner.style.display = "none"; // Hide the spinner once fetching is done
    }
  };

  // Function to display products in the HTML
  const displayProducts = (products) => {
    productListElement.innerHTML = ""; // Clear current content

    if (products.length === 0) {
      productListElement.innerHTML = `<div class="col-12"><p class="text-white text-center">No products found</p></div>`;
      return;
    }

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "col-md-4 mb-4";
      productCard.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Price: $${product.price}</p>
              <p class="card-text">Stock: ${product.stock}</p>
              <p class="card-text">${product.description}</p>
            </div>
          </div>`;
      productListElement.appendChild(productCard);
    });
  };

  // Function to show an error message
  const showError = (message) => {
    const errorMsg = document.getElementById("message");
    errorMsg.classList.remove("d-none", "alert-success");
    errorMsg.classList.add("alert-danger");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
  };

  // Fetch the products when the page loads
  fetchProducts();
});
