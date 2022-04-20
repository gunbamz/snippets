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
        <div className="flex__center form--column register__border">
            <h5 className="form__header">Register</h5>
            <form className="form__wrap">
                <div className="form__group">
                    <label className="label__text" htmlFor="title">Title</label>
                    <select className="input__width" id="title" name="title" >
                        <option value=""></option>
                        <option value="DR">DR</option>
                        <option value="NUR">NUR</option>
                        <option value="MLS">MLS</option>
                        <option value="RAD">RAD</option>
                        <option value="HRO">HRO</option>
                    </select>
                </div>
                <div className="form__group">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" />
                </div>
                <div className="form__group">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" />
                </div>
                <div className="form__group">
                    <label htmlFor="lastName">UserName</label>
                    <input id="userName" name="userName" type="text" />
                </div>
                <div className="form__group">
                    <label htmlFor="birth">Date of Birth</label>
                    <input id="birth" name="dob" type="date" />
                </div>
                <div className="form__group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" />
                </div>
                <div className="form__group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="text" />
                </div>
                <div className="form__group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input name="confirmPassword" type="password" />
                </div>
                <input name="acceptTerms" type="checkbox" />
                <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
                <button type="submit">Register</button>
                <button type="button" onClick={() => reset()}>Reset</button>
            </form>
        </div>
    );
}
export default Register;
