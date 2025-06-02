import React from 'react'
import styled from "styled-components";
import BgImage from "../assets/mainpage_background.png";
import { SlArrowDown } from "react-icons/sl";
import WorkingImage from "../assets/Man working or studying at computer.png";

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

const ServicesGroup = styled.div`
  display: flex;
  padding: 80px 360px;
  gap: 143px;
`;

const ServicesLeft = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 220px;
`;

const ServicesRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
`;

const SubTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const ServicesTitle = styled.span`
  font-size: 40px;
  font-weight: 800;
  font-family: 'Sandoll Press', sans-serif;
`;

const ArrowGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-direction: column;
`;

const FirstArrowIcon = styled(SlArrowDown)`
  font-size: 45px;
  color: black;
`;

const SecondArrowIcon = styled(SlArrowDown)`
  font-size: 45px;
  color: gray;
  margin-top: -30px;
`;

const Container = styled.div`
  display: flex;
  gap: 95;
  padding: 240px 360px 0 360px;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 124px auto;
`;

const ShiningDot = styled.div`
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 4px rgba(162, 89, 255, 0.6);
  margin: -75px -50px
`;

const Step = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #000;
  line-height: 1.4;

    strong {
    font-size: 40px;   
    font-weight: bold; 
  }
`;

const Description = styled.p`
  font-size: 20px;
  line-height: 1.5;
  font-weight: 500;
  margin-top: 80px;
`;

const ImageBox = styled.img`
  background-image: url(${WorkingImage});
  width: 493px;
  height: 460px;
  border: none;
  outline: none;
  display: block;
`;


const MainPage = () => {
  return (
   <>
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

    <ServicesGroup>
      <ServicesLeft>
        <SubTitle>About</SubTitle>
        <ServicesTitle>Our Services</ServicesTitle>
      </ServicesLeft>

      <ServicesRight>
        이 플랫폼은 실무 기반의 프로젝트를 통해 청년과 기업을 연결하는 매칭 시스템입니다.<br />
        청년은 실제 기업의 문제를 해결하며 실무 경험과 포트폴리오를 쌓고,<br />
        기업은 창의적이고 열정 있는 청년들로부터 업무 지원 또는 신선한 아이디어를 확보할 수 있습니다.
      </ServicesRight>
    </ServicesGroup>

    <ArrowGroup>
      <FirstArrowIcon/>
      <SecondArrowIcon/>
    </ArrowGroup>

    <Container>
      <TextBlock><ShiningDot />
        <Step>
        Process 1.
        </Step>
        <Title>
          기업으로부터 전달받은 <br />
          <strong>TASK 업로드</strong>
        </Title>
        <Description>
          기업은 사내에서 진행하기에 어려움이 있거나 새로운 아이디어가 필요한<br />
          mini task를 청년에게 제공하여 사내 이익을 얻을 수 있습니다.
        </Description>
      </TextBlock>

      <ImageBox />
    </Container>
   </>
  )
}

export default MainPage
