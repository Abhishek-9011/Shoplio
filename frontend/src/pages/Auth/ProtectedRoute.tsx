import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = !!localStorage.getItem("token"); // or use context/auth hook

return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;