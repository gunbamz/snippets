import {useEffect} from "react";
import PersistLogin from "./components/PersistLogin";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import Register from "./pages/Registerr";
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
import { LocalPharmacy, TheatersRounded } from "@material-ui/icons";

const ROLES = {
  'User': 'user',
  'Editor': 'editor',
  'admin':'admin'
} 

const App = () => {
  const { auth, isValid }  = useSelector((state) => state.user);
  const mode  = useSelector((state) => state.mode.currentMode);
  useEffect(() => {
    //console.log(mode);
    }, [mode]);   
  return (
    <div className={mode ? "dark__background" : ""}>
       <Router>
        <HeaderBar />
          <Routes>
            {/* public routes */}
            <Route index element={<Home />} /> 
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* we want to protect these routes */}
            <Route element={<PersistLogin /> }>
              <Route path="panel" element={auth ? <PanelPage /> : <Navigate to="login" replace /> }> 
                <Route index element={<NewPatients />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="appointment" element={<Appointment />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="records" element={<Records />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="pharmacy" element={<Pharmacy />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="clinics" element={<Clinics />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="wards" element={<Wards />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="theatre" element={<Theatre />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="laboratory" element={<Laboratory />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="store" element={<Store />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="accounting" element={<Accounting />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="analytics" element={<Analytics />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="profiles" element={<Profiles />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                  <Route path="logout" element={<Logout /> } />
                </Route>
              </Route>
              <Route path="users" element={auth ? <Profiles /> : <Home />}>
                <Route path=":userId" element={<User />} />
              </Route>
            </Route>
            {/* catch all */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        <FooterBar />
      </Router>
    </div>
  );
}

export default App;
//<Route path="login" element={user ? <Navigate to="/panel" replace /> : <Login /> } />
//<Route path="register" element={user ? <Navigate to="/panel" replace /> : <Register /> }  />
//<Route element={isValid ? <PersistLogin /> : <Navigate to="login" replace /> }></Route>