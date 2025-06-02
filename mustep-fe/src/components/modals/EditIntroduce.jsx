import React, { useEffect, useState } from "react";
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
  position: relative;
  background: #fff;
  border-radius: 24px;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 503px;
  height: 467px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin: 40px 0 24px 0;
`;

const AlertMsg = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2533;
  text-align: center;
  margin-bottom: 32px;
`;

const StyledAlert = styled(AlertIcon)`
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 80%;
  gap: 20px;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 16px;
  min-height: 150px;
  background: ${(props) => props.theme.colors.gray2};
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

// 우측 둥근 모서리만
const AddBtn = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border: none;
  width: 50%;
  align-self: center;
  padding: 10px 20px;
  font-size: 0.9rem;
  border-radius: 12px;
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

const Subtitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  align-self: flex-start;
  text-align: left;
  margin-left: 50px;
`;

const DescriptionBox = styled.div`
  background: #F0F3F5;
  padding: 16px 16px;
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin-bottom: 40px;
  font-weight: 400;
  width: 383px;
  height: 148px;
  border-radius: 16px;
`;

const Btn = styled.button`
  width: 183px;
  height: 62px;
  padding: 14px 0;
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

const Label = styled.label`
  font-weight: 500;
`;

const EditIntroduce = ({ initialIntroduce, setShowModal, onUpdateIntroduce }) => {
  const [introText, setIntroText] = useState(initialIntroduce || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIntroText(initialIntroduce || "");
  }, [initialIntroduce]);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      // 실제로 백엔드에 자기소개를 수정하는 PUT 요청
      await axios.put(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo/mypage/introduce`,
        {
          introduce: introText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      // 부모(ProfilePage)에 “수정된 텍스트”를 알려서 즉시 반영하게끔 콜백 호출
      onUpdateIntroduce(introText);

      // 모달 닫기
      setShowModal(false);
    } catch (err) {
      console.error("자기소개 수정 실패:", err);
      alert("자기소개 수정 중 오류가 발생했습니다.");
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
        <Title>자기소개 수정하기</Title>

        <InputBlock>
          <Label>자기소개</Label>
          <Input
            placeholder="자기 소개를 입력해주세요."
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            disabled={loading}
          />
          <AddBtn disabled={loading} onClick={handleEdit}>
            {loading ? "추가 중..." : "확인"}
          </AddBtn>
        </InputBlock>
      </Card>
    </Overlay>
  );
};

export default EditIntroduce;
