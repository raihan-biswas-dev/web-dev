//new js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validate the form fields
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Collect form data
    const formData = {
      name: document.getElementById("productName").value,
      price: parseFloat(document.getElementById("productPrice").value),
      stock: parseInt(document.getElementById("productStock").value, 10),
      description: document.getElementById("productDescription").value,
    };

    try {
      // Send POST request with form data
      const response = await fetch("http://localhost:9000/create-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      console.log("product added");
      // Display success message
      document.getElementById("successMessage").classList.remove("d-none");
      form.reset();
      form.classList.remove("was-validated");
    } catch (error) {
      console.error("Error:", error);

      const message = document.getElementById("message");
      message.classList.remove("d-none", "alert-success");
      message.classList.add("alert-danger");
      message.textContent = "Error: Failed to create product";
    }
  });
});
