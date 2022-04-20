import React from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatSearch.css";

const ChatSearch = () => {
  const Navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
  };

  const { onlineUsers }  = useSelector((state) => state.message);
  return (
    <div className="chat-page">
        <h2>Search Staff Online</h2>
        <ul className="chat-page-ul">
            {onlineUsers && onlineUsers.map((user, i) => 
                (
                  <li key={i}>
                    <NavLink key={i} to="/panel/clinics/chat" state={{"chatSearch": user}}>
                      {user.fullName}
                    </NavLink>
                  </li>
                )
              )
            }
        </ul>
    </div>
  )
}

export default ChatSearch;
