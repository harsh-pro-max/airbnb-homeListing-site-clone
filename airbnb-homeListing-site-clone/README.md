# Airbnb Home Listing Site Clone (MERN Stack)

A full-stack project to build an Airbnb-like accommodation listing and booking platform using the MERN stack.  
This project is part of the **Delta Batch @ Apna College** under the guidance of [Shradha Didi](https://www.linkedin.com/in/shraddha-khapra).  
It is designed as a large-scale, production-style application and aims to cover real-world features of Airbnb.

## 🚀 Features (Planned/Current)
- User registration & authentication
- Create, edit, and delete listings with images (CRUD)
- Browse/search/filter listings
- Responsive, modern UI (mobile & desktop)
- Location-based search and map integration
- Booking and reservation management
- Ratings and reviews for listings
- Secure user profile and dashboard

## 🛠️ Tech Stack# Airbnb Home Listing Site Clone 🏠

> A comprehensive full-stack accommodation booking platform built with MERN Stack. This project showcases my journey of learning modern web development through hands-on implementation of real-world features.

![JavaScript](https://img.shields.io/badge/JavaScript-64.2%25-yellow) ![EJS](https://img.shields.io/badge/EJS-29.4%25-green) ![CSS](https://img.shields.io/badge/CSS-6.4%25-blue)

---

## 🚀 About This Project

I'm **Harsh Kushwah**, currently building this Airbnb clone as part of my full-stack development journey with **Shradha Didi's Delta Batch at Apna College**. This project represents my hands-on learning experience with the MERN stack, implementing production-ready features step by step.

---

## 📈 Development Journey

### 🎯 **Phase 1: Foundation & Core Features** (Completed ✅)

In the first phase, I focused on building the fundamental architecture and basic CRUD functionality:

**What I Built:**
- ✅ **Complete Listing Management System**
  - Designed and implemented the listing model using Mongoose
  - Created full CRUD operations (Create, Read, Update, Delete) for property listings
  - Built responsive listing cards and detail pages

- ✅ **Database Architecture**
  - Set up MongoDB connection with proper schema design
  - Implemented data validation at the database level
  - Created seed data for testing and development

- ✅ **User Interface Development**
  - Integrated EJS templating engine for dynamic content
  - Implemented responsive design using Bootstrap 5
  - Created intuitive navigation and user-friendly forms

- ✅ **Server Infrastructure**
  - Built Express.js server with proper routing structure
  - Implemented RESTful API endpoints
  - Added basic error handling and middleware setup

---

### 🔥 **Phase 2: Authentication & Advanced Features** (Latest Update ✅)

Just completed Phase 2, where I implemented comprehensive user management and security features:

**What I Accomplished:**

#### 🔐 **User Authentication System**
- **Built complete signup/login functionality** using Passport.js
- **Implemented secure password hashing** with bcrypt
- **Created session management** using express-session
- **Added user model** with proper authentication middleware
- **Developed protected routes** to secure user-specific features

#### ⭐ **Review & Rating Feature**
- **Designed review system** allowing users to rate and review listings
- **Created review model** with proper user associations  
- **Implemented review authorization** - users can only delete their own reviews
- **Added rating aggregation** and display on listing pages

#### 🛡️ **Security & Validation Implementation**
- **Integrated Joi validation** for comprehensive server-side validation
- **Created custom middleware functions:**
  - `isLoggedIn` - Protects routes requiring authentication
  - `isOwner` - Ensures only listing owners can modify their listings
  - `isReviewAuthor` - Validates review ownership
  - `validateListing` & `validateReview` - Schema validation middleware

#### 🔧 **Error Handling & User Experience**
- **Built custom error handling system** with ExpressError class
- **Implemented async error wrapper** (wrapAsync) for clean error management
- **Added flash messaging system** for user feedback
- **Created user-friendly error pages** with proper navigation

#### 📱 **Enhanced User Interface**
- **Updated navigation bar** with dynamic login/logout states
- **Created signup and login pages** with form validation
- **Implemented conditional rendering** based on user authentication
- **Added flash message displays** for success/error notifications

---

## 🛠️ Technology Stack

**Frontend:**
- **EJS** - Template engine for dynamic HTML generation
- **Bootstrap 5** - Responsive CSS framework
- **Custom CSS** - Additional styling and animations
- **JavaScript** - Client-side interactivity

**Backend:**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Passport.js** - Authentication middleware
- **Express-session** - Session management

**Database:**
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - Object modeling for MongoDB

**Security & Validation:**
- **Joi** - Schema validation library
- **bcrypt** - Password hashing
- **connect-flash** - Flash messaging

---

## 📂 My Project Structure

```
📁 airbnb-homeListing-site-clone/
│
├── 📁 models/                    # Database Models
│   ├── 📄 listing.js            # Listing schema & model
│   ├── 📄 review.js             # Review schema (Phase 2)
│   └── 📄 user.js               # User authentication model (Phase 2)
│
├── 📁 routes/                    # API Routes
│   ├── 📄 listing.js            # Listing CRUD routes
│   ├── 📄 review.js             # Review management (Phase 2)
│   └── 📄 user.js               # Authentication routes (Phase 2)
│
├── 📁 views/                     # EJS Templates
│   ├── 📁 includes/
│   │   ├── 📄 navbar.ejs        # Navigation component
│   │   └── 📄 flash.ejs         # Flash messages (Phase 2)
│   ├── 📁 listings/
│   │   ├── 📄 index.ejs         # All listings page
│   │   ├── 📄 show.ejs          # Listing details
│   │   ├── 📄 new.ejs           # Create listing form
│   │   └── 📄 edit.ejs          # Edit listing form
│   ├── 📁 users/                # User Pages (Phase 2)
│   │   ├── 📄 signup.ejs        # User registration
│   │   └── 📄 login.ejs         # User login
│   └── 📄 error.ejs             # Error handling page (Phase 2)
│
├── 📁 utils/                     # Utility Functions (Phase 2)
│   ├── 📄 ExpressError.js       # Custom error class
│   └── 📄 wrapAsync.js          # Async error wrapper
│
├── 📁 public/                    # Static Assets
│   ├── 📁 css/
│   │   └── 📄 style.css         # Custom styling
│   └── 📁 js/
│       └── 📄 script.js         # Client-side JavaScript
│
├── 📁 init/                      # Database Setup
│   └── 📄 index.js              # Seed data script
│
├── 📄 middleware.js              # Custom middleware (Phase 2)
├── 📄 schema.js                  # Joi validation schemas (Phase 2)
├── 📄 app.js                     # Main application file
├── 📄 package.json               # Project dependencies
└── 📄 .env                       # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites I Used:
- Node.js (v18+)
- MongoDB (MongoDB Atlas)
- Git for version control

### How to Run This Project:

1. **Clone my repository:**
   ```bash
   git clone https://github.com/harsh-pro-max/airbnb-homeListing-site-clone.git
   cd airbnb-homeListing-site-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   PORT=3000
   ```

4. **Initialize database (optional):**
   ```bash
   node init/index.js
   ```

5. **Start the server:**
   ```bash
   npm start
   ```

6. **Visit the application:**
   ```
   http://localhost:3000
   ```

---

## 📦 Key Dependencies I Used

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.5.0",
  "ejs": "^3.1.9",
  "method-override": "^3.0.0",
  "joi": "^17.9.2",
  "passport": "^0.6.0",
  "passport-local": "^1.0.0",
  "passport-local-mongoose": "^8.0.0",
  "express-session": "^1.17.3",
  "connect-flash": "^0.1.1",
  "bcrypt": "^5.1.0"
}
```

---

## 🎯 What's Next? (Phase 3 Roadmap)

My upcoming features and improvements:

- [ ] **React.js Frontend Migration** - Modern component-based architecture
- [ ] **Image Upload Integration** - Cloudinary for property photos
- [ ] **Advanced Search & Filters** - Location, price, amenities
- [ ] **Booking System** - Date availability and reservations
- [ ] **Payment Gateway** - Secure payment processing
- [ ] **Map Integration** - Interactive location display
- [ ] **Real-time Notifications** - Email and in-app alerts
- [ ] **User Dashboard** - Profile management and booking history
- [ ] **Mobile App** - React Native implementation

---

## 💡 What I Learned

Through this project, I've gained hands-on experience with:

✅ **Full-Stack Development** - End-to-end application building  
✅ **Database Design** - Schema modeling and relationships  
✅ **Authentication** - Secure user management systems  
✅ **Authorization** - Role-based access control  
✅ **Input Validation** - Client and server-side validation  
✅ **Error Handling** - Robust error management  
✅ **Security** - Web application security best practices  
✅ **Code Organization** - Scalable project structure  
✅ **API Development** - RESTful API design patterns  
✅ **Version Control** - Git workflow and collaboration  

---

## 🌟 Key Features Demo

### 🏠 **Listing Management**
- Browse all available properties
- View detailed property information
- Create new listings (authenticated users)
- Edit/delete your own listings

### 👤 **User System**
- Secure user registration and login
- Session-based authentication
- User profile management
- Protected user-specific features

### ⭐ **Review System**
- Rate and review properties
- View aggregated ratings
- Manage your own reviews
- Owner and reviewer identification

---

## 🤝 Connect with Me

**Harsh Kushwah**  
🎓 **Student** | Full-Stack Developer in Training  
📚 **Delta Batch @ Apna College**  

- 🐱 **GitHub:** [@harsh-pro-max](https://github.com/harsh-pro-max)
- 💼 **LinkedIn:** Connect for updates on my learning journey
- 🌐 **Project:** [Live Repository](https://github.com/harsh-pro-max/airbnb-homeListing-site-clone)

---

## 🙏 Acknowledgments

- **Shradha Didi** - My mentor at Apna College for excellent guidance
- **Delta Batch Community** - Fellow learners for support and collaboration
- **Apna College** - For providing structured full-stack curriculum
- **Open Source Community** - For amazing tools and resources

---

## 📜 License

This project is built for educational purposes as part of my learning journey at Apna College.

---

**⭐ If you found this project helpful, please give it a star!**

*Made with ❤️ by Harsh Kushwah | Learning Full-Stack Development*

---

*Last Updated: October 26, 2025*
- **Frontend:** React.js, EJS, Bootstrap/CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Other:** JWT Auth, REST API, Cloudinary for image hosting (planned), Mapbox/Google Maps (planned)

## 🏁 Getting Started

**Clone the repository:**

**Install dependencies:**
- Frontend (`client/`):
- Backend (`api/`):

**Set up environment variables:**  
Create required `.env` files in each folder (`api/`, `client/`).

**Start the development servers:**

## 📚 Motivation

This project is being built as a hands-on learning exercise during the Apna College Delta Batch, taking inspiration from real Airbnb’s workflows. It’s meant to practice full-stack MERN concepts, code organization, and industry-style teamwork and UI/UX.

## 🙋‍♂️ Author/Contributor

- Harsh Kushwah
- Apna College Delta Batch (Mentor: Shradha Didi)

---