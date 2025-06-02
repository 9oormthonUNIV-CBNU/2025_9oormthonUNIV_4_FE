// src/components/modals/TeamApplyModal.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";
import axios from "axios";
import { useNavigate } from "react-router";
import NoItem from "../NoItem";
import UserIcon from "../../assets/user_icon.svg";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: hsla(0, 0%, 0%, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const CloseBtn = styled(CloseIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  width: 30vw;

  @media (max-width: 768px) {
    width: 80vw;
    padding: 24px 16px;
  }
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2533;
  margin: 0 0 24px;
  text-align: center;
`;

const MemberList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MemberItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray1};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
    gap: 8px;
  }
`;

const UserProfile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const NameText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #1f2533;
`;

const DetailGroup = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ApplyDate = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray4};
`;

const ApplicationBtn = styled.button`
  margin-left: auto;
  width: 30%;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const TeamApplyModal = ({ teamId, setShowModal }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationsAndProfiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("⚠️ 토큰이 localStorage에 없습니다.");
          return;
        }

        // 1) 팀에 대한 모든 지원서 가져오기
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/applications/teams/${teamId}/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const apps = res.data?.data || [];
        if (apps.length === 0) {
          setApplications([]);
          setLoading(false);
          return;
        }

        // 2) 각 지원자(userId)에 대해 프로필 조회해서 imgUrl, nickname 합치기
        const enriched = await Promise.all(
          apps.map(async (app) => {
            try {
              const profileRes = await axios.get(
                `${import.meta.env.VITE_SERVER_END_POINT}/api/members/${app.userId}/profile`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const profile = profileRes.data?.data || {};
              return {
                ...app,
                imgUrl: profile.imgUrl,       // 프로필 이미지 URL
                nickname: profile.nickname,   // 닉네임
              };
            } catch {
              return {
                ...app,
                imgUrl: "",         
                nickname: app.name, // fallback: 원래 이름
              };
            }
          })
        );

        setApplications(enriched);
      } catch (err) {
        console.error("지원서 정보 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsAndProfiles();
  }, [teamId]);

  if (loading) {
    return (
      <Overlay>
        <Card>
          <Title>팀 신청 관리</Title>
          <ApplyDate>로딩 중...</ApplyDate>
        </Card>
      </Overlay>
    );
  }

  // “PENDING” 상태인 지원서가 하나도 없으면 NoItem 화면
  const pendingApps = applications.filter((a) => a.status === "PENDING");
  if (pendingApps.length === 0) {
    return (
      <Overlay>
        <Card>
          <span
            style={{ alignSelf: "self-end" }}
            onClick={() => setShowModal(false)}
          >
            <CloseBtn />
          </span>
          <Title>팀 신청 관리</Title>
          <NoItem />
        </Card>
      </Overlay>
    );
  }

  return (
    <Overlay>
      <Card>
        <span
          style={{ alignSelf: "self-end" }}
          onClick={() => setShowModal(false)}
        >
          <CloseBtn />
        </span>
        <Title>팀 신청 관리</Title>
        <MemberList>
          {pendingApps.map((a) => (
            <MemberItem key={a.id}>
              <InfoGroup>
                {a.imgUrl ? (
                  <UserProfile src={a.imgUrl} alt={a.nickname} />
                ) : (
                  <UserIcon width={36} height={36} />
                )}
                <NameText>{a.nickname}</NameText>
              </InfoGroup>
              <DetailGroup>
                <ApplyDate>{a.appliedAt /* 혹은 원하는 날짜 필드 */}</ApplyDate>
              </DetailGroup>
              <ApplicationBtn
                onClick={() =>
                  navigate(`/teams/${teamId}/application/${a.userId}`)
                }
              >
                신청서 보기
              </ApplicationBtn>
            </MemberItem>
          ))}
        </MemberList>
      </Card>
    </Overlay>
  );
};

export default TeamApplyModal;
