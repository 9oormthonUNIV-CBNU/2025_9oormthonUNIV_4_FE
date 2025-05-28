// components/team/CollaboLinkCard.jsx
import React from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';

const CollaboLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const CollaboLinkItem = styled.li`
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollaboLinkCard = ({ CardHeader, ManageBtn }) => {
  return (
    <>
          <CardHeader>
            <h2>협업 관련 링크</h2>
            <ManageBtn $variant="action">링크 관리</ManageBtn>
          </CardHeader>
          <CollaboLinkList>
            {/* 예시 3개 */}
            {[
              {
                icon: "🔗",
                title: "project_4팀_피그마",
                url: "www.figma.com",
              },
              {
                icon: "💬",
                title: "project_4팀_오픈채팅",
                url: "open.kakao.com",
              },
              { icon: "📓", title: "project_4팀_노션", url: "www.notion.so" },
            ].map((item, i) => (
              <CollaboLinkItem key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#7c7e8a" }}>
                      {item.url}
                    </div>
                  </div>
                </div>
              </CollaboLinkItem>
            ))}
          </CollaboLinkList>
    </>
  );
}

export default CollaboLinkCard;