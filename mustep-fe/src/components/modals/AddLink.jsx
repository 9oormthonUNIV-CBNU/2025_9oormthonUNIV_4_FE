import React, { useState } from "react";
import styled from "styled-components";
import AlertIcon from "../../assets/AlertIcon.svg";
import CheckIcon from "../../assets/check_icon.svg";
import CloseIcon from "../../assets/close_btn.svg";
import { useParams } from "react-router";
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

const AddLink = ({setShowModal, onNewLinkAdded, onSetPage}) => {
  const { teamId } = useParams();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleAddLink = async () => {
    if (!link.trim()) {
      setError("링크를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      // POST /api/v1/tool-links/{teamId}
      await axios.post(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/tool-links/teams/${teamId}`,
        {
          toolLink: link.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // 추가 성공 시 콜백 호출 (예: 부모가 링크 목록을 다시 로드)
      // if (onNewLinkAdded) {
      //   onNewLinkAdded();
      // }

      // 모달 닫기
      onSetPage
      setShowModal(false);
    } catch (err) {
      console.error("협업 링크 추가 실패:", err);
      setError("링크 추가 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
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
        <AlertMsg>협업 링크 추가</AlertMsg>
        <InputBlock>
          <Input
            placeholder="링크를 입력해주세요."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={loading}
          />
          <AddBtn disabled={loading} onClick={handleAddLink}>
            {loading ? "추가 중..." : "확인"}
          </AddBtn>
        </InputBlock>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Card>
    </Overlay>
  );
};

export default AddLink;
