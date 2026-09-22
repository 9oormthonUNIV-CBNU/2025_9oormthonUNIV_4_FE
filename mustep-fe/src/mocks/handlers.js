import { http, HttpResponse } from "msw";
import {
  projects,
  projectDetail,
  teams,
  teamDetail,
  notices,
  toolLinks,
  userInfo,
  myTeams,
  applications,
  applicantProfiles,
  applicationDetails,
} from "./data";
import posterImg from "./assets/project-poster.jpg";

// 실제 백엔드 소스가 유실되어, 프론트 코드가 참조하는 응답 형태를 기준으로 재구성한 mock 핸들러입니다.
// README 스크린샷 촬영 및 로컬 데모용으로만 사용합니다.
export const handlers = [
  http.get("*/api/projects", () => {
    return HttpResponse.json({ content: projects, totalPages: 1 });
  }),

  http.get("*/api/projects/:id", () => {
    return HttpResponse.json(projectDetail);
  }),

  http.get("*/api/v1/teams/projects/:projectId", () => {
    return HttpResponse.json({ data: teams });
  }),

  http.get("*/api/v1/teams/my", () => {
    return HttpResponse.json({ data: myTeams });
  }),

  http.get("*/api/v1/teams/:teamId", () => {
    return HttpResponse.json({ data: teamDetail });
  }),

  http.get("*/api/teams/:teamId/notifies", () => {
    return HttpResponse.json({ data: notices });
  }),

  http.get("*/api/v1/tool-links/teams/:teamId", () => {
    return HttpResponse.json({ data: toolLinks });
  }),

  // 협업 링크 관리 모달에서 쓰는 전체 목록(페이지네이션 없는 배열) 조회
  http.get("*/api/v1/tool-links/all/teams/:teamId", () => {
    return HttpResponse.json({ data: toolLinks.content });
  }),

  // 협업 링크 삭제
  http.delete("*/api/v1/tool-links/:teamId", () => {
    return HttpResponse.json({ success: true });
  }),

  http.get("*/api/userinfo/mypage", () => {
    return HttpResponse.json({ data: { userInfo } });
  }),

  http.get("*/api/userinfo", () => {
    return HttpResponse.json({ userId: 1, ...userInfo });
  }),

  // 팀 생성 신청 — 로컬 데모용으로 항상 성공 처리
  http.post("*/api/v1/teams/create", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      data: { id: Math.floor(Math.random() * 1000) + 200, ...body },
    });
  }),

  // 팀 생성 폼에서 파일 첨부 시 호출되는 업로드 mock
  http.post("*/api/v1/files/upload", () => {
    return HttpResponse.json({ url: "https://example.com/mock-file.pdf" });
  }),

  // 프로젝트(팀) 끝내기
  http.delete("*/api/v1/teams/:teamId", () => {
    return HttpResponse.json({ success: true });
  }),

  // 최종 산출물 제출하기
  http.post("*/api/v1/teams/:teamId/output", () => {
    return HttpResponse.json({ success: true });
  }),

  // 공지사항 글쓰기
  http.post("*/api/teams/:teamId/notifies", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      data: { id: Math.floor(Math.random() * 1000) + 10, ...body },
    });
  }),

  // 공지사항 조회 (단건)
  http.get("*/api/teams/:teamId/notifies/:notifyId", ({ params }) => {
    const notice = notices.content.find(
      (n) => String(n.id) === params.notifyId
    ) || notices.content[0];
    return HttpResponse.json({
      data: {
        ...notice,
        content: "mock 데이터로 생성된 공지사항 상세 내용입니다.",
      },
    });
  }),

  // 협업 링크 추가하기
  http.post("*/api/v1/tool-links/teams/:teamId", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      data: { id: Math.floor(Math.random() * 1000) + 10, title: "새 링크", ...body },
    });
  }),

  // 모집 상태 변경
  http.put("*/api/v1/teams/:teamId/status", () => {
    return HttpResponse.json({ success: true });
  }),

  // 프로필 사진 업로드 (ProfilePage: {success,data}, NewTeamForm: {url} 둘 다 참조하므로 함께 반환)
  http.post("*/api/v1/s3/upload", () => {
    return HttpResponse.json({ success: true, data: posterImg, url: posterImg });
  }),

  // 프로필 정보(사진 포함) 수정
  http.put("*/api/userinfo", () => {
    return HttpResponse.json({ success: true });
  }),

  // 자기소개 수정
  http.put("*/api/userinfo/mypage/introduce", () => {
    return HttpResponse.json({ success: true });
  }),

  // 공지사항 수정
  http.put("*/api/teams/:teamId/notifies/:notifyId", () => {
    return HttpResponse.json({ success: true });
  }),

  // 공지사항 삭제
  http.delete("*/api/teams/:teamId/notifies/:notifyId", () => {
    return HttpResponse.json({ success: true });
  }),

  // 멤버 내보내기
  http.delete("*/api/members/:teamId/members/:userId", () => {
    return HttpResponse.json({ success: true });
  }),

  // 팀 정보 수정 저장
  http.put("*/api/v1/teams/:teamId", () => {
    return HttpResponse.json({ success: true });
  }),

  // 팀 신청자 목록 조회
  http.get("*/api/v1/applications/teams/:teamId/all", () => {
    return HttpResponse.json({ data: applications });
  }),

  // 신청자 프로필 조회 (신청자 목록 각 항목의 닉네임/이미지 채우는 용도)
  http.get("*/api/members/:userId/profile", ({ params }) => {
    const profile = applicantProfiles[params.userId] || {
      imgUrl: "",
      nickname: "익명",
    };
    return HttpResponse.json({ data: profile });
  }),

  // 지원서 상세 조회 ("신청서 보기") — 반드시 /all 핸들러보다 아래에 있어야 함
  http.get("*/api/v1/applications/teams/:teamId/:userId", ({ params }) => {
    const detail = applicationDetails[params.userId] || applicationDetails[4];
    return HttpResponse.json({ data: detail });
  }),

  // 지원서 수락/거절
  http.patch("*/api/v1/applications/teams/:teamId/:userId/status", () => {
    return HttpResponse.json({ success: true });
  }),
];
