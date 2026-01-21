// js/shop.js
(function(){
  'use strict';

  // Sample product data
  const products = [
    {
      id: 'lavender-01',
      title: 'Honey Lavender Soap',
      description: 'Calming lavender essential oil, gentle on sensitive skin.',
      price: 60.00
    },
    {
      id: 'citrus-01',
      title: 'Citrus Zest',
      description: 'Bright, zesty bar with uplifting citrus essential oils.',
      price: 60.00,
      image: 'images/Zesty Citrus.png'
    },
    {
      id: 'hotproc-01',
      title: 'Natural, unfragranced tallow soap',
      description: 'Pure and simple tallow soap, unfragranced and gentle on all skin types.',
      price: 50.00
    },
    {
      id: 'coffee-castoroil-01',
      title: 'Coffee and Castor Oil Soap',
      description: 'Energizing coffee-infused soap with natural exfoliating properties and rich castor oil for deep nourishment.',
      price: 60.00,
      image: 'images/Coffee Castor Oil.png'
    },
    {
      id: 'lotion-bar-01',
      title: 'Natural Body Lotion Bars',
      description: 'Nourishing solid lotion bars made with natural ingredients to moisturize and protect your skin.',
      price: 70.00
    },
    {
      id: 'body-butter-01',
      title: 'Natural Body Butters',
      description: 'Rich, creamy body butters made with natural ingredients to deeply nourish and hydrate your skin. 100ml.',
      price: 150.00
    },
    {
      id: 'whipped-body-butter-01',
      title: 'Whipped Body Butter',
      description: 'Light, airy whipped body butter that melts into your skin, providing deep moisture without the greasy feel. 100ml.',
      price: 200.00
    },
    {
      id: 'face-serum-01',
      title: 'Natural Face Serum',
      description: 'Made-to-order nourishing face serum. Ingredients: flaxseed gel, castor oil, frankincense essential oil. 30ml.',
      price: 90.00
    }
  ];

  // Simple cart state
  const cart = {
    items: {}, // id -> {product, qty}
    subtotal: 0
  };

  const formatCurrency = (v) => {
    try {
      return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(v);
    } catch (e) {
      return `ZAR${v.toFixed(2)}`;
    }
  };

  function renderProducts(){
    const grid = document.getElementById('featured-grid') || document.getElementById('product-grid');
    if(!grid) return;
    grid.innerHTML = '';

    // Filter products for featured section on main page
    const isFeaturedGrid = grid.id === 'featured-grid';
    const featuredIds = ['citrus-01', 'body-butter-01', 'face-serum-01'];
    const displayProducts = isFeaturedGrid 
      ? products.filter(p => featuredIds.includes(p.id))
      : products;

    displayProducts.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      // Make the card clickable to view details
      card.addEventListener('click', (e) => {
        // Don't navigate if clicking the Add to Bag button
        if (!e.target.closest('.btn')) {
          window.location.href = `product-detail.html?id=${p.id}`;
        }
      });

      const img = document.createElement('div');
      img.className = 'product-image';
      img.style.height = '120px';
      img.style.borderRadius = '8px';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.overflow = 'hidden';
      
      if (p.image) {
        const imgEl = document.createElement('img');
        imgEl.src = p.image;
        imgEl.alt = p.title;
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.style.objectFit = 'cover';
        imgEl.onerror = () => {
          img.style.background = 'linear-gradient(180deg, #f6f2ea, #efe9dc)';
          img.style.color = '#7a6b5d';
          img.style.fontStyle = 'italic';
          img.textContent = 'Rustic soap';
          imgEl.remove();
        };
        img.appendChild(imgEl);
      } else {
        img.style.background = 'linear-gradient(180deg, #f6f2ea, #efe9dc)';
        img.style.color = '#7a6b5d';
        img.style.fontStyle = 'italic';
        img.textContent = 'Rustic soap';
      }

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = p.title;

      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = p.description;
      desc.style.color = '#6b6b63';
      desc.style.fontSize = '0.95rem';

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = formatCurrency(p.price);

      const actions = document.createElement('div');
      actions.style.marginTop = '8px';

      const addBtn = document.createElement('button');
      addBtn.className = 'btn primary';
      addBtn.textContent = 'Add to Bag';
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        addToCart(p);
      });

      actions.appendChild(addBtn);

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(price);
      card.appendChild(actions);

      grid.appendChild(card);
    });
  }

  function updateCartUI(){
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    if(!countEl || !itemsEl || !subtotalEl) return;

    const totalQty = Object.values(cart.items).reduce((s,i)=>s+i.qty,0);
    countEl.textContent = totalQty;

    itemsEl.innerHTML = '';
    Object.values(cart.items).forEach(({product, qty}) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.padding = '6px 0';
      li.textContent = `${product.title} x ${qty}`;
      itemsEl.appendChild(li);
    });

    subtotalEl.textContent = formatCurrency(cart.subtotal);
  }

  function addToCart(product){
    if(!cart.items[product.id]){
      cart.items[product.id] = { product, qty: 0 };
    }
    cart.items[product.id].qty += 1;
    cart.subtotal = Object.values(cart.items).reduce((s,i)=>s + (i.product.price * i.qty), 0);
    updateCartUI();

    // Open the cart briefly
    const cartEl = document.getElementById('cart');
    if(cartEl){
      cartEl.setAttribute('aria-hidden', 'false');
      cartEl.classList.add('open');
    }
  }

  function initCartControls(){
    const toggle = document.getElementById('cart-toggle');
    const close = document.getElementById('cart-close');
    const cartEl = document.getElementById('cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if(toggle && cartEl){
      toggle.addEventListener('click', ()=>{
        const hidden = cartEl.getAttribute('aria-hidden') === 'true';
        cartEl.setAttribute('aria-hidden', String(!hidden));
        cartEl.classList.toggle('open', hidden);
        toggle.setAttribute('aria-expanded', String(hidden));
      });
    }
    if(close && cartEl){
      close.addEventListener('click', ()=>{
        cartEl.setAttribute('aria-hidden', 'true');
        cartEl.classList.remove('open');
        if(toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
    if(checkoutBtn){
      checkoutBtn.addEventListener('click', handleCheckout);
    }
  }

  function handleCheckout(){
    if(Object.keys(cart.items).length === 0){
      alert('Your bag is empty. Please add items before checking out.');
      return;
    }
    
    // Show PayPal modal
    showPayPalModal();
  }

  function showPayPalModal(){
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'paypal-modal';
    modal.className = 'paypal-modal';
    modal.innerHTML = `
      <div class="paypal-modal-content">
        <button class="paypal-modal-close" aria-label="Close">&times;</button>
        <h2>Complete Your Purchase</h2>
        <div class="paypal-order-summary">
          <h3>Order Summary</h3>
          <ul class="paypal-order-items">
            ${Object.values(cart.items).map(({product, qty}) => 
              `<li>${product.title} x ${qty} - ${formatCurrency(product.price * qty)}</li>`
            ).join('')}
          </ul>
          <div class="paypal-order-total">
            <strong>Total: ${formatCurrency(cart.subtotal)}</strong>
          </div>
        </div>
        <div id="paypal-button-container"></div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close button handler
    const closeBtn = modal.querySelector('.paypal-modal-close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if(e.target === modal){
        document.body.removeChild(modal);
      }
    });
    
    // Initialize PayPal button
    initPayPalButton();
  }

  function initPayPalButton(){
    // Check if PayPal SDK is loaded
    if(typeof paypal === 'undefined'){
      const container = document.getElementById('paypal-button-container');
      container.innerHTML = '<p style="color: #d32f2f; text-align: center;">PayPal SDK not loaded. Please refresh the page and try again.</p>';
      return;
    }
    
    paypal.Buttons({
      createOrder: function(data, actions) {
        // Create order with cart items
        const items = Object.values(cart.items).map(({product, qty}) => ({
          name: product.title,
          unit_amount: {
            currency_code: 'ZAR',
            value: product.price.toFixed(2)
          },
          quantity: qty
        }));
        
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'ZAR',
              value: cart.subtotal.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: 'ZAR',
                  value: cart.subtotal.toFixed(2)
                }
              }
            },
            items: items
          }]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Close modal
          const modal = document.getElementById('paypal-modal');
          if(modal){
            document.body.removeChild(modal);
          }
          
          // Show success message
          alert('Thank you for your purchase, ' + details.payer.name.given_name + '! Your order has been completed.');
          
          // Clear cart
          cart.items = {};
          cart.subtotal = 0;
          updateCartUI();
          
          // Close cart sidebar
          const cartEl = document.getElementById('cart');
          if(cartEl){
            cartEl.setAttribute('aria-hidden', 'true');
            cartEl.classList.remove('open');
          }
        });
      },
      onError: function(err) {
        console.error('PayPal Error:', err);
        alert('An error occurred during checkout. Please try again.');
      }
    }).render('#paypal-button-container');
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts();
    initCartControls();
    updateCartUI();
  });

  // Listen for addToCart events from product detail page
  window.addEventListener('addToCart', (e) => {
    const { product, quantity } = e.detail;
    if (!cart.items[product.id]) {
      cart.items[product.id] = { product, qty: 0 };
    }
    cart.items[product.id].qty += quantity;
    cart.subtotal = Object.values(cart.items).reduce((s, i) => s + (i.product.price * i.qty), 0);
    updateCartUI();
  });
})();
