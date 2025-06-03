// src/screen/ProfilePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styled from "styled-components";

import ArrowForward from "../assets/arrow_forward.svg";
import UserIcon from "../assets/user_icon.svg"; // 기본 아바타 아이콘
import SchoolIcon from "../assets/school_icon.svg"; // 대학교 아이콘
import CertIcon from "../assets/cert_icon.svg"; // 인증 완료 아이콘
import EditIntroduce from "../components/modals/EditIntroduce";
import NoItem from "../components/NoItem";

// ———— Styled Components ————

const PageWrapper = styled.main`
  padding: 45px 360px;
  min-height: 70vh;
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

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
`;

const ProfileCard = styled.section`
  background: #fff;
  border: 1px solid #dde0e6;
  border-radius: 12px;
  padding: 24px 32px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const IntroduceBox = styled.div`
  width: 25vw;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 24px 36px;
  border-radius: 30px 30px 30px 0;
  font-weight: bold;
`;

const AvatarWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: #f0f0f0;
  flex-shrink: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

`;

const StyledUser = styled(UserIcon)`
  width: 100%;
  height: 100%;
      object-fit: cover;
`

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Greeting = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #1f2533;
`;

const SchoolRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SchoolText = styled.span`
  font-size: 1rem;
  color: #7c7e8a;
`;

const CertButton = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6c00ff;
  font-size: 0.9rem;
  font-weight: 500;

  img {
    width: 20px;
    height: 20px;
  }
`;

const IntroduceText = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-top: 8px;
`;

const EditIntroBtn = styled.div`
  align-self: flex-end;
  background: none;
  color: ${({ theme }) => theme.colors.gray5};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray2};
  }
`;

/* ────────────────────────────────────────────────────────────────────────── */
/*  아래는 “나의 프로젝트 팀” 영역 스타일                                              */
/* ────────────────────────────────────────────────────────────────────────── */

const MyProjectsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2533;
  margin: 0;
`;

const ProjectList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const ProjectCard = styled.li`
  background: #fff;
  border: 1px solid #dde0e6;
  border-radius: 12px;
  width: 280px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TeamTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2533;
`;

const ProjectTitle = styled.span`
  font-size: 1rem;
  color: #1f2533;
`;

const LeaderName = styled.span`
  font-size: 1rem;
  color: #1f2533;
`;

const StartDate = styled.span`
  font-size: 0.9rem;
  color: #1f2533;
  font-weight: bold;
  align-self: center;
`;

const StatusButton = styled.button`
  margin-left: auto;
  align-self: flex-end;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  ${({ status }) => {
    switch (status) {
      case "RECRUITING":
        return `
          background: #6c00ff;
          color: #fff;
        `;
      case "IN_PROGRESS":
        return `
          background: #ff6b6b;
          color: #fff;
        `;
      case "FINISHED":
        return `
          background: #999;
          color: #fff;
        `;
      default:
        return `
          background: #ddd;
          color: #333;
        `;
    }
  }}
`;

// ———— ProfilePage Component ————

