// src/components/modals/ProfileModal.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";
import UserIcon from "../../assets/user_icon.svg";
import SchoolIcon from "../../assets/school_icon.svg"; // 오타 주의: 실제 파일명과 경로를 맞춰주세요
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
  padding: 24px 20px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 100%;
  position: relative;
`;

/* 오른쪽 상단 닫기 버튼 */
const CloseButton = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
`;

/* 프로필 아바타(원형) */
const AvatarWrapper = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: ${({ avatarUrl }) =>
    avatarUrl
      ? `url(${avatarUrl}) no-repeat center/cover`
      : `#ddd url(${UserIcon}) no-repeat center/60%`};
  /* 기본적으로 UserIcon을 배경 이미지로 쓰고, avatarUrl이 넘어오면 그걸 덮어씌우도록 */
  margin-top: 16px;
`;

/* 사용자 이름 */
const Username = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2533;
  margin-top: 12px;
`;

/* 학교 정보 영역 (아이콘 + 텍스트) */
const SchoolInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #6c6f81;
  font-size: 0.95rem;

  & > svg {
    margin-right: 6px;
    width: 18px;
    height: 18px;
    fill: #6c6f81;
  }

  & > span {
    font-weight: 500;
  }
`;

/* 자기소개 박스 */
const IntroduceWrapper = styled.div`
  margin-top: 20px;
  padding: 16px 18px;
  background: #f0f4f8;
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
`;

const IntroduceText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #33475b;
  line-height: 1.5;
  white-space: pre-wrap; /* 줄바꿈 유지 */
`;

const ProfileModal = ({ userId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    avatarUrl: "",
    name: "",
    university: "",
    major: "",
    introduction: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        // 예시: GET /api/members/{userId}/profile
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/members/${userId}/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 응답 데이터 구조가 { data: { imgUrl, nickname, university, major, introduce } } 라고 가정
        const data = res.data?.data;
        if (data) {
          setProfile({
            avatarUrl: data.imgUrl || "",
            name: data.nickname || "",
            university: data.university || "",
            major: data.major || "",
            introduction: data.introduce || "",
          });
        }
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setError("프로필 정보를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return (
    <Overlay>
      <Card>
        <CloseButton onClick={onClose} />

        {loading && <div>프로필 로딩 중...</div>}

        {error && (
          <div
            style={{
              color: "red",
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* 아바타 */}
            {profile.avatarUrl ? (
              <AvatarWrapper avatarUrl={profile.avatarUrl} />
            ) : (
              <UserIcon />
            )}

            {/* 이름 */}
            <Username>
              {profile.name ? `${profile.name} 님` : "닉네임 없음"}
            </Username>

            {/* 학교 · 전공 */}
            <SchoolInfo>
              <SchoolIcon />
              <span>
                {profile.university || "학교 정보 없음"} {profile.major || ""}
              </span>
            </SchoolInfo>

            {/* 자기소개 */}
            <IntroduceWrapper>
              <IntroduceText>
                {profile.introduction || "소개글이 등록되지 않았습니다."}
              </IntroduceText>
            </IntroduceWrapper>
          </>
        )}
      </Card>
    </Overlay>
  );
};

export default ProfileModal;
