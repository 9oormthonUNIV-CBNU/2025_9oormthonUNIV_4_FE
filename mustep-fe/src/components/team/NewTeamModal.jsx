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

const StyledAlert = styled(CheckIcon)`
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

const CheckBtn = styled.button`
  width: 222px;
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

const NewTeamModal = ({ setShowModal, projectId, teamId }) => {
  const navigate = useNavigate();

  return (
    <Overlay>
      <Card>
        <StyledAlert />
        <AlertMsg>팀 생성이 완료되었습니다</AlertMsg>
        <BtnGroup>
         <YesBtn onClick={() => {setShowModal(false); navigate(-1)}}>네</YesBtn>
         <CheckBtn onClick={() => {setShowModal(false); navigate(`/teams/${teamId}`);}}>내 팀 보러가기</CheckBtn>
        </BtnGroup>
      </Card>
    </Overlay>
  );
};

export default NewTeamModal;
