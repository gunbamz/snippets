import {useEffect} from "react";
import PersistLogin from "./components/PersistLogin";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import Register from "./pages/Register";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import RequireAuth from "./components/RequireAuth";
import PanelPage from "./pages/PanelPage";
import Records from "./pages/Records";
import Pharmacy from "./pages/Pharmacy";
import Appointment from "./pages/Appointment";
import Clinics from "./pages/Clinics";
import Wards from "./pages/Wards";
import NewPatients from "./pages/NewPatients";
import Theatre from "./pages/Theatre";
import Laboratory from "./pages/Laboratory";
import Store from "./pages/Store";
import Accounting from "./pages/Accounting";
import Analytics from "./pages/Analytics";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profiles from "./pages/Profiles";
import User from "./pages/User";
import "./App.css";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const { auth }  = useSelector((state) => state.user);
  const { currentMode }  = useSelector((state) => state.mode);
  //const location = useLocation();
  //const from = location.state?.from || "/";
  //const prevLocation = location.state?.from || "/";
  //console.log(location);
  useEffect(() => {
    console.log(location);
    }, []);   
  return (
    <div className={currentMode ? "app__wrapper dark__background" : "app__wrapper"}>
       <Router>
        <HeaderBar />
          <Routes>
            {/* public routes */}
            <Route index element={<Home />} /> 
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* we want to protect these routes */}
            <Route element={<PersistLogin /> }>
              <Route path="panel/*" element={<PanelPage /> }> 
                <Route index element={<NewPatients />} />
                <Route path="newpatients/*" element={<NewPatients />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route element={<RequireAuth allowedRoles={["Editor"]} />}>
                  <Route path="appointment/*" element={<Appointment />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="records/*" element={<Records />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="pharmacy/*" element={<Pharmacy />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="clinics/*" element={<Clinics />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="wards/*" element={<Wards />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="theatre/*" element={<Theatre />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="laboratory/*" element={<Laboratory />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="store/*" element={<Store />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="accounting" element={<Accounting />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="analytics/*" element={<Analytics />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="profiles" element={<Profiles />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="logout" element={<Logout />} />
                </Route>
                <Route path="*" element={<Navigate to="/panel/newpatients" replace />} />
              </Route>
              <Route path="users" element={auth ? <Profiles /> : <Home />}>
                <Route path=":userId" element={<User />} />
              </Route>
            </Route>
            {/* catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        <FooterBar />
      </Router>
    </div>
  );
}

export default App;
// <Route path="messenger/:id" element={<Messenger />} />
