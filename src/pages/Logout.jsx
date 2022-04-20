import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Logout = () => {
  const Navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsSending(true);
    const res = await userRequest.post("/auth/logout");
    if (res.data.success === true) {
      Navigate("/", { replace: true });
    }
  }

  return (
      <div className="login__container">
        <button disabled={isSending} onClick={handleLogout}>Logout</button>
      </div>
  );
}

export default Logout