import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/logo.png";
import User from "../assets/user_icon.svg";
import axios from "axios";

const NavbarContainer = styled.div`
  background-color: #f0f3f5;
  height: 108px;
  padding: 0 360px 0 360px;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }
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


const LoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  height: 36px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${({theme}) => theme.colors.black};
  border: none;
  color: ${({theme}) => theme.colors.white};
  cursor: pointer;
`;

const JoinBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  height: 36px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.white};
  border: none;
  cursor: pointer;
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
  background-color: #dde0e6;
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
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    setToken(rawToken);
  }, []);

  useEffect(() =>{
    if (!token) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`
          ${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }

        );
        setUserInfo(res.data);
      } catch (err) {
        console.error("에러 발생:", err);
      }
    }
    fetchUserInfo();
  }, [token]);

  return (
    <NavbarContainer>
      <Link to="/">
        <LogoGroup>
          <LogoImg src={Logo} alt="logo" />
        </LogoGroup>
      </Link>

      <Link to="/projects">
        <LogoText>기업 프로젝트</LogoText>
      </Link>
      <NavItemGroup></NavItemGroup>
      {token && userInfo && (
        <BtnGroup>
          {/* AuthBtn 클릭 시, 예를 들어 “/mypage”로 이동하도록 설정 */}
          <AuthBtn onClick={() => navigate("/mypage")}>
            {/* userInfo.imgUrl이 반드시 존재한다고 가정하나, 
                혹시 없을 수 있으니 기본 User 아이콘도 옵션으로 준비 */}
            <UserImg
              src={userInfo.imgUrl ? userInfo.imgUrl : User}
              alt="user_icon"
            />
            {userInfo.nickname}
          </AuthBtn>
        </BtnGroup>
      )}
      {/* 4) token이 없으면(로그아웃 상태) → 로그인/회원가입 버튼 노출 */}
      {!token && (
        <BtnGroup>
          <LoginBtn onClick={() => navigate("/login")}>Login</LoginBtn>
          <JoinBtn onClick={() => navigate("/signup")}>Join</JoinBtn>
        </BtnGroup>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
