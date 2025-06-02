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
  background-color: ${({ theme }) => theme.colors.black};
  border: none;
  color: ${({ theme }) => theme.colors.white};
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
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
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

const AuthWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background-color: #fff;
  border: 1px solid #dde0e6;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  width: 120px;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 8px;
  }
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    setToken(rawToken);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setToken(null);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `
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
    };
    fetchUserInfo();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setMenuOpen(false);
    navigate("/");
  };

  const handleMyPage = () => {
    setMenuOpen(false);
    navigate("/mypage");
  };

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
      <NavItemGroup />

      {token && userInfo ? (
        <BtnGroup>
          <AuthWrapper>
            <AuthBtn onClick={() => setMenuOpen((prev) => !prev)}>
              {userInfo.imgUrl ? (
                <UserImg src={userInfo.imgUrl} alt="user_icon" />
              ) : (
                <User width={20} height={20} />
              )}
              {userInfo.nickname}
            </AuthBtn>
            {menuOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleMyPage}>
                  마이페이지
                </DropdownItem>
                <DropdownItem onClick={handleLogout}>
                  로그아웃
                </DropdownItem>
              </DropdownMenu>
            )}
          </AuthWrapper>
        </BtnGroup>
      ) : (
        <BtnGroup>
          <LoginBtn onClick={() => navigate("/login")}>Login</LoginBtn>
          <JoinBtn onClick={() => navigate("/projects")}>Join</JoinBtn>
        </BtnGroup>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
