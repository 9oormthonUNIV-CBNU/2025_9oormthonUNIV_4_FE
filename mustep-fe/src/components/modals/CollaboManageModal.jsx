// components/team/CollaboManageModal.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";
import CheckedIcon from "../../assets/link_checked_icon.svg";
import UnCheckedIcon from "../../assets/link_unchecked_icon.svg";
import AddLink from "./AddLink";
import { getFaviconUrl } from "../../../utils/Utils";
import { useParams } from "react-router";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: hsla(0, 0%, 0%, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Card = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 20vw;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2533;
  margin: 0 0 24px;
`;

// ↓ 기존 LinkList를 아래와 같이 수정합니다.
const LinkList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;

  /* 여기부터 추가된 부분 */
  max-height: 400px;       /* 원하는 최대 높이로 조정하세요 */
  overflow-y: auto;        /* 세로 스크롤 활성화 */
  /* 스크롤바를 숨기고 싶으면 아래 두 줄을 추가하세요 
     (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray3};
    border-radius: 3px;
  }
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray1};
`;

const AddItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 0px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray2};
  cursor: pointer;
  margin-bottom: 16px;
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

`;

const NameText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2533;
`;

const UrlText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray6};

`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  word-wrap: break-word;
  gap: 4px;
  flex: 1;
`;

const BtnBlock = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const CancleBtn = styled.button`
  width: 20%;
  padding: 6px 14px;
  background: ${({ theme }) => theme.colors.gray2};
  color: ${({ theme }) => theme.colors.gray5};
  border: none;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gray1};
  }
`;

const RemoveBtn = styled.button`
  width: 40%;
  padding: 14px 0;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray4 : theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.9)};
  }
`;

const AddBtn = styled.p`
  background: none;
  color: ${({ theme }) => theme.colors.gray4};
  border: none;
  border-radius: 12px;
  font-size: 1.5rem;
  margin: 0px;
`;

const CheckedBtn = styled(CheckedIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
`;

const UnCheckedBtn = styled(UnCheckedIcon)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
`;

const CollaboIcon = styled.img`
  width: 30px;
`;

const CollaboManageModal = ({ collaboes, setCollaboes, setShowModal, setCollabPage }) => {
  const { teamId } = useParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 1) 현재 링크 목록을 서버에서 받아오기
  const fetchCollaboLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/tool-links/all/teams/${teamId}`,
        {
          headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + token,
          },
        }
      );
      if (res.data && res.data.data) {
        // 예시: data = [{ id, name, url }, …]
        setCollaboes(res.data.data);
        setCollabPage(1);
      }
    } catch (err) {
      console.error("협업 링크 목록 조회 실패", err);
    }
  };

  useEffect(() => {
    fetchCollaboLinks();
  }, [teamId, collaboes]);

  const handleRemove = async () => {
    if (selectedIds.length === 0) return;

    // 1) 사용자에게 확인
    const ok = window.confirm(
      `정말 선택된 ${selectedIds.length}개의 링크를 삭제하시겠습니까?`
    );
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // 2) DELETE 요청: 서버 예시대로 body에 { ids: [ ... ] } JSON 전송
      await axios.delete(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/tool-links/${teamId}`,
        {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: {
            ids: selectedIds,
          },
        }
      );

      // 3) 삭제 성공 후: 로컬 상태 갱신 혹은 다시 목록 호출
      //    여기서는 다시 fetchCollaboLinks를 호출해서 최신 목록을 가져옵니다.
      setSelectedIds([]); // 선택 초기화
      fetchCollaboLinks();
    } catch (err) {
      console.error("링크 삭제 실패:", err);
      alert("링크 삭제 중 오류가 발생했습니다.");
    }
  };


  return (
    <>
      <Overlay>
        <Card>
          <Title>협업 링크 관리</Title>
          <LinkList>
            {collaboes.map((item) => (
              <LinkItem key={item.id}>
                <InfoGroup>
                  <CollaboIcon src={getFaviconUrl(item.toolLink, { size: 24 })} />
                </InfoGroup>
                <DetailGroup>
                  <NameText>{item.title}</NameText>
                  <UrlText>{item.toolLink}</UrlText>
                </DetailGroup>
                {selectedIds.includes(item.id) ? (
                  <CheckedBtn onClick={() => toggleSelect(item.id)} />
                ) : (
                  <UnCheckedBtn onClick={() => toggleSelect(item.id)} />
                )}
              </LinkItem>
            ))}

          </LinkList>
          <AddItem onClick={() => setShowAddModal(true)}>
            <AddBtn>＋</AddBtn>
          </AddItem>
          <BtnBlock>
            <CancleBtn onClick={() => setShowModal(false)}>닫기</CancleBtn>
            <RemoveBtn
              disabled={selectedIds.length === 0}
              onClick={handleRemove}
            >
              삭제하기
            </RemoveBtn>
          </BtnBlock>
        </Card>
      </Overlay>

      {showAddModal && (
        <AddLink
          setShowModal={setShowAddModal}
          onNewLinkAdded={() => {
            fetchCollaboLinks();
          }}
          onSetPage={() => setCollabPage(1)}
        />
      )}
    </>
  );
};

export default CollaboManageModal;
