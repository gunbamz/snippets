import React, { useEffect }from "react";
import styled from "styled-components";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";


const Register = () => {
  
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { newUser } = useSelector((state) => state.user);
 
    function onSubmit(data) {
        registerApi(dispatch, data);
    }
    useEffect(() => {
    newUser ? <Navigate to="/login" /> : <Navigate to="/" />;
    }, [newUser]);

    return (
        <div className="gender__details">
        <input type="radio" name="gender" id="dot-1" />
        <input type="radio" name="gender" id="dot-2" />
        <input type="radio" name="gender" id="dot-3" />
        <span className="gender__title">Gender</span>
        <div className="category">
            <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span className="gender">Male</span>
            </label>
            <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span className="gender">Female</span>
            </label>
            <label htmlFor="dot-3">
                <span className="dot three"></span>
                <span className="gender">Do not bother</span>
            </label>
        </div>
    </div>
    );
}
export default Register;
