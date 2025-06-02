// components/team/CollaboLinkCard.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import { getFaviconUrl } from "../../../utils/Utils";
import { useParams } from "react-router";
import axios from "axios";

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

const CollaboLinkCard = ({
  CardHeader,
  ManageBtn,
  collaboes = [],
  setShowModal,
  ManageBtnDisabled,
}) => {
  return (
    <>
      <CardHeader>
        <h2>협업 관련 링크</h2>
        {!ManageBtnDisabled && (
          <ManageBtn $variant="action" onClick={() => setShowModal(true)}>
            링크 관리
          </ManageBtn>
        )}
      </CardHeader>
      <CollaboLinkList>
        {collaboes.length === 0 ? (
          <CollaboLinkItem>
            <span style={{ color: "#666" }}>링크가 없습니다.</span>
          </CollaboLinkItem>
        ) : (
          collaboes.map((item) => (
            <CollaboLinkItem key={item.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {/* imgUrl이 없으면 getFaviconUrl을 fallback으로 사용 */}

                <img
                  style={{ width: "30px" }}
                  src={getFaviconUrl(item.toolLink, { size: 24 })}
                  alt="favicon"
                />

                <div style={{ flex: 1 }}>
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
                    {item.toolLink}
                  </div>
                </div>
              </div>
            </CollaboLinkItem>
          ))
        )}
      </CollaboLinkList>
    </>
  );
};

export default CollaboLinkCard;
