// components/team/Pagination.jsx
import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray5};

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &.active {
      color: ${({ theme }) => theme.colors.black};
      font-weight: bold;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.gray1};
    }
  }
`;

const Pagination = ({ page = 1, total = 2, onChange }) => {
  const pageCount = Number.isInteger(total) && total > 0 ? total : 0;
  if (pageCount <= 0) {
    return <div></div>;
  }
  return (
    <Wrap>
      <button onClick={() => onChange(page - 1)} disabled={page <= 1}>
        &lt;
      </button>
      {/* total이 1 이상일 때만 페이지 버튼을 생성 */}
      {pageCount > 0 &&
        [...Array(pageCount)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => onChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}

      <button onClick={() => onChange(page + 1)} disabled={page >= total}>
        &gt;
      </button>
    </Wrap>
  );
};

export default Pagination;
