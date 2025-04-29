# VertxAI - Creator Dashboard (Frontend)

This is the **frontend** repository for the VertxAI Creator Dashboard assignment. The application allows creators to manage their profiles, earn credits, and interact with a content feed through a clean and responsive interface.

> 🛠️ Built with **React.js**, **Tailwind CSS**, **Material UI**, and **React Router**

---

## 🚀 Live Deployment

- Deployed on **Vercel**
- Backend API connected via **Railway** deployment

---

## 📚 Features Implemented

### ✅ Authentication
- Login & Register pages using JWT
- Role-based access control for **User** and **Admin**

### ✅ User Dashboard
- Users can:
  - View profile details
  - Edit and complete profile (username required)
  - See current credit balance and activity stats

### ✅ Feed Page (`/feed`)
- Aggregated content from:
  - **Static Twitter dummy data** (4 posts)
  - **Live Reddit API**
- Users can:
  - Save content
  - Simulate sharing content (copy link)
  - Report inappropriate content

### ✅ Admin Features
- Access to **Users Page** showing all registered users
- Navigate to any single user’s detail page
- Can **edit credit points** of any user

### ⚙️ Design Considerations
- **Credit Editing Limited to Single User View**:
  - Admins can only edit credits from a user's detail page.
  - This was a deliberate UX decision to reduce confusion as the user base scales, preventing errors from bulk or table editing.

---

## 🧰 Tech Stack

| Category        | Tech Used                        |
|----------------|----------------------------------|
| Framework       | React.js                         |
| Styling         | Tailwind CSS + Material UI       |
| Routing         | React Router                     |
| API Integration | Axios                            |
| Deployment      | Vercel                           |

---

## 📁 Pages Overview

| Route          | Description                         |
|----------------|-------------------------------------|
| `/login`       | User login page                     |
| `/register`    | User registration page              |
| `/dashboard`   | User profile and stats              |
| `/feed`        | Feed aggregator view                |
| `/admin/users` | Admin view of all users             |
| `/admin/users/:id` | Admin edit credits of single user |

---

## 🔄 Future Improvements
- Integrate live Twitter and LinkedIn feeds
- Add filtering/searching to the feed
- Implement toast notifications and validations
- Improve credit history tracking

---
