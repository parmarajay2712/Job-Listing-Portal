import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'

// Layout component for public pages with Navbar and Footer
const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
)

// Layout component for auth pages (Login/Signup) without Navbar/Footer
const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    {children}
  </div>
)

// Layout component for admin pages with Navbar but no Footer
const AdminLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
  </div>
)

// 404 Not Found component
const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-4 py-2 bg-[#6A38C2] text-white rounded hover:bg-[#5b30a6]"
      >
        Go to Home
      </button>
    </div>
  </div>
)

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout><Home /></MainLayout>,
  },
  {
    path: '/login',
    element: <AuthLayout><Login /></AuthLayout>,
  },
  {
    path: '/signup',
    element: <AuthLayout><Signup /></AuthLayout>,
  },
  {
    path: "/jobs",
    element: <MainLayout><Jobs /></MainLayout>,
  },
  {
    path: "/description/:id",
    element: <MainLayout><JobDescription /></MainLayout>,
  },
  {
    path: "/browse",
    element: <MainLayout><Browse /></MainLayout>,
  },
  {
    path: "/profile",
    element: <MainLayout><Profile /></MainLayout>,
  },
  // Admin routes with proper nesting
  {
    path: "/admin",
    element: <Navigate to="/admin/companies" replace />,
  },
  {
    path: "/admin/companies",
    element: (
      <AdminLayout>
        <ProtectedRoute>
          <Companies />
        </ProtectedRoute>
      </AdminLayout>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <AdminLayout>
        <ProtectedRoute>
          <CompanyCreate />
        </ProtectedRoute>
      </AdminLayout>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <AdminLayout>
        <ProtectedRoute>
          <CompanySetup />
        </ProtectedRoute>
      </AdminLayout>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <AdminLayout>
        <ProtectedRoute>
          <AdminJobs />
        </ProtectedRoute>
      </AdminLayout>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <AdminLayout>
        <ProtectedRoute>
          <PostJob />
        </ProtectedRoute>
      </AdminLayout>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <AdminLayout>
        <ProtectedRoute>
          <Applicants />
        </ProtectedRoute>
      </AdminLayout>
    ),
  },
  // 404 Not Found route - must be last
  {
    path: "*",
    element: <NotFound />,
  },
])

function App() {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
