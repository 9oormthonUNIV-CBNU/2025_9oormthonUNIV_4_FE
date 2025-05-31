import React from 'react'
import styled from "styled-components";
import BgImage from "../assets/mainpage_background.png";

const TopSection = styled.section`
  width: 100%;
  height: 706px;
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const TextGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 32px;
  font-weight: bold;
  margin-top: 204px;
`;

const Dot = styled.div`
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50%;
  border: 2.4px solid #6907FF;
  margin: 0 -10px;
`;

const LineWrapper = styled.div`
  position: relative;
  width: 708px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  height: 1px;
  width: 778px;
  background-color: white;
  flex-shrink: 0;
`;



const MainPage = () => {
  return (
    <TopSection>
      <TextGroup>
        기업과
        <Dot />
        <LineWrapper>
          <Line />
        </LineWrapper>
        <Dot />
        청년을 잇다
      </TextGroup>
    </TopSection>
  )
}

export default MainPage
