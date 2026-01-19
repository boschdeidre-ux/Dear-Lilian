// js/product-detail.js
(function(){
  'use strict';

  // Sample product data - should match shop.js
  const products = [
    {
      id: 'lavender-01',
      title: 'Honey Lavender Soap',
      description: 'Calming lavender essential oil, gentle on sensitive skin.',
      price: 60.00,
      ingredients: 'Tallow, olive oil, coconut oil, lavender essential oil, honey',
      weight: '100g',
      additionalInfo: 'Perfect for sensitive skin and relaxation before bed.'
    },
    {
      id: 'citrus-01',
      title: 'Citrus Zest',
      description: 'Bright, zesty bar with uplifting citrus essential oils.',
      price: 60.00,
      image: 'images/Zesty Citrus.png',
      ingredients: 'Tallow, olive oil, coconut oil, lemon essential oil, orange essential oil, grapefruit essential oil',
      weight: '100g',
      additionalInfo: 'Energizing and refreshing, perfect for morning use. The citrus blend helps awaken your senses.'
    },
    {
      id: 'hotproc-01',
      title: 'Natural, unfragranced tallow soap',
      description: 'Pure and simple tallow soap, unfragranced and gentle on all skin types.',
      price: 50.00,
      ingredients: 'Tallow, olive oil, coconut oil',
      weight: '100g',
      additionalInfo: 'Ideal for those with sensitive skin or fragrance sensitivities.'
    },
    {
      id: 'coffee-castoroil-01',
      title: 'Coffee and Castor Oil Soap',
      description: 'Energizing coffee-infused soap with natural exfoliating properties and rich castor oil for deep nourishment.',
      price: 60.00,
      image: 'images/Coffee Castor Oil.png',
      ingredients: 'Tallow, olive oil, coconut oil, castor oil, coffee grounds',
      weight: '100g',
      additionalInfo: 'Natural exfoliation from coffee grounds helps remove dead skin cells while castor oil deeply moisturizes.'
    },
    {
      id: 'lotion-bar-01',
      title: 'Natural Body Lotion Bars',
      description: 'Nourishing solid lotion bars made with natural ingredients to moisturize and protect your skin.',
      price: 70.00,
      ingredients: 'Shea butter, beeswax, coconut oil, essential oils',
      weight: '50g',
      additionalInfo: 'Warm between hands and apply to dry skin. Perfect for travel!'
    },
    {
      id: 'body-butter-01',
      title: 'Natural Body Butters',
      description: 'Rich, creamy body butters made with natural ingredients to deeply nourish and hydrate your skin. 100ml.',
      price: 150.00,
      ingredients: 'Shea butter, cocoa butter, coconut oil, essential oils',
      weight: '100ml',
      additionalInfo: 'Luxurious and deeply moisturizing. A little goes a long way!'
    },
    {
      id: 'whipped-body-butter-01',
      title: 'Whipped Body Butter',
      description: 'Light, airy whipped body butter that melts into your skin, providing deep moisture without the greasy feel. 100ml.',
      price: 200.00,
      ingredients: 'Whipped shea butter, jojoba oil, vitamin E, essential oils',
      weight: '100ml',
      additionalInfo: 'Fluffy texture that absorbs quickly. Perfect for all-day moisture.'
    },
    {
      id: 'face-serum-01',
      title: 'Natural Face Serum',
      description: 'Made-to-order nourishing face serum. Ingredients: flaxseed gel, castor oil, frankincense essential oil. 30ml.',
      price: 90.00,
      ingredients: 'Flaxseed gel, castor oil, frankincense essential oil',
      weight: '30ml',
      additionalInfo: 'Made fresh to order. Apply 2-3 drops to clean face morning and night.'
    }
  ];

  // Sample reviews data
  const reviews = {
    'citrus-01': [
      { author: 'Sarah M.', rating: 5, date: 'January 2026', text: 'This soap smells absolutely amazing! The citrus scent is so refreshing and it lasts a long time. My skin feels clean and soft after every use.' },
      { author: 'James K.', rating: 5, date: 'December 2025', text: 'Best soap I\'ve ever used. The natural ingredients are gentle on my sensitive skin and the zesty smell wakes me up in the morning!' },
      { author: 'Emily R.', rating: 5, date: 'December 2025', text: 'Love this product! It\'s become my morning ritual. The quality is outstanding and I appreciate the eco-friendly packaging.' }
    ],
    'lavender-01': [
      { author: 'Lisa P.', rating: 5, date: 'January 2026', text: 'So calming and gentle. Perfect for my evening shower routine.' }
    ]
  };

  function getProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    return products.find(p => p.id === productId);
  }

  function formatCurrency(v) {
    try {
      return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(v);
    } catch (e) {
      return `ZAR${v.toFixed(2)}`;
    }
  }

  function renderProductDetail() {
    const product = getProductFromURL();
    if (!product) {
      // Redirect to home if no product found
      window.location.href = 'index.html';
      return;
    }

    // Set page title
    document.title = `${product.title} - Dear Lilian`;

    // Populate product information
    const productImage = document.getElementById('product-image');
    const productTitle = document.getElementById('product-title');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const productIngredients = document.getElementById('product-ingredients');
    const productWeight = document.getElementById('product-weight');

    if (product.image) {
      productImage.src = product.image;
      productImage.alt = product.title;
    } else {
      productImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f6f2ea" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="20" text-anchor="middle" fill="%237a6b5d"%3ERustic soap%3C/text%3E%3C/svg%3E';
      productImage.alt = product.title;
    }

    productTitle.textContent = product.title;
    productPrice.textContent = formatCurrency(product.price);
    productDescription.textContent = product.description;
    
    if (product.ingredients) {
      productIngredients.textContent = product.ingredients;
    }
    
    if (product.weight) {
      productWeight.textContent = product.weight;
    }

    // Render reviews
    renderReviews(product.id);

    // Setup quantity controls
    setupQuantityControls();

    // Setup add to bag button
    setupAddToBag(product);
  }

  function renderReviews(productId) {
    const reviewsList = document.getElementById('reviews-list');
    const productReviews = reviews[productId] || [];

    if (productReviews.length === 0) {
      const noReviewsMsg = document.createElement('p');
      noReviewsMsg.className = 'text-muted text-center';
      noReviewsMsg.textContent = 'No reviews yet. Be the first to review this product!';
      reviewsList.innerHTML = '';
      reviewsList.appendChild(noReviewsMsg);
      return;
    }

    reviewsList.innerHTML = '';
    productReviews.forEach(review => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      
      const reviewHeader = document.createElement('div');
      reviewHeader.className = 'review-header';
      
      const authorSpan = document.createElement('span');
      authorSpan.className = 'review-author';
      authorSpan.textContent = review.author;
      
      const starsSpan = document.createElement('span');
      starsSpan.className = 'review-stars';
      starsSpan.textContent = stars;
      
      reviewHeader.appendChild(authorSpan);
      reviewHeader.appendChild(starsSpan);
      
      const dateDiv = document.createElement('div');
      dateDiv.className = 'review-date';
      dateDiv.textContent = review.date;
      
      const textDiv = document.createElement('div');
      textDiv.className = 'review-text';
      textDiv.textContent = review.text;
      
      reviewItem.appendChild(reviewHeader);
      reviewItem.appendChild(dateDiv);
      reviewItem.appendChild(textDiv);
      
      reviewsList.appendChild(reviewItem);
    });
  }

  function setupQuantityControls() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');

    decreaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
      }
    });

    // Ensure valid input
    quantityInput.addEventListener('change', () => {
      let value = parseInt(quantityInput.value) || 1;
      if (value < 1) value = 1;
      if (value > 99) value = 99;
      quantityInput.value = value;
    });
  }

  function setupAddToBag(product) {
    const addToBagBtn = document.getElementById('add-to-bag');
    const quantityInput = document.getElementById('quantity');

    addToBagBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value) || 1;
      
      // Dispatch custom event that shop.js can listen to
      const event = new CustomEvent('addToCart', {
        detail: { product, quantity }
      });
      window.dispatchEvent(event);

      // Open cart
      const cartEl = document.getElementById('cart');
      if (cartEl) {
        cartEl.setAttribute('aria-hidden', 'false');
        cartEl.classList.add('open');
      }

      // Optional: Show feedback
      addToBagBtn.textContent = 'Added to Bag!';
      setTimeout(() => {
        addToBagBtn.textContent = 'Add to Bag';
      }, 2000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail();
  });
})();
