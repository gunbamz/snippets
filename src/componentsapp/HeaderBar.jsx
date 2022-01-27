import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  font-size: 14px;
  font-weight: 500;
`;
const Wrapper = styled.div`
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 3;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const StyledLink = styled(Link)`
&:hover {
  text-decoration: underline;
  text-decoration-color: white;
  -webkit-text-decoration-color: white;
}`
const HeaderBar = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  
  useEffect(() => {
    //console.log(location);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Center>
           Re-inventing Medical and surgical care!! Improving the quality of services with cutting edge digital innovation
        </Center>
        <Right>
          <StyledLink to="/register">
            <MenuItem>REGISTER</MenuItem>
          </StyledLink>
          <StyledLink to="/login">
            <MenuItem>SIGN IN</MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  )
};

export default HeaderBar;
