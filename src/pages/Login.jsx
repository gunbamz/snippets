import { useState, useEffect }from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { logout, apiLoginSuccess, apiCallFailure } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import "./Login.css";


const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [isSending, setIsSending] = useState(false);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setFormData(x => ({
            ...x,
          [target.name]: value
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            setIsSending(true);
            const res = await publicRequest.post("/auth/login", formData);
            dispatch(apiLoginSuccess(res.data));
            Navigate("/panel/newpatients", { replace: true });
          } catch (err) {
            dispatch(apiCallFailure()); 
        } 
        setIsSending(false);
    };

    useEffect(() => {
        dispatch(logout()); 
        console.log(location);
    }, []);  

    return (
        <div className="login__container">
            <div className="title">Login</div>
            <form onSubmit={handleLogin}>
                <div className="login__details">
                    <div className="input__box">
                        <span className="details">Email</span>
                        <input onChange={handleInputChange} value={formData.email ? formData.email : ""} name="email" type="email" placeholder="Enter email" required />
                    </div>
                    <div className="input__box">
                        <span className="details">Password</span>
                        <input onChange={handleInputChange} value={formData.password ? formData.password : ""} name="password" type="password" placeholder="Enter password" required />
                    </div>
                </div>
                <div className="button__wrapper">
                    <button className='button' disabled={isSending} type="submit">Login</button>
                </div>
            </form>
    </div>
    );
}

export default Login;
