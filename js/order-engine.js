// js/order-engine.js
// Order Engine for Payment Processing
(function(window) {
  'use strict';

  // Order statuses
  const OrderStatus = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
  };

  // Payment methods
  const PaymentMethod = {
    PAYPAL: 'paypal',
    CARD: 'card',
    CASH: 'cash'
  };

  class OrderEngine {
    constructor() {
      this.orders = this.loadOrders();
    }

    /**
     * Generate a unique order ID
     */
    generateOrderId() {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `ORD-${timestamp}-${random}`;
    }

    /**
     * Create a new order
     * @param {Object} orderData - Order data including items, customer info
     * @returns {Object} Created order
     */
    createOrder(orderData) {
      // Validate order data
      if (!this.validateOrderData(orderData)) {
        throw new Error('Invalid order data');
      }

      const order = {
        id: this.generateOrderId(),
        status: OrderStatus.PENDING,
        items: orderData.items || [],
        customer: orderData.customer || {},
        payment: {
          method: orderData.paymentMethod || PaymentMethod.PAYPAL,
          status: 'pending',
          transactionId: null,
          amount: this.calculateOrderTotal(orderData.items)
        },
        timestamps: {
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        },
        metadata: orderData.metadata || {}
      };

      // Store order
      this.orders[order.id] = order;
      this.saveOrders();

      return order;
    }

    /**
     * Validate order data
     * @param {Object} orderData
     * @returns {boolean}
     */
    validateOrderData(orderData) {
      // Check if items exist and is an array
      if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
        console.error('Order must have at least one item');
        return false;
      }

      // Validate each item
      for (const item of orderData.items) {
        if (!item.id || !item.name || !item.price || !item.quantity) {
          console.error('Invalid item in order:', item);
          return false;
        }
        if (item.price < 0 || item.quantity < 1) {
          console.error('Invalid price or quantity:', item);
          return false;
        }
      }

      return true;
    }

    /**
     * Calculate total amount for order
     * @param {Array} items - Order items
     * @returns {number} Total amount
     */
    calculateOrderTotal(items) {
      return items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    }

    /**
     * Update order status
     * @param {string} orderId
     * @param {string} status
     * @param {Object} additionalData
     */
    updateOrderStatus(orderId, status, additionalData = {}) {
      const order = this.orders[orderId];
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      order.status = status;
      order.timestamps.updated = new Date().toISOString();

      // Update payment info if provided
      if (additionalData.transactionId) {
        order.payment.transactionId = additionalData.transactionId;
      }
      if (additionalData.paymentStatus) {
        order.payment.status = additionalData.paymentStatus;
      }
      if (additionalData.payerInfo) {
        order.payment.payerInfo = additionalData.payerInfo;
      }

      this.saveOrders();
      return order;
    }

    /**
     * Get order by ID
     * @param {string} orderId
     * @returns {Object|null}
     */
    getOrder(orderId) {
      return this.orders[orderId] || null;
    }

    /**
     * Get all orders
     * @returns {Array}
     */
    getAllOrders() {
      return Object.values(this.orders).sort((a, b) => {
        return new Date(b.timestamps.created) - new Date(a.timestamps.created);
      });
    }

    /**
     * Get orders by status
     * @param {string} status
     * @returns {Array}
     */
    getOrdersByStatus(status) {
      return this.getAllOrders().filter(order => order.status === status);
    }

    /**
     * Process payment for an order
     * @param {string} orderId
     * @param {Object} paymentData
     * @returns {Object}
     */
    processPayment(orderId, paymentData) {
      const order = this.getOrder(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      if (order.status === OrderStatus.COMPLETED) {
        throw new Error('Order already completed');
      }

      // Update order to processing
      this.updateOrderStatus(orderId, OrderStatus.PROCESSING);

      try {
        // In a real system, this would integrate with payment gateway
        // For now, we'll simulate payment processing
        const paymentResult = {
          success: true,
          transactionId: paymentData.transactionId || this.generateTransactionId(),
          timestamp: new Date().toISOString()
        };

        // Update order with payment info
        this.updateOrderStatus(orderId, OrderStatus.COMPLETED, {
          transactionId: paymentResult.transactionId,
          paymentStatus: 'completed',
          payerInfo: paymentData.payerInfo
        });

        return {
          success: true,
          order: this.getOrder(orderId),
          payment: paymentResult
        };
      } catch (error) {
        // Payment failed
        this.updateOrderStatus(orderId, OrderStatus.FAILED);
        return {
          success: false,
          error: error.message
        };
      }
    }

    /**
     * Generate a transaction ID
     */
    generateTransactionId() {
      return `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
    }

    /**
     * Cancel an order
     * @param {string} orderId
     * @param {string} reason
     */
    cancelOrder(orderId, reason = '') {
      const order = this.getOrder(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      if (order.status === OrderStatus.COMPLETED) {
        throw new Error('Cannot cancel completed order');
      }

      order.status = OrderStatus.CANCELLED;
      order.metadata.cancellationReason = reason;
      order.timestamps.updated = new Date().toISOString();
      
      this.saveOrders();
      return order;
    }

    /**
     * Load orders from localStorage
     */
    loadOrders() {
      try {
        const stored = localStorage.getItem('dearlilian_orders');
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        console.error('Error loading orders:', error);
        return {};
      }
    }

    /**
     * Save orders to localStorage
     */
    saveOrders() {
      try {
        localStorage.setItem('dearlilian_orders', JSON.stringify(this.orders));
      } catch (error) {
        console.error('Error saving orders:', error);
      }
    }

    /**
     * Clear all orders (for testing/admin purposes)
     */
    clearAllOrders() {
      this.orders = {};
      this.saveOrders();
    }

    /**
     * Get order statistics
     */
    getOrderStats() {
      const orders = this.getAllOrders();
      return {
        total: orders.length,
        pending: orders.filter(o => o.status === OrderStatus.PENDING).length,
        processing: orders.filter(o => o.status === OrderStatus.PROCESSING).length,
        completed: orders.filter(o => o.status === OrderStatus.COMPLETED).length,
        failed: orders.filter(o => o.status === OrderStatus.FAILED).length,
        cancelled: orders.filter(o => o.status === OrderStatus.CANCELLED).length,
        totalRevenue: orders
          .filter(o => o.status === OrderStatus.COMPLETED)
          .reduce((sum, o) => sum + o.payment.amount, 0)
      };
    }
  }

  // Export OrderEngine and constants
  window.OrderEngine = OrderEngine;
  window.OrderStatus = OrderStatus;
  window.PaymentMethod = PaymentMethod;

})(window);
