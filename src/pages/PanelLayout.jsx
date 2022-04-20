import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setMode } from "../redux/modeRedux";
import { BiSearch } from 'react-icons/bi';
import { BiChevronRight } from 'react-icons/bi';
import "./PanelPage.css";

const PanelLayout = () => {
    const [isClose, setClose] = useState(false);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const handleChevronClick = () => {
        setClose(!isClose);
    }
    const handleSearchClick = () => {
        setClose(!isClose);
    }
    const modeHandler = (e) => {
        let temp = e.target.checked;
        dispatch(setMode(temp));
    };

    useEffect(() => {
    }, []); 
    return (
        <>
            <nav className={isClose ? "sidebar close" : "sidebar"}>
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="logo.png" alt="" />
                        </span>
                        <div className="text logo-text">
                            <span className="name">Welcome!</span>
                            <span className="profession">Title Name</span>
                            <span className="logo-text-clip">{currentUser.email}</span>
                        </div>
                    </div>
                    <BiChevronRight onClick={handleChevronClick} className="toggle" />
                </header>
                <div className="menu-bar">
                    <div className="menu">
                        <li className="search-box">
                            <BiSearch onClick={handleSearchClick} className="icon" />
                            <input type="text" placeholder="Search..." />
                        </li>
                        <ul className="menu-links">
                        <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/records">
                                    <i className="bx bx-home-alt icon" ></i>
                                    <span className="text nav-text">Records</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/pharmacy">
                                <i className="bx bx-wallet icon" ></i>
                                    <span className="text nav-text">Pharmacy</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/appointment">
                                    <i className="bx bx-bell icon"></i>
                                    <span className="text nav-text">Appointment</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/clinics">
                                    <i className="bx bx-pie-chart-alt icon" ></i>
                                    <span className="text nav-text">Clinics</span>
                                </NavLink>
                            </li>

                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/wards">
                                    <i className="bx bx-heart icon" ></i>
                                    <span className="text nav-text">Wards</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/theatre">
                                <i className="bx bx-wallet icon" ></i>
                                    <span className="text nav-text">Theatre</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/laboratory">
                                <i className="bx bx-wallet icon" ></i>
                                    <span className="text nav-text">Laboratory</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/store">
                                <i className="bx bx-wallet icon" ></i>
                                    <span className="text nav-text">Store</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/accounting">
                                    <i className="bx bx-bar-chart-alt-2 icon" ></i>
                                    <span className="text nav-text">Accounting</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/analytics">
                                <i className="bx bx-wallet icon" ></i>
                                <span className="text nav-text">Analytics</span>
                                </NavLink>
                            </li>
                            <li className="nav-link">
                                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/profiles">
                                <i className="bx bx-wallet icon" ></i>
                                <span className="text nav-text">Profiles</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="nav-link">
                            <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/logout">
                                <i className="bx bx-wallet icon" ></i>
                                <span className="text nav-text">Logout</span>
                            </NavLink>
                        </li>

                        <li className="mode">
                            <div className="sun-moon">
                                <i className="bx bx-moon icon moon"></i>
                                <i className="bx bx-sun icon sun"></i>
                            </div>
                            <span className="mode-text text">Dark mode</span>

                            <label className="toggle-switch">
                            <input type="checkbox" name="toggle" onClick={modeHandler} />
                            <span className="switch"></span>
                            </label>
                        </li>
                    </div>
                </div>
            </nav>
            <section className="home">
                <Outlet />
            </section>
        </>
    )
}

export default PanelLayout