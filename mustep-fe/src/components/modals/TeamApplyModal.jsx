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

const CloseBtn = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  width: 30vw;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2533;
  margin: 0 0 24px;
  text-align: center;
`;

const MemberList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MemberItem = styled.li`
  gap: 20px;
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray1};
`;

const InfoGroup = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const NameText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #1f2533;
`;

const DetailGroup = styled.div`
  width: 50%;
`;

const ApplyDate = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray4};
`

const ApplicationBtn = styled.button`
  margin-left: auto;
  width: 30%;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }
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
