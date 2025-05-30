// components/team/ProjectCard.jsx
import React from 'react';
import styled from 'styled-components';
import SampleImg from "../../assets/imgsample.png";

const Card = styled.div`
  flex: 0 0 300px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 16px;
  display: flex;
`;
// 좌측 텍스트 영역
const ProjectText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #1f2533;
  }
  span {
    font-size: 0.85rem;
    color: #7c7e8a;
  }
`;
const ProjectImage = styled.img`
  width: 100px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProjectCard = ({}) => {
  return (
    <Card>
          <ProjectText>
            <div>
              <h4>진행중인 프로젝트 이름</h4>
              <span>회사명</span>
            </div>
            <span>25.5.21 – 25.6.23</span>
          </ProjectText>
          <ProjectImage src={SampleImg} alt="프로젝트 이미지" />
    </Card>
  );
}

export default ProjectCard;