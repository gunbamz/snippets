import "./Message.css";
//import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
    </div>
  );
}

// <div className="messageBottom">{message.createdAt}</div>
