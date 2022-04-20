import React from 'react';
import { NavLink, Outlet, useN } from "react-router-dom";

const ChatHeaderBar = () => {
  return (
            <div className="menu">
                <ul className="menu-links">
                    <li className="nav-link">
                        <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/records">
                            <BiBook className="icon" />
                            <span className="text nav-text">Records</span>
                        </NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/pharmacy">
                            <BiBandAid className="icon" />
                            <span className="text nav-text">Pharmacy</span>
                        </NavLink>
                    </li>
                    <li className="nav-link">
                        <NavLink className={(navData) => navData.isActive ? "active" : "" } to="/panel/appointment">
                            <BiBellPlus className="icon" />
                            <span className="text nav-text">Appointment</span>
                        </NavLink>
                    </li>
                </ul>
           </div>
    )
}

export default ChatHeaderBar