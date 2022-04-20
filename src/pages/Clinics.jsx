import { useState, useEffect } from "react";
import Messenger from '../components/Messenger';
import { BiChat } from 'react-icons/bi';
import { setMessenger } from "../redux/modeRedux";
import { useSelector, useDispatch } from "react-redux";

const Clinics = () => {
  const dispatch = useDispatch();
  const { messengerMode }  = useSelector((state) => state.mode);
  
  const handleChatClick = () => {
    dispatch(setMessenger(!messengerMode));
  }
  return (
    <div>Clinics
       {messengerMode && <Messenger />}
                <div className="chat-icon" onDoubleClick={handleChatClick}>
                    <BiChat className="icon" />
                    <span className="">Chat</span>
                </div>
    </div>
  )
}

export default Clinics