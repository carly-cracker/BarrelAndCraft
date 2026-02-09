document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "http://localhost:3000/products";
    const shopGrid = document.getElementById('shop-grid');
    const searchInput = document.getElementById('shop-search');
    const categoryFilter = document.getElementById('category-filter');

    let products = [];

    // Fetch and Initialize
    async function initShop() {
        try {
            const response = await fetch(API_URL);
            products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error("Error loading products:", error);
            shopGrid.innerHTML = "<p>Failed to load products. Ensure json-server is running.</p>";
        }
    }

    function renderProducts(data) {
        shopGrid.innerHTML = data.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.price > 100 ? '<div class="product-badge">Premium</div>' : ''}
                    <div class="product-overlay">
                        <button class="btn-add-cart" onclick="handleAddToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-meta">
                        <span class="category">${product.category}</span>
                        <span class="origin">${product.origin}</span>
                    </div>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span class="rating-text">${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                </div>
            </div>
        `).join('');
    }

    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        return stars;
    }

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        const filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || p.category === category;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    initShop();
});

function handleAddToCart(id) {
    console.log(`Product ${id} added to session cart.`);
    alert("Item added to cart!");
}