// src/screen/team/TeamApplyForm.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import ArrowForward from "../../assets/arrow_forward.svg";
import { LuUpload } from "react-icons/lu";
import AttachFileModal from "../../components/modals/AttachFileModal";
import axios from "axios";

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

const QuestionRow = styled.label`
  display: flex;
`;

const QuestionLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2533;
`;

const HelperText = styled.label`
  margin-left: auto;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.gray5};
`;

const Textarea = styled.textarea`
  padding: 12px 16px;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 8px;
  color: #333;
  min-height: 120px;
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

/* ────────────────────────────────────────────────────────────────────────── */
/*  [ 첨부파일 업로드하기 버튼 ]                                              */
/* ────────────────────────────────────────────────────────────────────────── */

const UploadBtn = styled.button`
  width: 200px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.primary_lite};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  & > svg {
    font-size: 1.25rem;
  }

  &:hover {
    opacity: 0.9;
  }
`;

/* ────────────────────────────────────────────────────────────────────────── */
/*  [ 취소 ]  [ 신청하기 ]                                                      */
/* ────────────────────────────────────────────────────────────────────────── */
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

const TeamApplyForm = () => {
  const navigate = useNavigate();
  const { teamId } = useParams(); // 필요 시 사용

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [intro, setIntro] = useState("");
  const [motivation, setMotivation] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [etc, setEtc] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [showFileModal, setShowFileModal] = useState(false);

  const MAX_LEN = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", nickname);
    formData.append("email", email);
    formData.append("phoneNumber", phone);
    formData.append("introduce", intro);
    formData.append("purpose", motivation);
    formData.append("skillExperience", skills);
    formData.append("strengthsExperience", experience);
    formData.append("additionalInfo", etc);
    formData.append("teamId", teamId);

    if (selectedFiles.length > 0) {
      formData.append("file", selectedFiles[0]);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${
          import.meta.env.VITE_SERVER_END_POINT
        }/api/v1/applications/teams/${teamId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("신청이 완료되었습니다.");
      console.log(res.data);
      console.log(res.response);
      navigate(-1);
    } catch (err) {
      console.error("신청 중 오류 발생:", err);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <PageWrapper>
        {/* 1. 뒤로 가기 + 타이틀 */}
        <HeaderRow onClick={() => navigate(-1)}>
          <ArrowForward />
        </HeaderRow>
        <div>
          <Title>팀 참가신청서</Title>
          <TeamName>팀 이름</TeamName>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* ────────────────────────────────────────────────────────────── */}
          {/* 기본 정보: 닉네임, 이메일, 연락처 (input 너비 작게) */}
          <RowGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <SmallInput
              id="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </RowGroup>

          <RowGroup>
            <Label htmlFor="email">이메일</Label>
            <SmallInput
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </RowGroup>

          <RowGroup>
            <Label htmlFor="phone">연락처</Label>
            <SmallInput
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </RowGroup>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* Q1. 자기소개 */}
          <RowGroup>
            <Label htmlFor="intro">자기소개</Label>
            <TextareaWrapper>
              <QuestionRow>
                <QuestionLabel>Q1. 간단한 자기소개를 해주세요.</QuestionLabel>
                <HelperText>*전공, 관심분야, 성격 등 자유롭게 작성</HelperText>
              </QuestionRow>
              <Textarea
                id="intro"
                placeholder="간단한 자기소개를 입력해주세요."
                maxLength={MAX_LEN}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                required
              />
              <CharCount>
                {intro.length}/{MAX_LEN}
              </CharCount>
            </TextareaWrapper>
          </RowGroup>

          {/* Q2. 동기 및 목표 */}
          <RowGroup>
            <Label htmlFor="motivation">동기 및 목표</Label>
            <TextareaWrapper>
              <QuestionRow>
                <QuestionLabel>
                  Q2. 이 프로젝트에 지원하게 된 이유는 무엇인가요?
                </QuestionLabel>
                <HelperText>
                  *이 과제를 통해 배우고 싶은 점, 흥미를 느낀 이유 등을 작성
                </HelperText>
              </QuestionRow>
              <Textarea
                id="motivation"
                placeholder="이 프로젝트에 지원하게 된 이유를 작성해주세요."
                maxLength={MAX_LEN}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                required
              />
              <CharCount>
                {motivation.length}/{MAX_LEN}
              </CharCount>
            </TextareaWrapper>
          </RowGroup>

          {/* Q3. 기술/경험 */}
          <RowGroup>
            <Label htmlFor="skills">기술/능력</Label>
            <TextareaWrapper>
              <QuestionRow>
                <QuestionLabel>
                  Q3. 본인의 기술 스택이나 사용 경험을 알려주세요.
                </QuestionLabel>
                <HelperText>*예: Python, Excel, Notion 등</HelperText>
              </QuestionRow>
              <Textarea
                id="skills"
                placeholder="본인의 기술 스택이나 사용 경험을 입력해주세요."
                maxLength={MAX_LEN}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
              <CharCount>
                {skills.length}/{MAX_LEN}
              </CharCount>
            </TextareaWrapper>
          </RowGroup>

          {/* Q4. 팀 경험/성과 */}
          <RowGroup>
            <Label htmlFor=""></Label>
            <TextareaWrapper>
              <QuestionRow>
                <QuestionLabel>
                  Q4. 과거 팀 경험이나 프로젝트 성과(예: 팀장 경험, 인턴 경험
                  등)
                </QuestionLabel>
                <HelperText>※ 해당 경험이 있으면 자유롭게 기술</HelperText>
              </QuestionRow>
              <Textarea
                id="experience"
                placeholder="과거 팀 경험 혹은 프로젝트 성과를 작성해주세요."
                maxLength={MAX_LEN}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
              <CharCount>
                {experience.length}/{MAX_LEN}
              </CharCount>
            </TextareaWrapper>
          </RowGroup>

          {/* Q5. 기타 사항 */}
          <RowGroup>
            <Label htmlFor="etc">기타사항</Label>
            <TextareaWrapper>
              <QuestionRow>
                <QuestionLabel>
                  Q5. 강조하고 싶은 내용이나 자유 형식으로 작성
                </QuestionLabel>
                <HelperText>*추가적으로 강조하고 싶은 사항 입력</HelperText>
              </QuestionRow>
              <Textarea
                id="etc"
                placeholder="기타 작성하고 싶은 내용을 입력해주세요."
                maxLength={500}
                value={etc}
                onChange={(e) => setEtc(e.target.value)}
                required
              />
              <CharCount>{etc.length}/500</CharCount>
              <UploadBtn type="button" onClick={() => setShowFileModal(true)}>
                <LuUpload /> 첨부파일 업로드하기
              </UploadBtn>
            </TextareaWrapper>
          </RowGroup>
          <Label htmlFor=""></Label>

          {/* ────────────────────────────────────────────────────────────── */}
          {/* 첨부파일 업로드 버튼 (별도 한 행에 좌측 정렬) */}

          {/* ────────────────────────────────────────────────────────────── */}
          {/* 하단 취소 / 신청하기 버튼 (별도 한 행에 우측 정렬) */}
          <ButtonRow>
            <CancelBtn type="button" onClick={() => navigate(-1)}>
              취소
            </CancelBtn>
            <SubmitBtn type="submit">신청하기</SubmitBtn>
          </ButtonRow>
        </Form>
      </PageWrapper>
      {showFileModal && (
        <AttachFileModal
          setShowModal={setShowFileModal}
          onDone={(doneFiles) => {
            setSelectedFiles(doneFiles);
          }}
        />
      )}
    </>
  );
};

export default TeamApplyForm;
