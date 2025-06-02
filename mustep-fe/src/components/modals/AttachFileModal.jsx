import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import CheckIcon from "../../assets/link_checked_icon.svg";
import CloseIcon from "../../assets/close_btn.svg";
import FileUpload from "../../assets/file_upload.svg";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: hsla(0, 0%, 0%, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
`;

const CloseBtn = styled(CloseIcon)`
  width: 24px;
  height: 24px;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2533;
  margin: 16px 0 24px;
`;

const FileDropZone = styled.div`
  width: 80%;
  height: 30vh;
  background: #f5f7fa;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a3b1;
  font-size: 0.95rem;
  cursor: pointer;
  margin-bottom: 24px;
  transition: background 0.2s;
  &:hover {
    background: #e9edf3;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;
const Spinner = styled.div`
  border: 3px solid #ddd;
  border-top: 3px solid #888;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${rotate} 1s linear infinite;
  margin-left: 1vw;
`;

const StyledCheck = styled(CheckIcon)`
  width: 28px;
  height: 28px;
  margin-left: 1vw;
`;

const StyledFile = styled(FileUpload)`
  width: 40px;
`;

const FileList = styled.ul`
  width: 80%;
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 2px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  background: white;
  gap: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  overflow: hidden;

  & > span:first-child {
    font-weight: 500;
    color: #1f2533;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > span:last-child {
    font-size: 0.8rem;
    color: #7c7e8a;
  }
`;

// 수평 Divider
const Divider = styled.div`
  width: 1px;
  height: 32px;
  background: ${({ theme }) => theme.colors.gray2};
  margin: 0 12px;
`;

// 체크 아이콘과 텍스트를 한 묶음으로
const StatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #bbb;
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
`;

const SubmitBtn = styled.button`
  width: 30%;
  padding: 14px 0;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray4 : theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
  }
`;

const AttachFileModal = ({ setShowModal, onDone }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef();

  const addFiles = (newFiles) => {
    const entries = Array.from(newFiles).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      file,
      progress: 0,
      status: "uploading",
    }));
    setFiles((f) => [...f, ...entries]);
    entries.forEach(simulateUpload);
  };

  const simulateUpload = (entry) => {
    const interval = setInterval(() => {
      setFiles((curr) =>
        curr.map((e) => {
          if (e.id !== entry.id) return e;
          const next = e.progress + 10;
          if (next >= 100) {
            clearInterval(interval);
            return { ...e, progress: 100, status: "done" };
          }
          return { ...e, progress: next };
        })
      );
    }, 200);
  };

  const onDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onClickZone = () => fileInputRef.current.click();

  const removeFile = (id) => setFiles((f) => f.filter((e) => e.id !== id));

  const handleSubmit = () => {
    // 업로드가 모두 완료된 파일만 추려서 부모로 전달
    const doneFiles = files
      .filter((f) => f.status === "done")
      .map((e) => e.file);
    onDone(doneFiles);
    setShowModal(false);
  };

  return (
    <Overlay>
      <Card>
        <span
          style={{ alignSelf: "self-end" }}
          onClick={() => setShowModal(false)}
        >
          <CloseBtn />
        </span>
        <Title>첨부파일 업로드</Title>

        <FileDropZone
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={onClickZone}
        >
          파일을 여기에 드래그하거나 클릭해서 추가하세요
        </FileDropZone>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />

        <FileList>
          {files.map((e) => (
            <FileItem key={e.id}>
              <StyledFile />
              <Info>
                <span>{e.file.name}</span>
                <span>{Math.round(e.file.size / 1024)} KB</span>
              </Info>
              <Divider />
              <StatusGroup>
                {e.status === "done" ? (
                  <CheckIcon width={20} height={20} />
                ) : (
                  <Spinner />
                )}
                {e.status === "done" && <StatusText>완료</StatusText>}
              </StatusGroup>
              <RemoveBtn onClick={() => removeFile(e.id)}>×</RemoveBtn>
            </FileItem>
          ))}
        </FileList>

        <SubmitBtn
          disabled={
            files.length === 0 || files.some((f) => f.status !== "done")
          }
          onClick={handleSubmit}
        >
          업로드
        </SubmitBtn>
      </Card>
    </Overlay>
  );
};

export default AttachFileModal;
