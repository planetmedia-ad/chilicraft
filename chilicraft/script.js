const menuData = {
    pizza: [
        {
            name: "ChiliCraft Supreme",
            price: "$18.99",
            description: "Spicy pepperoni, jalapeños, red chili flakes, premium mozzarella, craft sauce",
            image: "🍕",
            spicy: true
        },
        {
            name: "Margherita Classic",
            price: "$16.99",
            description: "Fresh basil, mozzarella, tomato sauce, extra virgin olive oil",
            image: "🍕",
            spicy: false
        },
        {
            name: "Meat Lovers Deluxe",
            price: "$21.99",
            description: "Pepperoni, sausage, bacon, ham, ground beef, mozzarella",
            image: "🍕",
            spicy: false
        },
        {
            name: "Veggie Garden",
            price: "$17.99",
            description: "Bell peppers, mushrooms, onions, olives, tomatoes, mozzarella",
            image: "🍕",
            spicy: false
        },
        {
            name: "BBQ Chicken Ranch",
            price: "$19.99",
            description: "Grilled chicken, BBQ sauce, red onions, cilantro, ranch drizzle",
            image: "🍕",
            spicy: false
        },
        {
            name: "Fire Devil",
            price: "$20.99",
            description: "Ghost pepper sauce, spicy sausage, habanero peppers, pepper jack cheese",
            image: "🍕",
            spicy: true
        }
    ],
    wings: [
        {
            name: "Buffalo Wings",
            price: "$12.99",
            description: "Classic buffalo sauce, celery, blue cheese dip (10 pieces)",
            image: "🍗",
            spicy: true
        },
        {
            name: "Honey Garlic",
            price: "$12.99",
            description: "Sweet honey glaze with roasted garlic (10 pieces)",
            image: "🍗",
            spicy: false
        },
        {
            name: "Nashville Hot",
            price: "$13.99",
            description: "Fiery Nashville-style coating, pickle chips (10 pieces)",
            image: "🍗",
            spicy: true
        },
        {
            name: "Lemon Pepper",
            price: "$12.99",
            description: "Zesty lemon pepper seasoning (10 pieces)",
            image: "🍗",
            spicy: false
        }
    ],
    drinks: [
        {
            name: "Craft Cola",
            price: "$2.99",
            description: "House-made cola with natural ingredients",
            image: "🥤",
            spicy: false
        },
        {
            name: "Spicy Ginger Beer",
            price: "$3.49",
            description: "Refreshing ginger beer with a kick",
            image: "🥤",
            spicy: true
        },
        {
            name: "Fresh Lemonade",
            price: "$2.79",
            description: "Freshly squeezed lemons, perfectly sweetened",
            image: "🥤",
            spicy: false
        },
        {
            name: "Iced Tea",
            price: "$2.49",
            description: "Brewed fresh daily, unsweetened or sweet",
            image: "🥤",
            spicy: false
        }
    ]
};

// Gallery Data
const galleryData = [
    {
        id: 1,
        title: "ChiliCraft Supreme",
        category: "pizza",
        emoji: "🍕",
        description: "Our signature pizza with the perfect spice blend"
    },
    {
        id: 2,
        title: "Fresh from the Oven",
        category: "kitchen",
        emoji: "🔥",
        description: "Hot and fresh pizzas straight from our wood-fired oven"
    },
    {
        id: 3,
        title: "Buffalo Wings",
        category: "wings",
        emoji: "🍗",
        description: "Crispy wings tossed in our signature buffalo sauce"
    },
    {
        id: 4,
        title: "Cozy Interior",
        category: "interior",
        emoji: "🏪",
        description: "Warm and welcoming atmosphere for dine-in guests"
    },
    {
        id: 5,
        title: "Margherita Classic",
        category: "pizza",
        emoji: "🍕",
        description: "Traditional Italian flavors with fresh basil"
    },
    {
        id: 6,
        title: "Pizza Preparation",
        category: "kitchen",
        emoji: "👨‍🍳",
        description: "Our skilled chefs hand-crafting each pizza"
    },
    {
        id: 7,
        title: "Meat Lovers Deluxe",
        category: "pizza",
        emoji: "🍕",
        description: "Loaded with premium meats and cheese"
    },
    {
        id: 8,
        title: "Dining Area",
        category: "interior",
        emoji: "🪑",
        description: "Comfortable seating for families and friends"
    },
    {
        id: 9,
        title: "Spicy Wings Variety",
        category: "wings",
        emoji: "🍗",
        description: "Multiple wing flavors from mild to fire"
    }
];

