// components/team/Pagination.jsx
import React from 'react';
import styled from 'styled-components';

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

const Pagination = ({ page=1, total=2, onChange }) => {
  return (
    <Wrap>
      <button onClick={()=>onChange(page-1)} disabled={page<=1}>&lt;</button>
      {[...Array(total)].map((_,i)=>(
        <button
          key={i}
          className={page===i+1?'active':''}
          onClick={()=>onChange(i+1)}
        >{i+1}</button>
      ))}
      <button onClick={()=>onChange(page+1)} disabled={page>=total}>&gt;</button>
    </Wrap>
  );
}

export default Pagination;
