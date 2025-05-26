import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const LoginPage = () => {
  const AuthContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f3f5;
    width: 665px;
    height: 409px;
    flex-direction: column;
  `;

  const LogoImg = styled.img`
    display: block;
    margin-bottom: 32px;
  `;

  const GoogleAuthBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: #f7f7f7;
    }
  `;
  const handleLogin = () => {
    return;
  };
  return (
    <AuthContainer>
      <Link to="/">
        <LogoImg src="../public/imgs/logo.png" />
      </Link>
      <GoogleAuthBtn onClick={handleLogin}>
        <FcGoogle size={24} />
        Google 계정으로 로그인
      </GoogleAuthBtn>
    </AuthContainer>
  );
};

export default LoginPage;
