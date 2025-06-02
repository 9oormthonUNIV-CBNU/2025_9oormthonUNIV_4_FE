// src/screen/team/TeamApplyForm.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import ArrowForward from "../../assets/arrow_forward.svg";
import axios from "axios";
import MarkdownEditor from "../../components/admin/MarkdownEditor";

const PageWrapper = styled.main`
  padding: 40px 360px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const HeaderRow = styled.div`
  display: flex;
  cursor: pointer;
  color: #545661;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0px;
`;

const TeamName = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin: 10px 0px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const RowGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Label = styled.label`
  width: 10vw; /* 레이블 고정 너비 */
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2533;
`;

const SmallInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  color: #333;
  /* width: 240px;  */
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const TextareaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  color: #333;
  min-height: 400px;
  resize: vertical;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const CharCount = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray5};
  align-self: flex-end;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelBtn = styled.button`
  padding: 10px 40px;
  background: ${({ theme }) => theme.colors.gray2};
  color: #1f2533;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray3};
  }
`;

const SubmitBtn = styled.button`
  padding: 10px 40px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary_lite};
  }
`;

const StyledMarkdownEditor = styled(MarkdownEditor)`
  border-radius: 8px;
`;

const EditNotice = () => {
  const navigate = useNavigate();
  const { teamId, notifyId } = useParams();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_END_POINT
          }/api/teams/${teamId}/notifies/${notifyId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = res.data.data;

        setTitle(data.title);
        setContents(data.content);
      } catch (err) {
      console.error("공지사항 조회회 실패:", err);
      }
    };
    fetchNotice();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const body = {
        title: title,
        content: contents,
      };

      await axios.put(
        `${
          import.meta.env.VITE_SERVER_END_POINT
        }/api/teams/${teamId}/notifies/${notifyId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("공지사항이 수정되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("공지사항 수정 실패:", err);
      alert("공지사항 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <HeaderRow onClick={() => navigate(-1)}>
        <ArrowForward />
      </HeaderRow>
      <div>
        <Title>공지사항 수정</Title>
      </div>

      <Form onSubmit={handleSubmit}>
        <RowGroup>
          <Label htmlFor="title">제목</Label>
          <SmallInput
            id="title"
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </RowGroup>

        <RowGroup>
          <Label htmlFor="contents">내용</Label>
          <TextareaWrapper>
            <MarkdownEditor
              id="contents"
              placeholder="내용을 입력해주세요."
              contents={contents}
              setContents={setContents}
            />
            <CharCount>{contents.length}</CharCount>
          </TextareaWrapper>
        </RowGroup>

        <ButtonRow>
          <CancelBtn type="button" onClick={() => navigate(-1)}>
            취소
          </CancelBtn>
          <SubmitBtn type="submit">올리기</SubmitBtn>
        </ButtonRow>
      </Form>
    </PageWrapper>
  );
};

export default EditNotice;
