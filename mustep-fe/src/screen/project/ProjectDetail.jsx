import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { LuDownload } from "react-icons/lu";
import CalendarIcon from "../../assets/calendar_icon2.svg";
import EmailIcon from "../../assets/email_icon.svg";
import ShareIcon from "../../assets/share_icon.svg";
import OrganizationIcon from "../../assets/organization_icon.svg";
import ArrowRight from "../../assets/arrow_right.svg";
import ArrowLeft from "../../assets/arrow_left.svg";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import ShareModal from "../../components/modals/ShareModal";
import Loading from "../../components/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 360px;
  margin: 40px 0;

  /* 모바일 대응 시 적절히 패딩 조절하세요 */
  @media (max-width: 768px) {
    padding: 0 16px;
    margin-top: 16px;
    gap: 24px;
  }
`;

// ─────────────────────────────────────────────────────────────
// 상단 탭(상세보기 / 팀 목록보기)
// ─────────────────────────────────────────────────────────────
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
  border-radius: 12px 12px 0px 0px;
  background-color: ${({ theme }) => theme.colors.gray2};

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    /* border-bottom: 3px solid ${({ theme }) => theme.colors.primary}; */

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

// ─────────────────────────────────────────────────────────────
// 프로젝트 정보 섹션 (포스터 → 상세정보)
// ─────────────────────────────────────────────────────────────
const InfoSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5vw;

  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
`;

const PosterWrapper = styled.div`
  flex: 0 0 15vw;
  img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const DetailsWrapper = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 카테고리 영역
const CategoryRow = styled.div`
  display: flex;
  gap: 1vw;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const CategoryBadge = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray6};
  background: ${({ theme }) => theme.colors.gray1};
  padding: 0.5vh 0.5vw;
  border-radius: 6px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 3px 8px;
  }
`;

// 제목, 설명
const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: bold;
  color: #1f2533;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #1f2533;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

// 메타 정보: 주최 기관 / 접수 기간 / 이메일 / D-day / 상태
const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin-top: 20px;

  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    font-size: 0.85rem;
  }
`;

const InfoLabel = styled.label`
  display: flex;
  align-items: center;
  min-width: 120px;
  gap: 10px;
`;

// 버튼 영역: 다운로드 / 공유
const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 7680px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 15px 60px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }

  & > svg {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ShareButton = styled(ShareIcon)`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// ─────────────────────────────────────────────────────────────
// 유사한 프로젝트 섹션
// ─────────────────────────────────────────────────────────────
const SimilarSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SimilarTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2533;
`;

const SimilarList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 4px;

  /* 스크롤바 숨기기 (선택) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const SimilarItem = styled.div`
  flex: 0 0 auto;
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    width: 100px;
    img {
      height: 70px;
    }
  }
`;

const SimilarTitleText = styled.span`
  font-size: 1rem;
  color: #1f2533;
  font-weight: bold;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ContentsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 40px;

  /* 내부에 렌더된 Markdown 스타일을 약간 추가 */
  & h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.primary};
  }
  & img {
    width: 100%;
  }
  & h3 {
    font-size: 1.25rem;
    margin-top: 24px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.black};
  }
  & p {
    line-height: 1.6;
    margin-bottom: 12px;
    color: #333;
  }
  & ul,
  & ol {
    padding-left: 20px;
    margin-bottom: 16px;
  }
  & li {
    margin-bottom: 8px;
  }
  & code {
    background: ${({ theme }) => theme.colors.gray1};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Source Code Pro", monospace;
    font-size: 0.95rem;
  }
  & pre {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: "Source Code Pro", monospace;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
  & blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 12px;
    color: ${({ theme }) => theme.colors.gray6};
    margin: 16px 0;
    font-style: italic;
    background: ${({ theme }) => theme.colors.gray1};
  }
  & table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }
  & th,
  & td {
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    padding: 8px;
    text-align: left;
  }
  & th {
    background: ${({ theme }) => theme.colors.gray1};
    font-weight: 600;
  }
