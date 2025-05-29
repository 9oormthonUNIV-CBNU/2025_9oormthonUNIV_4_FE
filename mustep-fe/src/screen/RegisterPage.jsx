import React, { useState } from "react";
// import styled from "styled-components";
import { Link } from "react-router";
import styled from "styled-components";
// import theme from "../styles/Theme";

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
  font-weight: 500;
  color: #1f2533;
`;

const Input = styled.input`
  flex: 1;
  padding: 16px;
  background: ${(props) => props.theme.colors.gray2};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  &::placeholder {
    color: #aaa;
  }
  &:disabled {
    background: ${(props) => props.theme.colors.gray4};
  }
`;

// 이메일 + 전송 버튼을 묶는 영역
const EmailGroup = styled.div`
  display: flex;
  flex: 1;
`;

// 좌측 둥근 모서리만
const EmailInput = styled(Input)`
  border-radius: 12px 0 0 12px;
`;

// 우측 둥근 모서리만
const AuthBtn = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border: none;
  padding: 0 20px;
  font-size: 0.9rem;
  border-radius: 0 12px 12px 0;
  color: white;
  cursor: pointer;
  &:disabled {
    background: ${(props) => props.theme.colors.gray4};
    color: white;
    cursor: default;
  }
`;

const MailCheckLabel = styled.div`
  flex: 1;
  text-align: right;
  justify-content: end;
  margin: 0px 0px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.gray5};
`;

// 버튼 두 개를 나란히
const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

// 나중에 할래요 버튼
const LaterBtn = styled.button`
  flex: 0 0 120px;
  padding: 16px 0;
  background: ${(props) => props.theme.colors.gray2};
  color: #1f2533;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
`;

// 완료 버튼 (활성/비활성)
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
    background: ${(props) => props.theme.colors.gray5};
    cursor: default;
  }
`;

const RegisterPage = () => {
  const [univ, setUniv] = useState("");
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [code, setCode] = useState("");

  const handleSendEmail = () => {
    // TODO: 이메일 전송 로직
    setIsSent(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 인증번호 검증 로직
  };

  return (
    <PageWrapper>
      <Card>
        <Link to="/">
          <LogoImg src="../public/imgs/logo.png" />
        </Link>
        <Title>학교 인증하기</Title>
        <RegisterForm onSubmit={handleSubmit}>
          <FieldRow>
            <Label htmlFor="univ">학교 이름</Label>
            <Input
              id="univ"
              placeholder="학교 이름을 입력해주세요."
              value={univ}
              onChange={(e) => setUniv(e.target.value)}
            />
          </FieldRow>
          <FieldRow>
            <Label htmlFor="email">학교 이메일</Label>
            <EmailGroup>
              <EmailInput
                id="email"
                placeholder="학교 이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AuthBtn
                type="button"
                disabled={!univ || !email}
                onClick={handleSendEmail}
              >
                전송
              </AuthBtn>
            </EmailGroup>
          </FieldRow>
          <FieldRow>
            <MailCheckLabel>
              *메일 확인이 안될 시 스팸 메일함을 확인해주세요.
            </MailCheckLabel>
          </FieldRow>
          <FieldRow>
            <Label htmlFor="certNum">인증번호</Label>
            <Input
              id="certNum"
              placeholder="인증번호 4자리"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={!isSent}
              maxLength={4}
            />
          </FieldRow>
          <ButtonsRow>
            <LaterBtn
              type="button"
              onClick={() => {
                /* */
              }}
            >
              나중에 할래요
            </LaterBtn>
            <SubmitBtn type="submit" disabled={!isSent || code.length < 4}>
              완료
            </SubmitBtn>
          </ButtonsRow>
        </RegisterForm>
      </Card>
    </PageWrapper>
  );
};

export default RegisterPage;
