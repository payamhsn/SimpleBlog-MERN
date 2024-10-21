import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/miniPage/About";
import PrivacyPolicy from "../pages/miniPage/PrivacyPolicy";
import ContactUs from "../pages/miniPage/ContactUs";
import SingleBlog from "../pages/blogs/singleBlog/SingleBlog";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import AddPost from "../pages/admin/post/AddPost";
import ManagePosts from "../pages/admin/post/ManagePosts";
import ManageUser from "../pages/admin/user/ManageUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "add-new-post",
            element: <AddPost />,
          },
          {
            path: "manage-items",
            element: <ManagePosts />,
          },

          {
            path: "users",
            element: <ManageUser />,
          },
        ],
      },
    ],
  },
]);

export default router;
