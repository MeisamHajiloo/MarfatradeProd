// Request Manager for throttling API calls
class RequestManager {
  constructor() {
    this.activeRequests = new Map();
    this.requestQueue = [];
    this.maxConcurrent = 2;
    this.lastRequestTime = 0;
    this.minDelay = 200;
  }

  async fetch(url, options = {}) {
    // Add delay between requests
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minDelay) {
      await new Promise(resolve => setTimeout(resolve, this.minDelay - timeSinceLastRequest));
    }
    this.lastRequestTime = Date.now();

    // Cancel duplicate requests
    if (this.activeRequests.has(url)) {
      this.activeRequests.get(url).abort();
    }

    const controller = new AbortController();
    this.activeRequests.set(url, controller);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      this.activeRequests.delete(url);
      return response;
    } catch (error) {
      this.activeRequests.delete(url);
      if (error.name === 'AbortError') {
        throw new Error('Request cancelled');
      }
      throw error;
    }
  }
}

const requestManager = new RequestManager();
window.requestManager = requestManager;

// SPA Router and Application Core
if (!window.SPARouter) {
class SPARouter {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.isAuthenticated = false;
    this.userData = null;
    this.authChecked = false;
    this.navigationTimeout = null;
    this.isLoading = false;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Check auth status immediately when script loads
    this.checkAuthStatus().then(() => {
      // Handle route after auth check
      this.handleRoute();
      this.bindNavigation();
    });
    
    // Also check on DOM ready as fallback
    document.addEventListener('DOMContentLoaded', () => {
      if (!this.authChecked) {
        this.checkAuthStatus().then(() => {
          this.handleRoute();
          this.bindNavigation();
        });
      }
    });
  }

  addRoute(path, handler, requiresAuth = false) {
    this.routes[path] = { handler, requiresAuth };
  }

  navigate(path, pushState = true) {
    // Prevent navigation if already loading
    if (this.isLoading) {
      return;
    }
    
    // Clear any pending navigation
    if (this.navigationTimeout) {
      clearTimeout(this.navigationTimeout);
    }
    
    if (pushState) {
      history.pushState(null, '', path);
    }
    
    // Debounce rapid navigation
    this.navigationTimeout = setTimeout(() => {
      this.handleRoute();
    }, 100);
  }

  async handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path] || this.routes['/404'];
    
    if (route.requiresAuth && !this.isAuthenticated) {
      this.navigate('/');
      return;
    }

    this.currentRoute = path;
    this.updateActiveNavigation();
    this.isLoading = true;
    
    try {
      await route.handler();
    } catch (error) {
      console.error('Route handler error:', error);
      this.handleRouteError(error, path);
    } finally {
      this.isLoading = false;
    }
  }

  updateActiveNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      link.parentElement.classList.toggle('active', 
        href === this.currentRoute || (this.currentRoute === '/' && href === '/'));
    });
  }

  bindNavigation() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.hasAttribute('target')) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }

  async checkAuthStatus() {
    try {
      const response = await requestManager.fetch('api/auth/check.php');
      const data = await response.json();
      this.isAuthenticated = data.loggedIn;
      this.userData = data.user || null;
      this.authChecked = true;
      this.updateAuthUI();
    } catch (error) {
      if (error.message !== 'Request cancelled') {
        console.error('Auth check failed:', error);
      }
      this.authChecked = true;
    }
  }

  updateAuthUI() {
    const authLink = document.getElementById('auth-link');
    const desktopUserMenu = document.getElementById('desktop-user-menu');
    const mobileUserInfo = document.querySelector('.mobile-user-info-item');

    if (this.isAuthenticated && this.userData) {
      document.body.classList.add('user-logged-in');
      if (authLink) authLink.style.display = 'none';
      if (desktopUserMenu) desktopUserMenu.style.display = 'flex';
      if (mobileUserInfo) mobileUserInfo.style.display = 'block';
      
      if (typeof updateUserMenu === 'function') {
        updateUserMenu(this.userData);
      }
    } else {
      document.body.classList.remove('user-logged-in');
      if (authLink) authLink.style.display = 'block';
      if (desktopUserMenu) desktopUserMenu.style.display = 'none';
      if (mobileUserInfo) mobileUserInfo.style.display = 'none';
    }
  }

  showError(message) {
    if (typeof showNotification === 'function') {
      showNotification(message, 'warning');
    }
  }

  handleRouteError(error, path) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="error-page">
          <h2>Page Temporarily Unavailable</h2>
          <p>We're experiencing technical difficulties. Please try again later.</p>
          <button onclick="window.location.reload()" class="btn btn-primary">Retry</button>
        </div>
      `;
    }
    this.showError('Page loading failed');
  }
}

// View Components
class ViewManager {
  constructor() {
    this.mainContent = document.getElementById('main-content');
  }

  async loadView(viewName, data = {}) {
    if (!this.mainContent) return;
    
    // Show loading immediately
    this.mainContent.innerHTML = `
      <div class="loading-overlay">
        <div class="loading-spinner">
          <div class="loading-spinner-dot"></div>
          <div class="loading-spinner-dot"></div>
          <div class="loading-spinner-dot"></div>
          <div class="loading-spinner-dot"></div>
        </div>
      </div>
    `;
    
    try {
      // Add minimum loading delay to prevent rapid API calls
      const [viewContent] = await Promise.all([
        this.getViewContent(viewName, data),
        new Promise(resolve => setTimeout(resolve, 300))
      ]);
      
      this.mainContent.innerHTML = viewContent;
      await this.initializeViewScripts(viewName, data);
    } catch (error) {
      console.error(`Error loading view ${viewName}:`, error);
      this.mainContent.innerHTML = '<div class="error">Failed to load page</div>';
    }
  }

  async getViewContent(viewName, data) {
    switch (viewName) {
      case 'home':
        return await this.getHomeView(data);
      case 'products':
        return await this.getProductsView(data);
      case 'product':
        return await this.getProductView(data);
      case 'profile':
        return await this.getProfileView();
      case 'tickets':
        return await this.getTicketsView();
      case 'inquiries':
        return await this.getInquiriesView();
      case 'about':
        return this.getAboutView();
      case 'contact':
        return this.getContactView();
      case 'faq':
        return this.getFaqView();
      case 'sample-requests':
        return await this.getSampleRequestsView();
      default:
        return '<div class="error">Page not found</div>';
    }
  }

  async getHomeView(data) {
    const slides = data.slides || await this.getSlides();
    const counterHTML = await this.getCounterHTML();
    return `
      ${this.getSliderHTML(slides)}
      ${counterHTML}
    `;
  }

  async getProductsView(data) {
    return `
      <main class="products-page">
        <div id="products-toolbar" class="products-toolbar">
          <!-- Mobile Filter Toggle -->
          <button class="mobile-filter-toggle" id="toolbar-toggle">
            <i class="fas fa-filter"></i>
            <span>Filters</span>
          </button>
          
          <!-- Desktop Filters -->
          <div class="desktop-filters">
            <div class="filter-item">
              <div class="search-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input type="text" name="q" placeholder="Search products..." class="search-input">
              </div>
            </div>
            <div class="filter-item">
              <select id="category-filter" name="category">
                <option value="">All Categories</option>
              </select>
            </div>
            <div class="filter-item">
              <select id="sort-filter" name="sort">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
                <option value="price_asc">Price Low to High</option>
                <option value="price_desc">Price High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </div>
          
          <!-- View Switch -->
          <div class="view-switch">
            <button class="view-btn active" data-view="card">
              <i class="fas fa-th"></i>
            </button>
            <button class="view-btn" data-view="list">
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
        
        <!-- Mobile Filter Modal -->
        <div class="mobile-filter-drawer" id="mobile-filter-drawer">
          <div class="mobile-filter-content">
            <div class="drawer-content">
            <div class="filter-group">
              <div class="search-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input type="text" name="q-mobile" placeholder="Search products...">
              </div>
            </div>
            <div class="filter-group">
              <select id="category-filter-mobile" name="category">
                <option value="">All Categories</option>
              </select>
            </div>
            <div class="filter-group">
              <select id="sort-filter-mobile" name="sort">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name A-Z</option>
                <option value="name_desc">Name Z-A</option>
                <option value="price_asc">Price Low to High</option>
                <option value="price_desc">Price High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
            <div class="filter-group">
              <div class="mobile-view-switch">
                <button class="mobile-view-btn active" data-view="card">
                  <i class="fas fa-th"></i>
                  <span>Card View</span>
                </button>
                <button class="mobile-view-btn" data-view="list">
                  <i class="fas fa-list"></i>
                  <span>List View</span>
                </button>
              </div>
            </div>
            <div class="drawer-actions">
              <button class="btn-reset" id="reset-filters">Reset Filters</button>
            </div>
            </div>
          </div>
        </div>
        
        <div id="products-grid" class="card-view"></div>
        <div id="pagination"></div>
        <div id="toolbar-overlay"></div>
      </main>
    `;
  }

  async getProductView(data) {
    const slug = data.slug;
    if (!slug) return '<div class="error">Product not found</div>';
    
    try {
      const response = await requestManager.fetch(`api/products/detail.php?slug=${slug}`);
      if (!response.ok) {
        return '<div class="error">Product not available</div>';
      }
      const product = await response.json();
      
      if (!product || product.error) {
        return '<div class="error">Product not found</div>';
      }

      return `
        <main class="product-detail">
          <div class="page-container">
            <div class="product-container">
              <div class="product-gallery">
                <div class="main-image">
                  <img src="${product.thumbnail || 'assets/images/no-image.png'}" alt="${product.name}" id="main-product-image" onerror="this.src='assets/images/no-image.png'">
                  <div class="image-counter" id="image-counter">1 / 1</div>
                </div>
                ${product.gallery && product.gallery.length > 0 ? `
                  <div class="gallery-grid">
                    <div class="gallery-item active" onclick="showImage('${product.thumbnail || 'assets/images/no-image.png'}', 0)">
                      <img src="${product.thumbnail || 'assets/images/no-image.png'}" alt="${product.name}" onerror="this.src='assets/images/no-image.png'">
                    </div>
                    ${product.gallery.map((img, index) => `
                      <div class="gallery-item" onclick="showImage('${img}', ${index + 1})">
                        <img src="${img}" alt="${product.name}" onerror="this.src='assets/images/no-image.png'">
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price-section">
                  ${product.sale_price && product.sale_price > 0 && product.sale_price < product.price ? `
                    <div class="price-sale">$${product.sale_price}</div>
                    <div class="price-original">$${product.price}</div>
                    <div class="discount-info">
                      <span class="discount-badge-large">${Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF</span>
                      <span class="savings">You save $${(product.price - product.sale_price).toFixed(2)}</span>
                    </div>
                  ` : `
                    <div class="price">${product.price ? '$' + product.price : 'Price not available'}</div>
                  `}
                </div>
                <div class="product-details">
                  ${product.unit ? `<div class="detail-item"><strong>Unit:</strong> ${product.unit}</div>` : ''}
                  ${product.moq ? `<div class="detail-item"><strong>MOQ:</strong> ${product.moq}</div>` : ''}
                  ${product.monthly_supply_quantity ? `<div class="detail-item"><strong>Monthly Supply:</strong> ${product.monthly_supply_quantity}</div>` : ''}
                  ${product.payment_methods ? `<div class="detail-item"><strong>Payment Methods:</strong> ${product.payment_methods}</div>` : ''}
                </div>
                <div class="description">${product.description || 'No description available'}</div>
                <div class="actions">
                  <button class="btn btn-primary inquiry-btn" data-product="${product.name}" data-slug="${product.slug}">Inquiry</button>
                  <button class="btn btn-primary sample-request-btn" data-product-id="${product.id}">Request for Sample</button>
                </div>
              </div>
            </div>
            <div class="related-products-section">
              <h2>Related Products</h2>
              <div class="related-products-slider" id="related-products-slider">
                <div class="related-products-container" id="related-products-container">
                  <!-- Related products will be loaded here -->
                </div>
                <button class="slider-arrow prev" id="related-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="slider-arrow next" id="related-next"><i class="fas fa-chevron-right"></i></button>
              </div>
            </div>
          </div>
          
          <!-- Ticket Detail Modal -->
          <div id="ticket-detail-modal" class="modal" style="display: none;">
            <div class="modal-content">
              <div class="modal-header">
                <h2 id="ticket-detail-title">Ticket Details</h2>
                <span class="close" onclick="closeTicketDetailModal()">&times;</span>
              </div>
              <div class="modal-body ticket-detail-content" id="ticket-detail-body">
                <!-- Ticket details and replies will be loaded here -->
              </div>
              <div class="modal-footer">
                <form id="reply-form">
                  <div class="form-group">
                    <textarea id="reply-message" placeholder="Type your reply..." required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane"></i>
                    Send Reply
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      `;
    } catch (error) {
      return '<div class="error">Failed to load product</div>';
    }
  }

  async getProfileView() {
    return `
      <main>
        <div class="page-container">
          <div class="page-header">
            <h1>Profile</h1>
            <p>Manage your account information</p>
          </div>
          
          <div class="profile-layout">
            <div class="profile-sidebar">
              <nav class="profile-nav">
                <a href="/profile" class="profile-nav-item active">
                  <i class="fas fa-user"></i>
                  <span>Profile Settings</span>
                </a>
                <a href="/profile/inquiries" class="profile-nav-item">
                  <i class="fas fa-question-circle"></i>
                  <span>My Inquiries</span>
                </a>
                <a href="/sample-requests" class="profile-nav-item">
                  <i class="fas fa-vial"></i>
                  <span>Sample Requests</span>
                </a>
              </nav>
            </div>
            <div class="profile-content-area">
              <div class="profile-content">
            <div class="profile-card">
              <div class="profile-avatar-section">
                <div class="avatar-container">
                  <div class="profile-avatar" id="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                  </div>
                  <button class="delete-avatar-btn" id="delete-avatar-btn" style="display: none;">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button class="upload-btn" id="upload-btn">
                  <i class="fas fa-camera"></i>
                  Change Photo
                </button>
                <input type="file" id="avatar-upload" accept="image/*" style="display: none;">
              </div>
              
              <div class="profile-form-section">
                <form id="profile-form">
                  <div class="form-group">
                    <div class="input-wrapper">
                      <i class="fas fa-user input-icon"></i>
                      <input type="text" id="profile-name" name="name" placeholder="Enter your full name" required>
                      <label for="profile-name">Full Name</label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-wrapper">
                      <i class="fas fa-envelope input-icon"></i>
                      <input type="email" id="profile-email" name="email" placeholder="Your email address" readonly>
                      <label for="profile-email">Email Address</label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-wrapper">
                      <i class="fas fa-lock input-icon"></i>
                      <input type="password" id="current-password" name="current_password" placeholder="Enter current password">
                      <label for="current-password">Current Password</label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-wrapper">
                      <i class="fas fa-key input-icon"></i>
                      <input type="password" id="new-password" name="new_password" placeholder="Enter new password">
                      <label for="new-password">New Password</label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-wrapper">
                      <i class="fas fa-key input-icon"></i>
                      <input type="password" id="confirm-password" name="confirm_password" placeholder="Confirm new password">
                      <label for="confirm-password">Confirm New Password</label>
                    </div>
                  </div>
                  
                  <button type="submit" class="btn-primary">
                    <i class="fas fa-save"></i>
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  async getInquiriesView() {
    return `
      <main class="inquiries-page">
        <div class="page-container">
          <div class="page-header">
            <h1 style="color: white;">My Inquiries</h1>
            <p>View your product inquiries</p>
          </div>
          <div class="profile-layout">
            <div class="profile-sidebar">
              <nav class="profile-nav">
                <a href="/profile" class="profile-nav-item">
                  <i class="fas fa-user"></i>
                  <span>Profile Settings</span>
                </a>
                <a href="/profile/inquiries" class="profile-nav-item active">
                  <i class="fas fa-question-circle"></i>
                  <span>My Inquiries</span>
                </a>
                <a href="/sample-requests" class="profile-nav-item">
                  <i class="fas fa-vial"></i>
                  <span>Sample Requests</span>
                </a>
              </nav>
            </div>
            <div class="profile-content-area">
          <div class="inquiries-toolbar">
            <div class="toolbar-left"></div>
            <div class="group-selector">
              <select id="group-by">
                <option value="date">Group by Date</option>
                <option value="category">Group by Category</option>
                <option value="via">Group by Method</option>
              </select>
            </div>
          </div>
              <div id="inquiries-container" class="inquiries-container"></div>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  async getTicketsView() {
    return `
      <main class="tickets-page">
        <div class="page-container">
          <div class="page-header">
            <h1 style="color: white;">Support Tickets</h1>
          </div>
          <div class="tickets-toolbar">
            <div class="toolbar-left">
              <button class="btn btn-primary" id="new-ticket-btn">Create New Ticket</button>
            </div>
            <div class="group-selector">
              <label for="group-by">Group by:</label>
              <select id="group-by">
                <option value="status">Group by Status</option>
                <option value="priority">Group by Priority</option>
                <option value="date">Group by Date</option>
              </select>
            </div>
          </div>
          <div id="loading" class="loading-overlay" style="display: none;">
            <div class="loading-spinner">
              <div class="loading-spinner-dot"></div>
              <div class="loading-spinner-dot"></div>
              <div class="loading-spinner-dot"></div>
              <div class="loading-spinner-dot"></div>
            </div>
          </div>
          <div id="tickets-container" class="tickets-container"></div>
        </div>
        
        <!-- New Ticket Modal -->
        <div id="new-ticket-modal" class="modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-header">
              <h2>Create New Ticket</h2>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body">
              <form id="new-ticket-form">
                <div class="form-group">
                  <label for="ticket-subject">Subject</label>
                  <input type="text" id="ticket-subject" name="subject" maxlength="120" required>
                </div>
                <div class="form-group">
                  <label for="ticket-priority">Priority</label>
                  <select id="ticket-priority" name="priority" required>
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="ticket-message">Message</label>
                  <textarea id="ticket-message" name="message" rows="6" maxlength="2048" required></textarea>
                </div>
                <div class="form-actions">

                  <button type="submit" class="btn btn-primary">Create Ticket</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <!-- Ticket Detail Modal -->
        <div id="ticket-detail-modal" class="modal" style="display: none;">
          <div class="modal-content ticket-detail-modal">
            <div class="modal-header">
              <h2 id="ticket-detail-subject">Ticket Details</h2>
              <span class="close">&times;</span>
            </div>
            <div id="ticket-detail-content"></div>
          </div>
        </div>
      </main>
    `;
  }

  getAboutView() {
    return `
      <main class="about-page">
        <div class="page-container">
          <div class="page-header">
            <h1 style="color: white;">About Us</h1>
            <p>Learn more about Marfa Trade and our mission</p>
          </div>
          <div class="content-section">
            <div class="about-content">
              <div class="about-text">
                <h2>Our Story</h2>
                <p>Marfa Trade has been a leading provider of innovative solutions for businesses worldwide. Founded with a vision to transform the trading industry, we have consistently delivered excellence and reliability to our clients.</p>
                <h2>Our Mission</h2>
                <p>To provide cutting-edge trading solutions that empower businesses to achieve their goals while maintaining the highest standards of quality and customer service.</p>
                <h2>Our Values</h2>
                <ul>
                  <li><strong>Innovation:</strong> We continuously evolve to meet changing market demands</li>
                  <li><strong>Quality:</strong> We deliver only the best products and services</li>
                  <li><strong>Reliability:</strong> Our clients can count on us for consistent performance</li>
                  <li><strong>Customer Focus:</strong> Your success is our priority</li>
                </ul>
              </div>
              <div class="about-stats">
                <div class="stat-item">
                  <h3>14+</h3>
                  <p>Years of Experience</p>
                </div>
                <div class="stat-item">
                  <h3>26+</h3>
                  <p>Happy Buyers</p>
                </div>
                <div class="stat-item">
                  <h3>1000+</h3>
                  <p>Delivered Items</p>
                </div>
                <div class="stat-item">
                  <h3>7+</h3>
                  <p>Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  getContactView() {
    return `
      <main class="contact-page">
        <div class="page-container">
          <div class="page-header">
            <h1 style="color: white;">Contact Us</h1>
            <p>Get in touch with our team</p>
          </div>
          <div class="contact-content">
            <div class="contact-form">
              <h2>Send us a message</h2>
              <form id="contact-form">
                <div class="form-group">
                  <div class="input-wrapper">
                    <i class="fas fa-user input-icon"></i>
                    <input type="text" placeholder="Your Name" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-wrapper">
                    <i class="fas fa-envelope input-icon"></i>
                    <input type="email" placeholder="Your Email" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-wrapper">
                    <i class="fas fa-tag input-icon"></i>
                    <input type="text" placeholder="Subject" required>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-wrapper">
                    <i class="fas fa-comment input-icon"></i>
                    <textarea placeholder="Your Message" rows="6" required></textarea>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
              </form>
            </div>
            <div class="contact-info">
              <h2>Contact Information</h2>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <p>123 Business Street, City, Country</p>
              </div>
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <p>+1 234 567 8900</p>
              </div>
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <p>info@marfatrade.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  getFaqView() {
    return `
      <main class="faq-page">
        <div class="page-container">
          <div class="page-header">
            <h1 style="color: white;">FAQ</h1>
            <p>Frequently Asked Questions</p>
          </div>
          <div class="faq-content">
            <div class="faq-item">
              <div class="faq-question">
                <h3>What services does Marfa Trade offer?</h3>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>We offer comprehensive trading solutions including product sourcing, logistics, and business consulting services.</p>
              </div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>How can I place an order?</h3>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>You can place orders through our website, by contacting our sales team, or by visiting our office.</p>
              </div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>What are your payment methods?</h3>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>We accept various payment methods including bank transfers, credit cards, and digital payments.</p>
              </div>
            </div>
            <div class="faq-item">
              <div class="faq-question">
                <h3>Do you offer international shipping?</h3>
                <i class="fas fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>Yes, we provide international shipping services to most countries worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  async getSampleRequestsView() {
    return `
      <main class="sample-requests-page">
        <div class="page-container">
          <div class="page-header">
            <h1 style="color: white;">My Sample Requests</h1>
            <p>Track your sample requests and their status</p>
          </div>
          <div class="profile-layout">
            <div class="profile-sidebar">
              <nav class="profile-nav">
                <a href="/profile" class="profile-nav-item">
                  <i class="fas fa-user"></i>
                  <span>Profile Settings</span>
                </a>
                <a href="/profile/inquiries" class="profile-nav-item">
                  <i class="fas fa-question-circle"></i>
                  <span>My Inquiries</span>
                </a>
                <a href="/sample-requests" class="profile-nav-item active">
                  <i class="fas fa-vial"></i>
                  <span>Sample Requests</span>
                </a>
              </nav>
            </div>
            <div class="profile-content-area">
              <div class="sample-requests-toolbar">
                <div class="toolbar-left"></div>
                <div class="group-selector">
                  <select id="group-by">
                    <option value="date">Group by Date</option>
                    <option value="status">Group by Status</option>
                  </select>
                </div>
              </div>
              <div id="sample-requests-container" class="sample-requests-container"></div>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  async getSlides() {
    try {
      const response = await requestManager.fetch('api/slides.php');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const slides = await response.json();
      return slides && slides.length > 0 ? slides : [];
    } catch (error) {
      if (error.message !== 'Request cancelled') {
        console.error('Error loading slides:', error);
      }
      return [];
    }
  }

  getSliderHTML(slides) {
    // Use default slides if none from database
    if (!slides || slides.length === 0) {
      slides = [
        {
          title: 'Welcome to Marfa Trade',
          description: 'Your trusted partner in future trading solutions',
          image_url: 'assets/images/slide1.jpg',
          button_text: 'Get Started',
          button_link: '#'
        },
        {
          title: 'Advanced Trading Platform',
          description: 'Experience our cutting-edge trading technology',
          image_url: 'assets/images/slide2.jpg',
          button_text: 'Learn More',
          button_link: '#'
        },
        {
          title: 'Global Market Access',
          description: 'Trade across international markets with ease',
          image_url: 'assets/images/slide3.jpg',
          button_text: 'Explore Markets',
          button_link: '#'
        }
      ];
    }
    
    return `
      <section class="slider">
        <div class="slider-container">
          ${slides.map((slide, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.image_url}')">
              <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.description || ''}</p>
                ${slide.button_text ? `<a href="${slide.button_link || '#'}" class="btn btn-primary">${slide.button_text}</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        <button class="slider-arrow prev" id="slider-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="slider-arrow next" id="slider-next"><i class="fas fa-chevron-right"></i></button>
        <div class="slider-nav">
          ${slides.map((_, index) => `
            <button class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
          `).join('')}
        </div>
      </section>
    `;
  }

  async getCounterHTML() {
    try {
      const response = await requestManager.fetch('api/counters.php');
      let counters = [];
      
      if (response.ok) {
        counters = await response.json();
      }
      
      // Use default counters if API fails or returns empty
      if (!counters || counters.length === 0) {
        counters = [
          { title: 'Our Customers', count: 5, icon: 'fas fa-users' },
          { title: 'Products', count: 1480, icon: 'fas fa-box' },
          { title: 'Inquiries', count: 205321, icon: 'fas fa-question-circle' }
        ];
      }
      
      return `
        <section class="counter-section">
          <div class="counter-container">
            ${counters.map(counter => `
              <div class="counter-item">
                <div class="counter-icon">
                  <i class="${counter.icon}"></i>
                </div>
                <div class="counter-number" data-target="${counter.count}">0</div>
                <div class="counter-title">${counter.title}</div>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    } catch (error) {
      console.error('Error loading counters:', error);
      // Return default counters on error
      return `
        <section class="counter-section">
          <div class="counter-container">
            <div class="counter-item">
              <div class="counter-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="counter-number" data-target="5">0</div>
              <div class="counter-title">Our Customers</div>
            </div>
            <div class="counter-item">
              <div class="counter-icon">
                <i class="fas fa-box"></i>
              </div>
              <div class="counter-number" data-target="1480">0</div>
              <div class="counter-title">Products</div>
            </div>
            <div class="counter-item">
              <div class="counter-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="counter-number" data-target="205321">0</div>
              <div class="counter-title">Inquiries</div>
            </div>
          </div>
        </section>
      `;
    }
  }



  async initializeViewScripts(viewName, data) {
    switch (viewName) {
      case 'home':
        this.initSlider();
        this.initCounter();
        break;
      case 'products':
        await this.initProducts(data);
        break;
      case 'product':
        this.initProductDetail(data);
        break;
      case 'profile':
        this.initProfile();
        break;
      case 'tickets':
        this.initTickets();
        break;
      case 'inquiries':
        this.initInquiries();
        break;
      case 'contact':
        this.initContact();
        break;
      case 'faq':
        this.initFaq();
        break;
      case 'sample-requests':
        this.initSampleRequests();
        break;
    }
  }

  initSlider() {
    // Wait for DOM to be ready, then initialize slider
    setTimeout(() => {
      initializeSlider();
    }, 200);
  }

  initCounter() {
    if (typeof initializeCounter === 'function') {
      initializeCounter();
    }
  }

  async initProducts(data) {
    // Show loading for products
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
      productsGrid.innerHTML = `
        <div class="loading-overlay">
          <div class="loading-spinner">
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
          </div>
        </div>
      `;
    }

    // Load products script if not already loaded
    if (!window.productsLoaded) {
      await this.loadScript('assets/js/products.js');
      window.productsLoaded = true;
    }
    
    // Add delay before initializing
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Initialize products functionality
    setTimeout(() => {
      if (window.initializeProducts) {
        window.initializeProducts();
      }
      
      if (data.category) {
        setTimeout(() => {
          const categorySelect = document.getElementById('category-filter');
          if (categorySelect) {
            categorySelect.value = data.category;
            categorySelect.dispatchEvent(new Event('change'));
          }
        }, 400);
      }
    }, 100);
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  initProductDetail(data) {
    // Initialize inquiry buttons
    const inquiryBtns = document.querySelectorAll('.inquiry-btn');
    inquiryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (typeof window.openInquiryModal === 'function') {
          window.openInquiryModal(this.dataset.product, this.dataset.slug);
        }
      });
    });
    
    // Initialize sample request buttons
    const sampleBtns = document.querySelectorAll('.sample-request-btn');
    sampleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        if (window.openSampleRequestModal) {
          window.openSampleRequestModal(this.dataset.productId);
        }
      });
    });
    
    // Initialize gallery
    this.initGallery();
    
    // Load related products - get category_id from the fetched product data
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    this.loadRelatedProductsBySlug(slug);
  }
  
  initGallery() {
    window.showImage = (src, index) => {
      const mainImg = document.getElementById('main-product-image');
      const counter = document.getElementById('image-counter');
      const galleryItems = document.querySelectorAll('.gallery-item');
      
      if (mainImg) mainImg.src = src;
      
      galleryItems.forEach(item => item.classList.remove('active'));
      if (galleryItems[index]) galleryItems[index].classList.add('active');
      
      if (counter) {
        const total = galleryItems.length;
        counter.textContent = `${index + 1} / ${total}`;
      }
    };
  }

  async loadRelatedProductsBySlug(currentSlug) {
    try {
      // First get the current product to get its category_id
      const productResponse = await requestManager.fetch(`api/products/detail.php?slug=${currentSlug}`);
      if (!productResponse.ok) {
        document.querySelector('.related-products-section').style.display = 'none';
        return;
      }
      const product = await productResponse.json();
      
      if (product && product.category && product.category.id) {
        // Then get products from the same category
        const categoryUrl = `api/products/list.php?category=${product.category.id}&per_page=9`;
        
        const response = await requestManager.fetch(categoryUrl);
        if (!response.ok) {
          document.querySelector('.related-products-section').style.display = 'none';
          return;
        }
        const data = await response.json();
        
        console.log('Related products response:', data);
        
        if (data.data && data.data.length > 0) {
          console.log('Found', data.data.length, 'products in category');
          
          // Filter out the current product
          const relatedProducts = data.data.filter(p => p.slug !== currentSlug);
          console.log('Related products after filtering:', relatedProducts.length);
          
          if (relatedProducts.length > 0) {
            this.renderRelatedProducts(relatedProducts.slice(0, 8));
          } else {
            console.log('No related products after filtering');
            const relatedSection = document.querySelector('.related-products-section');
            if (relatedSection) relatedSection.style.display = 'none';
          }
        } else {
          console.log('No products found in category');
          document.querySelector('.related-products-section').style.display = 'none';
        }
      } else {
        console.log('No product or category_id found');
        document.querySelector('.related-products-section').style.display = 'none';
      }
    } catch (error) {
      console.error('Error loading related products:', error);
      document.querySelector('.related-products-section').style.display = 'none';
    }
  }

  renderRelatedProducts(products) {
    const container = document.getElementById('related-products-container');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
      <div class="related-product-item${product.status === 'out_of_stock' ? ' out-of-stock' : ''}">
        ${product.sale_price && product.sale_price > 0 && product.sale_price < product.price && product.status !== 'out_of_stock' ? `
          <div class="discount-badge">${Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF</div>
        ` : ''}
        <${product.status === 'out_of_stock' ? 'div' : 'a href="/product?slug=' + product.slug + '" onclick="window.scrollTo(0, 0);"'}>
          <img src="${product.thumbnail || 'assets/images/no-image.png'}" alt="${product.name}" onerror="this.src='assets/images/no-image.png'">
          <h4>${product.name}</h4>
          <div class="price-container">
            ${product.sale_price && product.sale_price > 0 && product.sale_price < product.price && product.status !== 'out_of_stock' ? `
              <div class="price-sale">${product.sale_price} $</div>
              <div class="price-original">${product.price} $</div>
            ` : `
              <div class="price">${product.price ? product.price + ' $' : 'Price not available'}</div>
            `}
          </div>
        </${product.status === 'out_of_stock' ? 'div' : 'a'}>
      </div>
    `).join('');
    
    // Trigger slider initialization after rendering
    setTimeout(() => {
      this.initRelatedProductsSlider();
    }, 100);
  }

  initRelatedProductsSlider() {
    const container = document.getElementById('related-products-container');
    const prevBtn = document.getElementById('related-prev');
    const nextBtn = document.getElementById('related-next');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    const calculateSliderParams = () => {
      const itemWidth = 250;
      const sliderElement = container.parentElement;
      const containerWidth = sliderElement.offsetWidth;
      const availableWidth = containerWidth - (containerWidth > 768 ? 100 : 20); // Less padding on mobile
      const visibleItems = Math.max(1, Math.floor(availableWidth / itemWidth));
      const totalItems = container.children.length;
      const maxIndex = Math.max(0, totalItems - visibleItems);
      
      return { itemWidth, visibleItems, totalItems, maxIndex };
    };
    
    const updateArrowVisibility = () => {
      const { totalItems, visibleItems, maxIndex } = calculateSliderParams();
      const relatedSection = document.querySelector('.related-products-section');
      
      // Force hide arrows with important override
      prevBtn.style.setProperty('display', 'none', 'important');
      nextBtn.style.setProperty('display', 'none', 'important');
      
      // Hide entire section if no products
      if (totalItems === 0) {
        if (relatedSection) relatedSection.style.display = 'none';
        return;
      }
      
      // Show section
      if (relatedSection) relatedSection.style.display = 'block';
      
      // Only show arrows if scrolling is needed
      if (totalItems > visibleItems && maxIndex > 0) {
        prevBtn.style.setProperty('display', 'block', 'important');
        nextBtn.style.setProperty('display', 'block', 'important');
      }
    };
    
    // Update arrow states
    const updateArrowStates = () => {
      const { maxIndex, totalItems, visibleItems } = calculateSliderParams();
      const isMobile = window.innerWidth <= 768;
      
      // Hide arrows completely if no sliding is needed
      if (totalItems <= visibleItems || maxIndex === 0) {
        prevBtn.style.setProperty('display', 'none', 'important');
        nextBtn.style.setProperty('display', 'none', 'important');
        return;
      }
      
      // Show arrows and update their states
      prevBtn.style.setProperty('display', 'block', 'important');
      nextBtn.style.setProperty('display', 'block', 'important');
      
      // Adjust arrow size for mobile
      if (isMobile) {
        prevBtn.style.width = '35px';
        prevBtn.style.height = '35px';
        nextBtn.style.width = '35px';
        nextBtn.style.height = '35px';
        prevBtn.style.left = '5px';
        nextBtn.style.right = '5px';
      } else {
        prevBtn.style.width = '40px';
        prevBtn.style.height = '40px';
        nextBtn.style.width = '40px';
        nextBtn.style.height = '40px';
        prevBtn.style.left = '10px';
        nextBtn.style.right = '10px';
      }
      
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
      nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    };
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        const { itemWidth } = calculateSliderParams();
        currentIndex = Math.max(0, currentIndex - 1);
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        updateArrowStates();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      const { itemWidth, maxIndex } = calculateSliderParams();
      if (currentIndex < maxIndex) {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        updateArrowStates();
      }
    });
    
    // Handle window resize
    const handleResize = () => {
      const { maxIndex } = calculateSliderParams();
      // Reset position if current index is beyond new max
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
        const { itemWidth } = calculateSliderParams();
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      }
      updateArrowVisibility();
      updateArrowStates();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Touch support for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let initialTransform = 0;
    
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      isDragging = true;
      const { itemWidth } = calculateSliderParams();
      initialTransform = -currentIndex * itemWidth;
      container.style.transition = 'none';
    });
    
    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      const newTransform = initialTransform + diff;
      container.style.transform = `translateX(${newTransform}px)`;
    });
    
    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      container.style.transition = 'transform 0.3s ease';
      const diff = startX - currentX;
      const { itemWidth, maxIndex } = calculateSliderParams();
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < maxIndex) {
          currentIndex++;
        } else if (diff < 0 && currentIndex > 0) {
          currentIndex--;
        }
      }
      
      container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      updateArrowStates();
    });
    
    // Force hide arrows by default
    prevBtn.style.setProperty('display', 'none', 'important');
    nextBtn.style.setProperty('display', 'none', 'important');
    
    // Initial setup
    updateArrowVisibility();
    updateArrowStates();
  }

  initProfile() {
    // Initialize profile functionality
    setTimeout(() => {
      if (typeof loadUserProfile === 'function') {
        loadUserProfile();
      }
      
      const uploadBtn = document.getElementById('upload-btn');
      const avatarUpload = document.getElementById('avatar-upload');
      const deleteAvatarBtn = document.getElementById('delete-avatar-btn');
      const profileForm = document.getElementById('profile-form');
      
      if (uploadBtn && avatarUpload) {
        uploadBtn.addEventListener('click', () => avatarUpload.click());
        avatarUpload.addEventListener('change', function(e) {
          if (e.target.files[0] && typeof uploadProfilePicture === 'function') {
            uploadProfilePicture(e.target.files[0]);
          }
        });
      }
      
      if (deleteAvatarBtn && typeof deleteProfilePicture === 'function') {
        deleteAvatarBtn.addEventListener('click', function() {
          if (typeof showConfirmNotification === 'function') {
            showConfirmNotification('Remove profile picture?', deleteProfilePicture);
          }
        });
      }
      
      if (profileForm && typeof updateProfile === 'function') {
        profileForm.addEventListener('submit', function(e) {
          e.preventDefault();
          updateProfile();
        });
      }
    }, 100);
  }

  initInquiries() {
    // Show loading for inquiries
    const container = document.getElementById('inquiries-container');
    if (container) {
      container.innerHTML = `
        <div class="loading-overlay">
          <div class="loading-spinner">
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
          </div>
        </div>
      `;
    }

    this.currentGrouping = 'date';
    // Add delay before loading inquiries
    setTimeout(() => {
      this.loadInquiries();
    }, 300);
    
    const groupBy = document.getElementById('group-by');
    if (groupBy) {
      groupBy.addEventListener('change', () => {
        this.currentGrouping = groupBy.value;
        this.renderInquiries(this.inquiriesData, groupBy.value);
      });
    }
    
    // Add event delegation for delete buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.delete-inquiry-btn')) {
        const btn = e.target.closest('.delete-inquiry-btn');
        const inquiryId = btn.dataset.id;
        this.showDeleteConfirmation(inquiryId);
      }
    });
  }

  async loadInquiries(autoRender = true) {
    try {
      const response = await requestManager.fetch('/api/profile/inquiries.php');
      if (!response.ok) {
        document.getElementById('inquiries-container').innerHTML = '<div class="error">Service temporarily unavailable</div>';
        return;
      }
      const data = await response.json();
      
      if (data.success) {
        this.inquiriesData = data.inquiries;
        if (autoRender) {
          this.renderInquiries(data.inquiries, 'date');
        }
      } else {
        document.getElementById('inquiries-container').innerHTML = '<div class="error">Failed to load inquiries</div>';
      }
    } catch (error) {
      document.getElementById('inquiries-container').innerHTML = '<div class="error">Service temporarily unavailable</div>';
    }
  }

  renderInquiries(inquiries, groupBy = 'date') {
    const container = document.getElementById('inquiries-container');
    if (!inquiries || inquiries.length === 0) {
      container.innerHTML = '<div class="no-data">No inquiries found</div>';
      return;
    }
    
    const grouped = this.groupInquiries(inquiries, groupBy);
    
    container.innerHTML = `<div class="grouped-container">${Object.entries(grouped).map(([group, items]) => `
      <div class="group-section">
        <div class="group-header" onclick="this.parentElement.classList.toggle('collapsed')">
          <h3 class="group-title">${group}</h3>
          <i class="fas fa-chevron-down group-toggle"></i>
        </div>
        <div class="group-content">
          <div class="group-items">
            ${items.map(inquiry => `
              <div class="group-item inquiry-item">
                <div class="inquiry-product">
                  <a href="/product?slug=${inquiry.product_slug}" class="product-link">
                    <img src="${inquiry.thumbnail ? '/' + inquiry.thumbnail : '/assets/images/no-image.png'}" alt="${inquiry.product_name}" onerror="this.src='/assets/images/no-image.png'">
                  </a>
                  <div class="inquiry-details">
                    <a href="/product?slug=${inquiry.product_slug}" class="product-title-link">
                      <h4>${inquiry.product_name}</h4>
                    </a>
                    <div class="inquiry-meta">
                      ${groupBy !== 'via' ? `<span class="inquiry-via">${inquiry.inquiry_via}</span>` : ''}
                      ${groupBy !== 'category' && inquiry.category_name ? `<span class="inquiry-category">${inquiry.category_name}</span>` : ''}
                      ${groupBy !== 'date' ? `<span class="inquiry-date">${new Date(inquiry.inquiry_date).toLocaleDateString()}</span>` : ''}
                    </div>
                    ${inquiry.situation ? `<div class="inquiry-situation">${inquiry.situation}</div>` : ''}
                  </div>
                </div>
                <div class="inquiry-actions">
                  <button class="delete-inquiry-btn" data-id="${inquiry.id}" title="Delete inquiry">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('')}</div>`;
  }
  
  groupInquiries(inquiries, groupBy) {
    const groups = {};
    
    inquiries.forEach(inquiry => {
      let key;
      switch (groupBy) {
        case 'category':
          key = inquiry.category_name || 'Uncategorized';
          break;
        case 'via':
          key = inquiry.inquiry_via.charAt(0).toUpperCase() + inquiry.inquiry_via.slice(1);
          break;
        case 'date':
        default:
          const date = new Date(inquiry.inquiry_date);
          key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          break;
      }
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(inquiry);
    });
    
    return groups;
  }
  
  showDeleteConfirmation(inquiryId) {
    const modal = document.createElement('div');
    modal.className = 'delete-confirmation-modal';
    modal.innerHTML = `
      <div class="delete-confirmation-content">
        <h3>Delete Inquiry</h3>
        <p>Are you sure you want to delete this inquiry?</p>
        <div class="delete-confirmation-actions">
          <button class="btn btn-secondary cancel-btn">No</button>
          <button class="btn btn-danger confirm-btn">Yes</button>
        </div>
      </div>
    `;
    
    const cancelBtn = modal.querySelector('.cancel-btn');
    const confirmBtn = modal.querySelector('.confirm-btn');
    
    cancelBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      modal.remove();
    });
    
    confirmBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteInquiry(inquiryId);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    document.body.appendChild(modal);
  }
  
  async deleteInquiry(inquiryId) {
    try {
      const response = await requestManager.fetch('/api/profile/delete-inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry_id: inquiryId })
      });
      
      const data = await response.json();
      if (data.success) {
        document.querySelector('.delete-confirmation-modal').remove();
        this.loadInquiries(false).then(() => {
          this.renderInquiries(this.inquiriesData, this.currentGrouping);
          const groupBy = document.getElementById('group-by');
          if (groupBy) groupBy.value = this.currentGrouping;
        });
      } else {
        alert('Failed to delete inquiry');
      }
    } catch (error) {
      alert('Error deleting inquiry');
    }
  }

  initTickets() {
    // Load tickets script if not already loaded
    if (!window.ticketsLoaded) {
      this.loadScript('assets/js/tickets.js').then(() => {
        // Initialize tickets after script loads
        setTimeout(() => {
          if (window.initializeTickets) {
            window.initializeTickets();
          }
        }, 100);
      });
      window.ticketsLoaded = true;
    } else {
      // Script already loaded, just initialize
      setTimeout(() => {
        if (window.initializeTickets) {
          window.initializeTickets();
        }
      }, 100);
    }
    
    // Add global functions for ticket detail modal
    window.openTicketDetail = this.openTicketDetail.bind(this);
    window.closeTicketDetailModal = this.closeTicketDetailModal.bind(this);
  }
  
  openTicketDetail(ticketId) {
    // Load ticket details and show modal
    requestManager.fetch(`api/tickets/detail.php?id=${ticketId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.displayTicketDetail(data.ticket);
        }
      })
      .catch(error => {
        if (error.message !== 'Request cancelled') {
          console.error('Error loading ticket:', error);
        }
      });
  }
  
  displayTicketDetail(ticket) {
    const modal = document.getElementById('ticket-detail-modal');
    const subject = document.getElementById('ticket-detail-subject');
    const content = document.getElementById('ticket-detail-content');
    
    subject.textContent = `#${ticket.id} - ${ticket.subject}`;
    
    // Display ticket content with fixed height and scroll
    content.innerHTML = `
      <div class="modal-body ticket-detail-content">
        <div class="ticket-header">
          <div class="ticket-badges">
            <span class="ticket-status status-${ticket.status}">${ticket.status}</span>
            <span class="ticket-priority priority-${ticket.priority}">${ticket.priority}</span>
          </div>
          <h4>${ticket.subject}</h4>
        </div>
        <div class="ticket-content">
          <p>${ticket.message}</p>
        </div>
        <div class="replies-section">
          ${ticket.replies ? ticket.replies.map(reply => `
            <div class="reply-item ${reply.is_admin ? 'reply-left' : 'reply-right'}">
              <div class="reply-content">${reply.message}</div>
              <div class="reply-time">${reply.created_at}</div>
            </div>
          `).join('') : ''}
        </div>
      </div>
      <div class="modal-footer">
        <form id="reply-form">
          <div class="form-group">
            <textarea id="reply-message" placeholder="Type your reply..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-paper-plane"></i>
            Send Reply
          </button>
        </form>
      </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  closeTicketDetailModal() {
    const modal = document.getElementById('ticket-detail-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  initContact() {
    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (typeof showNotification === 'function') {
          showNotification('Message sent successfully!', 'success');
        }
        contactForm.reset();
      });
    }
  }

  initFaq() {
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          item.classList.toggle('active');
        });
      }
    });
  }

  initSampleRequests() {
    this.currentSampleGrouping = 'date';
    setTimeout(() => {
      this.loadSampleRequests();
    }, 300);
    
    const groupBy = document.getElementById('group-by');
    if (groupBy) {
      groupBy.addEventListener('change', () => {
        this.currentSampleGrouping = groupBy.value;
        this.renderSampleRequests(this.sampleRequestsData, groupBy.value);
      });
    }
  }

  async loadSampleRequests(autoRender = true) {
    const container = document.getElementById('sample-requests-container');
    if (container) {
      container.innerHTML = `
        <div class="loading-overlay">
          <div class="loading-spinner">
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
            <div class="loading-spinner-dot"></div>
          </div>
        </div>
      `;
    }

    try {
      const response = await requestManager.fetch('/api/profile/sample-requests.php');
      if (!response.ok) {
        container.innerHTML = '<div class="error">Service temporarily unavailable</div>';
        return;
      }
      const data = await response.json();
      
      if (data.success) {
        this.sampleRequestsData = data.data;
        if (autoRender) {
          this.renderSampleRequests(data.data, 'date');
        }
      } else {
        container.innerHTML = '<div class="error">Failed to load sample requests</div>';
      }
    } catch (error) {
      container.innerHTML = '<div class="error">Service temporarily unavailable</div>';
    }
  }

  renderSampleRequests(requests, groupBy = 'date') {
    const container = document.getElementById('sample-requests-container');
    if (!requests || requests.length === 0) {
      container.innerHTML = '<div class="no-data">No sample requests found</div>';
      return;
    }
    
    const grouped = this.groupSampleRequests(requests, groupBy);
    
    container.innerHTML = `<div class="grouped-container">${Object.entries(grouped).map(([group, items]) => `
      <div class="group-section">
        <div class="group-header" onclick="this.parentElement.classList.toggle('collapsed')">
          <h3 class="group-title">${group}</h3>
          <i class="fas fa-chevron-down group-toggle"></i>
        </div>
        <div class="group-content">
          <div class="group-items">
            ${items.map(request => this.createSampleRequestCard(request).outerHTML).join('')}
          </div>
        </div>
      </div>
    `).join('')}</div>`;
  }

  createSampleRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'group-item sample-request-card';
    
    const statusSteps = [
        { key: 'pending', label: 'Pending', icon: 'fas fa-clock' },
        { key: 'approved', label: 'Approved', icon: 'fas fa-check' },
        { key: 'payment', label: 'Payment', icon: 'fas fa-credit-card' },
        { key: 'shipped', label: 'Shipped', icon: 'fas fa-shipping-fast' },
        { key: 'delivered', label: 'Delivered', icon: 'fas fa-box-open' }
    ];
    
    const currentStatusIndex = statusSteps.findIndex(step => step.key === request.status);
    const isCancelled = request.status === 'cancelled';
    
    card.innerHTML = `
        <div class="request-header">
            <a href="/product?slug=${request.product_slug || ''}" class="product-link">
                <img src="${request.product_image || 'assets/images/no-image.png'}" 
                     alt="${request.product_name}" class="product-image"
                     onerror="this.src='assets/images/no-image.png'">
            </a>
            <div class="request-info">
                <a href="/product?slug=${request.product_slug || ''}" class="product-title-link">
                    <h3>${request.product_name || 'Unknown Product'}</h3>
                </a>
                <div class="request-date">Requested on ${this.formatSampleDate(request.created_at)}</div>
            </div>
        </div>
        
        <div class="progress-container">
            <div class="progress-line ${request.status}">
                ${statusSteps.map((step, index) => {
                    let stepClass = '';
                    if (isCancelled) {
                        stepClass = index === 0 ? 'cancelled' : '';
                    } else if (index < currentStatusIndex) {
                        stepClass = 'completed';
                    } else if (index === currentStatusIndex) {
                        stepClass = 'active';
                    }
                    
                    return `
                        <div class="progress-step">
                            <div class="step-icon ${stepClass}">
                                <i class="${step.icon}"></i>
                            </div>
                            <div class="step-label ${stepClass}">${step.label}</div>
                            ${(index === currentStatusIndex || (isCancelled && index === 0)) ? `<div class="step-date">${this.formatSampleDate(request.updated_at)}</div>` : ''}
                        </div>
                    `;
                }).join('')}
                ${isCancelled ? `
                    <div class="progress-step">
                        <div class="step-icon cancelled">
                            <i class="fas fa-times"></i>
                        </div>
                        <div class="step-label cancelled">Cancelled</div>
                        <div class="step-date">${this.formatSampleDate(request.updated_at)}</div>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="request-details">
            <div class="detail-item">
                <div class="detail-label">Full Name</div>
                <div class="detail-value">${request.full_name}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${request.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Company</div>
                <div class="detail-value">${request.company_name || 'N/A'}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">City</div>
                <div class="detail-value">${request.city}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Country</div>
                <div class="detail-value">${request.country}</div>
            </div>
        </div>
    `;
    
    return card;
  }

  groupSampleRequests(requests, groupBy) {
    const groups = {};
    
    requests.forEach(request => {
      let key;
      switch (groupBy) {
        case 'status':
          key = request.status.charAt(0).toUpperCase() + request.status.slice(1);
          break;
        case 'date':
        default:
          const date = new Date(request.created_at);
          key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
          break;
      }
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(request);
    });
    
    return groups;
  }

  formatSampleDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
  }
}

