// js/shop.js
(function(){
  'use strict';

  // Sample product data — includes new Hot-Processed Soap
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
      price: 60.00
    },
    {
      id: 'hotproc-01',
      title: 'Hot-Processed Soap (Rustic)',
      description: 'Lovely rustic-looking hot-processed soap with the same natural goodness — more readily available for when you need it fast.',
      price: 60.00
    },
    {
      id: 'coffee-01',
      title: 'Coffee',
      description: 'Energizing coffee-infused soap with natural exfoliating properties.',
      price: 60.00
    },
    {
      id: 'castoroil-01',
      title: 'Castor Oil Soap',
      description: 'Rich and moisturizing castor oil soap for deep nourishment.',
      price: 60.00
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

    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';

      const img = document.createElement('div');
      img.className = 'product-image';
      img.style.height = '120px';
      img.style.background = 'linear-gradient(180deg, #f6f2ea, #efe9dc)';
      img.style.borderRadius = '8px';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.style.color = '#7a6b5d';
      img.style.fontStyle = 'italic';
      img.textContent = 'Rustic soap';

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
      addBtn.textContent = 'Add to cart';
      addBtn.addEventListener('click', () => addToCart(p));

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
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts();
    initCartControls();
    updateCartUI();
  });
})();
