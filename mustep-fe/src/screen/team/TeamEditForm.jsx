// src/screen/team/TeamEditForm.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import ArrowForward from "../../assets/arrow_forward.svg";
import axios from "axios";
import { LuUpload } from "react-icons/lu";

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

const Select = styled.select`
  padding: 10px 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray6};
  width: 100%;
  max-width: 300px;
  cursor: pointer;

  &:disabled {
    background: ${({ theme }) => theme.colors.gray2};
    cursor: not-allowed;
  }
`;

const TextareaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const TeamEditForm = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  const [teamData, setTeamData] = useState(null);
  const [maxUserCount, setMaxUserCount] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("RECRUITING");
  const [fileUrl, setFileUrl] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFileModal, setShowFileModal] = useState(false);

  const MAX_CONTENT_LEN = 500;

  // 기존 팀 정보를 불러와서 상태에 세팅
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/${teamId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data.data;
        setTeamData(data);
        setMaxUserCount(data.maxUserCount.toString());
        setStartAt(data.startAt.slice(0, 16)); // "YYYY-MM-DDTHH:mm" 형식
        setEndAt(data.endAt.slice(0, 16));
        setTitle(data.title);
        setContent(data.content);
        setStatus(data.status);
        setFileUrl(data.fileUrl || "");
      } catch (err) {
        console.error("팀 정보 조회 실패:", err);
        alert("팀 정보를 가져오는 중 오류가 발생했습니다.");
        navigate(-1);
      }
    };

    fetchTeam();
  }, [teamId, navigate]);

  // AttachFileModal에서 반환된 파일 리스트를 저장
  const handleFileDone = (files) => {
    setSelectedFiles(files);
  };

  const uploadFileToS3 = async (file) => {
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
    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!maxUserCount || Number(maxUserCount) <= 0) {
      alert("모집 인원은 1 이상의 숫자여야 합니다.");
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
      alert("종료일시는 시작일시 이후여야 합니다.");
      return;
    }
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      // 파일 업로드 시도. 실패 시 기존 fileUrl 유지
      let newFileUrl = fileUrl;
      if (selectedFiles.length > 0) {
        try {
          newFileUrl = await uploadFileToS3(selectedFiles[0]);
        } catch (uploadErr) {
          console.warn("파일 업로드 실패, 기존 URL 사용:", uploadErr);
        }
      }

      // datetime-local → ISO 문자열 변환
      const startISO = new Date(startAt).toISOString();
      const endISO = new Date(endAt).toISOString();

      const body = {
        maxUserCount: Number(maxUserCount),
        startAt: startISO,
        endAt: endISO,
        title: title.trim(),
        content: content.trim(),
        status,
        fileUrl: newFileUrl,
      };

      console.log("▶ 수정 요청 바디:", body);

      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/teams/${teamId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ 팀 수정 응답:", res.data);
      alert("팀 정보가 수정되었습니다.");
      navigate(-1);
    } catch (err) {
      if (err.response) {
        console.error(
          "🛑 팀 수정 실패:",
          err.response.status,
          err.response.data
        );
        alert(`수정 실패: ${err.response.data.message || ""}`);
      } else {
        console.error("🛑 네트워크/클라이언트 에러:", err);
        alert("팀 수정 중 오류가 발생했습니다.");
      }
    }
  };

  if (!teamData) {
    return <PageWrapper>로딩 중...</PageWrapper>;
  }

  return (
    <>
      <PageWrapper>
        {/* 뒤로 가기 + 타이틀 */}
        <HeaderRow onClick={() => navigate(-1)}>
          <ArrowForward />
        </HeaderRow>
        <Title>팀 정보 수정</Title>
        <Form onSubmit={handleSubmit}>
          {/* 모집 인원 */}
          <RowGroup>
            <Label htmlFor="maxUserCount">모집 인원</Label>
            <SmallInput
              id="maxUserCount"
              type="number"
              value={maxUserCount}
              min={1}
              max={999}
              onChange={(e) => setMaxUserCount(e.target.value)}
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
              max={endAt}
              onChange={(e) => setStartAt(e.target.value)}
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

          {/* 제목 */}
          <RowGroup>
            <Label htmlFor="title">제목</Label>
            <SmallInput
              id="title"
              type="text"
              value={title}
              maxLength={50}
              placeholder="제목을 입력해주세요."
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </RowGroup>

          {/* 내용 */}
          <RowGroupTop>
            <Label htmlFor="content">내용</Label>
            <TextareaWrapper>
              <Textarea
                id="content"
                placeholder="내용을 입력해주세요."
                maxLength={MAX_CONTENT_LEN}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <CharCount>
                {content.length}/{MAX_CONTENT_LEN}
              </CharCount>
            </TextareaWrapper>
          </RowGroupTop>

          {/* 상태 */}
          <RowGroup>
            <Label htmlFor="status">모집 상태</Label>
            <Select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="RECRUITING">모집중</option>
              <option value="TERMINAL">모집마감</option>
            </Select>
          </RowGroup>

          {/* 첨부파일 */}
          <RowGroup>
            <Label>첨부파일</Label>
            <UploadBtn type="button" onClick={() => setShowFileModal(true)}>
              <LuUpload /> 파일 첨부하기
            </UploadBtn>
            {fileUrl && !selectedFiles.length && (
              <FileName>{fileUrl.split("/").pop()}</FileName>
            )}
            {selectedFiles.length > 0 && (
              <FileName>{selectedFiles[0].name}</FileName>
            )}
          </RowGroup>

          {/* 하단 취소 / 수정하기 버튼 */}
          <ButtonRow>
            <CancelBtn type="button" onClick={() => navigate(-1)}>
              취소
            </CancelBtn>
            <SubmitBtn type="submit">수정하기</SubmitBtn>
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

export default TeamEditForm;
