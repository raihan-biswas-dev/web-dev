//Name: Santoshi Lamichhane
//Student ID: 100915340

function Product(name, price, stock, description) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
}

Product.prototype.toString = function() {
    return `Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}, Description: ${this.description}`;
};


export default Product;