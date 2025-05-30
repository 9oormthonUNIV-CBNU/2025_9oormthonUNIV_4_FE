import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";
import CalendarIcon from "../../assets/calendar.svg";
import UserIcon from "../../assets/user_icon.svg";
import { formatTimeAgo } from "../../../utils/Utils";
import MemberRemoveAlert from "./MemberRemoveAlert";

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
  background: white;
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
  background: ${({ removed, theme }) =>
    removed ? theme.colors.gray1 : "#fff"};
  border: ${({ removed, theme }) =>
    removed ? "none" : `2px solid ${theme.colors.primary}`};
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  gap: 12px;
`;

const NameText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #1f2533;
`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-left: 24px;
  gap: 4px;
  
  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.gray6};
  }
`;

const RemoveBtn = styled.button`
  margin-left: auto;
  padding: 6px 14px;
  background: #fff;
  color: ${({ theme }) => theme.colors.gray6};
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray1};
  }
`;

const RemovedText = styled.span`
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 400;
  color: #666;
  width: 35%;
`;

const SaveBtn = styled.button`
  width: 100%;
  padding: 14px 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const CloseBtn = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;



const TeamManageModal = ({ members, setMembers, setShowModal }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setMembers((ms) =>
      ms.map((m) => ({
        ...m,
        removed: false,
        removedAt: null,
      }))
    );
  }, [setMembers]);

  const handleRemove = (id) => {
    setShowAlert(true);
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, removed: true, removedAt: new Date() } : m
      )
    );
  };



  const handleSave = () => {
    const toRemoveIds = members.filter((m) => m.removed).map((m) => m.id);
    // TODO: API 호출
    console.log("삭제할 멤버:", toRemoveIds);
    setShowModal(false);
  };

  return (
    <>
      <Overlay>
        <Card>
          <span
            style={{ alignSelf: "self-end" }}
            onClick={() => setShowModal(false)}
          >
            <CloseBtn />
          </span>
          <Title>팀 관리하기</Title>
          <MemberList>
            {members.map((m) => (
              <MemberItem key={m.id} removed={m.removed}>
                <InfoGroup>
                  <UserProfile src={m.imgUrl} />
                  <NameText>{m.nickname}</NameText>
                </InfoGroup>
                <DetailGroup>
                  <div>
                    <UserIcon width={15} height={15}/>
                    <span style={{color: "black", fontWeight: "bold"}}>{m.role}</span>
                  </div>
                  <div>
                    <CalendarIcon width={15} height={15} />
                    <span>{formatTimeAgo(new Date(m.joined))} 가입</span>
                  </div>
                </DetailGroup>
                {m.removed ? (
                  <RemovedText>
                    {formatTimeAgo(m.removedAt)} “내보내기” 되었습니다
                  </RemovedText>
                ) : (
                  <RemoveBtn onClick={() => handleRemove(m.id)}>
                    내보내기
                  </RemoveBtn>
                )}
              </MemberItem>
            ))}
          </MemberList>
          <SaveBtn onClick={handleSave}>저장하기</SaveBtn>
        </Card>
      </Overlay>
      {showAlert && <MemberRemoveAlert onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default TeamManageModal;
