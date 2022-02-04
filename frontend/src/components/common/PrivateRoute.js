import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const PrivateRoute = ({ component: Component, navigate }) => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLoading) {
    return <Loading />;
  } else if (!auth.isAuthenticated) {
    return <Navigate replace to={navigate} />;
  } else {
    return <Component />;
  }
};

export default PrivateRoute;
