import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "../../assets/close_btn.svg";
import CheckedIcon from "../../assets/link_checked_icon.svg";
import UnCheckedIcon from "../../assets/link_unchecked_icon.svg";
import AddLink from "./AddLink";

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

const LinkList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray1};
`;

const AddItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px 0px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray2};
  cursor: pointer;
`;

const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NameText = styled.span`
  font-size: 1rem;
  color: #1f2533;
`;

const DetailGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray6};
  gap: 4px;
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

const BtnBlock = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const RemoveBtn = styled.button`
  width: 40%;
  padding: 14px 0;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const AddBtn = styled.p`
  background: none;
  color: ${({ theme }) => theme.colors.gray4};
  border: none;
  border-radius: 12px;
  font-size: 2rem;
  margin: 0px;
`;

const CollaboIcon = styled.img`
  width: 30px;
`;
const CollaboManageModal = ({ collaboes, setCollaboes, setShowModal }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRemove = () => {
    // 선택된 것만 필터링 해제
    setCollaboes(collaboes.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setShowModal(false);
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
                  <CollaboIcon src={item.imgUrl} />
                </InfoGroup>
                <DetailGroup>
                  <InfoGroup>
                    <span>{item.name}</span>
                  </InfoGroup>
                  <InfoGroup>
                    <span>{item.url}</span>
                  </InfoGroup>
                </DetailGroup>
                {selectedIds.includes(item.id) ? (
                  <CheckedBtn onClick={() => toggleSelect(item.id)} />
                ) : (
                  <UnCheckedBtn onClick={() => toggleSelect(item.id)} />
                )}
              </LinkItem>
            ))}
            <AddItem onClick={() => setShowAddModal(true)}>
              <InfoGroup>
                <AddBtn>+</AddBtn>
              </InfoGroup>
            </AddItem>
          </LinkList>
          <BtnBlock>
            <CancleBtn onClick={() => setShowModal(false)}>닫기</CancleBtn>
            <RemoveBtn onClick={handleRemove}>삭제하기</RemoveBtn>
          </BtnBlock>
        </Card>
      </Overlay>
      {showAddModal && <AddLink setShowModal={setShowAddModal} />}
    </>
  );
};

export default CollaboManageModal;
