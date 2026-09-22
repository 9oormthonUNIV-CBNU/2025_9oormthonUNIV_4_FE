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
} from "./data";

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

  http.get("*/api/userinfo/mypage", () => {
    return HttpResponse.json({ data: { userInfo } });
  }),

  http.get("*/api/userinfo", () => {
    return HttpResponse.json({ userId: 1, ...userInfo });
  }),
];
