# Dear-Lilian
Dear Lilian All Natural Soap

## View the Live Website

This website can be viewed live using GitHub Pages. To enable it:

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select the branch you want to deploy (e.g., `main` or `copilot/view-web-app-on-github`)
4. Click **Save**
5. GitHub will provide you with a URL where your site is published (typically: `https://boschdeidre-ux.github.io/Dear-Lilian/`)

Once enabled, your website will be automatically deployed and accessible at the provided URL.

## PayPal Configuration

This website includes PayPal integration for checkout. Before deploying to production:

1. Create a PayPal business account at https://www.paypal.com/business
2. Get your PayPal client ID from the PayPal Developer Dashboard
3. Replace `client-id=test` with your actual client ID in all HTML files:
   - `shop.html`
   - `product-detail.html`
   - `index.html`
   - `about.html`
   - `benefits.html`
   - `contact.html`

Example:
```html
<!-- Replace this: -->
<script src="https://www.paypal.com/sdk/js?client-id=test&currency=ZAR"></script>

<!-- With your actual client ID: -->
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=ZAR"></script>
```

## Local Development

To view the website locally:

1. Clone this repository
2. Open `index.html` in your web browser
3. Or use a local web server: `python -m http.server 8000` then visit `http://localhost:8000`