// Global variables
let currentMenuCategory = 'pizza';
let currentGalleryFilter = 'all';
let currentLightboxIndex = 0;
let filteredGalleryItems = [];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const pages = document.querySelectorAll('.page');
const orderPopup = document.getElementById('order-popup');
const lightbox = document.getElementById('lightbox');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initPopup();
    initMenu();
    initGallery();
    initLightbox();

    // Show home page by default
    showPage('home');
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
    });

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#order') {
                showOrderPopup();
            } else {
                const pageId = href.substring(1);
                showPage(pageId);
                updateActiveNavLink(this);
            }

            // Close mobile menu
            mobileMenu.classList.remove('active');
        });
    });
}

// Show specific page
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Popup functionality
function initPopup() {
    const popupClose = document.querySelector('.popup-close');
    const popupDismiss = document.querySelector('.popup-dismiss');

    // Show popup on first visit
    const hasVisited = localStorage.getItem('chili-craft-visited');
    if (!hasVisited) {
        setTimeout(() => {
            showOrderPopup();
        }, 1000);
        localStorage.setItem('chili-craft-visited', 'true');
    }

    // Close popup events
    popupClose.addEventListener('click', hideOrderPopup);
    popupDismiss.addEventListener('click', hideOrderPopup);

    // Close popup when clicking outside
    orderPopup.addEventListener('click', function (e) {
        if (e.target === orderPopup) {
            hideOrderPopup();
        }
    });
}

function showOrderPopup() {
    orderPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideOrderPopup() {
    orderPopup.classList.remove('active');
    document.body.style.overflow = 'unset';
}

// Menu functionality
function initMenu() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItemsContainer = document.getElementById('menu-items');

    // Tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            switchMenuCategory(category);

            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load initial menu items
    renderMenuItems();
}

function switchMenuCategory(category) {
    currentMenuCategory = category;
    renderMenuItems();
}

function renderMenuItems() {
    const menuItemsContainer = document.getElementById('menu-items');
    const items = menuData[currentMenuCategory];

    menuItemsContainer.innerHTML = '';

    items.forEach(item => {
        const menuItemHTML = `
            <div class="menu-item">
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <div class="menu-item-image">${item.image}</div>
                        ${item.spicy ? '<div class="spicy-badge">🌶️ SPICY</div>' : ''}
                    </div>
                    
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    
                    <div class="menu-item-footer">
                        <span class="menu-item-price">${item.price}</span>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        menuItemsContainer.innerHTML += menuItemHTML;
    });
}

// Gallery functionality
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            switchGalleryFilter(filter);

            // Update active filter
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Load initial gallery items
    renderGalleryItems();
}

function switchGalleryFilter(filter) {
    currentGalleryFilter = filter;
    renderGalleryItems();
}

function renderGalleryItems() {
    const galleryItemsContainer = document.getElementById('gallery-items');

    // Filter items
    filteredGalleryItems = currentGalleryFilter === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === currentGalleryFilter);

    galleryItemsContainer.innerHTML = '';

    filteredGalleryItems.forEach((item, index) => {
        const galleryItemHTML = `
            <div class="gallery-item" onclick="openLightbox(${index})">
                <div class="gallery-image">${item.emoji}</div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;

        galleryItemsContainer.innerHTML += galleryItemHTML;
    });
}

// Lightbox functionality
function initLightbox() {
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);

    // Navigation events
    lightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        navigateLightbox(-1);
    });

    lightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        navigateLightbox(1);
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'unset';
}

function navigateLightbox(direction) {
    const newIndex = currentLightboxIndex + direction;

    if (newIndex >= 0 && newIndex < filteredGalleryItems.length) {
        currentLightboxIndex = newIndex;
    } else if (newIndex < 0) {
        currentLightboxIndex = filteredGalleryItems.length - 1;
    } else {
        currentLightboxIndex = 0;
    }

    updateLightboxContent();
}

function updateLightboxContent() {
    const item = filteredGalleryItems[currentLightboxIndex];
    const lightboxEmoji = document.querySelector('.lightbox-emoji');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');

    lightboxEmoji.textContent = item.emoji;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
}

// Smooth scrolling for anchor links
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        const href = e.target.getAttribute('href');
        if (href !== '#order' && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Prevent body scroll when popups are open
function preventBodyScroll() {
    document.body.style.overflow = 'hidden';
}

function restoreBodyScroll() {
    document.body.style.overflow = 'unset';
}

// Handle window resize
window.addEventListener('resize', function () {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
    }
});

// Add click handlers for order buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cta-btn') ||
        e.target.classList.contains('order-pizza-btn') ||
        e.target.classList.contains('add-to-cart-btn')) {
        // Here you would typically handle the order process
        // For now, we'll just show an alert
        alert('Order functionality would be implemented here!');
    }
});

console.log('ChiliCraft Pizza website loaded successfully!');