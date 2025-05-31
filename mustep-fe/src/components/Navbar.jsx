import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/logo.png";
import User from "../assets/user_icon.svg";

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

const NavItemGroup = styled.div`
  display: flex;
`;

const BtnGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

const AuthBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  height: 36px;
  font-size: 16px;
  font-weight: bold;
  background-color: #DDE0E6;
  border: none;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 20px;
  height: 20px;
`;

const LogoImg = styled.img`
  width: 200px;
`;

const LogoText = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-left: 61px;
  display: flex;
  align-items: center;
`;

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Link to="/">
        <LogoGroup>
          <LogoImg src={Logo} alt="logo" />
        </LogoGroup>
      </Link>
          
          <LogoText>기업 프로젝트</LogoText>

      <NavItemGroup></NavItemGroup>
      <BtnGroup>
        <AuthBtn onClick={() => navigate()}>
          <UserImg src={User} alt="user_icon" />
           이름이름님
        </AuthBtn>
      </BtnGroup>
    </NavbarContainer>
  );
};

export default Navbar;
