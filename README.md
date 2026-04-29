# Kuruva Mess House Restaurant Website

A modern, full-featured restaurant website for Kuruva Mess House, an authentic Kerala cuisine restaurant located near Kuruva Island. Built with Next.js, TypeScript, Node.js, and MongoDB.

## 🚀 Features Implemented

### Frontend (Next.js + TypeScript + Tailwind CSS)
- ✅ **Homepage** - Hero section, featured dishes, customer reviews, quick info
- ✅ **Menu Page** - Categories, search/filter, add to cart functionality
- ✅ **Cart System** - Add/remove items, quantity management, persistent storage
- ✅ **Checkout Flow** - Delivery/takeaway options, address management, payment methods
- ✅ **User Authentication** - Login/register, Google OAuth, Phone OTP support
- ✅ **Profile Management** - View orders, manage addresses, update profile
- ✅ **Additional Pages** - About Us, Gallery, Blog, Contact
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Modern UI** - Beautiful animations, Kerala-inspired color scheme

### Backend (Node.js + Express + MongoDB)
- ✅ **RESTful API** - Complete API structure for all features
- ✅ **Authentication** - JWT tokens, Google OAuth, Phone OTP
- ✅ **Models** - User, MenuItem, Order, Blog, Contact
- ✅ **Payment Integration** - Razorpay payment gateway setup
- ✅ **Order Management** - Create, track, and manage orders
- ✅ **Admin Routes** - Protected routes for admin operations
- ✅ **Security** - Helmet, CORS, rate limiting, validation

## 📋 Project Structure

```
KuruvaMess/
├── frontend/               # Next.js frontend application
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── contexts/          # React contexts (Auth, Cart)
│   ├── lib/              # Utility functions and data
│   ├── types/            # TypeScript type definitions
│   └── public/           # Static assets
│
├── backend/               # Node.js backend application
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic services
│   │   ├── utils/        # Utility functions
│   │   └── server.ts     # Express server setup
│   └── uploads/          # File uploads directory
│
└── kuruva_mess_prd.md    # Product Requirements Document
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Libraries**: Framer Motion, Lucide Icons
- **State Management**: React Context API
- **Forms**: React Hook Form
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Google OAuth, Phone OTP
- **Payment**: Razorpay
- **Email**: Nodemailer
- **SMS**: Twilio

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Razorpay account (for payments)
- Google OAuth credentials
- Twilio account (for SMS)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables (see `.env.example`)

4. Start development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📱 Key Features

### For Customers
- Browse menu with categories and search
- Add items to cart with quantity selection
- Choose delivery or takeaway
- Multiple payment options (UPI, Card, Wallet, COD)
- Track order status
- User profile and order history
- Save delivery addresses

### For Restaurant
- Admin panel for menu management
- Order management system
- Customer analytics
- Content management (blog, gallery)
- Contact form submissions
- Real-time order notifications

## 🎨 Design Highlights
- Kerala-inspired color scheme (Green primary, Gold secondary)
- Modern, clean interface
- Mobile-first responsive design
- Smooth animations and transitions
- Accessibility compliant
- Fast loading with optimized images

## 📞 Contact Information
- **Sunil UM**: 9846880933
- **Vineetha Sunil**: 8075387332
- **Location**: Near Kuruva Island, Kerala
- **Hours**: 5:00 AM - 10:00 PM (Daily)

## 🔒 Security Features
- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- HTTPS ready
- Secure payment processing

## 🚧 Deployment Notes
- Frontend can be deployed on Vercel/Netlify
- Backend on AWS/Heroku/DigitalOcean
- Database on MongoDB Atlas
- Static files on CDN

## 📝 License
This project was built for Kuruva Mess House restaurant.

---

Built with ❤️ for authentic Kerala cuisine lovers!
