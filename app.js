// SPA Router and Application Core
if (!window.SPARouter) {
class SPARouter {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.isAuthenticated = false;
    this.userData = null;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    document.addEventListener('DOMContentLoaded', () => {
      this.checkAuthStatus().then(() => {
        this.handleRoute();
        this.bindNavigation();
      });
    });
  }

  addRoute(path, handler, requiresAuth = false) {
    this.routes[path] = { handler, requiresAuth };
  }

  navigate(path, pushState = true) {
    if (pushState) {
      history.pushState(null, '', path);
    }
    this.handleRoute();
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
    
    try {
      await route.handler();
    } catch (error) {
      console.error('Route handler error:', error);
      this.showError('Page loading failed');
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
      const response = await fetch('api/auth/check.php');
      const data = await response.json();
      this.isAuthenticated = data.loggedIn;
      this.userData = data.user || null;
      this.updateAuthUI();
    } catch (error) {
      console.error('Auth check failed:', error);
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
}

// View Components
class ViewManager {
  constructor() {
    this.mainContent = document.getElementById('main-content');
  }

  async loadView(viewName, data = {}) {
    if (!this.mainContent) return;
    
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
      const viewContent = await this.getViewContent(viewName, data);
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
      case 'about':
        return this.getAboutView();
      case 'contact':
        return this.getContactView();
      case 'faq':
        return this.getFaqView();
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
      const response = await fetch(`api/products/detail.php?slug=${slug}`);
      const product = await response.json();
      
      if (!product || product.error) {
        return '<div class="error">Product not found</div>';
      }

      return `
        <main class="product-detail">
          <div class="page-container">
            <div class="product-container">
              <div class="product-image">
                <img src="${product.thumbnail || '/assets/images/no-image.png'}" alt="${product.name}">
              </div>
              <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price">${product.price ? product.price + ' $' : 'Price not available'}</div>
                <div class="description">${product.description || 'No description available'}</div>
                <div class="actions">
                  <button class="btn btn-primary inquiry-btn" data-product="${product.name}" data-slug="${product.slug}">Inquiry</button>
                  <button class="btn btn-primary">Add to Cart</button>
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

  async getSlides() {
    try {
      const response = await fetch('api/slides.php');
      const slides = await response.json();
      console.log('Loaded slides:', slides); // Debug log
      return slides && slides.length > 0 ? slides : [];
    } catch (error) {
      console.error('Error loading slides:', error);
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
      const response = await fetch('api/counters.php');
      let counters = await response.json();
      
      // Use default counters if none from database
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
      case 'contact':
        this.initContact();
        break;
      case 'faq':
        this.initFaq();
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
    // Load products script if not already loaded
    if (!window.productsLoaded) {
      await this.loadScript('assets/js/products.js');
      window.productsLoaded = true;
    }
    
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
        }, 200);
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
    
    // Load related products - get category_id from the fetched product data
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    this.loadRelatedProductsBySlug(slug);
  }

  async loadRelatedProductsBySlug(currentSlug) {
    try {
      console.log('Loading related products for slug:', currentSlug);
      
      // First get the current product to get its category_id
      const productResponse = await fetch(`api/products/detail.php?slug=${currentSlug}`);
      const product = await productResponse.json();
      
      console.log('Current product:', product);
      console.log('Product category:', product.category);
      console.log('Product category_id:', product.category?.id);
      
      if (product && product.category && product.category.id) {
        // Then get products from the same category
        const categoryUrl = `api/products/list.php?category=${product.category.id}&per_page=9`;
        console.log('Fetching related products from:', categoryUrl);
        
        const response = await fetch(categoryUrl);
        const data = await response.json();
        
        console.log('Related products response:', data);
        
        if (data.data && data.data.length > 0) {
          console.log('Found', data.data.length, 'products in category');
          
          // Filter out the current product
          const relatedProducts = data.data.filter(p => p.slug !== currentSlug);
          console.log('Related products after filtering:', relatedProducts.length);
          
          if (relatedProducts.length > 0) {
            this.renderRelatedProducts(relatedProducts.slice(0, 8));
            this.initRelatedProductsSlider();
          } else {
            console.log('No related products after filtering');
            // Show a message instead of hiding
            const container = document.getElementById('related-products-container');
            if (container) {
              container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">No related products found</div>';
            }
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
      <div class="related-product-item">
        <a href="/product?slug=${product.slug}" onclick="window.scrollTo(0, 0);">
          <img src="${product.thumbnail || '/assets/images/no-image.png'}" alt="${product.name}">
          <h4>${product.name}</h4>
          <div class="price">${product.price ? product.price + ' $' : 'Price not available'}</div>
        </a>
      </div>
    `).join('');
  }

  initRelatedProductsSlider() {
    const container = document.getElementById('related-products-container');
    const prevBtn = document.getElementById('related-prev');
    const nextBtn = document.getElementById('related-next');
    
    if (!container || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const itemWidth = 250;
    const visibleItems = Math.floor(window.innerWidth / itemWidth);
    const maxIndex = Math.max(0, container.children.length - visibleItems);
    
    // Hide arrows if no scrolling is needed
    if (maxIndex === 0) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }
    
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    });
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
    fetch(`api/tickets/detail.php?id=${ticketId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.displayTicketDetail(data.ticket);
        }
      })
      .catch(error => console.error('Error loading ticket:', error));
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