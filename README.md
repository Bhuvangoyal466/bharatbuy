

# 🇮🇳 BharatBuy


BharatBuy is a modern e-commerce platform built with [Next.js](https://nextjs.org), designed to showcase and sell premium quality products from local artisans and small businesses across India. The project features a robust shopping experience 🛒, secure authentication 🔒, order management 📦, and seamless payment integration 💳.

---


## 📚 Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Core Functionalities](#core-functionalities)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [How to Run](#how-to-run)
- [Deployment](#deployment)
- [License](#license)

---


## 🗂️ Project Structure

```
├── components/         # Reusable UI components (Navbar, Footer, Carousel)
├── middleware/         # Custom middleware (MongoDB connection)
├── models/             # Mongoose models (User, Product, Order)
├── pages/              # Next.js pages (UI, API routes)
│   ├── api/            # RESTful API endpoints
│   ├── payment/        # Payment flow pages
│   ├── product/        # Dynamic product details
│   └── ...             # Other pages (home, account, orders, etc.)
├── public/             # Static assets (images, icons)
├── styles/             # Global and component styles
├── package.json        # Project dependencies and scripts
├── next.config.mjs     # Next.js configuration
└── jsconfig.json       # JS project configuration
```

---


## ✨ Features


- **Product Catalog** 🛍️: T-Shirts, Hoodies, Mugs, Stickers, and more, with dynamic filtering by color and size.
- **User Authentication** 🔐: Secure signup, login, and JWT-based session management.
- **Shopping Cart** 🛒: Add, remove, and update products; persistent cart using localStorage.
- **Checkout & Orders** 📦: Address input, order summary, and order placement.
- **Payment Integration** 💳: Paytm payment gateway with order status tracking.
- **Order History** 📜: View past orders, details, and statuses.
- **Account Management** 👤: Update user details and password securely.
- **Admin APIs** 🛠️: Add, update, and manage products and orders.
- **Responsive UI** 📱: Modern, mobile-friendly design with custom components.

---


## ⚙️ Core Functionalities


### 1. **Frontend Pages**


- `index.js`: Home page with hero section, feature highlights, and product categories 🏠.
- `tshirts.js`, `hoodies.js`, `mugs.js`, `stickers.js`: Product listing pages with server-side fetching and filtering 🛍️.
- `product/[slug].js`: Dynamic product details, variant selection, and serviceability check 🔎.
- `checkout.js`: Cart review, address entry, and order placement 📝.
- `orders.js`: Displays user's order history and details 📦.
- `myaccount.js`: User profile and password update 👤.
- `login.js`, `signup.js`, `forgot.js`: Authentication flows 🔐.
- `payment/[orderId].js`: Payment processing and status feedback 💳.


### 2. **Components**


- `Navbar.js`: Navigation bar with cart, account, and responsive dropdowns 🧭.
- `Footer.js`: Informational footer with policies and newsletter 📄.
- `InfiniteCarousel.js`: Featured products carousel 🎠.


### 3. **State Management**


- Cart and user state managed via React hooks and localStorage 🗃️.
- Toast notifications for feedback (react-toastify) 🔔.


### 4. **Middleware**


- `mongoose.js`: Ensures efficient MongoDB connection pooling for API routes 🛡️.

---


## 🚀 API Endpoints

Located in `pages/api/`:


- `addproducts.js`: Bulk add new products (admin) ➕.
- `updateproducts.js`: Bulk update products (admin) ✏️.
- `getproducts.js`: Fetch all products with variant aggregation 📦.
- `orders.js`: Get user orders (JWT protected) 🔒.
- `pretransaction.js`: Create order and initiate payment 💳.
- `getuser.js`: Fetch user details (JWT protected) 👤.
- `updateuser.js`: Update user address and info (JWT protected) 🏠.
- `signup.js`: Register new users with encrypted password 📝.
- `login.js`: Authenticate users and issue JWT 🔑.
- `updatepassword.js`: Change user password securely 🔒.
- `pincode.js`: Check delivery serviceability by pincode 📮.
- `test.js`, `hello.js`: Health check and test endpoints 🩺.

---


## 🗄️ Database Models


### User (`models/User.js`)
- Fields: name, email, password (AES encrypted), address, pincode, phone 👤


### Product (`models/Product.js`)
- Fields: title, slug, description, image, category, size, color, price, availableQty 🛍️


### Order (`models/Order.js`)
- Fields: userId, orderId, products (array), address, amount, status, customerInfo, paymentStatus, paymentId, transactionId 📦

---


## 🏃‍♂️ How to Run


1. **Install dependencies:** 📦
   ```bash
   npm install
   ```
2. **Configure environment variables:** ⚙️
   - Create a `.env.local` file with:
     - `MONGO_URI` (MongoDB connection string)
     - `JWT_SECRET` (JWT signing key)
     - `AES_SECRET` (AES encryption key)
     - `NEXT_PUBLIC_HOST` (Base URL)
3. **Start the development server:** 🚀
   ```bash
   npm run dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser 🌐.

---


<img width="1299" height="851" alt="Screenshot 2025-07-25 104843" src="https://github.com/user-attachments/assets/fc8c4fa2-6093-4cfe-b31e-a32dca725693" />
<img width="1396" height="835" alt="Screenshot 2025-07-25 104802" src="https://github.com/user-attachments/assets/afd1c3da-0486-45a2-bfae-002fd7d5b02b" />
<img width="655" height="874" alt="Screenshot 2025-07-25 104737" src="https://github.com/user-attachments/assets/493f00ef-c270-483a-b87e-05f6aa2b965d" />
<img width="1393" height="741" alt="Screenshot 2025-07-25 104719" src="https://github.com/user-attachments/assets/185aad4c-dcda-4407-9bd9-f52b993b1b51" />
<img width="1036" height="798" alt="Screenshot 2025-07-25 104659" src="https://github.com/user-attachments/assets/9a618e80-abad-42ad-a6fd-6bee3eb94603" />
<img width="637" height="837" alt="Screenshot 2025-07-25 104934" src="https://github.com/user-attachments/assets/3c5f539e-3b7a-4725-a3cc-cdf651f97eb3" />
<img width="1887" height="853" alt="Screenshot 2025-07-25 104521" src="https://github.com/user-attachments/assets/ef71dcb0-f2a8-4b64-a632-b26c4a31415f" />
<img width="1892" height="875" alt="Screenshot 2025-07-25 104512" src="https://github.com/user-attachments/assets/dbb924bf-9752-4893-8f4d-bfeb0cc1bd62" />


## 🚢 Deployment
Check out the deployed project => https://bharatbuy.vercel.app/


Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js. See [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

---


## 📄 License

This project is for educational and demonstration purposes. For commercial use, please contact the author.
