import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import theme from "../styles/Theme";
import Logo from "../assets/logo.png"

const PageWrapper = styled.main`
  flex: 1; /* 헤더+풋터 제외한 영역 채우기 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #DDE0E6;
  border-radius: 24px;
  padding: 60px 140px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  display: block;
  margin: 0 auto 32px;
  width: 290px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 40px;
  color: #1f2533;
`;

const GoogleAuthBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 292px;
  height: 82px;
  background: ${theme.colors.gray1};
  border: 1px solid ${theme.colors.gray1};
  border-radius: 16px;
  box-shadow: 0 1px 3px ${theme.colors.gray2};
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f7f7f7;
  }
`;

const BtnText = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT;
  };

  return (
    <PageWrapper>
      <Card>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <Title>로그인</Title>
        <GoogleAuthBtn onClick={handleLogin}>
          <FcGoogle size={50} />
          <BtnText>구글로 로그인하기</BtnText>
        </GoogleAuthBtn>
      </Card>
    </PageWrapper>
  );
};

export default LoginPage;
