import React, { useState } from "react";
import styled from "styled-components";
import AlertIcon from "../../assets/AlertIcon.svg";
import CheckIcon from "../../assets/check_icon.svg";

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
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 100%;
`;

const StyledAlert = styled(AlertIcon)`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
`;

const StyledCheck = styled(CheckIcon)`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
`;

const AlertMsg = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2533;
  text-align: center;
  margin-bottom: 32px;
`;

const BtnBlock = styled.div`
  display: flex;
  gap: 20px;
`;

const RemoveBtn = styled.button`
  padding: 20px 20px;
  background: ${({ theme }) => theme.colors.gray2};
  color: ${({ theme }) => theme.colors.gray5};
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const CancleBtn = styled.button`
  padding: 20px 20px;
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
const MemberRemoveAlert = ({ onClose }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemove = () => {
    setIsRemoved(true);
  }

  return (
    <Overlay>
      {!isRemoved && (
        <Card>
          <StyledAlert />
          <AlertMsg>{`미르미`} 님을 내보내시겠습니까?</AlertMsg>
          <BtnBlock>
            <RemoveBtn onClick={handleRemove}>내보내기</RemoveBtn>
            <CancleBtn onClick={onClose}>다시 생각해볼래요</CancleBtn>
          </BtnBlock>
        </Card>
      )}
      {isRemoved && (
        <Card>
          <StyledCheck />
          <AlertMsg>{`미르미`} 님이 팀에서 제외되었습니다</AlertMsg>
          <BtnBlock>
            <CancleBtn onClick={onClose} >확인</CancleBtn>
          </BtnBlock>
        </Card>
      )}
    </Overlay>
  );
};

export default MemberRemoveAlert;
