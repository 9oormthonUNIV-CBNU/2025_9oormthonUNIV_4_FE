// src/components/team/MemberCard.jsx

import React from "react";
import styled from "styled-components";
import CalendarIcon from "../../assets/calendar.svg";
import UserIcon from "../../assets/user_icon.svg";

const MemberHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  margin-bottom: 0px;
`;

const ControlBtnBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const MemberList = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const MemberCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  cursor: pointer; /* 클릭 가능 커서 */
`;

const MemberCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

// 프로필 이미지를 img prop으로 받아서 background-image에 적용
const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray2};
  background-image: ${({ img }) => (img ? `url(${img})` : "none")};
  background-size: cover;
  background-position: center;
`;

const MemberName = styled.div`
  font-size: 1rem;
  color: #1f2533;
`;

const MemberRole = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${({ theme, leader }) =>
    leader ? theme.colors.primary : theme.colors.black};
`;

const JoinDate = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray4};
`;

const MemberCard = ({
  isLeader,
  members,
  TextRow,
  ManageBtn,
  setShowModal,
  setShowApplyModal,
  setSelectedUserId,
  onClickMember, // 부모로부터 전달된 클릭 콜백
}) => {
  return (
    <>
      <MemberHeader>
        <h2>팀원 목록</h2>
        <ControlBtnBlock>
          {isLeader && (
            <>
              <ManageBtn
                $variant="control"
                onClick={() => setShowModal(true)}
              >
                팀원관리
              </ManageBtn>
              <ManageBtn
                $variant="control"
                onClick={() => setShowApplyModal(true)}
              >
                팀 신청자 보기
              </ManageBtn>
            </>
          )}
        </ControlBtnBlock>
      </MemberHeader>

      <MemberList>
        {members
          .filter((m) => m.kickedAt === null) // kickedAt이 null인 멤버만
          .map((m) => (
            <MemberCardContainer
              key={m.userId}
              onClick={() => {
                setSelectedUserId(m.userId)
              }}
            >
              <MemberCardHeader>
                <ProfileImg img={m.imgUrl || ""} />
                <MemberName>{m.username}</MemberName>
              </MemberCardHeader>

              <TextRow>
                <UserIcon width={15} height={15} />
                <MemberRole leader={m.leader}>
                  {m.leader ? "팀장" : "팀원"}
                </MemberRole>
              </TextRow>

              <TextRow>
                <CalendarIcon width={15} />
                <JoinDate>
                  {m.joinedDaysAgo === 0
                    ? "오늘"
                    : `${m.joinedDaysAgo}일전 가입`}
                </JoinDate>
              </TextRow>
            </MemberCardContainer>
          ))}
      </MemberList>
    </>
  );
};

export default MemberCard;
