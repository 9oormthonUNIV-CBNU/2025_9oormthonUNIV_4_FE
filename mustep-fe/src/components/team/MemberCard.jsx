// components/team/MemberCard.jsx
import React from "react";
import styled from "styled-components";
import CalendarIcon from "../../assets/calendar.svg";
import UserIcon from "../../assets/user_icon.svg";
import { useNavigate, useLocation } from "react-router";

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
`;
const MemberCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const ProfileImg = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gray2};
  background-image: url((img));
`;

const MemberName = styled.div`
  font-size: 1rem;
  color: #1f2533;
`;
const MemberRole = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
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
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <MemberHeader>
        <h2>팀원 목록</h2>
        {/* 아래는 팀장 권한이 있을 시 활성화 */}
        <ControlBtnBlock>
          {isLeader && (
            <>
              <ManageBtn
                $variant="control"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                팀원관리
              </ManageBtn>
              <ManageBtn
                $variant="control"
                onClick={() => {
                  setShowApplyModal(true);
                }}
              >
                팀 신청자 보기
              </ManageBtn>
            </>
          )}
        </ControlBtnBlock>
      </MemberHeader>

      <MemberList>
        {/* 예시: 나중에 members.map */}
        {members.map((m) => (
          <MemberCardContainer key={m.userId}>
            <MemberCardHeader>
              <ProfileImg img={m.imgUrl} />
              <MemberName>{m.username}</MemberName>
            </MemberCardHeader>
            <TextRow>
              <UserIcon width={15} height={15} />
              <MemberRole>{m.leader === true ? `팀장` : "팀원"}</MemberRole>
            </TextRow>
            <TextRow>
              <CalendarIcon width={15} />
              <JoinDate>
                {m.joinedDaysAgo === 0 ? `오늘` : `${m.joinedDaysAgo}일전 가입`}
              </JoinDate>
            </TextRow>
          </MemberCardContainer>
        ))}
      </MemberList>
    </>
  );
};

export default MemberCard;
