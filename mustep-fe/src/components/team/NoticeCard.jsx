// components/team/NoticeCard.jsx
import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";



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

const NoticeCard = ({ CardHeader, ManageBtn }) => {
  return (
    <>
      <CardHeader>
        <h2>공지사항</h2>
        <ManageBtn $variant="action">글쓰기</ManageBtn>
      </CardHeader>
      <NoticeList>
        {/* 예시 3개 */}
        {[
          "1차 회의안 및 각자 역할에 대한 공지",
          "다음 회의 일정 안내",
          "디자인 리뷰 공지",
        ].map((text, i) => (
          <NoticeItem key={i}>
            <NoticeText>{text}</NoticeText>
            <NoticeMeta>
              <p>2025.5.21</p>
              <p>2시간전 수정</p>
            </NoticeMeta>
          </NoticeItem>
        ))}
      </NoticeList>
    </>
  );
};

export default NoticeCard;
