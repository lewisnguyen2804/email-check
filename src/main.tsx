import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router"; // ✅ Use react-router-dom for BrowserRouter
import PrivateRoute from "./components/core/private-route";
import "./index.css";
import Emails from "./views/emails";
import ErrorPermission from "./views/error-permission";
import Users from "./views/users";
import { Authenticate } from "./views/authenticate";
import { LoadingBarContainer } from "react-top-loading-bar";

// You define routes as objects here — no JSX inside
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        { path: "/", element: <Navigate to="/email" /> },
        { path: "/user", element: <Users /> },
        { path: "/email", element: <Emails /> },
        { path: "*", element: <ErrorPermission /> },
      ],
    },
    { path: "/authenticate", element: <Authenticate /> },
  ],
  {
    basename: "/email",
  }
);

createRoot(document.getElementById("root")!).render(
  <LoadingBarContainer>
    <RouterProvider router={router} />
  </LoadingBarContainer>
);
