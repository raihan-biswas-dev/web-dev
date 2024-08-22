// Name: Santoshi Lamichhane
// Student ID: 100915340

import ProductService from './product.service.js';

// const productService = new ProductService('https://inft2202.paclan.net', '66722d3b608702e538f81488', '100915349');
const productService = new ProductService('http://localhost:3000', '100915349'); // Updated host to local server

document.addEventListener('DOMContentLoaded', async function() {
    let productIdToDelete = ''; 
    let currentPage = 1;
    let perPage = 10;

    async function loadProducts(page, perPage) {
        const productList = document.getElementById('productList');
        const spinner = document.getElementById('spinner');
        
        // Show spinner
        if (spinner) {
            spinner.style.display = 'block';
        }
        if (productList) {
            productList.style.display = 'none';
        }
        
        try {
            const products = await productService.listProducts(page, perPage);
            console.log('Loaded products:', products);
            productList.innerHTML = '';
            if (products.length === 0) {
                productList.innerHTML = '<div class="col-12"><p class="text-white bg-dark">The shop is currently closed.</p></div>';
            } else {
                products.forEach(product => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4 mb-4';
                    const card = `
<div class="card shadow-lg bg-black text-white" style="width: 20rem;">
    <img src="./img/file_92a68f4803_original.jpg" class="card-img-top" alt="Product Image" style="height: 250px; object-fit: cover;">
    <div class="card-body">
        <h5 class="card-title text-white">${product.name}</h5>
        <p class="card-text text-white">Price: $${product.price.toFixed(2)}</p>
        <p class="card-text text-white">Quantity: ${product.stock}</p>
        <p class="card-text text-white">Description: ${product.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-success add-to-cart-btn" data-id="${product._id}">Add to cart</button>
            <button class="btn btn-primary edit-btn" data-id="${product._id}">Edit</button>
            <button class="btn btn-danger delete-btn" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" data-id="${product._id}">Delete</button>
        </div>
    </div>
</div>`;
                    col.innerHTML = card;
                    productList.appendChild(col);
                });
            }
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            // Hide spinner
            if (spinner) {
                spinner.style.display = 'none';
            }
            if (productList) {
                productList.style.display = 'flex';
            }
        }
    }

    document.getElementById('confirmDeleteBtn').addEventListener('click', async function() {
        try {
            await productService.deleteProduct(productIdToDelete);
            loadProducts(currentPage, perPage);
            console.log('Product deleted successfully');
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
        deleteModal.hide();
    });

    document.getElementById('perPage').addEventListener('change', function() {
        perPage = parseInt(this.value, 10);
        loadProducts(currentPage, perPage);
    });

    document.getElementById('productList').addEventListener('click', function(event) {
        if (event.target.matches('.delete-btn')) {
            productIdToDelete = event.target.getAttribute('data-id');
        }
        if (event.target.matches('.edit-btn')) {
            const productId = event.target.getAttribute('data-id');
            window.location.href = `add.html?id=${encodeURIComponent(productId)}`;
        }
    });

    loadProducts(currentPage, perPage);
});
