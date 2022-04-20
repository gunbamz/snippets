import {useEffect} from "react";
import Home from "./pages/Home";
import Register from "./pages/Registerr";
import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import PanelPage from "./pages/PanelPage";
import Records from "./pages/Records";
import Pharmacy from "./pages/Pharmacy";
import Appointment from "./pages/Appointment";
import Clinics from "./pages/Clinics";
import Wards from "./pages/Wards";
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
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { LocalPharmacy, TheatersRounded } from "@material-ui/icons";

const App = () => {
  const user  = useSelector((state) => state.user.currentUser);
  const mode  = useSelector((state) => state.mode.currentMode);
  useEffect(() => {
    console.log(mode);
    }, [mode]); 
  return (
    <div className={mode ? "dark__background" : ""}>
      <Router>
        <HeaderBar />
        <Routes>
           {/* public routes */}
           
          <Route index element={<Home />} /> 
          <Route path="login" element={user ? <Navigate to="/panel" replace /> : <Login /> } />
          <Route path="register" element={user ? <Navigate to="/panel" replace /> : <Register /> } />
         
          {/* we want to protect these routes */}
          <Route path="panel" element={user ? <PanelPage /> :  <Navigate to="/login" replace /> }>
            <Route path="appointment" element={<Appointment />} />
            <Route path="records" element={<Records />} />
            <Route path="pharmacy" element={<Pharmacy />} />
            <Route path="clinics" element={<Clinics />} />
            <Route path="wards" element={<Wards />} />
            <Route path="theatre" element={<Theatre />} />
            <Route path="laboratory" element={<Laboratory />} />
            <Route path="store" element={<Store />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="logout" element={<Logout /> } />
          </Route>
          <Route path="users" element={user ? <Profiles /> : <Home />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <FooterBar />
      </Router>
    </div>

  );
};

export default App;
