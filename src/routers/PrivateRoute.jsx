import { useContext } from "react";
// import { Navigate } from "react-router-dom";
import { AuthContext } from "../pages/providers/AuthProvider";
import { Navigate } from "react-router";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner text-blue-600 loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
