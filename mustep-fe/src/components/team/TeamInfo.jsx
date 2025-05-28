import React from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import RecruitIcon from "../../assets/RecruitIcon.svg";
import { LuDownload } from "react-icons/lu";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TeamName = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  font-weight: bold;
  color: black;
`;

const LeaderName = styled.div`
  font-size: 1rem;
  color: black;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: black;
`;

const CountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const TotalCount = styled.span`
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 550;
`;

const CurrentCount = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StatusSelect = styled.select`
  padding: 8px 32px 8px 12px; /* 오른쪽에 아이콘 공간만큼 여유 */
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 12px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray6};
  font-weight: bold;
  cursor: pointer;
  appearance: none; /* 기본 브라우저 화살표 숨기기 */
`;

const ArrowIcon = styled(IoMdArrowDropdown)`
  position: absolute;
  pointer-events: none;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.gray6};
`;

const DownloadBtn = styled.button`
  padding: 8px 0px;
  background: ${({ theme }) => theme.colors.primary_lite};
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 40%;
`;

const TeamInfo = ({ status, setStatus, isLeader }) => {
  return (
    <Wrapper>
      <TeamName>팀명팀명팀명팀명</TeamName>
      <LeaderName>팀장 이름</LeaderName>
      <TextRow>
        <div>
          <RecruitIcon width={16} height={16} />
          <span>모집인원</span>
        </div>
        {/* div는 flex하게 6명 중은 gray4, 3명은 black */}
        <CountWrapper>
          <TotalCount>6명 중</TotalCount>
          <CurrentCount>3명</CurrentCount>
        </CountWrapper>

        {isLeader ? (
          <SelectWrapper>
            <StatusSelect
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="recruiting">모집중</option>
              <option value="closed">모집마감</option>
              <option value="paused">모집중단</option>
            </StatusSelect>
            <ArrowIcon size={20} />
          </SelectWrapper>
        ) : (
          <strong>
            {status === "recruiting"
              ? "모집중"
              : status === "closed"
              ? "모집마감"
              : "모집중단"}
          </strong>
        )}
      </TextRow>
      <DownloadBtn>
        <LuDownload /> 첨부파일 다운로드
      </DownloadBtn>
    </Wrapper>
  );
};

export default TeamInfo;
