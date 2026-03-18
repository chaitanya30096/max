const foodItems = [
    { name: "Double Cheese Burger", price: 249, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { name: "Pepperoni Pizza", price: 499, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
    { name: "Crispy Chicken Wings", price: 320, img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500" },
    { name: "Peri Peri Fries", price: 149, img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
    { name: "Hakka Noodles", price: 199, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" },
    { name: "Paneer Tikka Roll", price: 180, img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500" },
    { name: "Classic Cold Coffee", price: 150, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500" },
    { name: "Red Velvet Pastry", price: 120, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500" }
];

// Extend to 20 items with food-related images
const moreFoods = ["Sushi Box", "Taco Platter", "Garden Salad", "Butter Chicken", "Grilled Sandwich", "Iced Tea", "Pasta Alfredo", "Dim Sums", "Brownie Shake", "Club Sandwich", "Garlic Bread", "Momos"];
moreFoods.forEach((name, i) => {
    foodItems.push({
        name: name,
        price: Math.floor(Math.random() * 250) + 150,
        img: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&sig=${i}`
    });
});

let cart = [];

function enterHub() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    renderMenu();
}

function renderMenu() {
    const grid = document.getElementById('food-grid');
    grid.innerHTML = foodItems.map((item, index) => `
        <div class="food-card">
            <img src="${item.img}" class="food-img" alt="food">
            <div class="food-info">
                <div style="font-weight:600; font-size:0.85rem">${item.name}</div>
                <div style="color:var(--primary); font-weight:900">₹${item.price}</div>
            </div>
            <button class="add-btn" onclick="addToCart(${index})">+</button>
        </div>
    `).join('');
}

function addToCart(index) {
    cart.push(foodItems[index]);
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    document.getElementById('cart-sheet').classList.toggle('active');
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cart.map(i => `<div style="display:flex; justify-content:space-between; margin:10px 0"><span>${i.name}</span><span>₹${i.price}</span></div>`).join('');
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cart-total').innerText = `₹${total}`;
    document.getElementById('pay-amt').innerText = `₹${total}`;
}

document.getElementById('pay-trigger-btn').addEventListener('click', () => {
    if(cart.length === 0) return alert("Your bag is empty!");
    document.getElementById('payment-modal').classList.remove('hidden');
});

function closePayment() {
    document.getElementById('payment-modal').classList.add('hidden');
}

function finalizePayment() {
    const card = document.getElementById('card-num').value.replace(/\s/g, '');
    if(card.length < 16) return alert("Enter a valid 16-digit card number.");

    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('receipt-box').innerHTML = `
        <p><strong>Order ID:</strong> #MAX${Math.floor(Math.random()*9000)+1000}</p>
        <p><strong>Items:</strong> ${cart.length}</p>
        <p><strong>Paid:</strong> ₹${total}</p>
        <p><strong>Status:</strong> Card Payment Verified</p>
    `;

    document.getElementById('payment-modal').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
}

document.getElementById('card-num').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
});