import {useEffect} from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";  

const RequireAuth = ({ allowedRoles }) => {
    const { currentUser } = useSelector((state) => state.user);
    const Navigate = useNavigate();

    let isRole = currentUser?.roles?.some(x => allowedRoles?.includes(x));
    //const location = useLocation();
    if (!isRole) {
      Navigate("unauthorized", { replace: true });
    }
    // if (!auth)  {
    //   return <Navigate to="/home" replace state={{ from: location }} />;
    // }
    useEffect(() => {
       console.log("require ran");
    }, []);

    return (
      <>
        { isRole && <Outlet /> }
      </>
    )
}
export default RequireAuth;
//user?.role?.find(x => allowedRoles?.includes(x))