// Initialize SPA
const router = new SPARouter();
const viewManager = new ViewManager();

// Define routes
router.addRoute('/', async () => {
  const slides = await viewManager.getSlides();
  await viewManager.loadView('home', { slides });
});

router.addRoute('/spa.php', async () => {
  const slides = await viewManager.getSlides();
  await viewManager.loadView('home', { slides });
});

router.addRoute('/products', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  await viewManager.loadView('products', { category });
});

router.addRoute('/product', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  await viewManager.loadView('product', { slug });
});

router.addRoute('/profile', async () => {
  await viewManager.loadView('profile');
}, true);

router.addRoute('/profile/inquiries', async () => {
  await viewManager.loadView('inquiries');
}, true);

router.addRoute('/sample-requests', async () => {
  await viewManager.loadView('sample-requests');
}, true);

router.addRoute('/tickets', async () => {
  await viewManager.loadView('tickets');
}, true);

router.addRoute('/about-us', async () => {
  await viewManager.loadView('about');
});

router.addRoute('/contact-us', async () => {
  await viewManager.loadView('contact');
});

router.addRoute('/faq', async () => {
  await viewManager.loadView('faq');
});

router.addRoute('/404', async () => {
  viewManager.mainContent.innerHTML = '<div class="error">Page not found</div>';
});

// Handle spa.php as home route
if (window.location.pathname === '/spa.php') {
  history.replaceState(null, '', '/');
}

// Export for global access
window.router = router;
window.viewManager = viewManager;

// Inquiry Modal Functions
function openInquiryModal(productName, productSlug) {
  const modal = document.getElementById('inquiry-modal');
  const productInput = document.getElementById('inquiry-product');
  
  if (modal && productInput) {
    productInput.value = productName;
    modal.style.display = 'flex';
  }
}

// Initialize inquiry modal handlers
document.addEventListener('DOMContentLoaded', () => {
  const inquiryModal = document.getElementById('inquiry-modal');
  const inquiryForm = document.getElementById('inquiry-form');
  
  if (inquiryModal) {
    // Close modal handlers
    inquiryModal.querySelector('.close').addEventListener('click', () => {
      inquiryModal.style.display = 'none';
    });
    
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        inquiryModal.style.display = 'none';
      }
    });
    
    // Form submission
    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle inquiry submission here
        inquiryModal.style.display = 'none';
        inquiryForm.reset();
      });
    }
  }
});

window.openInquiryModal = openInquiryModal;
}