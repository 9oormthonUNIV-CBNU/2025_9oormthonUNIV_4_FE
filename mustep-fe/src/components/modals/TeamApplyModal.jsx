import React from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";

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
  max-width: 30vw;
  width: 90%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2533;
  margin: 0 0 24px;
`;

const CloseBtn = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MemberList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const MemberItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray1};
  border: "none";
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NameText = styled.span`
  font-size: 1rem;
  color: #1f2533;
`;

const DetailGroup = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ApplyDate = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray4};
`

const ApplicationBtn = styled.button`
  margin-left: auto;
  padding: 8px 14px;
  background: ${({theme}) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  border: 0px solid;
  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }
`;


const UserProfile = styled.img`
  width: 30px;
`;
const TeamApplyModal = ({ members, setShowModal }) => {
  return (
    <Overlay>
      <Card>
        <span
          style={{ alignSelf: "self-end" }}
          onClick={() => setShowModal(false)}
        >
          <CloseBtn />
        </span>
        <Title>팀 신청 관리</Title>
        <MemberList>
          {members.map((m) => (
            <MemberItem key={m.id}>
              <InfoGroup>
                <UserProfile src={m.imgUrl} />
                <NameText>{m.nickname}</NameText>
              </InfoGroup>
              <DetailGroup>
                <ApplyDate>2025.5.21</ApplyDate>
              </DetailGroup>
              <ApplicationBtn >신청서 보기</ApplicationBtn>
            </MemberItem>
          ))}
        </MemberList>
      </Card>
    </Overlay>
  );
};

export default TeamApplyModal;
