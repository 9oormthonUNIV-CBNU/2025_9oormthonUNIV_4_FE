import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AlertIcon from "../../assets/AlertIcon.svg";
import CheckIcon from "../../assets/check_icon.svg";
import CloseIcon from "../../assets/close_btn.svg";
import { useLocation, useParams } from "react-router";
import axios from "axios";

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
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 100%;
`;

const StyledAlert = styled(AlertIcon)`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
`;

const StyledCheck = styled(CheckIcon)`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
`;

const AlertMsg = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #1f2533;
  text-align: center;
  margin-bottom: 32px;
`;

const BtnBlock = styled.div`
  display: flex;
  gap: 20px;
`;

const RemoveBtn = styled.button`
  padding: 20px 20px;
  background: ${({ theme }) => theme.colors.gray2};
  color: ${({ theme }) => theme.colors.gray5};
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const CancleBtn = styled.button`
  padding: 20px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

// 이메일 + 전송 버튼을 묶는 영역
const InputBlock = styled.div`
  display: flex;
  flex: 1;
`;

// 좌측 둥근 모서리만
const Input = styled.input`
  flex: 1;
  padding: 16px;
  background: ${(props) => props.theme.colors.gray2};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
  border-radius: 12px 0 0 12px;
`;

// 우측 둥근 모서리만
const AddBtn = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border: none;
  padding: 0 20px;
  font-size: 0.9rem;
  border-radius: 0 12px 12px 0;
  color: white;
  cursor: pointer;
  &:disabled {
    background: ${(props) => props.theme.colors.gray4};
    color: white;
    cursor: default;
  }
`;

const CloseBtn = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 8px;
`;
const ShareModal = ({setShowModal}) => {
  const [urlToCopy, setUrlToCopy] = useState("");
  const [feedback, setFeedback] = useState(""); // “복사 완료” 메시지

  useEffect(() => {
    // 모달이 열릴 때 window.location.href 를 읽어 와 state에 저장
    setUrlToCopy(window.location.href);
  }, []);

  const handleCopyUrl = async () => {
    try {
      if (!urlToCopy) return;
      await navigator.clipboard.writeText(urlToCopy);
      setFeedback("복사되었습니다!");
      // 2초 후에 피드백 메시지 지우기
      setTimeout(() => setFeedback(""), 2000);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      setFeedback("복사에 실패했습니다.");
      setTimeout(() => setFeedback(""), 2000);
    }
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
        <AlertMsg>공유하기</AlertMsg>
        <InputBlock>
          <Input value={urlToCopy} readOnly />
          <AddBtn onClick={handleCopyUrl} disabled={!urlToCopy}>복사</AddBtn>
        </InputBlock>

        {/* 복사 성공/실패 메시지 */}
        <ErrorMsg>{feedback}</ErrorMsg>
      </Card>
    </Overlay>
  );
};

export default ShareModal;
