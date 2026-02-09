document.addEventListener('DOMContentLoaded', () => {
    initCookieConsent();
    initLoginCheck();
    updateCartCount();

    const API_URL = "http://localhost:3000/products";
    const shopGrid = document.getElementById('shop-grid');
    const searchInput = document.getElementById('shop-search');
    const categoryFilter = document.getElementById('category-filter');

    let products = [];

    function initLoginCheck() {
        const userLogin = getLoginCookie();
        if (userLogin) {
            const cookieBanner = document.getElementById('cookie-banner');
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
            addUserToNavbar(userLogin);
        }
    }

    // Cart helpers
    function getCart() {
        try {
            const raw = localStorage.getItem('cart');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const countEls = document.querySelectorAll('.cart-count');
        const cart = getCart();
        const total = cart.reduce((s, it) => s + (it.quantity || 1), 0);
        countEls.forEach(el => el.textContent = total);
    }

    function getLoginCookie() {
        const cookies = document.cookie.split(';');
        const userLogin = cookies.find(c => c.trim().startsWith('userLogin='));
        if (userLogin) {
            const cookieValue = userLogin.split('=')[1];
            try {
                return JSON.parse(decodeURIComponent(cookieValue));
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    function addUserToNavbar(user) {
        const nav = document.querySelector('.glass-nav');
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info-nav';
        userInfo.innerHTML = `
            <span class="user-name">Welcome, ${user.name}</span>
            <button id="logout-btn" class="btn-logout">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
        nav.appendChild(userInfo);
        
        document.getElementById('logout-btn').addEventListener('click', logout);
    }

    function logout() {
        document.cookie = 'userLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('user');
        window.location.href = 'auth.html';
    }

    function initCookieConsent() {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');

        const cookieConsent = localStorage.getItem('cookieConsent');
        if (cookieConsent) {
            cookieBanner.style.display = 'none';
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            localStorage.setItem('cookieDate', new Date().toISOString());
            cookieBanner.classList.add('slide-out');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
            console.log("Cookies accepted");
            trackUser();
        });

        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.add('slide-out');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 300);
            console.log("Cookies declined");
        });
    }

    function trackUser() {
        console.log("User tracking enabled");
    }

    async function initShop() {
        try {
            const response = await fetch(API_URL);
            products = await response.json();
            renderProducts(products);
            updateCartCount();
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

    document.addEventListener('click', (e) => {
        const target = e.target.closest('.cart-icon');
        if (target) {
            window.location.href = 'cart.html';
        }
    });

    initShop();
});

window.handleAddToCart = function(id) {
    (async () => {
        try {
            const API = "http://localhost:3000/products/" + id;
            const res = await fetch(API);
            if (!res.ok) throw new Error('Product fetch failed');
            const product = await res.json();

            const cart = (function get() { try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch (e) { return []; } })();
            const existing = cart.find(i => i.id === product.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            // update count UI
            const countEls = document.querySelectorAll('.cart-count');
            const total = cart.reduce((s, it) => s + (it.quantity || 1), 0);
            countEls.forEach(el => el.textContent = total);

            alert('Item added to cart!');
        } catch (err) {
            console.error('Add to cart failed', err);
            alert('Could not add item to cart');
        }
    })();
};