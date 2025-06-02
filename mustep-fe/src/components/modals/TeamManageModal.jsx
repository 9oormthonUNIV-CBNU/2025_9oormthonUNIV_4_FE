// src/components/modals/TeamManageModal.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";
import CalendarIcon from "../../assets/calendar.svg";
import UserIcon from "../../assets/user_icon.svg";
import axios from "axios";
import NoItem from "../NoItem";
import MemberRemoveAlert from "./MemberRemoveAlert";
import { formatTimeAgo } from "../../../utils/Utils";

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
  background: white;
  border-radius: 24px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 35vw;
  width: 90%;

  @media (max-width: 768px) {
    max-width: 90vw;
    padding: 24px 16px;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2533;
  margin: 0 0 24px;
  text-align: center;
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

// ★ `removed` 대신 `$removed` 로 transient prop을 사용
const MemberItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ $removed, theme }) =>
    $removed ? theme.colors.gray1 : "#fff"};
  border: ${({ $removed, theme }) =>
    $removed ? "none" : `2px solid ${theme.colors.primary}`};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  width: 25%;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 8px;
  }
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
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
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray1};
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const RemovedText = styled.span`
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 400;
  color: #666;
  width: 35%;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
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
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const TeamManageModal = ({ teamId, members: initialMembers, setMembers, setShowModal }) => {
  const [localMembers, setLocalMembers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // 마운트 시점에 백엔드에서 내려준 kickedAt 값을 그대로 사용
  useEffect(() => {
    setLocalMembers(initialMembers);
    setMembers(initialMembers);
  }, [initialMembers, setMembers]);

  // “내보내기” 클릭 → kickedAt만 현재 시각으로 바꾸어 UI에 반영
  const handleRemove = (userId) => {
    setShowAlert(true);
    const nowIso = new Date().toISOString();

    setLocalMembers((prev) =>
      prev.map((m) =>
        m.userId === userId
          ? { ...m, kickedAt: nowIso }
          : m
      )
    );
    setMembers((prev) =>
      prev.map((m) =>
        m.userId === userId
          ? { ...m, kickedAt: nowIso }
          : m
      )
    );
  };

  // “저장하기” 클릭 → kickedAt이 null이 아닌(=내보내기 처리된) 멤버만 DELETE 요청
  const handleSave = async () => {
    const toRemove = localMembers.filter((m) => m.kickedAt && !m.leader);
    if (toRemove.length === 0) {
      setShowModal(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ 토큰 없음");
        return;
      }

      await Promise.all(
        toRemove.map((m) =>
          axios.delete(
            `${import.meta.env.VITE_SERVER_END_POINT}/api/members/${teamId}/members/${m.userId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        )
      );

      setShowModal(false);
    } catch (err) {
      console.error("멤버 삭제 실패:", err);
      alert("멤버 삭제 중 오류가 발생했습니다.");
    }
  };

  if (!localMembers.length) {
    return (
      <Overlay>
        <Card>
          <span style={{ alignSelf: "self-end" }} onClick={() => setShowModal(false)}>
            <CloseBtn />
          </span>
          <Title>팀 관리하기</Title>
          <NoItem />
        </Card>
      </Overlay>
    );
  }

  return (
    <>
      <Overlay>
        <Card>
          <span style={{ alignSelf: "self-end" }} onClick={() => setShowModal(false)}>
            <CloseBtn />
          </span>
          <Title>팀 관리하기</Title>

          <MemberList>
            {localMembers
              .filter((m) => !m.leader)
              .map((m) => {
                const isRemoved = Boolean(m.kickedAt);
                return (
                  // ★ 여기서는 $removed를 넘겨야 DOM에 전달되지 않습니다.
                  <MemberItem key={m.userId} $removed={isRemoved}>
                    <InfoGroup>
                      {m.imgUrl ? (
                        <UserProfile src={m.imgUrl} alt={m.username} />
                      ) : (
                        <UserIcon width={36} height={36} />
                      )}
                      <NameText>{m.username}</NameText>
                    </InfoGroup>

                    <DetailGroup>
                      <div>
                        <CalendarIcon width={15} height={15} />
                        <span>가입 {m.joinedDaysAgo}일 전</span>
                      </div>
                    </DetailGroup>

                    {isRemoved ? (
                      // formatTimeAgo에는 반드시 Date 객체를 넘겨야 합니다.
                      <RemovedText>
                        {formatTimeAgo(new Date(m.kickedAt))} 내보내기 처리됨
                      </RemovedText>
                    ) : (
                      <RemoveBtn onClick={() => handleRemove(m.userId)}>
                        내보내기
                      </RemoveBtn>
                    )}
                  </MemberItem>
                );
              })}
          </MemberList>

          <SaveBtn onClick={handleSave}>저장하기</SaveBtn>
        </Card>
      </Overlay>

      {showAlert && <MemberRemoveAlert onClose={() => setShowAlert(false)} />}
    </>
  );
};

export default TeamManageModal;
