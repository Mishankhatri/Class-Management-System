import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import AdminPanel from "./../../AdminPanel";
import StudentPanel from "./../../StudentPanel";
import TeacherPanel from "./../../TeacherPanel";

const PrivateRoute = ({ component: Component, navigate }) => {
  const auth = useSelector((state) => state.auth);

  //auth.user.admin / .student/ .teacher
  if (auth.isLoading) {
    return <Loading />;
  } else if (!auth.isAuthenticated) {
    return <Navigate replace to={navigate} />;
  } else {
    if (auth.user.admin) return <AdminPanel />;
    else if (auth.user.teacher) return <TeacherPanel />;
    else return <StudentPanel />;
  }
};

export default PrivateRoute;
