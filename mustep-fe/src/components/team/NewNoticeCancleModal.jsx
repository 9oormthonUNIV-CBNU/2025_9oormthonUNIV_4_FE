import React from "react";
import styled from "styled-components";
import AlertIcon from '/src/assets/AlertIcon.svg';


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
  background: #fff;
  border-radius: 24px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 90%;
`;

const StyledAlert = styled(AlertIcon)`
  width: 72px;
  height: 72px;
  margin-bottom: 24px;
`;

const AlertMsg = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #1f2533;
  text-align: center;
  margin-bottom: 54px;
`;

const BtnGroup = styled.div`
   gap: 20px;
   display: flex;
`;

const NoBtn = styled.button`
  width: 167px;
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

const YesBtn = styled.button`
  width: 80px;
  height: 62px;
  padding: 14px 0;
  background: #DDE0E6;
  color: #545661;
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
        <StyledAlert />
        <AlertMsg>작성글을 취소하시겠습니까?</AlertMsg>
        <BtnGroup>
         <YesBtn onClick={onClose}>네</YesBtn>
         <NoBtn onClick={onClose}>아니요</NoBtn>
        </BtnGroup>
      </Card>
    </Overlay>
  );
};

export default AuthAlertModal;
