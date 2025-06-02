// src/screen/project/NewTeamForm.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import ArrowForward from "../../assets/arrow_forward.svg";
import { LuUpload } from "react-icons/lu";
import axios from "axios";
import AttachFileModal from "../../components/modals/AttachFileModal";

const PageWrapper = styled.main`
  padding: 40px 360px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 24px 16px;
    gap: 24px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #545661;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const RowGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const RowGroupTop = styled(RowGroup)`
  align-items: flex-start;
`;

const Label = styled.label`
  width: 10vw;
  min-width: 120px;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2533;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const SmallInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  color: #333;
  width: 100%;
  max-width: 300px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.gray2};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray5};
  }
`;

const TextareaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QuestionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuestionLabel = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2533;
`;

const HelperText = styled.span`
  margin-left: auto;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray5};

  @media (max-width: 768px) {
    margin-left: 0;
    text-align: left;
  }
`;

const Textarea = styled.textarea`
  box-sizing: border-box;
  padding: 12px 16px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  color: #333;
  min-height: 120px;
  resize: vertical;
  width: 100%;
  max-width: 800px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const CharCount = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray5};
  align-self: flex-end;
`;

const UploadBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.primary_lite};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  & > svg {
    font-size: 1.25rem;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const FileName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray6};
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 8px;
    align-items: stretch;
  }
`;

const CancelBtn = styled.button`
  padding: 10px 40px;
  background: ${({ theme }) => theme.colors.gray2};
  color: #1f2533;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray3};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SubmitBtn = styled.button`
  padding: 10px 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NewTeamForm = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // 팀장(로그인된 유저) 이름을 가져오기 위해 userInfo 호출
  const [leaderName, setLeaderName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [maxUserCount, setMaxUserCount] = useState("");
  const [content, setContent] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFileModal, setShowFileModal] = useState(false);

  const MAX_CONTENT_LEN = 100;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeaderName(res.data.nickname);
      } catch (err) {
        console.error("유저 정보 조회 실패:", err);
        alert("유저 정보를 가져오지 못했습니다.");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // AttachFileModal 에서 반환된 파일 리스트를 저장
  const handleFileDone = (files) => {
    setSelectedFiles(files);
  };

  const uploadFileToS3 = async (file) => {
    // 실제 파일 업로드 로직에 맞춰 URL or presigned-upload API 호출 후 fileUrl을 받아와야 합니다.
    // 예시: 백엔드에 multipart/form-data로 업로드하여 URL을 반환한다고 가정.
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // 예를 들어 응답에 { url: "https://s3.amazonaws.com/..." } 형태로 온다고 가정
    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      alert("팀 이름을 입력해주세요.");
      return;
    }
    if (!/^\d+$/.test(maxUserCount) || Number(maxUserCount) <= 0) {
      alert("모집 인원은 양의 정수로 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("팀 소개를 입력해주세요.");
      return;
    }
    if (!startAt) {
      alert("시작일시를 입력해주세요.");
      return;
    }
    if (!endAt) {
      alert("종료일시를 입력해주세요.");
      return;
    }
    if (new Date(startAt) > new Date(endAt)) {
      alert("종료일시가 시작일시보다 이전이 될 수 없습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      // 파일이 선택되었다면 먼저 업로드하여 URL을 받기
      let fileUrl = "";
      if (selectedFiles.length > 0) {
        // 첫 번째 파일만 업로드 (필요 시 다중 처리)
        fileUrl = await uploadFileToS3(selectedFiles[0]);
      }

      // datetime-local 입력값(YYYY-MM-DDTHH:mm)을 ISO 문자열로 변환
      const startISO = new Date(startAt).toISOString();
      const endISO = new Date(endAt).toISOString();

      const body = {
        maxUserCount: Number(maxUserCount),
        title: teamName.trim(),
        content: content.trim(),
        startAt: startISO,
        endAt: endISO,
        fileUrl: "", // 업로드 후 얻은 URL 또는 빈 문자열
        projectId: Number(projectId),
      };

      await axios.post(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/create`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("팀 생성이 완료되었습니다.");
      navigate(`/projects/${projectId}/teams`);
    } catch (err) {
      console.error("팀 생성 중 오류 발생:", err);
      alert("팀 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <PageWrapper>
        {/* 뒤로 가기 + 타이틀 */}
        <HeaderRow onClick={() => navigate(-1)}>
          <ArrowForward />
        </HeaderRow>
        <Title>팀 생성 신청서</Title>
        <Form onSubmit={handleSubmit}>
          {/* 팀장 이름 (읽기 전용) */}
          <RowGroup>
            <Label htmlFor="leaderName">팀장 이름</Label>
            <SmallInput
              id="leaderName"
              type="text"
              value={leaderName}
              disabled
            />
          </RowGroup>

          {/* 팀 이름 */}
          <RowGroup>
            <Label htmlFor="teamName">팀 이름</Label>
            <SmallInput
              id="teamName"
              type="text"
              placeholder="이름을 입력해주세요."
              value={teamName}
              maxLength={12}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </RowGroup>

          {/* 모집 인원 */}
          <RowGroup>
            <Label htmlFor="maxUserCount">모집 인원</Label>
            <SmallInput
              id="maxUserCount"
              type="number"
              placeholder="숫자만 입력해주세요."
              value={maxUserCount}
              onChange={(e) => setMaxUserCount(e.target.value)}
              max={10}
              required
            />
            <span>명</span>
          </RowGroup>

          {/* 시작일시 */}
          <RowGroup>
            <Label htmlFor="startAt">시작일시</Label>
            <SmallInput
              id="startAt"
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              max={endAt}
              required
            />
          </RowGroup>

          {/* 종료일시 */}
          <RowGroup>
            <Label htmlFor="endAt">종료일시</Label>
            <SmallInput
              id="endAt"
              type="datetime-local"
              value={endAt}
              min={startAt}
              onChange={(e) => setEndAt(e.target.value)}
              required
            />
          </RowGroup>

          {/* 팀 소개 */}
          <RowGroupTop>
            <Label htmlFor="content">팀 소개</Label>
            <TextareaWrapper>
              <QuestionRow>
                <QuestionLabel>
                  팀을 소개할 수 있는 한 줄을 적어주세요.
                </QuestionLabel>
                <HelperText>
                  {content.length}/{MAX_CONTENT_LEN}
                </HelperText>
              </QuestionRow>
              <Textarea
                id="content"
                placeholder="내용을 입력해주세요."
                maxLength={MAX_CONTENT_LEN}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </TextareaWrapper>
          </RowGroupTop>

          {/* 첨부파일 (Upload) */}
          <RowGroup>
            <Label></Label>
            <UploadBtn type="button" onClick={() => setShowFileModal(true)}>
              <LuUpload /> 파일 첨부하기
            </UploadBtn>
            {selectedFiles.length > 0 && (
              <FileName>{selectedFiles[0].name}</FileName>
            )}
          </RowGroup>

          {/* 하단 취소 / 신청하기 버튼 */}
          <ButtonRow>
            <CancelBtn type="button" onClick={() => navigate(-1)}>
              취소
            </CancelBtn>
            <SubmitBtn type="submit">신청하기</SubmitBtn>
          </ButtonRow>
        </Form>
      </PageWrapper>

      {showFileModal && (
        <AttachFileModal
          setShowModal={setShowFileModal}
          onDone={handleFileDone}
        />
      )}
    </>
  );
};

export default NewTeamForm;
