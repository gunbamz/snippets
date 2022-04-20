import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';
import './HeaderBar.css';

const HeaderBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  //const loggedIn =
  const location = useLocation();
  const Navigate = useNavigate();
  const { auth } = useSelector((state) => state.user);
  
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">MediFile</div>
      <ul className="app__navbar-links">
        <li>
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/">Home</NavLink>
        </li>
        <li>
         <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/about">About</NavLink>
        </li>
      </ul>
      {auth ? 
        <ul className="app__navbar-links">
          <li>
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/users">Profile</NavLink>
          </li>
          <div />
          <li>
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/logout">Logout</NavLink>
          </li>
        </ul> :
        <ul className="app__navbar-links">
          <li>
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/login">Login</NavLink>
          </li>
          <div />
          <li>
          <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/register">Register</NavLink>
          </li>
        </ul>
        }
        <div className="app__navbar-smallscreen">
          <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <MdOutlineClose fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <ul className="app__navbar-smallscreen_links">
                <li>
                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/">Home</NavLink>
              </li>
                <li>
                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/about">About</NavLink>
                </li>
                <li>
                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/login">Login</NavLink>
                </li>
                <li>
                <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/register">Register</NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
    </nav>
  );
};

export default HeaderBar;

//border-radius: isActive ? '10px' : '10px',
 

