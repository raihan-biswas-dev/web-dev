document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:9000/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    const productList = document.getElementById("productList");
    const spinner = document.getElementById("spinner");

    // Hide the spinner
    if (spinner) {
      spinner.style.display = "none";
    }

    if (productList) {
      productList.innerHTML = ""; // Clear any existing content
    }

    // Iterating over products and creating cards
    products.forEach((product) => {
      // Create column element
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      // Create card element
      const card = document.createElement("div");
      card.className = "card";
      card.style =
        "width: 20rem; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 10px; overflow: hidden; margin: 10px;";

      // Create img element
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = "./img/file_92a68f4803_original.jpg"; // Assuming a placeholder image
      img.alt = "Product Image";
      img.style = "width: 100%; height: 250px; object-fit: cover;";

      // Create card body element
      const cardBody = document.createElement("div");
      cardBody.style = "padding: 20px; background-color: #f8f9fa;";

      // Create card title element
      const cardTitle = document.createElement("h5");
      cardTitle.style = "margin-bottom: 15px; color: #333;";
      cardTitle.textContent = product.name;

      // Create card price element
      const cardPrice = document.createElement("p");
      cardPrice.style = "margin: 5px 0; color: #666;";
      cardPrice.textContent = `Price: $${product.price.toFixed(2)}`;

      // Create card stock element
      const cardStock = document.createElement("p");
      cardStock.style = "margin: 5px 0; color: #666;";
      cardStock.textContent = `Stock: ${product.stock}`;

      // Create card description element
      const cardDescription = document.createElement("p");
      cardDescription.style = "margin: 10px 0; color: #666;";
      cardDescription.textContent = product.description;

      // Create card buttons container
      const cardButtons = document.createElement("div");
      cardButtons.style =
        "display: flex; justify-content: space-between; margin-top: 20px;";

      // Create edit button element
      const editButton = document.createElement("button");
      editButton.style =
        "padding: 10px 15px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;";
      editButton.textContent = "Edit";
      editButton.setAttribute("data-id", product._id);
      editButton.setAttribute("class", "edit");

      // Create delete button element
      const deleteButton = document.createElement("button");
      deleteButton.style =
        "padding: 10px 15px; background-color: #dc3545; color: #fff; border: none; border-radius: 5px; cursor: pointer;";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("data-id", product._id);
      deleteButton.setAttribute("class", "delete_btn");

      // Append elements to their respective parents
      cardButtons.appendChild(editButton);
      cardButtons.appendChild(deleteButton);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardPrice);
      cardBody.appendChild(cardStock);
      cardBody.appendChild(cardDescription);
      cardBody.appendChild(cardButtons);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      productList.appendChild(col);
    });
  } catch (error) {
    console.error("Error:", error);
  }

  //   edit request
  document.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.getAttribute("data-id");
      console.log(`Product ID: ${productId}`);

      let modalContainer = document.querySelector(".editModalContainer");
      modalContainer.style.display = "block";

      // Set the hidden input value with product ID
      document.getElementById("productId").value = productId;

      document
        .getElementById("saveChangesBtn")
        .addEventListener("click", async () => {
          const productId = document.getElementById("productId").value;
          const updatedProduct = {
            name: document.getElementById("productName").value,
            price: parseFloat(document.getElementById("productPrice").value),
            stock: parseInt(document.getElementById("productStock").value),
            description: document.getElementById("productDescription").value,
          };

          try {
            const response = await fetch(
              `http://localhost:9000/update-product/${productId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to update product");
            }

            const result = await response.json();
            console.log("Product updated successfully:", result);

            // Close the modal
            document.querySelector(".editModalContainer").style.display =
              "none";

            // Optionally, update the UI to reflect the changes
            // updateUI(result);
          } catch (error) {
            console.error("Error:", error);
          }
        });
    });
  });

  // delete request
  document.querySelectorAll(".delete_btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.getAttribute("data-id");
      console.log(`Product to delete ID: ${productId}`);

      try {
        const response = await fetch(
          `http://localhost:9000/delete-product/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        const result = await response.json();
        console.log(result.message);

        // Optionally, remove the product's card from the UI
        event.target.closest(".col-md-4").remove();
      } catch (error) {
        console.error("Error:", error);
      }
    }); // <-- This parenthesis closes the forEach callback function
  });

  // close modal
  document.querySelectorAll(".modalCloseBtn").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      document.querySelector(".editModalContainer").style.display = "none";
    });
  });
});
