// This will be used to store our cart items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
    updateCartCount();
}

function updateCartCount() {
    const cartLink = document.querySelector('nav ul li:last-child a');
    cartLink.textContent = `Cart (${cart.length})`;
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button></p>
            `;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        totalAmount.textContent = total.toFixed(2);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
}

// Call these functions when the page loads
updateCartCount();
displayCart();