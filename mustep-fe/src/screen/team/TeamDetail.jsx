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
import SubmitDocsModal from "../../components/modals/SubmitDocsModal";
import axios from "axios";
import Loading from "../../components/Loading";
import ProfileModal from "../../components/modals/ProfileModal";

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

// 공지사항 & 협업 링크 묶음
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
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  border-color: ${({ theme }) => theme.colors.gray3};

  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case "mode":
      case "action":
        return $variant === "mode" ? theme.colors.gray1 : theme.colors.gray1;
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
      case "control":
        return theme.colors.gray6;
      default:
        return theme.colors.gray4;
    }
  }};
  border: ${({ theme, $variant }) =>
    $variant === "control" ? `1px solid ${theme.colors.gray2}` : "none"};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background: ${({ theme, $variant, disabled }) =>
      disabled
        ? theme.colors.gray1
        : $variant === "mode"
        ? theme.colors.gray3
        : $variant === "action"
        ? theme.colors.gray3
        : theme.colors.gray1};
  }
`;

const JoinButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;

  & > button {
    padding: 12px 32px;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.primary_lite};
    }
  }
`;

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  // 1) 로그인된 사용자 정보(userId)
  const [userId, setUserId] = useState(null);

  // 2) 팀 상세 정보
  const [teamDetail, setTeamDetail] = useState(null);

  // 3) 역할 구분
  const [isLeader, setIsLeader] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // 기타 상태들
  const [leaderName, setLeaderName] = useState("");
  const [members, setMembers] = useState(DummyTeamMember);
  const [status, setStatus] = useState("recruiting");
  const [selectedUserId, setSelectedUserId] = useState(null);

  // 공지사항
  const [noticePage, setNoticePage] = useState(1);
  const [notices, setNotices] = useState([]);
  const [noticeTotalPages, setNoticeTotalPages] = useState(1);

  // 협업 링크
  const [collabPage, setCollabPage] = useState(1);
  const [collaboLinks, setCollaboLinks] = useState([]);
  const [collabTotalPages, setCollabTotalPages] = useState(1);

  // 모달 표시 여부
  const [showTeamManageModal, setShowTeamManageModal] = useState(false);
  const [showApplyManageModal, setShowApplyManageModal] = useState(false);
  const [showCollaboModal, setCollaboModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // ──────────────────────────────────────────────────────
  // 1) 로그인된 사용자 정보(userId) 가져오기
  // ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ 토큰이 localStorage에 없습니다.");
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // 응답 예시: { userId: 2, nickname: "...", ... }
        setUserId(res.data.userId);
      } catch (err) {
        console.error("유저 정보 조회 실패:", err);
      }
    };
    fetchUserInfo();
  }, []);

  // ──────────────────────────────────────────────────────
  // 2) 팀 상세 정보 가져오기 (teamId 또는 userId가 바뀔 때마다)
  // ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!teamId) return;

    const fetchTeamDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ 토큰이 localStorage에 없습니다.");
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/${teamId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.data) {
          const data = res.data.data;
          setTeamDetail(data);
          setMembers(data.members || []);
          setStatus(data.status);

          // 팀장 이름 세팅
          const leaderObj = data.members.find((m) => m.leader === true);
          setLeaderName(leaderObj ? leaderObj.username : "");

          // userId와 비교하여 역할 결정
          if (userId !== null) {
            setIsLeader(data.leaderId === userId);
            setIsMember(
              Array.isArray(data.members) &&
                data.members.some((m) => m.userId === userId)
            );
          }
        }
      } catch (err) {
        console.error("팀 상세 정보 조회 실패:", err);
      }
    };

    fetchTeamDetail();
  }, [teamId, userId]);

  // ──────────────────────────────────────────────────────
  // 3) 공지사항 목록 가져오기 (teamId 또는 noticePage가 바뀔 때마다)
  // ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!teamId) return;
    const fetchNotices = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("⚠️ 토큰이 localStorage에 없습니다.");
        return;
      }
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/teams/${teamId}/notifies?page=${noticePage}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.data) {
          const { content, totalPages } = res.data.data;
          setNotices(content);
          setNoticeTotalPages(totalPages);
        }
      } catch (err) {
        console.error("공지사항 조회 실패:", err);
      }
    };
    fetchNotices();
  }, [teamId, noticePage]);

  // ──────────────────────────────────────────────────────
  // 4) 협업 링크 목록 가져오기 (teamId 또는 collabPage가 바뀔 때마다)
  // ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!teamId) return;
    const fetchCollaboLinks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/v1/tool-links/teams/${teamId}?page=${collabPage}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data && res.data.data) {
          const { content, totalPages } = res.data.data;
          setCollaboLinks(content);
          setCollabTotalPages(totalPages);
        }
      } catch (err) {
        console.error("협업 링크 조회 실패:", err);
      }
    };
    fetchCollaboLinks();
  }, [teamId, collabPage]);

  const handleEndProject = async () => {
    const confirmed = window.confirm("정말 프로젝트를 끝내시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/${teamId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("프로젝트가 성공적으로 종료되었습니다.");
      // 삭제 후 프로젝트 팀 목록으로 이동
      const projectId = teamDetail.project.id;
      navigate(`/projects/${projectId}/teams`);
    } catch (err) {
      if (err.response) {
        console.error(
          "🛑 프로젝트 종료 실패:",
          err.response.status,
          err.response.data
        );
        alert(
          `프로젝트 종료에 실패했습니다: ${err.response.data.message || ""}`
        );
      } else {
        console.error("🛑 네트워크/클라이언트 에러:", err);
        alert("프로젝트 종료 중 오류가 발생했습니다.");
      }
    }
  };

  // 로딩 처리: teamDetail이 아직 없으면 간단히 “로딩 중” 표시
  if (!teamDetail) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  }

  return (
    <>
      <PageWrapper>
        {/* 뒤로가기 */}
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
            teamId={teamId}
          />
          <ProjectCard project={teamDetail.project} />
        </TopSection>

        <Divider />

        {/* 한줄 소개 & 가입 신청 버튼 */}
        <TeamIntroduce>
          {/* 팀장만 “공개 보기 모드 수정하기” 버튼 활성화 */}
          {isLeader && (
            <ManageBtn
              $variant="mode"
              disabled={false}
              onClick={() => navigate(`/teams/${teamId}/edit`)}
            >
              공개 보기 모드 수정하기
            </ManageBtn>
          )}
          <p>한줄소개</p>
          <h1>“{teamDetail.content || ""}”</h1>

          {/* 비회원(=팀원이 아닌 경우)만 보이는 “가입 신청하기” */}
          {!isMember && (
            <JoinButtonWrapper>
              <button onClick={() => navigate(`/teams/${teamId}/apply`)}>
                가입 신청하러 가기
              </button>
            </JoinButtonWrapper>
          )}
        </TeamIntroduce>

        {/* 팀원 or 팀장 둘 다 볼 수 있는 영역 (공지사항 / 협업링크) */}
        {isMember && (
          <CollaboSection>
            {/* ─ 공지사항 카드 ─ */}
            <CardContainer>
              <NoticeCard
                notices={notices}
                ManageBtn={ManageBtn}
                CardHeader={CardHeader}
                page={noticePage}
                totalPages={noticeTotalPages}
                onChangePage={(newPage) => setNoticePage(newPage)}
                // 팀장이 아니면 “글쓰기” 버튼 비활성화
                ManageBtnDisabled={!isLeader}
              />
            </CardContainer>

            {/* ─ 협업 관련 링크 카드 ─ */}
            <CardContainer>
              <CollaboLinkCard
                CardHeader={CardHeader}
                ManageBtn={ManageBtn}
                collaboes={collaboLinks}
                setCollaboes={setCollaboLinks}
                setShowModal={setCollaboModal}
                ManageBtnDisabled={!isLeader}
              />
              <Pagination
                page={collabPage}
                total={collabTotalPages}
                onChange={(newPage) => setCollabPage(newPage)}
              />
            </CardContainer>
          </CollaboSection>
        )}

        {/* 팀원 목록(팀원이나 팀장 둘 다 보임) */}
        {isMember && (
          <MemberSection>
            <MemberCard
              isLeader={isLeader}
              members={teamDetail.members}
              TextRow={TextRow}
              ManageBtn={ManageBtn}
              setShowModal={setShowTeamManageModal}
              setShowApplyModal={setShowApplyManageModal}
              // 팀장이 아니면 “팀원 관리” 버튼 비활성화
              ManageBtnDisabled={!isLeader}
              setShowProfileModal={setShowProfileModal}
              setSelectedUserId={setSelectedUserId}

              onClickMember={(userId) => {
                setSelectedUserId(userId);
                setShowProfileModal(true);
              }}
            />
          </MemberSection>
        )}

        {/* 팀장 전용 “프로젝트 끝내기” / “최종 산출물 제출하기” */}
        {isLeader && (
          <ActionSection>
            <EndProjectBtn onClick={handleEndProject} >프로젝트 끝내기</EndProjectBtn>
            <SubmitFinalBtn onClick={() => setShowDocsModal(true)}>
              최종 산출물 제출하기
            </SubmitFinalBtn>
          </ActionSection>
        )}
      </PageWrapper>

      {/* ───────── 모달 ───────── */}
      {showTeamManageModal && (
        <TeamManageModal
          teamId={teamId}
          members={teamDetail.members}
          setMembers={setMembers}
          setShowModal={setShowTeamManageModal}
          disabled={!isLeader} // 팀장이 아니면 실제 수정 기능 잠금
        />
      )}
      {showApplyManageModal && (
        <TeamApplyModal
          teamId={teamId}
          setShowModal={setShowApplyManageModal}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      )}
      {showCollaboModal && (
        <CollaboManageModal
          collaboes={collaboLinks}
          setCollaboes={setCollaboLinks}
          setShowModal={setCollaboModal}
          setCollabPage={setCollabPage}
          disabled={!isLeader} // 팀장이 아니면 수정 기능 잠금
        />
      )}
      {showDocsModal && <SubmitDocsModal setShowModal={setShowDocsModal} />}
      {showProfileModal && (
        <ProfileModal
          userId={selectedUserId}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  );
};

export default TeamDetail;
