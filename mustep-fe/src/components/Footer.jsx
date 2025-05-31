import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #34353A;
  height: 147px;
  padding: 0 360px 0 360px;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const LeftGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #F0F3F5;
  margin-bottom: 10px;
`;

const RepresenterLine = styled.div`
  font-size: 16px;
  font-weight: bold;

`

const InfoLine = styled.div`
  font-size: 14px;
  font-weight: none;
`;

const LinkGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RightGroup = styled.div`
  color: #F0F3F5;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LeftGroup>
        <RepresenterLine>대표자:유니브</RepresenterLine>
        <InfoLine>
          <div>사업자 등록번호 : 123-45-67890</div>
          <div>주소 : 서울특별시 성동구 스타트업 42,5층</div>
          <div>이메일 : project4team@naver.com</div>
        </InfoLine>
        <LinkGroup>
          <FooterLink>[이용약관]</FooterLink>
          <FooterLink>[개인정보처리방침]</FooterLink>
          <FooterLink>[문의하기]</FooterLink>
        </LinkGroup>
      </LeftGroup>
      <RightGroup>© 2025 . All rights reserved.</RightGroup>
    </FooterContainer>
  );
};

export default Footer;
