import React from "react";
import styled from "styled-components";
import CheckIcon from '/src/assets/check_icon.svg';
import { useNavigate } from "react-router";


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

const StyledCancle = styled(CheckIcon)`
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

const Btn = styled.button`
  width: 30%;
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

const NewNoticeCompletedModal = ({ setShowModal }) => {
  const navigate = useNavigate();
  return (
    <Overlay>
      <Card>
        <StyledCancle />
        <AlertMsg>작성이 완료되었습니다.</AlertMsg>
        <Btn onClick={() => {setShowModal(false); navigate(-1)}}>확인</Btn>
      </Card>
    </Overlay>
  );
};

export default NewNoticeCompletedModal;
