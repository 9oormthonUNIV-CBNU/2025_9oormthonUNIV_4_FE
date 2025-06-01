import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import theme from "../styles/Theme";
import Logo from "../assets/logo.png";

const PageWrapper = styled.main`
  flex: 1; /* 헤더+풋터 제외한 영역 채우기 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #dde0e6;
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
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 8px;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 120px;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  color: #1f2533;
`;

const Input = styled.input`
  padding: 16px;
  width: 40%;
  background: ${(props) => props.theme.colors.gray2};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const Textarea = styled.textarea`
  flex: 1;
  padding: 16px;
  max-height: 200px;
  width: 300px;
  background: ${(props) => props.theme.colors.gray2};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const SubmitBtn = styled.button`
  flex: 1;
  padding: 16px 0;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    background: ${(props) => props.theme.colors.gray4};
    cursor: default;
  }
`;

const RegisterPage = () => {
  const [univ, setUniv] = useState("");
  const [nickname, setNickname] = useState("");
  const [major, setMajor] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nickname: nickname,
      major: major,
      university: univ,
      introduce: userInfo,
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMrDfL1jdluKhYhszOe_NOrvVfGhv1l5EsdI8-mHkVEo4g4ci1lgI7QTbpNGgmQdgEsfPSOWidY1eusytDJSAWMomCi-6kyOZBf1Pbw4",
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ 토큰이 localStorage에 없습니다.");
        return;
      }

      const res = await axios.post(
        // 1) URL
        `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
        // 2) body로 보낼 데이터
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      console.log("✅ 회원 정보 저장 성공:", res.data);
 
      navigate("/university");
    } catch (err) {
      console.error(err);
      // TODO: 실패시 모달 띄우기 등
      console.error(err);
    }

    // 성공 로직
  };

  return (
    <PageWrapper>
      <Card>
        <Link to="/">
          <LogoImg src={Logo} />
        </Link>
        <Title>프로필 입력하기</Title>
        <RegisterForm onSubmit={handleSubmit}>
          <FieldRow>
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </FieldRow>
          <FieldRow>
            <Label htmlFor="univ">대학교명</Label>
            <Input
              id="univ"
              placeholder="교명을 입력해주세요."
              value={univ}
              onChange={(e) => setUniv(e.target.value)}
              required
            />
          </FieldRow>
          <FieldRow>
            <Label htmlFor="major">대학 전공</Label>
            <Input
              id="major"
              placeholder="전공을 입력해주세요."
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              required
            />
          </FieldRow>
          <FieldRow>
            <Label htmlFor="userInfo">자기소개</Label>
            <Textarea
              id="userInfo"
              placeholder="자기소개를 입력해주세요."
              value={userInfo}
              onChange={(e) => setUserInfo(e.target.value)}
              required
            />
          </FieldRow>
          <SubmitBtn type="submit">완료</SubmitBtn>
        </RegisterForm>
      </Card>
    </PageWrapper>
  );
};

export default RegisterPage;
