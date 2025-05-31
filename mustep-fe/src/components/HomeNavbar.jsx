import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/logo.png";

const NavbarContainer = styled.div`
  background-color: #f0f3f5;
  height: 108px;
  padding: 0 360px 0 360px;
  display: flex;
  align-items: center;
`;

const LogoGroup = styled.div`
  display: flex;
`;

const LogoWriting = styled.div`
  display: flex;
`;

const NavItemGroup = styled.div`
  display: flex;
`;

const BtnGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 12px;
`;

const AuthBtn = styled.button`
  padding: 7px 7px 7px 7px;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Link to="/">
        <LogoGroup>
          <LogoImg src={Logo} alt="logo" />
          <LogoWriting />
        </LogoGroup>
      </Link>

      <NavItemGroup></NavItemGroup>
      <BtnGroup>
        <AuthBtn onClick={() => navigate("/login")}>Login</AuthBtn>
        <AuthBtn>Join</AuthBtn>
      </BtnGroup>
    </NavbarContainer>
  );
};

export default Navbar;
