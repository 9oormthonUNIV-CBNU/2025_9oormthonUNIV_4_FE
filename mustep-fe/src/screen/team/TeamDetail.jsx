// src/screen/team/TeamDetail.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import ArrowForward from "../../assets/arrow_forward.svg";
import TeamInfo from "../../components/team/TeamInfo";
import ProjectCard from "../../components/team/ProjectCard";
import NoticeCard from "../../components/team/NoticeCard";
import Pagination from "../../components/team/Pagination";
import CollaboLinkCard from "../../components/team/CollaboLinkCard";
import MemberCard from "../../components/team/MemberCard";
import TeamManageModal from "../../components/modals/TeamManageModal";
import DummyTeamMember from "../../../utils/DummyData";
import TeamApplyModal from "../../components/modals/TeamApplyModal";
import CollaboManageModal from "../../components/modals/CollaboManageModal";
import CollaboDummyData from "../../../utils/CollaboDummyData";
import SubmitDocsModal from "../../components/modals/SubmitDocsModal";
import axios from "axios";

// import MemberCard from '../../components/team/MemberCard'  // 차후에 짜실 카드 컴포넌트

const PageWrapper = styled.main`
  padding: 45px 360px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #545661;
`;

// 상단 팀 정보 관련 스타일
const TopSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 30px;
`;

const InfoBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TeamIntroduce = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
  p {
    font-size: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.2rem 0px;
  }

  & > button {
    align-self: flex-end;
  }
`;

// 공지사항 & 협업링크 묶음
const CollaboSection = styled.div`
  display: flex;
  gap: 24px;

  & > div:nth-child(1) {
    flex: 6;
  }
  & > div:nth-child(2) {
    flex: 4;
  }
`;

const CardContainer = styled.div`
  flex: 1;
  background: #fff;
  border: 1px solid #dde0e6;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0px 0px 10px 0px;
  }
`;

const MemberSection = styled.section`
  background: ${({ theme }) => theme.colors.gray1};
  padding: 24px;
  border-radius: 12px;
`;

const ActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 30px;
`;

const EndProjectBtn = styled.button`
  padding: 15px 24px;
  background: ${({ theme }) => theme.colors.gray2};
  color: ${({ theme }) => theme.colors.gray5};
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.gray3};

  &:hover {
    background: ${({ theme }) => theme.colors.gray3};
  }
`;

const SubmitFinalBtn = styled.button`
  padding: 15px 24px;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.gray3};

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: black;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  margin: 0 0px;
`;

const ManageBtn = styled.button`
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border-color: ${({ theme }) => theme.colors.gray3};

  /* $variant 에 따라 background / color / border 를 다르게 */
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      // 공개 보기 모드 수정하기
      case "mode":
        return theme.colors.gray1;
      // 글쓰기 / 링크 관리
      case "action":
        return theme.colors.gray1;
      // 팀원관리 / 팀 신청자 보기
      case "control":
        return theme.colors.white;
      default:
        return theme.colors.gray1;
    }
  }};

  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "mode":
        return theme.colors.gray4;
      case "action":
        return theme.colors.gray6;
      case "control":
        return theme.colors.gray6;
      default:
        return theme.colors.gray4;
    }
  }};

  border: ${({ theme, $variant }) =>
    $variant === "control" ? `1px solid ${theme.colors.gray2}` : "none"};

  &:hover {
    background: ${({ theme, $variant }) =>
      $variant === "mode"
        ? theme.colors.gray3
        : $variant === "action"
        ? theme.colors.gray3
        : theme.colors.gray1};
  }
