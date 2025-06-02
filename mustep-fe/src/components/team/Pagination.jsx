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
    padding: 4px 8px;
    border-radius: 4px;

    &.active {
      color: ${({ theme }) => theme.colors.black};
      font-weight: bold;
    }
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gray1};
    }
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
`;


const Pagination = ({ page = 0, total = 0, onChange }) => {
  // 총 페이지 수가 유효하지 않으면 아무것도 렌더링하지 않습니다.
  const pageCount = Number.isInteger(total) && total > 0 ? total : 0;
  if (pageCount <= 0) {
    return null;
  }

  // “이전” 버튼은 page가 0일 때 비활성화
  // “다음” 버튼은 page가 마지막 인덱스(total-1)일 때 비활성화
  const isFirst = page <= 0;
  const isLast = page >= pageCount - 1;

  return (
    <Wrap>
      {/* 이전 */}
      <button onClick={() => onChange(page - 1)} disabled={isFirst}>
        &lt;
      </button>

      {/* 0-based 내부 인덱스지만 UI에는 1-based로 표시 */}
      {Array.from({ length: pageCount }).map((_, i) => (
        <button
          key={i}
          className={page === i ? "active" : ""}
          onClick={() => onChange(i)}
        >
          {i + 1}
        </button>
      ))}

      {/* 다음 */}
      <button onClick={() => onChange(page + 1)} disabled={isLast}>
        &gt;
      </button>
    </Wrap>
  );
};

export default Pagination;
