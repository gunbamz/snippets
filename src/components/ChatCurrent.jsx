import { useEffect, useRef, useState } from "react";
import { userRequest } from "../requestMethods";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import "./ChatCurrent.css";
import { senderMessageSuccess, senderCounterSuccess, newMessageSuccess, currentChatSuccess } from "../redux/messageRedux";


const ChatCurrent = () => {
  const axiosPrivate = useAxiosPrivate();
  const Navigate = useNavigate;
  const scrollRef = useRef();
  const location = useLocation();
  const [text, setText] = useState("");
  const dispatch = useDispatch(); 
  const { currentUser }  = useSelector((state) => state.user);
  let { messages, currentChat } = useSelector((state) => state.message);

  const handleSend = async (e) => {
    e.preventDefault();
    dispatch(newMessageSuccess(text));
    dispatch(senderCounterSuccess(1));
    setText("");
  };
  const handleNav = (e) => {
    e.preventDefault();
    console.log("navigated");
    
  };
  useEffect(() => {
      const onlineUserObj = location.state?.chatSearch;
      const conversationObj = location.state?.chatRecent;
      let isMounted = true;
      const controller = new AbortController();
      const createConversation = async () => {
          try {
              const res = await axiosPrivate.post("/conversations", {
                data: {
                  senderId: currentUser._id,
                  receiverId: onlineUserObj._id
                },
                signal: controller.signal
              });
              isMounted && dispatch(
                currentChatSuccess(res.data)
              );
            } catch (err) {
                console.log(err.response);
                //Navigate("/login", { replace: true });
            }
      }
      const getTwoConversation = async () => {
        try {
            const res = await axiosPrivate.get("/conversations/find/" + `${conversationObj.members[0]}/${conversationObj.members[1]}`, {
              signal: controller.signal
            });
            isMounted && dispatch(
              currentChatSuccess(res.data)
            );
          } catch (err) {
              console.log(err.response);
              //Navigate("/login", { replace: true });
          }
      }
      const getMessages = async () => {
        try {
            const res = await axiosPrivate.get("/messages/" + conversationObj._id, {
                signal: controller.signal
            });
            isMounted && dispatch(
              senderMessageSuccess(res.data)
            );
        } catch (err) {
            console.log(err.response);
            //Navigate("/login", {  replace: true });
        }
      }
      onlineUserObj && createConversation(); 
      conversationObj && getTwoConversation(); 
      conversationObj && getMessages();
  
      return () => {
          isMounted = false;
          controller.abort();
      }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatBox">
        {currentChat ? (
          <>
            <div className="chatBoxTop">
              {messages.map((m, i) => (
                <div key={i} ref={scrollRef}>
                  <Message key={i} message={m} own={m.sender === currentUser._id} />
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setText(e.target.value)} 
                value={text ? text : ""}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSend}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div>
            <span className="noConversationText">
            Open a conversation to start a chat.
            </span>
            <button className="chatSubmitButton" onClick={handleNav}>
            open
          </button>
          </div>
        )}
    </div>
  )
}

export default ChatCurrent;