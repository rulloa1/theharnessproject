/**
 * HARNESS Visual Toolkit - Gallery Initialization
 * Populates the toolkit galleries with resource cards
 */

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof toolkitResources !== 'undefined') {
        populateToolkitGalleries();
    } else {
        console.error('Toolkit data not loaded! Make sure toolkit-data.js is included first.');
    }
});

// Populate galleries from toolkit data
function populateToolkitGalleries() {
    const freeSamplesGrid = document.getElementById('freeSamplesGrid');
    const premiumToolkitGrid = document.getElementById('premiumToolkitGrid');

    // Populate free samples
    if (freeSamplesGrid && toolkitResources.freeSamples) {
        freeSamplesGrid.innerHTML = toolkitResources.freeSamples.map(resource =>
            createToolkitCard(resource, true)
        ).join('');
    }

    // Populate premium resources
    if (premiumToolkitGrid && toolkitResources.premiumResources) {
        premiumToolkitGrid.innerHTML = toolkitResources.premiumResources.map(resource =>
            createToolkitCard(resource, false)
        ).join('');
    }
}

// Create individual resource card HTML
function createToolkitCard(resource, isFree) {
    const badgeClass = isFree ? 'free' : 'premium';
    const badgeText = isFree ? '✅ FREE' : '👑 PREMIUM';

    // Use placeholder image if actual image not found
    const imageSrc = resource.image || 'https://via.placeholder.com/400x300/00BDBD/FFFFFF?text=HARNESS';

    return `
        <div class="gallery-item" data-category="${resource.category}">
            <div class="item-badge ${badgeClass}">${badgeText}</div>
            <div class="item-image">
                <img src="${imageSrc}" alt="${resource.title}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/400x300/00BDBD/FFFFFF?text=${encodeURIComponent(resource.title).replace(/%20/g, '+')}'">
            </div>
            <div class="item-content">
                <h3 class="item-title">${resource.title}</h3>
                <p class="item-description">${resource.description}</p>
                <div class="item-meta">
                    <span class="meta-tag"><i class="fas fa-tag"></i> ${resource.format}</span>
                    ${resource.printable ? '<span class="meta-tag"><i class="fas fa-print"></i> Print-Ready</span>' : ''}
                </div>
                <div class="item-actions">
                    ${isFree ? `
                        <button class="btn btn-secondary" onclick="window.open('index.html#library', '_blank')">
                            <i class="fas fa-eye"></i> View in App
                        </button>
                        <button class="btn btn-primary" onclick="alert('Download feature coming soon! For now, right-click the image and Save As.')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    ` : `
                        <button class="btn btn-secondary" onclick="alert('Preview available after purchase. Get the complete toolkit for $99.99!')">
                            <i class="fas fa-lock"></i> Locked
                        </button>
                        <button class="btn btn-primary" onclick="window.location.href='pricing.html#toolkit'">
                            <i class="fas fa-unlock"></i> Unlock ($99.99)
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;
}

// Make function globally available for manual testing
window.populateToolkitGalleries = populateToolkitGalleries;

/**
 * HARNESS Visual Toolkit - Interactive Gallery
 * Handles filtering, preview, download, and navigation
 */

// ===== INITIALIZE TOOLKIT ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    populateToolkitGalleries();
});

// ===== POPULATE GALLERIES FROM DATA =====
function populateToolkitGalleries() {
    const freeSamplesGrid = document.getElementById('freeSamplesGrid');
    const premiumToolkitGrid = document.getElementById('premiumToolkitGrid');

    if (!toolkitResources) {
        console.error('Toolkit data not loaded!');
        return;
    }

    // Populate free samples
    if (freeSamplesGrid && toolkitResources.freeSamples) {
        freeSamplesGrid.innerHTML = toolkitResources.freeSamples.map(resource =>
            createResourceCard(resource, true)
        ).join('');
    }

    // Populate premium resources
    if (premiumToolkitGrid && toolkitResources.premiumResources) {
        premiumToolkitGrid.innerHTML = toolkitResources.premiumResources.map(resource =>
            createResourceCard(resource, false)
        ).join('');
    }
}

function createResourceCard(resource, isFree) {
    const badgeClass = isFree ? 'free' : 'premium';
    const badgeText = isFree ? 'FREE' : 'PREMIUM';

    return `
        <div class="gallery-item" data-category="${resource.category}">
            <div class="item-badge ${badgeClass}">${badgeText}</div>
            <div class="item-image">
                <img src="${resource.image}" alt="${resource.title}" loading="lazy">
            </div>
            <div class="item-content">
                <h3>${resource.title}</h3>
                <p class="item-description">${resource.description}</p>
                <div class="item-meta">
                    <span class="meta-tag"><i class="fas fa-tag"></i> ${resource.format}</span>
                    ${resource.printable ? '<span class="meta-tag"><i class="fas fa-print"></i> Printable</span>' : ''}
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary" onclick="previewImage(this)">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                    ${isFree ? `
                        <button class="btn btn-primary" onclick="downloadImage(this)">
                            <i class="fas fa-download"></i> Download
                        </button>
                    ` : `
                        <a href="pricing.html#toolkit" class="btn btn-primary">
                            <i class="fas fa-unlock"></i> Unlock
                        </a>
                    `}
                </div>
            </div>
        </div>
    `;
}

// ===== NAVIGATION MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const footerHamburger = document.getElementById('footerHamburger');
const mobileFooterMenu = document.getElementById('mobileFooterMenu');
const closeFooterMenu = document.getElementById('closeFooterMenu');

