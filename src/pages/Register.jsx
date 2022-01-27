import React, { useEffect }from "react";
import styled from "styled-components";
import HeaderBar from "../componentsapp/HeaderBar";
import Login from "./Login";
import Home from "./Home";
import { mobile } from "../responsive";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { registerApi } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 50%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`; 

const Register = () => {
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCalling, error, newUser } = useSelector((state) => state.user);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    dob: Yup.string()
        .required('Date of Birth is required')
        .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
        .oneOf([true], 'Accept Ts & Cs is required')
});
const formOptions = { resolver: yupResolver(validationSchema) };

//get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;

function onSubmit(data) {
    registerApi(dispatch, data);
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    //return false;
}
useEffect(() => {
   newUser ? <Navigate to="/login" /> : <Navigate to="/" />;
}, [newUser]);

return (
  <React.Fragment>
    <HeaderBar />
    <Container>
      <Wrapper>
        <div className="card m-3">
            <h5 className="card-header text-center">Clinical Staff Registration Form Area</h5>
            <div className="card-body">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-2">
                            <label htmlFor="title">Title</label>
                            <select id="title" name="title" {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                                <option value=""></option>
                                <option value="DR">DR</option>
                                <option value="NUR">NUR</option>
                                <option value="MLS">MLS</option>
                                <option value="RAD">RAD</option>
                                <option value="HRO">HRO</option>
                            </select>
                            <div className="invalid-feedback">{errors.title?.message}</div>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="birth">Date of Birth</label>
                            <input id="birth" name="dob" type="date" {...register('dob')} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.dob?.message}</div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="password">Password</label>
                            <input id="password" name="password" type="text" {...register('password')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="confirm">Confirm Password</label>
                            <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                        </div>
                    <div className="col-md-12 form-check">
                        <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                        <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                    </div>
                    <div className="col-md-3">
                        <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    </div>
                </form>
              </div>
          </div>
        </Wrapper>
       </Container>
    </React.Fragment>
  );
}

export default Register;
