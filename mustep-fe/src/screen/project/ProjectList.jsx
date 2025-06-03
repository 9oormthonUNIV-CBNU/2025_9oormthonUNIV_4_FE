import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { FiSearch } from "react-icons/fi";
import thumbnailImg from "/src/assets/imgsample.png";
import CalendarIcon from "../../assets/calendar_icon2.svg";
import Loading from "../../components/Loading";
import NoItem from "../../components/NoItem";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 360px;
  margin: 40px 0;

  /* 모바일 대응 시 적절히 패딩 조절하세요 */
  @media (max-width: 768px) {
    padding: 0 16px;
    margin-top: 16px;
    gap: 24px;
  }
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
  gap: 16px;
  border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
`;

const TabButton = styled.button`
  font-size: 1rem;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.gray4};
  padding: 8px 24px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.gray2};
  border: none;
  border-radius: 12px 12px 0 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_lite};
    color: ${({ theme }) => theme.colors.white};
  }
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
    color: #333;
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
    color: #bdbec7;
    font-size: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  gap: 20px;
  padding: 2vw 18.75vw;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2vw 0;
  }
`;

const Card = styled.div`
  border: 2px solid ${({ $statusColor }) => $statusColor || "#8000FF"};
  border-radius: 16px;
  background: ${({ $isDisabled }) => ($isDisabled ? "#f5f5f5" : "#fff")};
  padding: 24px 32px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Thumbnail = styled.img`
  width: 6.8vw;
  height: 6.8vw;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
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
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #e2e2e2;
  color: black;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CardTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin: 16px 0 4px 0;
  line-height: 1.2;
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
  background-color: #6907FF;
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

const Dday2 = styled.div`
  background-color: #FD5252;
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

const Dday3 = styled.div`
  background-color: #545661;
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

const PageNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) => ($active ? "black" : "#666")};
  cursor: pointer;

  &:hover {
    color: black;
  }
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

const ProjectCard = ({
  projectId,
  title,
  categories,
  companyName,
  startAt,
  endAt,
  dday,
  statusLabel,
  imgUrl,
  isDisabled,
}) => {
  const theme = useTheme();
  let ddayColor = "";

  if (statusLabel === "Open") {
    ddayColor = theme.colors.primary; // 접수중
  } else if (statusLabel === "Soon") {
    ddayColor = theme.colors.warning; // 마감임박
  } else {
    ddayColor = theme.colors.gray5; // 그 외 (Closed 등)
  }

  console.log(imgUrl);

  const navigate = useNavigate();

  return (
    <Card $statusColor={ddayColor} $isDisabled={isDisabled} onClick={() => navigate(`${projectId}`)}>
      <Thumbnail
        src={imgUrl || thumbnailImg}
      />
      <Content>
        <Tags>
          {categories.map((cat) => (
            <Tag key={cat.id}>{cat.title}</Tag>
          ))}
        </Tags>
        <CardTitle>{title}</CardTitle>
        <Company>{companyName}</Company>
        <Period>
          <CalendarIcon width={14} height={14} /> {startAt} ~ {endAt}
        </Period>
      </Content>
      <Status>
        {statusLabel === "접수중" && <Dday>{dday}</Dday>}
        {statusLabel === "접수마감" && <Dday3>{dday}</Dday3>}
        {statusLabel === "마감임박" && <Dday2>{dday}</Dday2>}

        <Label>{statusLabel}</Label>
      </Status>
    </Card>
  );
};

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", "접수중", "접수완료"];

  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("startAt");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusMap = {
    전체: "",
    접수중: "Open",
    접수마감: "Closed",
    마감임박: "Soon",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        // 기본 URL에 페이지/상태/정렬/검색어를 붙여서 호출
        let url = `${
          import.meta.env.VITE_SERVER_END_POINT
        }/api/projects?page=${currentPage}&sortBy=${sortBy}`;

        // status 파라미터 추가 (‘전체’는 비우기)
        const statusParam = statusMap[activeTab];
        if (statusParam) url += `&status=${statusParam}`;

        // 검색어가 있을 때는 &keyword=… (백엔드 API 명세에 맞추세요)
        if (searchTerm.trim() !== "") {
          url += `&keyword=${encodeURIComponent(searchTerm.trim())}`;
        }

        const res = await axios.get(url, {
          headers: {
            Accept: "*/*",
          },
        });

        // 응답 구조: { data: { content: [ … ], totalPages: X, … } }
        const data = res.data;
        if (data) {
          setProjects(data.content || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error("프로젝트 조회 실패:", err);
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeTab, currentPage, sortBy, searchTerm]);

  const handleClickTab = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    // Enter 또는 검색 아이콘 클릭 시 currentPage를 1로 리셋하고 실제 검색Term을 useEffect에 반영했습니다.
    setCurrentPage(1);
    // 그 외에는 searchTerm 변화만으로 useEffect가 트리거됩니다.
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div style={{ color: "red", textAlign: "center", margin: "2rem" }}>
          {error}
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Left>
          <Title>기업 프로젝트</Title>
          <TabContainer>
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                $active={activeTab === tab}
                onClick={() => handleClickTab(tab)}
              >
                {tab}
              </TabButton>
            ))}
          </TabContainer>
        </Left>
        <BottomRight>
          <Right>
            <SearchBox>
              <input
                placeholder="어떤 프로젝트를 찾으시나요?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <StyledSearchIcon size={18} onClick={handleSearch} />
            </SearchBox>
            <SortBox>
              시작일순 <span className="arrow">▲</span>
            </SortBox>
          </Right>
        </BottomRight>
      </Container>

      <Grid>
        {projects.length > 0 ? (
          projects.map((data) => (
            <ProjectCard
              projectId={data.id}
              key={data.id}
              title={data.title}
              categories={data.categories || []}
              companyName={data.companyName}
              startAt={data.startAt}
              endAt={data.endAt}
              dday={data.dday} // 백엔드가 반환하는 D-day 문자열
              statusLabel={data.statusLabel} // “Open”, “Soon”, “Closed” 등
              imgUrl={data.imageUrl}
              isDisabled={data.isDisabled}
            />
          ))
        ) : (
          <NoItem />
        )}
      </Grid>

      <PaginationWrapper>
        <Arrow onClick={() => goToPage(currentPage - 1)}>◀</Arrow>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
          (pageNum) => (
            <PageNumber
              key={pageNum}
              $active={pageNum === currentPage}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </PageNumber>
          )
        )}
        <Arrow onClick={() => goToPage(currentPage + 1)}>▶</Arrow>
      </PaginationWrapper>
    </>
  );
};

export default ProjectList;
