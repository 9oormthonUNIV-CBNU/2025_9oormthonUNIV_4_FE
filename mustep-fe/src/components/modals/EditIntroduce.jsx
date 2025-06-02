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
  background: #fff;
  border-radius: 24px;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 100%;
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

const Label = styled.label`
  font-weight: 500;
`;

const EditIntroduce = ({ setShowModal }) => {
  const { teamId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [introduce, setIntroduce] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIntroduce = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        setUserInfo(res.data);
        setIntroduce(res.data.introduce);
      } catch (err) {
        console.error("유저 정보 조회 실패", err);
      }
    };

    fetchIntroduce();
  }, []);

  const handleEdit = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/userinfo`,
        {
          nickname: userInfo.nickname,
          major: userInfo.major,
          university: userInfo.university,
          introduce: introduce,
          imgUrl: userInfo.imgUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setShowModal(false);
    } catch (err) {
      console.error("유저 수정 조회 실패", err);
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
        <AlertMsg>자기소개 수정하기</AlertMsg>

        <InputBlock>
          <Label>자기소개</Label>
          <Input
            placeholder="자기 소개를 입력해주세요."
            value={introduce}
            onChange={(e) =>
              setIntroduce(e.target.value)
            }

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
