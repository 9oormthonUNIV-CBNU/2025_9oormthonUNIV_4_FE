import React from "react";
import NoIcon from "../assets/noitem.svg";
import styled from "styled-components";

const NoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: 20vh;
  flex: 1;
`;

const StyledNoIcon = styled(NoIcon)`
  width: 48px;
  height: 48px;
`;

const NoItemText = styled.div`
  color: ${({ theme }) => theme.colors.gray3};
  font-size: 1rem;
`;

const Loading = () => {
  return (
    <NoItemWrapper>
      <StyledNoIcon />
      <NoItemText>*로딩중 입니다....</NoItemText>
    </NoItemWrapper>
  )
}

export default Loading
