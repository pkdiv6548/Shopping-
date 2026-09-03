# Atelier Enterprise Fashion Commerce v3

A realistic, responsive fashion ecommerce frontend prototype built with React + Vite.

## Included

- 70 catalog products: 7 categories × 10 products.
- Exactly 5 image references per product.
- Dynamic category/PLP filters and sorting from the v2 foundation.
- Product detail gallery with zoom/pinch support from the v2 foundation.
- Cart, wishlist, checkout and localStorage persistence.
- Separate pages for authentication, account management, orders, returns, addresses, payments and preferences.
- Dedicated support pages: FAQ, contact, track order, size guide, shipping and payment help.
- Dedicated legal pages: privacy, terms, disclaimer, cookies, returns/refunds, shipping, payment, pricing, warranty and accessibility.
- Brand pages: about, careers, press, newsletter.
- Loyalty and membership.
- Gift cards.
- Store locator and store events.
- Sustainability and editorial.
- Resale marketplace and sell flow.
- Admin/CMS dashboard with product, inventory, order, customer, promotion, loyalty, content and analytics sections.
- SEO files: robots.txt and sitemap.xml.
- Responsive mobile-first UI.
- Backend-ready route/component structure.

## Route inventory

### Shopping
/, /category/:name, /product/:id, /search, /wishlist, /cart, /checkout

### Account
/login, /register, /forgot-password, /account, /account/profile, /account/orders,
/account/returns, /account/addresses, /account/payments, /account/preferences,
/account/notifications

### Customer experience
/support, /faq, /contact, /track-order, /order-confirmation, /size-guide,
/stores, /store-events, /gift-cards

### Brand & content
/about, /editorial, /sustainability, /membership, /loyalty, /careers, /press, /newsletter

### Resale
/resale, /resale/sell, /resale/product/:id

### Legal / policies
/privacy-policy, /terms, /disclaimer, /cookie-policy, /returns-policy,
/shipping-policy, /payment-policy, /pricing-policy, /warranty, /accessibility

### Admin
/admin, /admin/products, /admin/inventory, /admin/orders, /admin/customers,
/admin/promotions, /admin/loyalty, /admin/content, /admin/analytics

## Run

npm install
npm run dev

For Vercel/static hosting, use the included Vite configuration and configure SPA fallback/rewrite rules as needed.

## Production handoff

Replace demo data and simulated actions with real services for authentication, product catalog, inventory, pricing, tax, payments, shipping, order management, CMS, analytics and customer support.

This prototype is not a real retailer and does not process real payments.
