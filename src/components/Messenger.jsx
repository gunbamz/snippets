import { useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Routes, Route, Outlet, NavLink } from "react-router-dom";
import ChatSearch from "./ChatSearch";
import ChatCurrent from "./ChatCurrent";
import ChatRecent from "./ChatRecent"; 
import { io } from "socket.io-client";
import "./Messenger.css";
import { useDispatch, useSelector } from "react-redux";
import { setMessenger } from "../redux/modeRedux";
import { newMessageSuccess, onlineUsersSuccess, conversationsSuccess, receiverMessageSuccess, arrivalMessageSuccess } from "../redux/messageRedux";

const Messenger = () => {
  const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { currentUser, users }  = useSelector((state) => state.user);
    const { arrivalMessage, senderCounter, currentChat, newMessage, messages }  = useSelector((state) => state.message);
    const socket = useRef();

    const handleSubmit = async (e) => {
      const message = {
        sender: currentUser._id,
        text: newMessage,
        conversationId: currentChat?._id,
      };
  
      const receiverId = currentChat?.members.find(
        (member) => member !== currentUser._id
      );
      try {
        const res = await axiosPrivate.post("/messages", message);
        console.log(res.data);
        dispatch(arrivalMessageSuccess(res.data));
        socket.current.emit("sendMessage", {
          senderId: currentUser._id,
          receiverId,
          text: newMessage,
        });
        dispatch(newMessageSuccess(""));
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      socket.current = io("ws://localhost:5000", {
        withCredentials: true,
      });
      socket.current.emit("addUser", currentUser._id);
      socket.current.on("getUsers", (socUser) => {
        let temp =  users.filter((f) => socUser.some((u) => u.userId === f._id));
        dispatch(onlineUsersSuccess(temp));
      });
      socket.current.on("getMessage", (data) => {
        console.log("getmessag");
        dispatch(arrivalMessageSuccess({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        }))
      });
      return () => {
          if (socket.current) {
              socket.current.disconnect();
              dispatch(setMessenger(false));
          }
      }
    }, []);

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getConversations = async () => {
          try {
              const res = await axiosPrivate.get("/conversations/" + currentUser._id, {
                  signal: controller.signal
              });
              isMounted && dispatch(
                conversationsSuccess(res.data)
              );
            } catch (err) {
                console.log(err.response);
                //Navigate("/login", { replace: true });
            }
      }
      getConversations(); 
      
      return () => {
          isMounted = false;
          controller.abort();
      }
    }, []); 
    
    useEffect(() => {
      currentChat && handleSubmit();
    }, [senderCounter]);

    useEffect(() => { 
    const temp = [...messages, arrivalMessage];
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        dispatch(receiverMessageSuccess(temp));
        dispatch(arrivalMessageSuccess(null));
    }, [arrivalMessage, currentChat]);

    return (
        <div className="chat__wrapper">
           <ul className="chat-links">
              <li className="chat-link">
                  <NavLink className={(navData) => navData.isActive ? "active" : "" } to="recent">
                      Recent
                  </NavLink>
              </li>
              <li className="chat-link">
                  <NavLink className={(navData) => navData.isActive ? "active" : "" } to="chat">
                     Chat
                  </NavLink>
              </li>
              <li className="chat-link">
                  <NavLink className={(navData) => navData.isActive ? "active" : "" } to="search">
                    Search
                  </NavLink>
              </li>
            </ul>
            <Routes>
              {/* messenger routes */}
              <Route index element={<ChatRecent />} /> 
              <Route path="recent" element={<ChatRecent />} />
              <Route path="chat" element={<ChatCurrent />} />
              <Route path="search" element={<ChatSearch />} />
            </Routes>
        </div>
    )
}

export default Messenger;