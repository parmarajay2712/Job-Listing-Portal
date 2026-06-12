![header](https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:1a3a6e,100:0d2137&height=220&section=header&text=Job%20Listing%20Portal&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Full-Stack%20MERN%20Platform%20%E2%80%94%20Connecting%20Job%20Seekers%20with%20Recruiters&descAlignY=58&descSize=18&animation=fadeIn)

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=60A5FA&center=true&vCenter=true&width=650&lines=JWT+Secured;Role-Based+Access+Control;Resume+and+Profile+Upload;Real-Time+Application+Tracking;Mobile+Responsive+Dark+Mode)](https://git.io/typing-svg)

<br/>

![Node.js](https://img.shields.io/badge/Node.js-v16%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-8.4.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.19.2-000000?style=for-the-badge&logo=express&logoColor=white)

![Redux](https://img.shields.io/badge/Redux_Toolkit-2.2.6-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.3.0-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![License](https://img.shields.io/badge/License-ISC-60A5FA?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-22c55e?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)
![PRs](https://img.shields.io/badge/PRs-Welcome-F97316?style=for-the-badge)

<br/>

**[🚀 Live Demo](#-live-demo)** &nbsp;·&nbsp; **[📖 API Docs](#-api-reference)** &nbsp;·&nbsp; **[🐛 Report Bug](https://github.com/parmarajay2712/Job-Listing-Portal/issues)** &nbsp;·&nbsp; **[💡 Request Feature](https://github.com/parmarajay2712/Job-Listing-Portal/issues)**

</div>

---

## 📋 Table of Contents

| # | Section |
|---|---------|
| 1 | [🎯 Overview](#-overview) |
| 2 | [✨ Features](#-features) |
| 3 | [🛠️ Tech Stack](#️-tech-stack) |
| 4 | [🔄 How It Works](#-how-it-works) |
| 5 | [📁 Project Structure](#-project-structure) |
| 6 | [⚡ Getting Started](#-getting-started) |
| 7 | [⚙️ Environment Variables](#️-environment-variables) |
| 8 | [📖 Running the App](#-running-the-app) |
| 9 | [📡 API Reference](#-api-reference) |
| 10 | [🗄️ Database Schema](#️-database-schema) |
| 11 | [🔒 Authentication & Security](#-authentication--security) |
| 12 | [🔮 Future Plans](#-future-plans) |
| 13 | [👥 Contributing](#-contributing) |
| 14 | [📝 License](#-license) |

---

## 🖼️ Screenshots

<div align="center">
### 🏠 Home Page — Hero & Featured Jobs
<img src="Imagesss\home page.png" alt="Home Page"/>
<br/><br/>
 
### 🔐 Login & Signup Pages
<img src="Imagesss\login.png" width="100%" alt="Login Page"/>
<br/><br/>
 
### 💼 Job Browse — Filters & Search
<img src="Imagesss\jobs.png" width="100%" alt="Job Browse"/>
<br/><br/>
 
### 📋 Job Details & Apply
<img src="Imagesss\job detalish.png" width="100%" alt="Job Details"/>
<br/><br/>
 
<table>
  <tr>
    <td width="50%" align="center">
      <strong>👤 Student Profile & Resume Upload</strong><br/><br/>
      <img src="Imagesss\student profileee.png" width="100%" alt="Student Profile"/>
    </td>
    <td width="50%" align="center">
      <strong>🏢 Recruiter Dashboard</strong><br/><br/>
      <img src="Imagesss\Recruiter Dashboard.png" width="100%" alt="Recruiter Dashboard"/>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <br/><strong>📊 Applicants Management</strong><br/><br/>
      <img src="Imagesss\Applicants Management (1).png" width="100%" alt="Applicants Table"/>
    </td>
    <td width="50%" align="center">
      <br/><strong>📱 Mobile Responsive View</strong><br/><br/>
      <img src="Imagesss\home page.png" width="100%" alt="Mobile View"/>
    </td>
  </tr>
</table>
> 📸 **Replace these placeholders** with real screenshots once your app is running.
> Take screenshots → save to an `images/` folder in your repo → swap each URL with `./images/your-screenshot.png`
 
</div>

---

## 🎯 Overview

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════╗
║   Job Listing Portal is a modern, full-featured job marketplace          ║
║   platform built with the MERN stack.                                    ║
║                                                                           ║
║   ✦ Role-based access — Students & Recruiters                            ║
║   ✦ JWT-secured with HTTP-only cookie sessions                           ║
║   ✦ Cloud file storage via Cloudinary & ImageKit                         ║
║   ✦ Rate-limited, Helmet-secured REST API                                ║
╚══════════════════════════════════════════════════════════════════════════╝
```

</div>

> **A full-stack MERN application connecting job seekers with recruiters** — built with security, scalability, and developer experience in mind.

### 💡 Why This Project?

| ❌ Common Pain Points | ✅ Job Listing Portal |
|:----------------------|:---------------------|
| No role separation for seekers and recruiters | RBAC: Student / Recruiter roles with distinct dashboards |
| No application tracking after submission | Full lifecycle: Pending → Accepted / Rejected |
| Media uploads scattered or unsecured | Cloudinary + ImageKit with multer validation |
| No security beyond basic auth | JWT, bcrypt, Helmet, rate limiting, CORS |
| Hard to deploy and run locally | Single-command dev with Concurrently |

### 👥 Built For

```
Students & fresh graduates looking for job opportunities
Recruiters managing job postings and applicant pipelines
Developers learning full-stack MERN with real-world patterns
Teams building internal job boards or recruitment tools
```

---

## ✨ Features

<details open>
<summary><h3>🔐 Authentication & Authorization</h3></summary>

| Feature | Description |
|---------|-------------|
| 📧 **Email Registration** | Sign up with email, password, and role selection |
| 🔑 **JWT Login/Logout** | Secure token-based sessions via HTTP-only cookies |
| 🎭 **Role-Based Access** | Student and Recruiter roles with separate capabilities |
| 🔒 **Password Hashing** | bcryptjs for secure password storage |
| 🛡️ **Protected Routes** | Middleware-guarded API endpoints |

</details>

<details>
<summary><h3>👤 User & Profile Management</h3></summary>

| Feature | Description |
|---------|-------------|
| 🖼️ **Profile Photo** | Upload and manage profile pictures via Cloudinary |
| 📄 **Resume Upload** | Store and retrieve resumes with original filename |
| 📝 **Bio & Skills** | Rich profile with bio text and skill tags |
| 📞 **Contact Info** | Phone number and contact detail management |
| ✏️ **Profile Updates** | Full profile editing with immediate persistence |

</details>

<details>
<summary><h3>🏢 Company Management</h3></summary>

| Feature | Description |
|---------|-------------|
| 🏗️ **Company Registration** | Recruiters create verified company profiles |
| 🖼️ **Company Logo** | Upload logos stored via cloud media services |
| 📋 **Company Dashboard** | Manage all companies registered by the recruiter |
| 🔗 **Company Details** | Website, location, description, and branding |

</details>

<details>
<summary><h3>💼 Job Management</h3></summary>

| Feature | Description |
|---------|-------------|
| 📢 **Post Jobs** | Create detailed job listings with requirements |
| 💰 **Salary & Experience** | Specify salary range and experience level |
| 🏷️ **Job Type** | Full-time, Part-time, Contract, Internship, etc. |
| 🔍 **Search & Filter** | Keyword search across job titles and descriptions |
| ✏️ **Edit Postings** | Recruiters can update their job listings at any time |
| 📊 **Admin Dashboard** | Dedicated recruiter view for managing own jobs |

</details>

<details>
<summary><h3>📋 Application Tracking</h3></summary>

| Feature | Description |
|---------|-------------|
| 🚀 **One-Click Apply** | Students apply directly from job detail pages |
| 📜 **Application History** | Track all jobs a student has applied to |
| 🔄 **Status Updates** | Pending → Accepted / Rejected lifecycle |
| 👥 **Applicant View** | Recruiters see all applicants per job posting |
| 🔔 **Status Management** | Recruiters update individual application statuses |

</details>

<details>
<summary><h3>🎨 UI & Experience</h3></summary>

| Feature | Description |
|---------|-------------|
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |
| 🌙 **Dark Mode** | Full dark mode support via Next Themes |
| ✨ **Animations** | Smooth transitions powered by Framer Motion |
| 🎠 **Job Carousel** | Featured jobs and category carousel components |
| 🔔 **Toast Notifications** | Real-time feedback for every user action |

</details>

<details>
<summary><h3>🛡️ Security</h3></summary>

| Feature | Description |
|---------|-------------|
| 🪖 **Helmet.js** | HTTP security headers (CSP, HSTS, X-Frame-Options) |
| 🚦 **Rate Limiting** | 100 requests per 15 minutes per IP |
| 🌐 **CORS** | Whitelist-only frontend origin configuration |
| 📁 **File Validation** | Multer with size limits (10KB) and type checking |
| 🔐 **HTTP-only Cookies** | Tokens never accessible via JavaScript |

</details>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radixui)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens)
![bcryptjs](https://img.shields.io/badge/bcryptjs-EA580C?style=flat-square)
![Helmet](https://img.shields.io/badge/Helmet.js-6B7280?style=flat-square)
![Multer](https://img.shields.io/badge/Multer-16A34A?style=flat-square)

### Infrastructure & Media
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary)
![ImageKit](https://img.shields.io/badge/ImageKit-0EA5E9?style=flat-square)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)

</div>

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend** | React | 18.2.0 | UI library |
| | React Router DOM | 6.23.1 | Client-side routing |
| | Redux Toolkit | 2.2.6 | Global state management |
| | Redux Persist | 6.0.0 | State persistence across reloads |
| | Axios | 1.7.2 | HTTP requests to backend |
| | Tailwind CSS | 3.4.4 | Utility-first styling |
| | Vite | 5.2.0 | Fast dev server & bundler |
| | Radix UI | ^1.0+ | Accessible UI primitives |
| | Framer Motion | 11.3.7 | Animations |
| | Sonner | 1.5.0 | Toast notifications |
| **Backend** | Node.js | v14+ | JavaScript runtime |
| | Express | 4.19.2 | Web framework |
| | Mongoose | 8.4.1 | MongoDB ODM |
| | JSON Web Token | 9.0.2 | Token-based auth |
| | bcryptjs | 2.4.3 | Password hashing |
| | Helmet | 7.1.0 | HTTP security headers |
| | Express Rate Limit | 7.2.0 | Request throttling |
| | Multer | 1.4.5-lts.1 | File upload handling |
| | Cloudinary | 2.3.0 | Cloud image storage |
| | ImageKit | 5.0.0 | Image optimization |
| **Dev Tools** | Nodemon | 3.1.3 | Auto-restart on file change |
| | Concurrently | 9.2.1 | Run frontend + backend together |
| | ESLint | 8.57.0 | Code quality linting |

---

## 🔄 How It Works

### System Architecture

```
                    ┌──────────────────────────────┐
                    │       Client Browser          │
                    │   React + Redux + Vite        │
                    └──────────────┬───────────────┘
                                   │  HTTP / Axios
                    ┌──────────────▼───────────────┐
                    │       Express REST API        │
                    │   Node.js · Helmet · CORS     │
                    │   Rate Limit · JWT Middleware │
                    └──────┬───────────────┬────────┘
                           │               │
           ┌───────────────▼──┐   ┌────────▼──────────────┐
           │    MongoDB Atlas  │   │   Cloudinary /         │
           │  (via Mongoose)   │   │   ImageKit             │
           │  Users · Jobs     │   │  Profile photos        │
           │  Companies ·      │   │  Resumes · Logos       │
           │  Applications     │   └───────────────────────┘
           └──────────────────┘
```

### Application Lifecycle

```
  ┌──────────┐    ┌────────────────┐    ┌──────────────────┐    ┌───────────┐
  │ Student  │───▶│  Browses Jobs  │───▶│   Applies to     │───▶│  Pending  │
  │ signs up │    │  Filters search│    │   job posting    │    │  status   │
  └──────────┘    └────────────────┘    └──────────────────┘    └─────┬─────┘
                                                                       │
                  ┌────────────────────────────────────────────────────▼────┐
                  │                   Recruiter Dashboard                    │
                  │   Views applicants → Updates status: Accepted / Rejected │
                  └──────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
  User Login
      │
      ▼
  bcrypt.compare() — verify password hash
      │
      ├──▶ JWT signed with SECRET_KEY ──▶ Set as HTTP-only cookie (token)
      │
      └──▶ Protected routes read cookie via isAuthenticated middleware
                │
                ▼
           Decoded userId + role attached to req object
                │
                ▼
           Controllers use req.id / req.role for authorization
```

---

## 📁 Project Structure

```
Job-Listing-Portal/
│
├── backend/
│   ├── controllers/
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   ├── utils/
│   │   ├── cloudinary.js
│   │   ├── datauri.js
│   │   ├── db.js
│   │   └── imagekit.js
│   ├── index.js
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── admin/
        │   │   ├── AdminJobs.jsx
        │   │   ├── Applicants.jsx
        │   │   ├── Companies.jsx
        │   │   ├── PostJob.jsx
        │   │   └── ProtectedRoute.jsx
        │   ├── auth/
        │   │   ├── Login.jsx
        │   │   └── Signup.jsx
        │   ├── shared/
        │   │   ├── Navbar.jsx
        │   │   └── Footer.jsx
        │   └── ui/
        ├── hooks/
        │   ├── useGetAllJobs.jsx
        │   ├── useGetAppliedJobs.jsx
        │   └── useGetCompanyById.jsx
        ├── redux/
        │   ├── store.js
        │   ├── authSlice.js
        │   ├── jobSlice.js
        │   ├── companySlice.js
        │   └── applicationSlice.js
        └── utils/
            └── constant.js
```

---

## ⚡ Getting Started

### Prerequisites

```bash
node  >= v16.0.0
npm   >= v8.0.0
git
MongoDB (local) or MongoDB Atlas account
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/parmarajay2712/Job-Listing-Portal.git
cd Job-Listing-Portal

# 2. Install backend dependencies
cd backend && npm install && cd ..

# 3. Install frontend dependencies
cd frontend && npm install && cd ..
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# DATABASE
MONGO_URI=mongodb://localhost:27017/job-portal

# SERVER
PORT=8000
NODE_ENV=development

# JWT
SECRET_KEY=your-super-secret-key-minimum-32-characters

# CORS
FRONTEND_URL=http://localhost:5173

# CLOUDINARY
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# IMAGEKIT
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/job-portal` |
| `PORT` | Backend server port | `8000` |
| `SECRET_KEY` | JWT signing secret (min 32 chars) | `your-long-secret-key` |
| `FRONTEND_URL` | React dev server URL for CORS | `http://localhost:5173` |
| `CLOUDINARY_NAME` | Your Cloudinary cloud name | `mycloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `abc123xyz` |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | `public_xxxx` |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | `private_xxxx` |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit delivery URL | `https://ik.imagekit.io/xxx` |

> **Never commit your `.env` file.** It is already in `.gitignore`.

---

## 📖 Running the App

**Option 1 — Two terminals:**

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# API running at http://localhost:8000

# Terminal 2 — Frontend
cd frontend
npm run dev
# App running at http://localhost:5173
```

**Option 2 — Single command from root:**

```bash
npm run dev
```

**Production:**

```bash
cd frontend && npm run build
cd backend && npm start
```

---

## 📡 API Reference

**Base URL:** `http://localhost:8000/api/v1`

> All protected endpoints require a valid JWT token sent via the `token` HTTP-only cookie.

### User Endpoints

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| `POST` | `/user/register` | Register a new user | No |
| `POST` | `/user/login` | Login and receive JWT cookie | No |
| `GET` | `/user/logout` | Logout and clear cookie | Yes |
| `POST` | `/user/profile/update` | Update profile, photo, resume | Yes |

### Company Endpoints

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| `POST` | `/company/register` | Register a new company | Yes |
| `GET` | `/company/get` | Get all companies by recruiter | Yes |
| `GET` | `/company/get/:id` | Get company by ID | Yes |
| `PUT` | `/company/update/:id` | Update company info | Yes |

### Job Endpoints

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| `POST` | `/job/post` | Create a new job posting | Yes |
| `GET` | `/job/get` | Get all jobs (optional `?keyword=`) | Yes |
| `GET` | `/job/get/:id` | Get job by ID | Yes |
| `GET` | `/job/getadminjobs` | Get recruiter's own jobs | Yes |
| `PUT` | `/job/update/:id` | Update job details | Yes |

### Application Endpoints

| Method | Endpoint | Description | Auth |
|:------:|----------|-------------|:----:|
| `POST` | `/application/apply/:id` | Apply for a job | Yes |
| `GET` | `/application/get` | Get user's applications | Yes |
| `GET` | `/application/:id/applicants` | Get all applicants for a job | Yes |
| `POST` | `/application/status/:id/update` | Update application status | Yes |

---

## 🗄️ Database Schema

<details open>
<summary><strong>User Model</strong></summary>

```javascript
{
  fullname:    String (required),
  email:       String (required, unique),
  phoneNumber: String (required),
  password:    String (required, bcrypt hashed),
  role:        String (enum: ['student', 'recruiter']),
  profile: {
    bio:                String,
    skills:             [String],
    resume:             String (Cloudinary URL),
    resumeOriginalName: String,
    company:            ObjectId ref Company,
    profilePhoto:       String (URL)
  }
}
```

</details>

<details>
<summary><strong>Company Model</strong></summary>

```javascript
{
  name:        String (required, unique),
  description: String,
  website:     String,
  location:    String,
  logo:        String (Cloudinary URL),
  userId:      ObjectId ref User (required)
}
```

</details>

<details>
<summary><strong>Job Model</strong></summary>

```javascript
{
  title:           String (required),
  description:     String (required),
  requirements:    [String],
  salary:          Number (required),
  experienceLevel: Number (required),
  location:        String (required),
  jobType:         String (required),
  position:        Number (required),
  company:         ObjectId ref Company (required),
  created_by:      ObjectId ref User (required),
  applications:    [ObjectId ref Application]
}
```

</details>

<details>
<summary><strong>Application Model</strong></summary>

```javascript
{
  job:       ObjectId ref Job (required),
  applicant: ObjectId ref User (required),
  status:    String (enum: ['pending', 'accepted', 'rejected'], default: 'pending')
}
```

</details>

---

## 🔒 Authentication & Security

### Token Storage

```
Token Type   │ Storage
─────────────┼──────────────────────────────────
JWT Token    │ HTTP-only cookie (no JS access)
Password     │ bcryptjs hash in MongoDB
```

### Role Permissions

| Permission | Student | Recruiter |
|:-----------|:-------:|:---------:|
| Browse jobs | ✅ | ✅ |
| Apply to jobs | ✅ | ❌ |
| View own applications | ✅ | ❌ |
| Create company | ❌ | ✅ |
| Post jobs | ❌ | ✅ |
| Edit own jobs | ❌ | ✅ |
| View applicants | ❌ | ✅ |
| Update applicant status | ❌ | ✅ |

### Security Checklist

- [x] JWT token-based authentication with HTTP-only cookies
- [x] bcryptjs password hashing
- [x] Rate limiting — 100 req / 15 min per IP
- [x] Helmet.js HTTP security headers
- [x] CORS whitelist — frontend URL only
- [x] Multer file validation — size limits and type checks
- [x] Protected API routes via `isAuthenticated` middleware
- [x] MongoDB unique index on email field
- [x] `.env` secrets never committed to repository

---

## 🔮 Future Plans

**Phase 2 — Notifications & Search**
- Email notifications on application status change
- Advanced search with filters (salary range, job type, location)
- In-app notification system

**Phase 3 — Analytics & Engagement**
- Recruiter analytics — views per job, application rates
- Bookmarking / saved jobs for students
- AI-powered job recommendations based on skills

**Phase 4 — Scale & Polish**
- Deployment pipeline with CI/CD
- Multi-language support
- React Native mobile app
- Premium recruiter plan with advanced features

---

## 🚀 Live Demo

Coming soon!

Source code: [github.com/parmarajay2712/Job-Listing-Portal](https://github.com/parmarajay2712/Job-Listing-Portal)

---

## 👥 Contributing

```bash
git checkout -b feature/your-amazing-feature
git commit -m "feat: add your amazing feature"
git push origin feature/your-amazing-feature
```

Commit Convention: `feat:` · `fix:` · `docs:` · `refactor:` · `chore:`

---

## 📝 License

Distributed under the **ISC License**. See [`LICENSE`](LICENSE) for full terms.

---

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:0d2137,50:1a3a6e,100:0f0c29&height=120&section=footer)

<div align="center">

**Built with love using the MERN Stack**

[![GitHub](https://img.shields.io/badge/GitHub-parmarajay2712-181717?style=flat-square&logo=github)](https://github.com/parmarajay2712/Job-Listing-Portal)

**Star this repo if it helped you!**

</div>
