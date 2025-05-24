import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import MarkdownEditor from "../../components/admin/MarkdownEditor";
import axios from 'axios';

const Container = styled.div`
  margin: 0 auto;
  border-radius: 8px;
`;

const SubmitForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FieldGroup = styled.div`
  margin-bottom: 8px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #333;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DateRow = styled.div`
  display: flex;
  gap: 16px;
`;

const DateInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FileInput = styled.input`
  margin-top: 8px;
`;

const BtnGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  flex: 1;
  padding: 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
  padding: 0px;
`;

const CategoryItem = styled.li`
  background: #e0f7fa;
  padding: 4px 8px;
  border-radius: 4px;
`;

export default function NewProjectForm() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);

  const isDirty = companyName || title || contents || startAt || endAt || email || file || categories.length > 0;

  const handleCancel = () => {
    if (isDirty && !window.confirm("작성 중인 내용이 있습니다. 페이지를 떠나시겠습니까?")) return;
    navigate("/admin");
  };

  const addCategory = (e) => {
    e.preventDefault();
    const name = categoryInput.trim();
    if (name && !categories.includes(name)) {
      setCategories(prev => [...prev, name]);
    }
    setCategoryInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("등록하시겠습니까?")) return;

    

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("title", title);
    formData.append("content", contents);
    formData.append("start_at", startAt);
    formData.append("end_at", endAt);
    formData.append("email", email);
    if (file) formData.append("file_url", file);
    formData.append("categories", JSON.stringify(categories));

    // 디버그용
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = await axios("/api/projects", { method: "POST", body: formData });
      if (!res.ok) throw new Error("서버 에러");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <h2>신규 프로젝트 작성</h2>
      <SubmitForm onSubmit={handleSubmit}>
        <FieldGroup>
          <InputLabel>기업 이름</InputLabel>
          <TextInput
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            placeholder="기업 이름을 입력해주세요."
          />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>과제 제목</InputLabel>
          <TextInput
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="과제 제목을 입력해주세요."
          />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>과제 내용</InputLabel>
          <MarkdownEditor contents={contents} setContents={setContents} />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>기간</InputLabel>
          <DateRow>
            <DateInputWrapper>
              <InputLabel>시작일</InputLabel>
              <DateInput
                type="date"
                value={startAt}
                onChange={e => setStartAt(e.target.value)}
                max={endAt || undefined}
              />
            </DateInputWrapper>
            <DateInputWrapper>
              <InputLabel>마감일</InputLabel>
              <DateInput
                type="date"
                value={endAt}
                onChange={e => setEndAt(e.target.value)}
                min={startAt || undefined}
              />
            </DateInputWrapper>
          </DateRow>
        </FieldGroup>

        <FieldGroup>
          <InputLabel>기업 이메일</InputLabel>
          <TextInput
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="기업 이메일을 입력해주세요."
          />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>카테고리</InputLabel>
          <CategoryContainer>
            <CategoryInput
              value={categoryInput}
              onChange={e => setCategoryInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addCategory(e)}
              placeholder="카테고리 입력 후 +"
            />
            <AddButton type="button" onClick={addCategory}>+</AddButton>
          </CategoryContainer>
          <CategoryList>
            {categories.map((cat, i) => <CategoryItem key={i}>{cat}</CategoryItem>)}
          </CategoryList>
        </FieldGroup>

        <FieldGroup>
          <InputLabel htmlFor="file">추가 파일</InputLabel>
          <FileInput
            id="file"
            type="file"
            onChange={e => setFile(e.target.files[0])}
          />
        </FieldGroup>

        <BtnGroup>
          <CancelBtn type="button" onClick={handleCancel}>취소하기</CancelBtn>
          <SubmitBtn type="submit">등록하기</SubmitBtn>
        </BtnGroup>
      </SubmitForm>
    </Container>
  );
}
