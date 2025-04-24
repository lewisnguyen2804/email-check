import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "usehooks-ts";

const PrivateRoute = () => {
  const [secret] = useLocalStorage("secret", "");

  if (!secret) return <Navigate to="/authenticate" />;
  return <Outlet />;
};

export default PrivateRoute;
