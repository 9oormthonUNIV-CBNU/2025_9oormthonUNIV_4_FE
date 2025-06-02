// src/screen/project/ProjectTeamList.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useParams, useNavigate } from "react-router";
import axios from "axios";
import Loading from "../../components/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 360px;
  margin: 40px 0;

  /* 모바일 대응: 패딩/간격 축소 */
  @media (max-width: 768px) {
    padding: 0 16px;
    margin-top: 16px;
    gap: 24px;
  }
`;

/* ─────────────────────────────────────────────────────────────
   상단 탭(상세보기 / 팀 목록보기) 
───────────────────────────────────────────────────────────── */
const TabRow = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
`;

const Tab = styled(NavLink)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray4};
  padding: 8px 24px;
  text-decoration: none;
  border-radius: 12px 12px 0 0;
  background-color: ${({ theme }) => theme.colors.gray2};

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_lite};
    color: ${({ theme }) => theme.colors.white};
  }
`;

/* ─────────────────────────────────────────────────────────────
   팀 카드들을 그리드로 감싸는 컨테이너
───────────────────────────────────────────────────────────── */
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* ─────────────────────────────────────────────────────────────
   개별 팀 카드
───────────────────────────────────────────────────────────── */
const Card = styled.div`
  background: #fff;
  border: 1px solid #dde0e6;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
`;

/* 카드 헤더(팀명, 프로젝트명/소속) */
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const TeamTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  word-break: keep-all;
`;

const ProjectTitle = styled.span`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.black};
`;

/* 카드 내용 (한 줄 소개) */
const CardContent = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.black};
  flex-grow: 1;
  margin: 0 0 0px 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 3줄까지 보이고 이후 말줄임 */
  -webkit-box-orient: vertical;
`;

/* 카드 푸터(인원 정보 + 버튼) */
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberInfo = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray3};
  strong {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 600;
  }
`;

/* 모집중 / 모집마감 버튼 */
const JoinBtn = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }
`;

const ClosedBtn = styled.button`
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.gray2};
  color: ${({ theme }) => theme.colors.gray5};
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: default;
  opacity: 0.6;
`;

/* ─────────────────────────────────────────────────────────────
   하단 메시지 + 팀 생성 버튼
───────────────────────────────────────────────────────────── */
const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray2};
  border-radius: 12px;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const FooterText = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.gray6};
  font-weight: 500;
`;

const CreateBtn = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
    color: ${({ theme }) => theme.colors.white};
  }
`;

/* ─────────────────────────────────────────────────────────────
   컴포넌트 본문
───────────────────────────────────────────────────────────── */
const ProjectTeamList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/v1/teams/projects/${projectId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // data.data 안에 팀 배열이 들어있다고 가정
        setTeams(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("팀 목록 조회 실패:", err);
      } 
    };

    fetchTeams();
  }, [projectId]);

  if (loading) {
    return (
      <Container>
        <TabRow>
          <Tab to={`/projects/${projectId}`} end>
            상세보기
          </Tab>
          <Tab to={`/projects/${projectId}/teams`}>팀 목록보기</Tab>
        </TabRow>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      {/* 상단 탭 */}
      <TabRow>
        <Tab to={`/projects/${projectId}`} end>
          상세보기
        </Tab>
        <Tab to={`/projects/${projectId}/teams`}>팀 목록보기</Tab>
      </TabRow>

      {/* 팀 카드 그리드 */}
      <CardsContainer>
        {teams.map((team) => (
          <Card key={team.id} onClick={() => navigate(`/teams/${team.id}`)}>
            <CardHeader>
              <TeamTitle>{team.title}</TeamTitle>
              <ProjectTitle>{team.projectTitle}</ProjectTitle>
            </CardHeader>

            <CardContent>
              {team.content ? team.content : "한 줄 소개가 없습니다."}
            </CardContent>

            <CardFooter>
              <MemberInfo>
                <strong>{team.memberCount}명</strong> / {team.maxUserCount}명
              </MemberInfo>

              {team.status === "RECRUITING" ? (
                <JoinBtn>모집중</JoinBtn>
              ) : (
                <ClosedBtn disabled>모집마감</ClosedBtn>
              )}
            </CardFooter>
          </Card>
        ))}
      </CardsContainer>

      {/* 하단 메시지 + 버튼 */}
      <Footer>
        <FooterText>
          들어가고 싶은 팀이 없어요. 맘에 드는 팀이 없다면! 직접 팀을
          만들어보세요!
        </FooterText>
        <CreateBtn onClick={() => navigate(`/projects/${projectId}/newteam`)}>
          팀 생성 신청하기
        </CreateBtn>
      </Footer>
    </Container>
  );
};

export default ProjectTeamList;
