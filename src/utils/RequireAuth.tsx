import { useLocation, Navigate } from "react-router-dom";
import { AUTH_KEY } from "../constants/Cookies";
import { getCookies } from "./cookies";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = {
    token: getCookies(AUTH_KEY),
  };
  let location = useLocation();

  if (!auth.token) {
    // Redirect them to the /login page, if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