`;

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [teamDetail, setTeamDetail] = useState(null);
  const [leaderName, setLeaderName] = useState("");
  const [members, setMembers] = useState(DummyTeamMember);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLeader, setIsLeader] = useState(false);
  const [status, setStatus] = useState("recruiting");

  // 공지사항 관련 state
  const [noticePage, setNoticePage] = useState(1);
  const [notices, setNotices] = useState([]);
  const [noticeTotalPages, setNoticeTotalPages] = useState(1);

  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [showApplyManageModal, setShowApplyManageModal] = useState(false);
  const [showCollaboModal, setCollaboModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);

  const [collaboes, setCollaboes] = useState(CollaboDummyData);

  // TODO: useEffect 로 API에서 team 데이터, members 불러오기
  useEffect(() => {
    if (!teamId) return;

    const fetchTeamDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("⚠️ 토큰이 localStorage에 없습니다.");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/${teamId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
              // 필요시 토큰이나 다른 헤더 추가
            },
          }
        );

        if (res.data && res.data.data) {
          const data = res.data.data;

          // 받은 데이터를 state에 세팅
          setTeamDetail(data);
          setMembers(data.members || []);
          // setNotices(data.notifies || []);
          // 임시로 collaboes는 더미 데이터 사용 중이라면, API 스펙이 나오면 바꿔주세요
          // setCollaboes(data.collaboes || []);
          setStatus(data.status);
          setLeaderName(() => {
            const leaderObj = data.members.find((m) => m.leader === true);
            return leaderObj ? leaderObj.username : "";
          });

          // “현재 로그인한 유저가 팀장인지” 판별해서 isLeader 세팅
          // 예시: data.leaderId가 123이고, 내 userId도 123이면 true
          const myUserId = 1; // 저장 방식에 따라 조정
          setIsLeader(data.leaderId === myUserId);
        }
      } catch (err) {
        console.error("팀 상세 정보 조회 실패", err);
      }
    };

    fetchTeamDetail();
  }, [teamId]);

  useEffect(() => {
    if (!teamId) return;

    const fetchNotices = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("⚠️ 토큰이 localStorage에 없습니다.");
          return;
        }

        // 서버 API 예시: GET /api/teams/:teamId/notifies?page=noticePage
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/teams/${teamId}/notifies?page=${noticePage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (res.data && res.data.data) {
          const { content, totalPages } = res.data.data;
          setNotices(content);
          setNoticeTotalPages(totalPages);
        }
      } catch (err) {
        console.error("공지사항 조회 실패", err);
      }
    };

    fetchNotices();
  }, [teamId, noticePage]);

  if (!teamDetail) {
    return <div style={{ padding: "24px" }}>로딩 중...</div>;
  }

  return (
    <>
      <PageWrapper>
        <HeaderRow onClick={() => navigate(-1)}>
          <ArrowForward />
        </HeaderRow>

        {/* 팀 기본 설명 */}
        <TopSection>
          <TeamInfo
            status={status}
            setStatus={setStatus}
            isLeader={isLeader}
            title={teamDetail.title}
            fileUrl={teamDetail.fileUrl}
            maxUserCount={teamDetail.maxUserCount}
            memberCount={teamDetail.memberCount}
            leaderName={leaderName}
          />
          <ProjectCard project={teamDetail.project} />
        </TopSection>
        <Divider />
        <TeamIntroduce>
          <ManageBtn $variant="mode">공개 보기 모드 수정하기</ManageBtn>
          <p>한줄소개</p>
          <h1>“{(teamDetail && teamDetail.content) || ""}”</h1>
        </TeamIntroduce>

        {/* 공지사항 & 협업링크 */}
        <CollaboSection>
          {/* 공지사항 카드 */}
          <CardContainer>
            <NoticeCard
              notices={notices}
              ManageBtn={ManageBtn}
              CardHeader={CardHeader}
              page={noticePage}
              totalPages={noticeTotalPages}
              onChangePage={(newPage) => setNoticePage(newPage)}
            />
          </CardContainer>

          {/* 협업 관련 링크 카드 */}
          <CardContainer>
            <CollaboLinkCard
              CardHeader={CardHeader}
              ManageBtn={ManageBtn}
              collaboes={collaboes}
              setCollaboModal={setCollaboModal}
              setShowModal={setCollaboModal}
            />
            <Pagination
              page={currentPage}
              total={4}
              onChange={(newPage) => setCurrentPage(newPage)}
            />
          </CardContainer>
        </CollaboSection>

        {/* 팀원 목록 */}
        <MemberSection>
          <MemberCard
            members={teamDetail.members}
            TextRow={TextRow}
            ManageBtn={ManageBtn}
            setShowModal={setShowTeamManageModal}
            setShowApplyModal={setShowApplyManageModal}
          />
        </MemberSection>

        <ActionSection>
          <EndProjectBtn>프로젝트 끝내기</EndProjectBtn>
          <SubmitFinalBtn onClick={() => setShowDocsModal(true)}>
            최종 산출물 제출하기
          </SubmitFinalBtn>
        </ActionSection>
      </PageWrapper>
      {showTeamManageModal && (
        <TeamManageModal
          teamId={teamId} 
          members={teamDetail.members}
          setMembers={setMembers}
          setShowModal={setShowTeamManageModal}
        />
      )}
      {showApplyManageModal && (
        <TeamApplyModal
          teamId={teamId}
          setShowModal={setShowApplyManageModal}
        />
      )}
      {showCollaboModal && (
        <CollaboManageModal
          collaboes={collaboes}
          setCollaboes={setCollaboes}
          setShowModal={setCollaboModal}
        />
      )}
      {showDocsModal && <SubmitDocsModal setShowModal={setShowDocsModal} />}
    </>
  );
};

export default TeamDetail;
