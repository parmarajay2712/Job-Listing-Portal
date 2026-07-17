import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import RecruiterDashboard from "./components/admin/RecruiterDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Layout component for public pages with Navbar and Footer
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

// Layout component for auth pages (Login/Signup) without Navbar/Footer
const AuthLayout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    {children}
  </div>
);

// Layout component for protected pages with Navbar but no Footer
const ProtectedLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
  </div>
);

// Layout component for admin pages
const AdminLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
  </div>
);

// 404 Not Found component
const NotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-4">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-4 py-2 bg-[#6A38C2] text-white rounded hover:bg-[#5b30a6] min-h-[44px]"
      >
        Go to Home
      </button>
    </div>
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicLayout>
        <Home />
      </PublicLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "/jobs",
    element: (
      <PublicLayout>
        <Jobs />
      </PublicLayout>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <PublicLayout>
        <JobDescription />
      </PublicLayout>
    ),
  },
  {
    path: "/browse",
    element: (
      <PublicLayout>
        <Browse />
      </PublicLayout>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // admin ke liye yha se start hoga
  {
    path: "/recruiter/dashboard",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <RecruiterDashboard />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
