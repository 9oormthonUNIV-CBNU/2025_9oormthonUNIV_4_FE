// src/screen/team/TeamDetail.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import ArrowForward from "../../assets/arrow_forward.svg";
import TeamInfo from "../../components/team/TeamInfo";
import ProjectCard from "../../components/team/ProjectCard";
import NoticeCard from "../../components/team/NoticeCard";
import Pagination from "../../components/team/Pagination";
import CollaboLinkCard from "../../components/team/CollaboLinkCard";
import MemberCard from "../../components/team/MemberCard";

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
  padding: 10px 24px;
  background: ${({ theme }) => theme.colors.gray2};
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
  padding: 10px 24px;
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
  const [currentPage, setCurrentPage] = useState(1);

  const isLeader = true; // 실제론 API에서 받아온 팀장 여부로 대체
  const [status, setStatus] = useState("recruiting");

  // TODO: useEffect 로 API에서 team 데이터, members 불러오기

  return (
    <PageWrapper>
      <HeaderRow onClick={() => navigate(-1)}>
        <ArrowForward />
      </HeaderRow>

      {/* 팀 기본 설명 */}
      <TopSection>
        <TeamInfo status={status} setStatus={setStatus} isLeader={isLeader} />
        <ProjectCard />
      </TopSection>
      <Divider />
      <TeamIntroduce>
        <ManageBtn $variant="mode">공개 보기 모드 수정하기</ManageBtn>
        <p>한줄소개</p>
        <h1>“이 프로젝트를 통해 ㅇㅇ관련 성장을 목표로하고 있습니다.”</h1>
      </TeamIntroduce>

      {/* 공지사항 & 협업링크 */}
      <CollaboSection>
        {/* 공지사항 카드 */}
        <CardContainer>
          <NoticeCard ManageBtn={ManageBtn} CardHeader={CardHeader}/>
          <Pagination page={currentPage} total={4} onChange={(newPage) => setCurrentPage(newPage)} />
        </CardContainer>

        {/* 협업 관련 링크 카드 */}
        <CardContainer>
          <CollaboLinkCard CardHeader={CardHeader} ManageBtn={ManageBtn} />
          <Pagination page={currentPage} total={4} onChange={(newPage) => setCurrentPage(newPage)} />
        </CardContainer>
      </CollaboSection>

      {/* 팀원 목록 */}
      <MemberSection>
        <MemberCard TextRow={TextRow} ManageBtn={ManageBtn} />
      </MemberSection>

      <ActionSection>
        <EndProjectBtn>프로젝트 끝내기</EndProjectBtn>
        <SubmitFinalBtn>최종 산출물 제출하기</SubmitFinalBtn>
      </ActionSection>
    </PageWrapper>
  );
};

export default TeamDetail;
