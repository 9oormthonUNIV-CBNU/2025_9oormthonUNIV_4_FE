// components/team/CollaboLinkCard.jsx
import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import { getFaviconUrl } from "../../../utils/Utils";

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
  setCollaboes,
  setShowModal,
}) => {
  return (
    <>
      <CardHeader>
        <h2>협업 관련 링크</h2>
        <ManageBtn $variant="action" onClick={() => setShowModal(true)}>링크 관리</ManageBtn>
      </CardHeader>
      <CollaboLinkList>
        {collaboes.map((item, i) => (
          <CollaboLinkItem key={i}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <img style={{ width: "30px" }} src={getFaviconUrl(item.url, {size: 24})} />
              <div>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
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
};

export default CollaboLinkCard;
