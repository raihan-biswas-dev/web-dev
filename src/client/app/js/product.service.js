// Constructor that takes parameters host and userId
// User ID is just to check if the product is posted by the user or not
function ProductService(host, userId) {
    this.host = host; 
    this.userId = parseInt(userId, 10); 
}

// Function used to list all the products from the API response cors enabled

ProductService.prototype.listProducts = async function(page, perPage) {
    try {
        const response = await fetch(`${this.host}/products?page=${page}&perPage=${perPage}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const products = await response.json();
        console.log('Loaded products:', products);
        return products;
    } catch (error) {
        console.error('Error listing products:', error);
        throw error; // Re-throw to handle it elsewhere if needed
    }
};


// Function used to find a specific product using product id as a parameter
ProductService.prototype.findProduct = async function(id) {
    const response = await fetch(`${this.host}/products/${id}`);
    const result = await response.json();
    console.log('findProduct response:', result);
    if (!response.ok) {
        throw new Error('Error finding product');
    }
    return result;
};

// Function to add a product into the database
ProductService.prototype.addProduct = async function(product) {
    const response = await fetch(`${this.host}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const result = await response.json();
    console.log('addProduct response:', result);
    if (!response.ok) {
        throw new Error('Error adding product');
    }
    return result;
};

// Function to update a product using id as a parameter
ProductService.prototype.updateProduct = async function(id, product) {
    
    
    const response = await fetch(`${this.host}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const result = await response.json();
    console.log('updateProduct response:', result);
    if (!response.ok) {
        throw new Error('Error updating product');
    }
    return result;
};

// Function to delete a product using id as a parameter
ProductService.prototype.deleteProduct = async function(id) {
    //check if this product exists
    const product = await this.findProduct(id);
    //delete the product
    const response = await fetch(`${this.host}/products/${id}`, {
        method: 'DELETE'
    });
    console.log('deleteProduct response status:', response.status);
    if (!response.ok) {
        throw new Error('Error deleting product');
    }
    return response;
};



export default ProductService;