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
import { loginApi } from "../redux/apiCalls";
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
  const { isCalling, error, currentUser } = useSelector((state) => state.user);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});
const formOptions = { resolver: yupResolver(validationSchema) };

//get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;

function onSubmit(data) {
    loginApi(dispatch, data);
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    //return false;
}
useEffect(() => {
  console.log(currentUser);
   //newUser ? <Navigate to="/home" /> : <Navigate to="/" />;
}, [currentUser]);

return (
  <React.Fragment>
    <HeaderBar />
    <Container>
      <Wrapper>
        <div className="card m-3">
            <h5 className="card-header text-center">Clinical Staff Login Area</h5>
            <div className="card-body">
              <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-auto">
                  <label className="visually-hidden" htmlFor="autoSizingInputGroup">Username</label>
                  <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email')} placeholder="Username" />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>
                </div>
                <div className="col-auto">
                  <input type="password" {...register('password')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="inputPassword3" />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="autoSizingCheck" />
                    <label className="form-check-label" htmlFor="autoSizingCheck">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary" disabled={isCalling}>Submit</button>
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