// Header menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// Footer menu toggle
if (footerHamburger) {
    footerHamburger.addEventListener('click', () => {
        mobileFooterMenu.classList.add('active');
    });
}

if (closeFooterMenu) {
    closeFooterMenu.addEventListener('click', () => {
        mobileFooterMenu.classList.remove('active');
    });
}

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
    if (mobileFooterMenu && !mobileFooterMenu.contains(e.target) && e.target !== footerHamburger && !footerHamburger.contains(e.target)) {
        mobileFooterMenu.classList.remove('active');
    }
});

// ===== FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get the selected category
        const category = button.getAttribute('data-category');

        // Filter gallery items
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                // Add fade-in animation
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== IMAGE PREVIEW MODAL =====
const previewModal = document.getElementById('previewModal');
const previewImageElement = document.getElementById('previewImage');
let currentImageSrc = '';

function previewImage(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('.item-image img');
    currentImageSrc = img.src;

    previewImageElement.src = currentImageSrc;
    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closePreviewModal() {
    previewModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function downloadFromModal() {
    downloadImageFile(currentImageSrc);
}

// Close modal when clicking outside
previewModal?.addEventListener('click', (e) => {
    if (e.target === previewModal) {
        closePreviewModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewModal.classList.contains('active')) {
        closePreviewModal();
    }
});

// ===== DOWNLOAD FUNCTIONALITY =====
function downloadImage(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('.item-image img');
    const imageSrc = img.src;

    downloadImageFile(imageSrc);
}

function downloadImageFile(imageSrc) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageSrc;

    // Extract filename from URL or use default
    const filename = imageSrc.split('/').pop() || 'harness-toolkit-resource.jpg';
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show download notification
    showNotification('Download started! Check your downloads folder.');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notificationContainer');

    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 4000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        background: ${type === 'success' ? '#00B0BD' : '#DD0E6E'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
        min-width: 250px;
        font-weight: 500;
    `;

    notificationContainer.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificationContainer.removeChild(notification);

            // Remove container if empty
            if (notificationContainer.children.length === 0) {
                document.body.removeChild(notificationContainer);
            }
        }, 300);
    }, 3000);
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    observer.observe(item);
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
            transform: translateX(0);
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== DYNAMIC CONTENT LOADING =====
// This function will be called to populate the gallery with actual images
function loadToolkitGallery() {
    // Free samples grid
    const freeSamplesGrid = document.getElementById('freeSamplesGrid');
    if (freeSamplesGrid && toolkitResources.freeSamples.length > 0) {
        freeSamplesGrid.innerHTML = '';

        toolkitResources.freeSamples.forEach(resource => {
            const item = createGalleryItem(resource, true);
            freeSamplesGrid.appendChild(item);
        });
    }

    // Premium resources grid
    const premiumToolkitGrid = document.getElementById('premiumToolkitGrid');
    if (premiumToolkitGrid && toolkitResources.premiumResources.length > 0) {
        premiumToolkitGrid.innerHTML = '';

        toolkitResources.premiumResources.forEach(resource => {
            const item = createGalleryItem(resource, false);
            premiumToolkitGrid.appendChild(item);
        });
    }
}

function createGalleryItem(resource, isFree) {
    const item = document.createElement('div');
    item.className = `gallery-item ${isFree ? 'free-sample' : 'premium-locked'}`;
    item.setAttribute('data-category', resource.category);

    item.innerHTML = `
        <div class="item-badge ${isFree ? 'free' : 'premium'}">${isFree ? 'FREE' : 'PREMIUM'}</div>
        <div class="item-image ${isFree ? '' : 'locked'}">
            <img src="${resource.image}" alt="${resource.title}" loading="lazy">
            ${isFree ? `
                <div class="item-overlay">
                    <button class="btn-preview" onclick="previewImage(this)">
                        <i class="fas fa-search-plus"></i> Preview
                    </button>
                    <button class="btn-download" onclick="downloadImage(this)">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            ` : `
                <div class="locked-overlay">
                    <i class="fas fa-lock"></i>
                    <p>Unlock with Complete Toolkit</p>
                </div>
            `}
        </div>
        <div class="item-details">
            <h3>${resource.title}</h3>
            <p class="item-category">
                <i class="fas fa-tag"></i> 
                ${getCategoryName(resource.category)}
            </p>
            <p class="item-description">${resource.description}</p>
        </div>
    `;

    return item;
}

function getCategoryName(category) {
    const categoryNames = {
        'guides': 'SafER Sex Guides',
        'communication': 'Communication Tools',
        'risk': 'Risk Assessment',
        'posters': 'Educational Posters',
        'worksheets': 'Worksheets'
    };

    return categoryNames[category] || category;
}

// Load gallery with real content
loadToolkitGallery();

// Update category counts
Object.keys(categories).forEach(key => {
    const filterBtn = document.querySelector(`[data-category="${key}"]`);
    if (filterBtn && key !== 'all') {
        const count = categories[key].count;
        const currentText = filterBtn.textContent;
        if (!currentText.includes('(')) {
            filterBtn.innerHTML += ` <span style="opacity:0.7; font-size:0.9em;">(${count})</span>`;
        }
    }
});

// Helper function for modal creation
if (typeof createModal === 'undefined') {
    function createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        `;
        modal.innerHTML = `
            <div style="position: relative; max-width: 600px; width: 100%;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="position: absolute; top: -40px; right: 0; background: white; 
                        border: none; width: 36px; height: 36px; border-radius: 50%; 
                        cursor: pointer; font-size: 20px; z-index: 10001; 
                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);">✕</button>
                ${content}
            </div>
        `;
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        return modal;
    }
}
