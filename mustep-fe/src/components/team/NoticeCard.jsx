// components/team/NoticeCard.jsx
import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import { formatTimeAgo } from "../../../utils/Utils";
import { Link, useNavigate, useParams } from "react-router";

const NoticeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const NoticeItem = styled.li`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray1};
  }

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  }
`;

// 공지사항 아이템 좌측 텍스트
const NoticeText = styled.div`
  font-size: 1rem;
  color: black;
  font-weight: 500;
`;

// 공지사항 날짜영역
const NoticeMeta = styled.div`
  font-size: 0.85rem;
  color: #7c7e8a;
  display: flex;
  gap: 8px;
  p {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const NoticeCard = ({
  notices = [],
  CardHeader,
  ManageBtn,
  page = 0,
  totalPages = 1,
  onChangePage,
}) => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <CardHeader>
        <h2>공지사항</h2>
        <Link to={`/teams/${teamId}/newnotice`}>
          <ManageBtn $variant="action">글쓰기</ManageBtn>
        </Link>
      </CardHeader>
      <NoticeList>
        {notices.length === 0 ? (
          <NoticeItem>
            <NoticeText>공지사항이 없습니다.</NoticeText>
          </NoticeItem>
        ) : (
          notices.map((notice) => (
            <NoticeItem onClick={() => navigate(`/teams/${teamId}/notices/${notice.id}`)} key={notice.id}>
              <NoticeText>{notice.title}</NoticeText>
              <NoticeMeta>
                {/* 예시: createdAt = "2025-06-02 06:38" */}
                <p>{notice.createdAt}</p>
                <p>{formatTimeAgo(new Date(notice.lastModified))}</p>
              </NoticeMeta>
            </NoticeItem>
          ))
        )}
      </NoticeList>

      <Pagination page={page} total={totalPages - 1} onChange={onChangePage} />
    </>
  );
};

export default NoticeCard;
