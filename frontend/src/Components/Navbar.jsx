import React, { useEffect } from "react";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { authenticate_user } from "./authentication";

// Navlink 

const NavbarContainer = styled.div`
    height: 100vh;
  .menu_div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background-color: #fafbfb;
      color: white;
      width: 100vw;
    }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 3px solid black;
  /* object-fit: contain; */
  overflow: hidden;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const Navbar = () => {

  useEffect(() => {
    authenticate_user();
  }, []);
  return (

    <NavbarContainer>
      <div className="menu_div">
        <Logo>
          <img src="https://registration.mmmut.ac.in/StudentPhoto/Photo_2020021123.jpg" height="100%" width="100%" />
        </Logo>
        <div>
          <NavLink to="/signin"><Button>Signup</Button></NavLink>
          <NavLink to="/login"><Button>Login</Button></NavLink>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
