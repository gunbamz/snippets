import { useEffect } from "react"; 
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { currentChatSuccess, conversationsSuccess } from "../redux/messageRedux";
import "./ChatRecent.css";

const ChatRecent = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { conversations, arrivalMessage }  = useSelector((state) => state.message);
  const { currentUser }  = useSelector((state) => state.user);
  const convLength = conversations.length > 0;

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(currentChatSuccess());
  };
  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();
  //   const getConversations = async () => {
  //       try {
  //           const res = await axiosPrivate.get("/conversations/" + currentUser._id, {
  //               signal: controller.signal
  //           });
  //           isMounted && dispatch(
  //             conversationsSuccess(res.data)
  //           );
  //         } catch (err) {
  //             console.log(err);
  //             //Navigate("/login", { replace: true });
  //         }
  //   }
  //   arrivalMessage && getConversations(); 
    
  //   return () => {
  //       isMounted = false;
  //       controller.abort();
  //   }
  // }, [arrivalMessage])
  

  return (
    <div className="chat-page">
        <h2>Recent Chats</h2>
        {convLength ? (
          <ul className="chat-page-ul">
              {conversations.map((conv, i) => 
                  (
                    <li key={i}>
                      <NavLink key={i} to="/panel/clinics/chat" state={{"chatRecent": conv}}>
                        {conv._id}
                      </NavLink>
                    </li>
                  )
                )
              }
          </ul>
        ) : (
          <div> No conversations yet</div>
        )
      }
    </div>
  )
}

export default ChatRecent;
//{!convLength && (<div id="loader"></div>)}