const ProfilePage = () => {
  const navigate = useNavigate();

  // 사용자 정보
  const [userInfo, setUserInfo] = useState(null);
  // 내가 소속된/참여 중인 프로젝트 팀
  const [myTeams, setMyTeams] = useState([]);

  // 로딩 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);

  // 프로필 사진 업로드용 파일 인풋(ref)
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMyPage = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // 인증이 필요하면 로그인 페이지로 보내기
          navigate("/login");
          return;
        }

        // 1) 마이페이지 정보 조회: /api/userinfo/mypage
        const resUser = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo/mypage`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resUser.data && resUser.data.data) {
          setUserInfo(resUser.data.data.userInfo);
        } else {
          throw new Error("사용자 정보를 불러오지 못했습니다.");
        }

        // 2) 나의 프로젝트 팀 목록 조회: /api/v1/teams/my
        const resTeams = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/my`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (resTeams.data && Array.isArray(resTeams.data.data)) {
          setMyTeams(resTeams.data.data);
        } else {
          throw new Error("나의 프로젝트 팀 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error(err);
        setError("마이페이지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPage();
  }, [navigate]);

  if (loading) {
    return (
      <PageWrapper>
        <div>로딩 중...</div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div style={{ color: "red" }}>{error}</div>
      </PageWrapper>
    );
  }

  // userInfo가 없다면
  if (!userInfo) {
    return (
      <PageWrapper>
        <div>정보를 불러올 수 없습니다.</div>
      </PageWrapper>
    );
  }

  const {
    nickname,
    university,
    major,
    introduce,
    universityAuthenticated,
    imgUrl,
  } = userInfo;

  const handleUpdateIntroduce = (newIntroduce) => {
    // 기존 userInfo 객체에서 introduce만 덮어씌워서 상태를 갱신합니다.
    setUserInfo((prev) => ({
      ...prev,
      introduce: newIntroduce,
    }));
  };

  const onAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 사용자가 파일을 선택하면 호출되는 함수
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      // 1) S3 업로드: multipart/form-data
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/s3/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (
        !uploadRes.data ||
        uploadRes.data.success !== true ||
        !uploadRes.data.data
      ) {
        throw new Error("S3 업로드에 실패했습니다.");
      }

      const newImgUrl = uploadRes.data.data; // S3에서 반환된 URL

      // 2) 유저 정보 PUT 요청: 기존 정보는 그대로 두고 imgUrl만 교체
      await axios.put(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
        {
          // 반드시 서버가 필요로 하는 모든 필드를 포함해야 함. (예시에서는 nickname,major,university,introduce,imgUrl)
          nickname: userInfo.nickname,
          major: userInfo.major,
          university: userInfo.university,
          introduce: userInfo.introduce,
          imgUrl: newImgUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // 3) 로컬 상태 갱신 → UI에 즉시 반영
      setUserInfo((prev) => ({
        ...prev,
        imgUrl: newImgUrl,
      }));

      alert("✅ 프로필 사진 변경에 성공하였습니다.");
    } catch (err) {
      console.error("프로필 사진 업로드/저장 오류:", err);
      alert("프로필 사진을 업로드하는 중 오류가 발생했습니다.");
    } finally {
      // 파일 인풋 값 초기화(선택창을 다시 띄우기 위해)
      e.target.value = "";
    }
  };

  return (
    <>
      <PageWrapper>
        {/* 1) 뒤로 가기 아이콘 */}
        <HeaderRow onClick={() => navigate(-1)}>
          <ArrowForward style={{ cursor: "pointer" }} />
        </HeaderRow>
        <Title>마이 페이지</Title>
        {/* 2) 프로필 카드 */}
        <ProfileCard>
          <AvatarWrapper onClick={onAvatarClick}>
            {imgUrl ? (
              <img src={imgUrl} alt="프로필" />
            ) : (
              <StyledUser/>
            )}
          </AvatarWrapper>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <InfoWrapper>
            {/* 인사말: “안녕하세요, 닉네임 님” */}
            <Greeting>
              안녕하세요, <br />
              {nickname} 님
            </Greeting>

            {/* 학교 + 전공 + 인증 */}
            <SchoolRow>
              <SchoolIcon alt="학교 아이콘" width={20} height={20} />
              <SchoolText>
                {university} {major}학과
              </SchoolText>

              {universityAuthenticated ? (
                // 인증 완료
                <CertButton disabled>
                  <CertIcon alt="인증 아이콘" />
                </CertButton>
              ) : (
                // 인증 안 된 경우
                <CertButton onClick={() => navigate("/university")}>
                  대학 인증하기
                </CertButton>
              )}
            </SchoolRow>

            {/* 자기소개 */}
          </InfoWrapper>
          <RightSection>
            <IntroduceBox>{introduce}</IntroduceBox>
            <EditIntroBtn onClick={() => setShowEditModal(true)}>
              자기소개 수정하기
            </EditIntroBtn>
          </RightSection>
        </ProfileCard>

        {/* 3) 나의 프로젝트 팀 목록 */}
        <MyProjectsWrapper>
          <SectionTitle>나의 프로젝트 팀</SectionTitle>
          {myTeams.length === 0 ? (
            <NoItem />
          ) : (
            <ProjectList>
              {myTeams.map((team) => {
                // team.startAt 예: "2025-06-01T20:55:18.399"
                // “YYYY.MM.DD” 로 포맷
                const startDate = new Date(team.startAt).toLocaleDateString(
                  "ko-KR",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                );

                // status에 따라 버튼 텍스트 결정 (예시)
                let statusLabel = "";
                switch (team.status) {
                  case "RECRUITING":
                    statusLabel = "모집 중";
                    break;
                  case "TERMINAL":
                    statusLabel = "모집 마감";
                    break;
                  default:
                    statusLabel = team.status;
                }

                return (
                  <ProjectCard key={team.id}>
                    <CardHeader>
                      <TeamTitle>{team.title}</TeamTitle>
                      <LeaderName>
                        팀장: {team.leaderName || "정보 없음"}
                      </LeaderName>
                      <ProjectTitle>{team.projectTitle}</ProjectTitle>
                      <div style={{ display: "flex" }}>
                        <StartDate>{startDate}</StartDate>
                        <StatusButton
                          status={team.status}
                          onClick={() => {
                            // 예: 상세 페이지로 이동
                            navigate(`/teams/${team.id}`);
                          }}
                        >
                          {statusLabel}
                        </StatusButton>
                      </div>
                    </CardHeader>
                  </ProjectCard>
                );
              })}
            </ProjectList>
          )}
        </MyProjectsWrapper>
      </PageWrapper>
      {showEditModal && (
        <EditIntroduce
          initialIntroduce={introduce}
          setShowModal={setShowEditModal}
          onUpdateIntroduce={handleUpdateIntroduce}
        />
      )}
    </>
  );
};

export default ProfilePage;
