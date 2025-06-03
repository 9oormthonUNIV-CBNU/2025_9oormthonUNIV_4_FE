// src/screen/team/TeamApplication.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import ArrowForward from "../../assets/arrow_forward.svg";
import { LuDownload } from "react-icons/lu";

// 왼쪽 상단 뒤로가기 아이콘 (SVG 또는 텍스트로 대체 가능합니다)
const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 16px;
`;

// 최상위 컨테이너: 화면 중앙 정렬 + 적당한 패딩
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

const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  font-weight: bold;
  color: #1f2533;
`;

// 팀명
const TeamName = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2533;
  margin: 10px 0;
`;

// 각 라벨+내용을 2열로 배치할 때 쓰는 그리드
const Row = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 20px;

  & label {
    font-size: 1rem;
    font-weight: bold;
    color: black;
  }
  & .value {
    font-size: 1rem;
    color: black;
    word-break: break-word;
  }
`;

// 긴 텍스트(자기소개, 지원 동기 등) 표시용 박스
const LongText = styled.div`
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #1f2533;
  line-height: 1.6;
  white-space: pre-line;
`;

// 첨부파일 영역
const FileWrapper = styled.div`
  gap: 8px;
  margin-top: 8px;
`;

const FileCard = styled.a`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: 200px;
  /* max-width: 100%; */
  height: 100px;
  padding: 12px 16px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 12px;
  text-decoration: none;
  color: #1f2533;
  font-size: 1rem;
  cursor: pointer;
  gap: 10px;

  &:hover {
    background: #f0f0f0;
  }
`;

/* 파일명 텍스트: 한 줄로 고정하고 넘칠 경우 ... 처리 */
const FileName = styled.span`
  font-weight: 500;
  word-break: break-all;
  color: #1f2533;
`;

const FileSize = styled.span`
  font-size: 0.85rem;
  color: #7c7e8a;
`;

/* 왼쪽: 파일명 + 크기 (세로 정렬) */
const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; /* 남은 공간을 모두 차지하게 하여 내부 FileName이 overflow 체크를 할 수 있도록 */
  min-width: 0; /* 반드시 있어야 자식 요소의 text-overflow가 제대로 동작함 */
`;

// 하단 버튼들: 왼쪽 “거절”, 오른쪽 “수락하기”
const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 40px;
`;

