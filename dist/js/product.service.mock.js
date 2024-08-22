export function getProducts() {
    let products = localStorage.getItem('products');

    if (products) {
        products = JSON.parse(products);
    } else {
        products = [];
    }
    return products;
}

export function saveProduct(product) {
    let products = getProducts();
    if (products.find(p => p.name === product.name)) {
        return false; 
    } else {
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
}

export function findProduct(name) {
    let products = getProducts();
    let product = products.find(p => p.name === name);
    return product || null;
}

export function updateProduct(product) {
    let products = getProducts();
    let index = products.findIndex(p => p.name === product.name);

    if (index !== -1) {
        products[index] = product; 
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    } else {
        return false;
    }
}

export function deleteProduct(name) {
    let products = getProducts();
    let index = products.findIndex(p => p.name === name);

    if (index !== -1) {
        products.splice(index, 1); 
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    } else {
        return false;
    }
}

