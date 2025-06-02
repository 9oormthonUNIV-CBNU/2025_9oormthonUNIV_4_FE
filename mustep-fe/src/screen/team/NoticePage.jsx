// src/screen/team/NoticePage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import ArrowForward from "../../assets/arrow_forward.svg";

const PageWrapper = styled.main`
  padding: 40px 360px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;

  color: #545661;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  font-weight: bold;
  color: #1f2533;
`;

const MetaInfo = styled.div`
  font-size: 0.9rem;
  color: #7c7e8a;
  margin-left: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
  min-height: 500px;
  padding: 16px 32px;
  border: 2px solid ${({theme}) => theme.colors.gray2};
  border-radius: 16px;

  /* 내부에 렌더된 Markdown 스타일을 약간 추가 */
  & h2 {
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors.primary};
  }
  & img {
    width: 100%;
  }
  & h3 {
    font-size: 1.25rem;
    margin-top: 24px;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.black};
  }
  & p {
    line-height: 1.6;
    margin-bottom: 12px;
    color: #333;
  }
  & ul,
  & ol {
    padding-left: 20px;
    margin-bottom: 16px;
  }
  & li {
    margin-bottom: 8px;
  }
  & code {
    background: ${({ theme }) => theme.colors.gray1};
    padding: 2px 6px;
    border-radius: 4px;
    font-family: "Source Code Pro", monospace;
    font-size: 0.95rem;
  }
  & pre {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: "Source Code Pro", monospace;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
  & blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 12px;
    color: ${({ theme }) => theme.colors.gray6};
    margin: 16px 0;
    font-style: italic;
    background: ${({ theme }) => theme.colors.gray1};
  }
  & table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }
  & th,
  & td {
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    padding: 8px;
    text-align: left;
  }
  & th {
    background: ${({ theme }) => theme.colors.gray1};
    font-weight: 600;
  }
`;

const BtnBlock = styled.div`
  display: flex;
  gap: 16px;
  margin-left: auto;
`

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray2};
`

const EditBtn = styled.button`
  color: ${({ theme }) => theme.colors.gray4};
  background-color: ${({ theme }) => theme.colors.gray1};
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`

const DeleteBtn = styled.button`
  color: ${({ theme }) => theme.colors.warning};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.warning};;
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`

const NoticePage = () => {
  const navigate = useNavigate();
  const { teamId, notifyId } = useParams();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/teams/${teamId}/notifies/${notifyId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (res.data && res.data.data) {
          // 예시 응답: { id, title, content, createdAt, lastModified, ... }
          setNotice(res.data.data);
        } else {
          setError("공지사항을 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("공지사항 조회 실패:", err);
        setError("공지사항을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [teamId, notifyId, navigate]);

  if (loading) {
    return (
      <PageWrapper>
        <div>로딩 중...</div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div style={{ color: "red" }}>{error}</div>
      </PageWrapper>
    );
  }

  if (!notice) {
    return (
      <PageWrapper>
        <div>존재하지 않는 공지사항입니다.</div>
      </PageWrapper>
    );
  }

  const { title, content, createdAt } = notice;
  const formattedDate = new Date(createdAt).toLocaleDateString();


  const handleDelete = async () => {
    // 한 번 더 확인
    const confirmed = window.confirm("정말 이 공지사항을 삭제하시겠습니까?");
    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      // DELETE 요청 보내기
      await axios.delete(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/teams/${teamId}/notifies/${notifyId}`,
        {
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + token,
          },
        }
      );

      // 삭제 성공 시
      alert("공지사항이 삭제되었습니다.");
      // 공지 목록(또는 팀 상세) 화면으로 돌아가기
      navigate(`/teams/${teamId}`);
    } catch (err) {
      console.error("공지사항 삭제 실패:", err);
      alert("공지사항 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      {/* 1. 뒤로 가기 아이콘 */}
      <HeaderRow >
        <ArrowForward onClick={() => navigate(-1)} style={{cursor:"pointer"}}/>
        <BtnBlock>
          <EditBtn onClick={() => navigate(`/teams/${teamId}/notices/${notifyId}/edit`)} >수정하기</EditBtn>
          <DeleteBtn onClick={handleDelete}>삭제하기</DeleteBtn>
        </BtnBlock>
      </HeaderRow>

      {/* 2. 제목 및 메타 정보 */}

      {/* 3. 본문 (마크다운 렌더링) */}
      <ContentWrapper>
        <TitleSection>
          <Title>{title}</Title>
          <MetaInfo>작성일: {formattedDate}</MetaInfo>
        </TitleSection>
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
          {content}
        </ReactMarkdown>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default NoticePage;
