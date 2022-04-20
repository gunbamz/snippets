import {useState } from "react";
import "./Register.css";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { apiRegisterSuccess, apiCallFailure } from "../redux/userRedux";
import { useDispatch } from "react-redux";


const Register = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [isSending, setIsSending] = useState(false);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormData(x => ({
            ...x,
          [name]: value
        }));
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            setIsSending(true);
            const res = await publicRequest.post("/auth/register", formData);
            dispatch(apiRegisterSuccess(res.data));
            Navigate("/login", { replace: true });
          } catch (err) {
            dispatch(apiCallFailure()); 
        } 
        setIsSending(false);
    }
    const reset = () => {
        setFormData({});
    }

    return (
        <div className="register__container">
            <div className="title">Registration</div>
            <form onSubmit={handleSubmit}>
               <div className="user__details">
                   <div className="input__box">
                       <span className="details">Full Name</span>
                       <input onChange={handleInputChange} value={formData.fullName ? formData.fullName : ""} name="fullName" type="text" placeholder="Enter name" required />
                   </div>
                   <div className="input__box">
                       <span className="details">Username</span>
                       <input onChange={handleInputChange} value={formData.userName ? formData.userName : ""} name="userName" type="text" placeholder="Enter Username" required />
                   </div>
                   <div className="input__box">
                       <span className="details">Email</span>
                       <input onChange={handleInputChange} value={formData.email ? formData.email : ""} name="email" type="email" placeholder="Enter email" required />
                   </div>
                   <div className="input__box">
                       <span className="details">Phone Number</span>
                       <input onChange={handleInputChange} value={formData.phoneNumber ? formData.phoneNumber : ""} name="phoneNumber" type="text" placeholder="Enter Phone" required />
                   </div>
                   <div className="input__box">
                       <span className="details">Password</span>
                       <input onChange={handleInputChange} value={formData.password ? formData.password : ""} name="password" type="password" placeholder="Enter password" required />
                   </div>
                   <div className="input__box">
                       <span className="details">Confirm Password</span>
                       <input onChange={handleInputChange} value={formData.confirmPassword ? formData.confirmPassword : ""} name="confirmPassword" type="password" placeholder="Confirm Password" required />
                   </div>
                    <div className="input__box">
                       <span className="details">Role</span>
                       <input onChange={handleInputChange} value={formData.roles ? formData.roles : ""} name="roles" type="text" placeholder="role" required />
                   </div>
                </div> 
                <div className="button__wrapper">
                <button className='button' disabled={isSending} type="submit">Register</button>
                <button className='button' disabled={isSending} onClick={reset} type="button">Reset</button>
                </div>
            </form>
        </div>
    );
}
export default Register;