`;

const PrecautionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  padding: 24px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray6};
  line-height: 1.6;

  & ul {
    list-style: disc inside;
    margin: 0;
    padding-left: 16px;
  }
  & li {
    margin-bottom: 8px;
  }
`;

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    id: null,
    companyName: "",
    title: "",
    description: "",
    content: "",
    status: "",
    statusLabel: "",
    startAt: "",
    endAt: "",
    email: "",
    fileUrl: "",
    imageUrl: "",
    categories: [],
    relatedProjects: [],
    dday: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("⚠️ 토큰이 localStorage에 없습니다.");
          setError("프로젝트 정보를 불러오지 못했습니다.");
          setLoading(false);
          return;
        }

        // 실제 엔드포인트를 자신의 백엔드 주소로 변경하세요.
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/projects/${projectId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // 응답 형식이 { data: { ...프로젝트 필드 } } 형태라 가정
        setProject(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("프로젝트 상세 정보를 불러오는 중 에러 발생:", err);
        setError("프로젝트 정보를 불러오지 못했습니다.");
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  if (loading) {
    return (
      <Container>
        <TabRow>
          <Tab
            to={`/projects/${projectId}`}
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            상세보기
          </Tab>
          <Tab
            to={`/projects/${projectId}/teams`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            팀 목록보기
          </Tab>
        </TabRow>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <TabRow>
          <Tab
            to={`/projects/${projectId}`}
            className={({ isActive }) => (isActive ? "active" : "")}
            end
          >
            상세보기
          </Tab>
          <Tab
            to={`/projects/${projectId}/teams`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            팀 목록보기
          </Tab>
        </TabRow>

        <InfoSection>
          {/* 좌측: 이미지(포스터) */}
          <PosterWrapper>
            <img src={project.imageUrl} alt="프로젝트 포스터" />
          </PosterWrapper>

          {/* 우측: 상세 정보 */}
          <DetailsWrapper>
            {/* 카테고리 */}
            <CategoryRow>
              {project.categories.map((cat) => (
                <CategoryBadge key={cat.id}>{cat.title}</CategoryBadge>
              ))}
            </CategoryRow>

            {/* 제목 */}
            <Title>{project.title}</Title>

            {/* 간단한 설명 */}
            <Description>{project.description}</Description>

            {/* 메타 정보: 주최기관 / 접수기간 / 이메일 / 상태 / D-day */}
            <MetaRow>
              <div>
                <InfoLabel htmlFor="">
                  <OrganizationIcon />
                  주최 기관
                </InfoLabel>
                <span>{project.companyName}</span>
              </div>
              <div>
                <InfoLabel htmlFor="">
                  <CalendarIcon />
                  접수 기간
                </InfoLabel>
                <span>
                  {project.startAt} – {project.endAt}
                </span>
              </div>
              <div>
                <InfoLabel htmlFor="">
                  <EmailIcon />
                  문의 이메일
                </InfoLabel>
                <span> {project.email}</span>
              </div>
            </MetaRow>

            {/* 버튼: 다운로드/공유 */}
            <ButtonRow>
              <DownloadButton
                href={project.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
              >
                <LuDownload /> 추가 파일 다운로드
              </DownloadButton>
              <ShareButton onClick={() => setShowShareModal(true)} />
            </ButtonRow>
          </DetailsWrapper>
        </InfoSection>
        {project.relatedProjects.length !== 0 && (
          <SimilarSection>
            <SimilarTitle>유사한 프로젝트를 알려드려요</SimilarTitle>
            <SimilarList>
              <ArrowLeft />
              {project.relatedProjects.map((sim) => (
                <SimilarItem key={sim.id}>
                  <img src={sim.imageUrl || null} alt={sim.title} />
                  <SimilarTitleText>{sim.title}</SimilarTitleText>
                </SimilarItem>
              ))}
              <ArrowRight />
            </SimilarList>
          </SimilarSection>
        )}

        <ContentsSection>
          {/* Markdown 내용을 여기에 표시 */}
          <ReactMarkdown
            children={project.content}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          />

          <PrecautionWrapper>
            <ul>
              <li>
                본 정보는 주최사가 제공한 자료를 바탕으로 작성된 것입니다.
                내용에 오타 또는 오류가 있을 수 있으며, 주최사 사정으로 인하여
                관련 정보 및 일정이변경될 수 있으니 주최사 홈페이지나 공지사항을
                통해 반드시 공모요강을 확인하시기 바랍니다.
              </li>
              <li>
                등록한 내용에 대하여 사용자가 이를 신뢰하여 취한 조치에 대해서
                씽굿은 어떠한 책임도 지지 않습니다.
              </li>
              <li>
                씽굿/Thinkcontest.com/대학문화신문사의 출처표기에 따라서 전재 및
                재배포를 할 수 있습니다.
              </li>
            </ul>
          </PrecautionWrapper>
        </ContentsSection>
      </Container>
      {showShareModal && <ShareModal setShowModal={setShowShareModal} />}
    </>
  );
};

export default ProjectDetail;
