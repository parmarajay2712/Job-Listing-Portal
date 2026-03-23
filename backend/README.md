# Job Portal Backend

A robust backend for the Job Portal application built with Node.js, Express, and MongoDB.

## Features

- User authentication (signup, login, logout)
- Company registration and management
- Job posting and management
- Job application system
- Role-based access control (student, recruiter)
- Secure JWT authentication
- File upload support (Cloudinary)
- Rate limiting
- Security headers (Helmet)
- Proper error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=mongodb://localhost:27017/job-portal
PORT=8000
SECRET_KEY=your-secret-key-here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

3. Start MongoDB (if using local):
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### User Routes
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user
- `POST /api/v1/user/profile/update` - Update user profile

### Company Routes
- `POST /api/v1/company/register` - Register a company
- `GET /api/v1/company/get` - Get user's companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company

### Job Routes
- `POST /api/v1/job/post` - Post a new job
- `GET /api/v1/job/get` - Get all jobs (with search)
- `GET /api/v1/job/get/:id` - Get job by ID
- `GET /api/v1/job/getadminjobs` - Get admin's jobs

### Application Routes
- `POST /api/v1/application/apply/:id` - Apply for a job
- `GET /api/v1/application/get` - Get user's applications
- `GET /api/v1/application/:id/applicants` - Get job applicants
- `POST /api/v1/application/status/:id/update` - Update application status

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- Security headers with Helmet
- CORS configuration
- Input validation
- File upload restrictions

## Error Handling

All endpoints return proper HTTP status codes and error messages:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Database Models

### User
- fullname, email, phoneNumber, password, role
- profile: bio, skills, resume, profilePhoto

### Company
- name, description, website, location, logo, userId

### Job
- title, description, requirements, salary, location
- jobType, position, experienceLevel
- company (ref), created_by (ref), applications (ref)

### Application
- job (ref), applicant (ref), status

## Development Notes

- The backend uses ES6 modules
- All routes are protected with authentication middleware
- File uploads are handled via Cloudinary
- Database connection includes proper error handling and reconnection logic

## License

ISC
