import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const NavbarContainer = styled.div`
  background-color: #f0f3f5;
  height: 108px;
  padding: 0 360px 0 360px;
  display: flex;
  align-items: center;
`;

const LogoGroup = styled.div`
  display: flex;

`

const NavItemGroup = styled.div`
  display: flex;

`

const BtnGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 12px;
`;

const AuthBtn = styled.button`
  padding: 7px 7px 7px 7px;

`

const LogoImg = styled.img`
  width: 200px;

`

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <LogoGroup>
        <LogoImg src="../public/imgs/logo.png" alt="logo" />
      </LogoGroup>

      <NavItemGroup>

      </NavItemGroup>
      <BtnGroup>
        <AuthBtn onClick={() => navigate("/login")}>Login</AuthBtn>
        <AuthBtn>Join</AuthBtn>
      </BtnGroup>
    </NavbarContainer>
  );
};

export default Navbar;
