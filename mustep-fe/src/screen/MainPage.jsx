import React from 'react';
import styled from "styled-components";
import BgImage from "../assets/mainpage_background.png";
import { SlArrowDown } from "react-icons/sl";
import ImgProcess1 from '../assets/Man working or studying at computer.png';
import ImgProcess2 from '../assets/hands joined together.png';
import ImgProcess3 from '../assets/woman and man discussing work project.png';
import ImgProcess4 from '../assets/three people working on the project.png';
import ProjectImage from '../assets/imgsample.png';

const TopSection = styled.section`
  width: 100%;
  min-height: 70vh;
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
  margin-top: 9.7vh;
  flex-wrap: wrap;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 2.5vw;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2vw;
`;

const Dot = styled.div`
  width: 1.8vw;
  height: 1.8vw;
  background-color: white;
  border-radius: 50%;
  border: 0.2vw solid #6907FF;
  flex-shrink: 0;
`;

const LineWrapper = styled.div`
  width: 40vw;
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: white;
`;

const ServicesGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 18vw;
  gap: 7vw;
  background: white;
`;

const ServicesLeft = styled.div`
  flex-direction: column;
`;

const ServicesRight = styled.div`
  flex: 2;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  text-align: right;
`;

const SubTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
`;

const ServicesTitle = styled.span`
  font-size: 2.5rem;
  font-weight: 800;
  font-family: 'Sandoll Press', sans-serif;
    display: flex;
`;

const ArrowGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4vw;
`;

const FirstArrowIcon = styled(SlArrowDown)`
  font-size: 2.8rem;
  color: black;
`;

const SecondArrowIcon = styled(SlArrowDown)`
  font-size: 2.8rem;
  color: gray;
  margin-top: -1.0vw;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10vw;
  padding: 12.5vw 18.7vw 0 18.7vw;
  background-color: #fff;
`;

const StepRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 5vw;
  width: 62.5vw;
  height: 30vw;
`;

const StepImage = styled.img`
  flex: 1 1 300px;
`;

const StepContentLeft = styled.div`
  flex: 1 1 300px;
`;

const StepContentRight = styled.div`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;


const LabelBox = styled.div`
  flex-direction: row
  gap: 1.2rem;
`;

const StepLabel = styled.p`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StepHeading = styled.h3`
  font-size: 1.75rem;
  font-weight: 500;
  margin: 1rem 0;
  line-height: 1.5;
`;

const StepText = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 500;
  margin-top: 4.75rem;
`;

const ShiningDot = styled.div`
  display: flex;
  width: 2.1rem;
  height: 2.1rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px 4px rgba(162, 89, 255, 0.6);
`;

const RecommendSection = styled.section`
  background-color: white;
  padding: 11.4vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 3.25rem;
  font-weight: 700;
  text-align: center;
`;

const ArrowLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 0 7.5rem 0;
  height: 36vw;
  position: relative;

  &::before {
    content: '';
    width: 1px;
    height: 36vw;;
    background: black;
    display: block;
  }
`;

const ArrowDown = styled.div`
  width: 0; 
  height: 0; 
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 12px solid black;
`;

const RecommedProject = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 3.6rem;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0 4.3rem;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const ProjectCard = styled.div`
  width: 11.5vw;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 11.5vw;
  height: 11.5vw;
`;

const CardText = styled.div`
  margin-top: 0.5rem;
  font-size: 1rem;
  text-align: left;
  line-height: 1.4;
  font-weight: 600;
`;

const MainPage = () => {
  return (
    <>
      <TopSection>
        <TextGroup>
          <Text>
          기업과
          </Text>
          <Dot />
          <LineWrapper>
            <Line />
          </LineWrapper>
          <Dot />
          <Text>
          청년을 잇다
          </Text>
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
        <FirstArrowIcon />
        <SecondArrowIcon />
      </ArrowGroup>

      <StepContainer>
        <StepRow>
          <StepContentLeft>
            <LabelBox>
            <StepLabel>Process 1.</StepLabel>
            </LabelBox>
            <StepHeading>
              기업으로부터 전달받은<br />
              <strong>TASK 업로드</strong>
            </StepHeading>
            <StepText>
              기업은 사내에서 진행하기에 어려움이 있거나 새로운 아이디어가 필요한<br />
              mini task를 청년에게 제공하여 사내 이익을 얻을 수 있습니다.
            </StepText>
          </StepContentLeft>
            <StepImage src={ImgProcess1} alt="Process 1" />
        </StepRow>

        <StepRow>
          <StepImage src={ImgProcess2} alt="Process 2" />
          <StepContentRight>
            <StepLabel>Process 2.</StepLabel>
            <StepHeading>
              실무경험이 필요한 유저의<br />
              <strong>TEAM 구성</strong>
            </StepHeading>
            <StepText>
              유저는 실무경험을 하고싶은 프로젝트를 선택하여<br />
              그 안에서 팀장 및 팀원으로서 그룹을 구성할 수 있습니다.
            </StepText>
          </StepContentRight>
        </StepRow>

        <StepRow>
          
          <StepContentLeft>
            <StepLabel>Process 3.</StepLabel>
            <StepHeading>
              유저의 실무경험 프로젝트<br />
              <strong>PROJECT 진행</strong>
            </StepHeading>
            <StepText>
              유저가 선택한 프로젝트를 팀원들과 함께 진행하여,<br />
              제공된 기간안에 최종 산출물을 제출합니다.
            </StepText>
          </StepContentLeft>
            <StepImage src={ImgProcess3} alt="Process 3" />  
        </StepRow>

        <StepRow>
          <StepImage src={ImgProcess4} alt="Process 4" />
          <StepContentRight>
            <StepLabel>Process 4.</StepLabel>
            <StepHeading>
              기업의 피드백 및 평가<br />
              <strong>FEEDBACK</strong>
             </StepHeading>
            <StepText>
              유저는 산출물에 대한 기업의 피드백 및 평가를 받을 수 있어<br />
              추후 실무에 도움을 받습니다.
            </StepText>
          </StepContentRight>
        </StepRow>
      </StepContainer>

    <RecommendSection>
      <Title>시작해볼까요?</Title>
      <ArrowLine>
        <ArrowDown />
      </ArrowLine>

      <RecommedProject>추천 프로젝트</RecommedProject>

      <CarouselWrapper>
        <ArrowButton>&lt;</ArrowButton>

        {[1, 2, 3].map((_, index) => (
          <ProjectCard key={index}>
            <CardImage src={ProjectImage} alt="프로젝트 썸네일" />
            <CardText>
              [기업이름]<br />
              신제품 출시 기획안 아이디어
            </CardText>
          </ProjectCard>
        ))}

        <ArrowButton>&gt;</ArrowButton>
      </CarouselWrapper>
    </RecommendSection>
    </>
  );
};

export default MainPage;
