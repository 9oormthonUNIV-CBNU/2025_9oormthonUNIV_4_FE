import React from "react";
import styled from "styled-components";
import { X } from "lucide-react"; 


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: hsla(0, 0%, 0%, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 24px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 503px;
  height: 467px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin: 40px 0 24px 0;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 32px;
  right: 40px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Subtitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  align-self: flex-start;
  text-align: left;
  margin-left: 50px;
`;

const DescriptionBox = styled.div`
  background: #F0F3F5;
  padding: 16px 16px;
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 40px;
  font-weight: 400;
  width: 383px;
  height: 148px;
  border-radius: 16px;
`;



const Btn = styled.button`
  width: 183px;
  height: 62px;
  padding: 14px 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const AuthAlertModal = ({ onClose }) => {
  return (
    <Overlay>
      <Card>
        <CloseBtn onClick={onClose}>
          <X size={50} />
        </CloseBtn>
        <Title>자기소개 수정하기</Title>
        <Subtitle>자기소개</Subtitle>
        <DescriptionBox>
          함께 고민하고 서로의 아이디어를 존중하며 <br />
          완성도를 높이는 협업을 좋아합니다. <br />
          팀 안에서 소통과 정리를 맡아, <br />
          흐름을 잡아주는 역할을 자주 합니다!
        </DescriptionBox>
         <Btn onClick={onClose}>수정완료</Btn>
      </Card>
    </Overlay>
  );
};

export default AuthAlertModal;
