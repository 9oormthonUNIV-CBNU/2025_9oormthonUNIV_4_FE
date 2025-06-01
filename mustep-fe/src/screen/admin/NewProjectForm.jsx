import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import MarkdownEditor from "../../components/admin/MarkdownEditor";
import axios from "axios";

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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
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

const NewProjectForm = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contents, setContents] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [email, setEmail] = useState("");
  const [projectFile, setProjectFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);

  const isDirty =
    companyName ||
    title ||
    description ||
    contents ||
    startAt ||
    endAt ||
    email ||
    projectFile ||
    imageFile ||
    categories.length > 0;

  const handleCancel = () => {
    if (
      isDirty &&
      !window.confirm("작성 중인 내용이 있습니다. 페이지를 떠나시겠습니까?")
    )
      return;
    navigate("/admin");
  };

  const addCategory = (e) => {
    e.preventDefault();
    const name = categoryInput.trim();
    if (name && !categories.includes(name)) {
      setCategories((prev) => [...prev, name]);
    }
    setCategoryInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("등록하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      let fileUrl = "";
      let imageUrl = "";

      if (projectFile) {
        const fd = new FormData();
        fd.append("file", projectFile);

        const s3Res = await axios.post(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/s3/upload`,
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 성공 시 response.data.data에 URL 문자열이 담겨 있다고 가정
        if (s3Res.status >= 200 && s3Res.status < 300) {
          fileUrl = s3Res.data.data; // 예: "https://…/파일명"
        } else {
          throw new Error("파일 업로드에 실패했습니다.");
        }
      }

      if (imageFile) {
        const imgFd = new FormData();
        imgFd.append("file", imageFile);

        const s3ImgRes = await axios.post(
          `${import.meta.env.VITE_SERVER_END_POINT}/api/v1/s3/upload`,
          imgFd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (s3ImgRes.status >= 200 && s3ImgRes.status < 300) {
          imageUrl = s3ImgRes.data.data;
        } else {
          throw new Error("이미지 업로드에 실패했습니다.");
        }
      }

      const categoryDTOs = categories.map((c) => ({ title: c }));

      const payload = {
        companyName: companyName.trim(), // 백엔드 DTO와 정확히 key 이름 일치
        title: title.trim(),
        description: description.trim(),
        content: contents.trim(),
        startAt: startAt, // "YYYY-MM-DD" 형식인지 반드시 확인
        endAt: endAt, // "YYYY-MM-DD" 형식인지 반드시 확인
        email: email.trim(),
        status: "Open",    // ← 반드시 "Open" | "Soon" | "Closed" 중 하나여야 함
        fileUrl: fileUrl, // 없으면 null(또는 undefined)로 보내도 무방
        imageUrl: imageUrl, // 없으면 null(또는 undefined)로 보내도 무방
        categories: categoryDTOs,
      };

      console.log(payload);

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_END_POINT}/api/projects`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        alert("프로젝트가 성공적으로 등록되었습니다.");
        navigate("/admin");
      } else {
        throw new Error("프로젝트 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
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
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="기업 이름을 입력해주세요."
          />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>과제 제목</InputLabel>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="과제 제목을 입력해주세요."
          />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>간단한 설명</InputLabel>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="간단한 설명을 입력해주세요."
            required
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
                onChange={(e) => setStartAt(e.target.value)}
                max={endAt || undefined}
              />
            </DateInputWrapper>
            <DateInputWrapper>
              <InputLabel>마감일</InputLabel>
              <DateInput
                type="date"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="기업 이메일을 입력해주세요."
          />
        </FieldGroup>

        <FieldGroup>
          <InputLabel>카테고리</InputLabel>
          <CategoryContainer>
            <CategoryInput
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory(e)}
              placeholder="카테고리 입력 후 +"
            />
            <AddButton type="button" onClick={addCategory}>
              +
            </AddButton>
          </CategoryContainer>
          <CategoryList>
            {categories.map((cat, i) => (
              <CategoryItem key={i}>{cat}</CategoryItem>
            ))}
          </CategoryList>
        </FieldGroup>

        {/* 첨부 파일 (프로젝트 관련 자료 등) */}
        <FieldGroup>
          <InputLabel htmlFor="file">첨부 파일</InputLabel>
          <FileInput
            id="file"
            type="file"
            accept="*"
            onChange={(e) => setProjectFile(e.target.files[0])}
          />
        </FieldGroup>

        {/* 이미지 파일 (썸네일 등) */}
        <FieldGroup>
          <InputLabel htmlFor="image">이미지 파일</InputLabel>
          <FileInput
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </FieldGroup>

        <BtnGroup>
          <CancelBtn type="button" onClick={handleCancel}>
            취소하기
          </CancelBtn>
          <SubmitBtn type="submit">등록하기</SubmitBtn>
        </BtnGroup>
      </SubmitForm>
    </Container>
  );
};

export default NewProjectForm;
