//Name: Santoshi Lamichhane
//Student ID: 100915340

import ProductService from './product.service.js';

// Creating a new object
const productService = new ProductService('http://localhost:3000', '100915349'); // Updated host to local server

// URL parameter to check if it is in the link to use it for edit or add form
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to set up edit form
async function setupEditForm(id) {
    try {
        // Populating the fields with the values inside it
        const product = await productService.findProduct(id);
        console.log('Product to edit:', product);
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('formHeading').innerText = 'Edit Product'; 

        // Disable the name field to prevent changes
        document.getElementById('productName').disabled = true;
    } catch (error) {
        console.error('Error finding product:', error);
    }
}

// Function to show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
    messageDiv.style.display = 'block';
}

// Function to validate the form
function validateForm(form) {
    let isValid = true;
    form.querySelectorAll('input, textarea').forEach((input) => {
        if (!input.checkValidity()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    return isValid;
}

// Function to check if a product with the same name already exists
async function productExists(name) {
    try {
        const products = await productService.listProducts(1, 1000); // Adjust perPage value as needed
        return products.some(product => product.name.toLowerCase() === name.toLowerCase()); // Updated to match new API structure
    } catch (error) {
        console.error('Error checking if product exists:', error);
        return false;
    }
}

// Add form
document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    if (!validateForm(form)) {
        return;
    }

    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productStock = parseInt(document.getElementById('productStock').value, 10);
    const productPrice = parseFloat(document.getElementById('productPrice').value);

    try {
        if (!productId) {
            // Check if product with the same name already exists
            const exists = await productExists(productName);
            if (exists) {
                showMessage('Product already exists', 'danger');
                return;
            }
        }

        const product = {
            name: productName,
            description: productDescription,
            stock: productStock,
            price: productPrice
        };

        if (productId) {
            const result = await productService.updateProduct(productId, product);
            console.log('Product updated:', result);
            showMessage('Product edited successfully', 'success');
        } else {
            const result = await productService.addProduct(product);
            console.log('Product added:', result);
            showMessage('Product added successfully', 'success');
        }
        window.location.href = 'list.html';
    } catch (error) {
        console.error(`Error ${productId ? 'updating' : 'adding'} product:`, error);
        showMessage(`Error ${productId ? 'updating' : 'adding'} product`, 'danger');
    }
});

if (productId) {
    setupEditForm(productId);
}