// src/screen/team/TeamDetail.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import RecruitIcon from "../../assets/RecruitIcon.svg";
import CalendarIcon from "../../assets/calendar.svg";
import UserIcon from "../../assets/user_icon.svg";
import SampleImg from "../../assets/imgsample.png";
import { LuDownload } from "react-icons/lu";
import ArrowForward from "../../assets/arrow_forward.svg";

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

const TeamName = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  color: #1f2533;
`;

const LeaderName = styled.div`
  font-size: 1rem;
  color: #7c7e8a;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #7c7e8a;
`;

const DownloadBtn = styled.button`
  padding: 8px 0px;
  background: ${({ theme }) => theme.colors.primary_lite};
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 40%;
`;

const ProjectCard = styled.div`
  flex: 0 0 300px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 16px;
  display: flex;
`;

// 좌측 텍스트 영역
const ProjectText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #1f2533;
  }
  span {
    font-size: 0.85rem;
    color: #7c7e8a;
  }
`;

const ProjectImage = styled.img`
  width: 100px;
  border-radius: 8px;
  object-fit: cover;
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

const NoticeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NoticeItem = styled.li`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  }
`;

// 공지사항 아이템 좌측 텍스트
const NoticeText = styled.div`
  font-size: 1rem;
  color: black;
  font-weight: 500;
`;

// 공지사항 날짜영역
const NoticeMeta = styled.div`
  font-size: 0.85rem;
  color: #7c7e8a;
  display: flex;
  gap: 8px;
  p {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const CollaboLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CollaboLinkItem = styled.li`
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberSection = styled.section`
  background: ${({ theme }) => theme.colors.gray1};
  padding: 24px;
  border-radius: 12px;
`;

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
  width: 160px;
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
`;

const MemberName = styled.div`
  font-size: 1.25rem;
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
  border-color: ${({theme}) => theme.colors.gray3};

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
  border-color: ${({theme}) => theme.colors.gray3};

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }
`;

// 페이징
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray5};

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &.active {
      color: ${({ theme }) => theme.colors.black};
      font-weight: bold;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.gray1};
    }
  }
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
  border-color: ${({theme}) => theme.colors.gray3};


  /* variant 에 따라 background / color / border 를 다르게 */
  background: ${({ theme, variant }) => {
    switch (variant) {
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

  color: ${({ theme, variant }) => {
    switch (variant) {
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

  border: ${({ theme, variant }) =>
    variant === "control" ? `1px solid ${theme.colors.gray2}` : "none"};

  &:hover {
    background: ${({ theme, variant }) =>
      variant === "mode"
        ? theme.colors.gray3
        : variant === "action"
        ? theme.colors.gray3
        : theme.colors.gray1};
  }
`;

const TeamDetail = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  // TODO: useEffect 로 API에서 team 데이터, members 불러오기

  return (
    <PageWrapper>
      {/* 1. 뒤로 가기 */}
      <HeaderRow onClick={() => navigate(-1)}>
        <ArrowForward />
      </HeaderRow>
      <TopSection>
        <InfoBlock>
          <TeamName>팀명팀명팀명팀명</TeamName>
          <LeaderName>팀장 이름</LeaderName>
          <TextRow>
            <div>
              <RecruitIcon width={16} height={16} />
              <span>모집인원</span>
            </div>

            <strong>6명 중 3명</strong>
            <strong>모집중</strong>
          </TextRow>
          <DownloadBtn>
            <LuDownload /> 첨부파일 다운로드
          </DownloadBtn>
        </InfoBlock>

        <ProjectCard>
          <ProjectText>
            <div>
              <h4>진행중인 프로젝트 이름</h4>
              <span>회사명</span>
            </div>
            <span>25.5.21 – 25.6.23</span>
          </ProjectText>
          <ProjectImage src={SampleImg} alt="프로젝트 이미지" />
        </ProjectCard>
      </TopSection>

      <Divider />

      <TeamIntroduce>
        <ManageBtn variant="mode">공개 보기 모드 수정하기</ManageBtn>
        <p>한줄소개</p>
        <h1>“이 프로젝트를 통해 ㅇㅇ관련 성장을 목표로하고 있습니다.”</h1>
      </TeamIntroduce>

      {/* 공지사항 & 협업링크 */}
      <CollaboSection>
        {/* 공지사항 카드 */}
        <CardContainer>
          <CardHeader>
            <h2>공지사항</h2>
            <ManageBtn variant="action">글쓰기</ManageBtn>
          </CardHeader>
          <NoticeList>
            {/* 예시 3개 */}
            {[
              "1차 회의안 및 각자 역할에 대한 공지",
              "다음 회의 일정 안내",
              "디자인 리뷰 공지",
            ].map((text, i) => (
              <NoticeItem key={i}>
                <NoticeText>{text}</NoticeText>
                <NoticeMeta>
                  <p>2025.5.21</p>
                  <p>2시간전 수정</p>
                </NoticeMeta>
              </NoticeItem>
            ))}
          </NoticeList>
          <Pagination>
            <button>{"<"}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>{">"}</button>
          </Pagination>
        </CardContainer>

        {/* 협업 관련 링크 카드 */}
        <CardContainer>
          <CardHeader>
            <h2>협업 관련 링크</h2>
            <ManageBtn variant="action">링크 관리</ManageBtn>
          </CardHeader>
          <CollaboLinkList>
            {/* 예시 3개 */}
            {[
              {
                icon: "🔗",
                title: "project_4팀_피그마",
                url: "www.figma.com",
              },
              {
                icon: "💬",
                title: "project_4팀_오픈채팅",
                url: "open.kakao.com",
              },
              { icon: "📓", title: "project_4팀_노션", url: "www.notion.so" },
            ].map((item, i) => (
              <CollaboLinkItem key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#7c7e8a" }}>
                      {item.url}
                    </div>
                  </div>
                </div>
              </CollaboLinkItem>
            ))}
          </CollaboLinkList>
          <Pagination>
            <button>{"<"}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>{">"}</button>
          </Pagination>
        </CardContainer>
      </CollaboSection>

      {/* 4. 팀원 목록 */}
      <MemberSection>
        <MemberHeader>
          <h2>팀원 목록</h2>
          {/* 아래는 팀장 권한이 있을 시 활성화 */}
          <ControlBtnBlock>
            <ManageBtn variant="control">팀원관리</ManageBtn>
            <ManageBtn variant="control">팀 신청자 보기</ManageBtn>
          </ControlBtnBlock>
        </MemberHeader>

        <MemberList>
          {/* 예시: 나중에 members.map */}
          {[1, 2, 3].map((m) => (
            <MemberCardContainer key={m}>
              <MemberCardHeader>
                <ProfileImg />
                <MemberName>미르미</MemberName>
              </MemberCardHeader>
              <TextRow>
                <UserIcon />
                <MemberRole>팀장</MemberRole>
              </TextRow>
              <TextRow>
                <CalendarIcon />
                <JoinDate>8일전 가입</JoinDate>
              </TextRow>
            </MemberCardContainer>
          ))}
        </MemberList>
      </MemberSection>
      <ActionSection>
        <EndProjectBtn>프로젝트 끝내기</EndProjectBtn>
        <SubmitFinalBtn>최종 산출물 제출하기</SubmitFinalBtn>
      </ActionSection>
    </PageWrapper>
  );
};

export default TeamDetail;
