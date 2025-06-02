import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCalendar, FiSearch } from 'react-icons/fi';
import thumbnailImg from "/src/assets/imgsample.png";
import { FaCalendarAlt } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Container = styled.div`
  display: flex;
  padding: 3vw 18.75vw;
  flex-direction: column;
`;

const Title = styled.h2`
  display: flex;  
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const TabButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 500;
  padding: 0px 0.75rem;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  width: 8vw;
  height: 2.5vw;
  font-size: 1.25rem;
`;

const Underline = styled.div`
  height: 1.2px;
  background: #D4B7FF;
  width: 62.5vw;
`;

const BottomRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background: #fff;
  width: 19rem;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
    color: #BDBEC7;
  }
`;

const StyledSearchIcon = styled(FiSearch)`
  cursor: pointer;
  margin-left: auto;
`;

const SortBox = styled.div`
  background: #f0f0f0;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;

  .arrow {
    color: #BDBEC7;
    font-size: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-template-rows: repeat(4, auto); 
  gap: 20px;
  padding: 2vw 18.75vw;
`;

const Card = styled.div`
  border: 2px solid ${({ statusColor }) => statusColor || '#8000FF'};
  border-radius: 16px;
  background: ${({ isDisabled }) => (isDisabled ? '#f5f5f5' : '#fff')};
  padding: 24px 32px;
  display: flex;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: 6.8vw;
  height: 6.8vw;
  border-radius: 8px;
  background-image: url(${thumbnailImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Tags = styled.div`
  display: flex;
  gap: 4px;
`;

const Tag = styled.span`
  background: #e2e2e2;
  color: black;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
  width: 39px;
  height: 17px;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center; 
  justify-content: center;
`;

const CardTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0 4px 0;
`;

const Company = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Period = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500; 
`;

const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;   
  flex-direction: column;
  text-align: center;
  height: 132px;
`;

const Dday = styled.div`
  background: ${({ color }) => color || '#8000FF'};
  color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
  width: 60px;
  height: 22px;
  display: flex;
  align-items: center; 
  justify-content: center;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;  
  height: 26px;
  padding: 20px;
  box-sizing: border-box;
  margin: 20px 0 88px 0;
`;

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight:bold;
    color: ${({ active }) => (active ? 'black' : '#666')};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    cursor: pointer;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const ProjectCard = ({ title, tags, company, period, dday, label, color, isDisabled }) => (
  <Card statusColor={color} isDisabled={isDisabled}>
    <Thumbnail $src={thumbnailImg} />
    <Content>
      <Tags>
        {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
      </Tags>
      <CardTitle>{title}</CardTitle>
      <Company>{company}</Company>
      <Period>
        <FaCalendarAlt size={14} /> {period}
      </Period>
    </Content>
    <Status>
      <Dday color={color}>{dday}</Dday>
      <Label>{label}</Label>
    </Status>
  </Card>
);

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '접수중', '접수완료'];

  const sampleData = [
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D-34', label: '접수중', color: '#8000FF', image: '/src/assets/imgsample.png' },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D-1', label: '마감임박', color: '#FF4D4F' },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D-day', label: '마감일', color: '#FF4D4F' },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D+2', label: '접수마감', color: '#999', isDisabled: true },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D-34', label: '접수중', color: '#8000FF' },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D-1', label: '마감임박', color: '#FF4D4F' },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D-day', label: '마감일', color: '#FF4D4F' },
    { title: '신제품 출시 기획안 아이디어', tags: ['마케팅', '디자인', '기획'], company: '회사명', period: '25.5.21 - 25.6.23', dday: 'D+2', label: '접수마감', color: '#999', isDisabled: true },
  ];

  return (
    <>
      <Container>
        <Left>
          <Title>기업 프로젝트</Title>
          <TabContainer>
            {tabs.map(tab => (
              <TabButton
                key={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </TabButton>
            ))}
          </TabContainer>
          <Underline />
        </Left>
        <BottomRight>
          <Right>
            <SearchBox>
              <input placeholder="어떤 프로젝트를 찾으시나요?" />
              <StyledSearchIcon size={18} />
            </SearchBox>
            <SortBox>
              시작일순 <span className="arrow">▲</span>
            </SortBox>
          </Right>
        </BottomRight>
      </Container>
      <Grid>
        {sampleData.map((data, i) => (
          <ProjectCard key={i} {...data} />
        ))}
      </Grid>

    <PaginationWrapper>
      <Arrow>
        <ChevronLeft size={20} />
      </Arrow>
      <Page active>1</Page>
      <Page>2</Page>
      <Page>3</Page>
      <Page>4</Page>
      <Page>5</Page>
      <Arrow>
        <ChevronRight size={20} />
      </Arrow>
    </PaginationWrapper>
    </>
  );
};

export default ProjectList;