const CancelBtn = styled.button`
  padding: 12px 24px;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

const AcceptBtn = styled.button`
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.primary || "#6c00ff"};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const TeamApplication = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();


  const [appData, setAppData] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('selectedUserId');
    if (!token) {
      // 인증이 필요하면 로그인 페이지로 이동
      navigate("/login");
      return;
    }

    const fetchApplication = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/v1/applications/teams/${teamId}/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data && res.data.data) {
          const data = res.data.data;
          setAppData(data);

          // 파일 이름 추출 (URL 마지막 부분)
          if (data.fileUrl) {
            const parts = data.fileUrl.split("/");
            const fname = parts[parts.length - 1];
            setFileName(decodeURIComponent(fname));
          }
          return data.fileUrl;
        }
      } catch (err) {
        console.error("지원서 조회 실패:", err);
        return null;
      }
    };

    const fetchFileSize = async (url) => {
      if (!url) {
        setFileSize("");
        return;
      }
      try {
        const headRes = await axios.head(url);
        const length = parseInt(headRes.headers["content-length"] || "0", 10);
        if (!isNaN(length) && length > 0) {
          setFileSize(`${Math.round(length / 1024)}KB`);
        } else {
          setFileSize("");
        }
      } catch {
        setFileSize("");
      }
    };

    const fetchTeamName = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/${teamId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.data && res.data.data && res.data.data.title) {
          setTeamName(res.data.data.title);
        }
      } catch {
        setTeamName("");
      }
    };

    // 모든 비동기 작업 실행
    fetchApplication()
      .then((url) => fetchFileSize(url))
      .finally(() => {
        fetchTeamName().finally(() => setLoading(false));
      });
  }, [teamId, navigate]);

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('selectedUserId');
    if (!token) {
      navigate("/login");
      return;
    }

    const ok = window.confirm("해당 지원서를 거절하시겠습니까?");
    if (!ok) return;

    try {
      await axios.patch(
        `${
          import.meta.env.VITE_SERVER_END_POINT
        }/api/v1/applications/teams/${teamId}/${userId}/status`,
        { status: "REJECTED" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      // 요청 성공 시 이전 페이지로 돌아가기
      navigate(-1);
    } catch (err) {
      console.error("거절 요청 실패:", err);
      alert("거절 처리 중 오류가 발생했습니다.");
    }
  };

  const handleAccept = async () => {
    const ok = window.confirm("해당 지원서를 수락하시겠습니까?");
    if (!ok) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('selectedUserId');
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_SERVER_END_POINT
        }/api/v1/applications/teams/${teamId}/${userId}/status`,
        { status: "ACCEPT" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      // 요청 성공 시 이전 페이지로 돌아가기
      navigate(-1);
    } catch (err) {
      console.error("수락 요청 실패:", err);
      alert("수락 처리 중 오류가 발생했습니다.");
    }
  };

  // loading 중일 때
  if (loading) {
    return <PageWrapper>로딩 중...</PageWrapper>;
  }

  if (!appData) {
    return <PageWrapper>지원서를 불러올 수 없습니다.</PageWrapper>;
  }

  const {
    name,
    email,
    phoneNumber,
    introduce,
    purpose,
    skillExperience,
    strengthsExperience,
    fileUrl,
  } = appData;

  return (
    <PageWrapper>
      {/* 1. 헤더 */}
      <HeaderRow onClick={() => navigate(-1)}>
        <ArrowForward />
      </HeaderRow>
      <div>
        <Title>팀 참가신청서</Title>
        <TeamName>{teamName || `팀 ${teamId}`}</TeamName>
      </div>
      {/* 2. 기본 정보: 닉네임, 이메일, 연락처 */}
      <Row>
        <label>닉네임</label>
        <div className="value">{name}</div>
      </Row>
      <Row>
        <label>이메일</label>
        <div className="value">{email}</div>
      </Row>
      <Row>
        <label>연락처</label>
        <div className="value">{phoneNumber}</div>
      </Row>

      {/* 3. 자기소개 */}
      <Row style={{ alignItems: "flex-start" }}>
        <label>자기소개</label>
        <label>Q1. 간단한 자기소개를 해주세요.</label>
        <div></div>
        <LongText>{introduce}</LongText>
      </Row>

      {/* 4. 동기 및 목표 */}
      <Row style={{ alignItems: "flex-start" }}>
        <label>동기 및 목표</label>
        <label>Q2. 이 프로젝트에 지원하게 된 이유는 무엇인가요?</label>
        <div></div>
        <LongText>{purpose}</LongText>
      </Row>

      {/* 5. 기술/능력 */}
      <Row style={{ alignItems: "flex-start" }}>
        <label>기술/능력</label>
        <label>Q3. 본인의 기술 스택이나 툴 사용 경험을 알려주세요.</label>
        <div></div>
        <LongText>{skillExperience}</LongText>
      </Row>

      {/* 6. 강점 및 이전 경험 */}
      <Row style={{ alignItems: "flex-start" }}>
        <label></label>
        <label>
          Q4. 본인의 강점이나 이전 프로젝트/활동 경험이 있다면 소개해주세요.
        </label>
        <div></div>
        <LongText>{strengthsExperience}</LongText>
      </Row>

      {/* 7. 기타 사항 (첨부파일) */}
      <Row style={{ alignItems: "flex-start" }}>
        <label>기타 사항</label>
        <label>
          Q5. 기타 전달하고 싶은 내용이 있다면 자유롭게 작성해주세요.
        </label>
        <div></div>
        <LongText>{strengthsExperience}</LongText>
        <div></div>
        <FileWrapper>
          {fileUrl ? (
            <FileCard href={fileUrl} download>
              <FileInfo>
                <FileName>{fileName}</FileName>
                {!fileSize && <FileSize>{fileSize || `60KB`}</FileSize>}
              </FileInfo>
              <div>
                <LuDownload size={24} />
              </div>
            </FileCard>
          ) : (
            <div style={{ color: "#666", fontSize: "0.9rem" }}>
              첨부파일 없음
            </div>
          )}
        </FileWrapper>
      </Row>

      {/* 8. 하단 버튼 */}
      <ButtonRow>
        <CancelBtn onClick={handleReject}>거절</CancelBtn>
        <AcceptBtn onClick={handleAccept}>수락하기</AcceptBtn>
      </ButtonRow>
    </PageWrapper>
  );
};

export default TeamApplication;
