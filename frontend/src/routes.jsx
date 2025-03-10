import { createBrowserRouter } from "react-router-dom";
import {
  AddCompany,
  AdminJobs,
  Applications,
  Browse,
  Companies,
  CompanyDetails,
  Home,
  JobDetails,
  Jobs,
  Login,
  Postjob,
  Profile,
  Signup,
  UpdateJob,
} from "./components";
import ProtectedRoute from "./admin/ProtectedRoutes";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/explore",
    element: <Browse />,
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
  {
    path: "/job/details/:id",
    element: <JobDetails />,
  },

  //Admin routes
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
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
    path: "/admin/companies/add",
    element: (
      <ProtectedRoute>
        <AddCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanyDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/add",
    element: (
      <ProtectedRoute>
        <Postjob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <ProtectedRoute>
        <UpdateJob />
      </ProtectedRoute>
    ),
  },
]);
