import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthServiceContext();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute