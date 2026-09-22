// 데모용 mock 데이터입니다. 실제 백엔드 응답 스키마는 프론트 코드에서 참조하는 필드 기준으로 재구성했습니다.

export const categories = [
  { id: 1, title: "IT/개발" },
  { id: 2, title: "마케팅" },
];

export const projects = [
  {
    id: 1,
    title: "고객 리서치 자동화 툴 기획",
    categories: [categories[0]],
    companyName: "그린테크 스타트업",
    startAt: "2025-06-01",
    endAt: "2025-06-30",
    dday: "D-12",
    statusLabel: "Open",
    imageUrl: null,
    isDisabled: false,
  },
  {
    id: 2,
    title: "MZ세대를 위한 콘텐츠 제안 공모전",
    categories: [categories[1]],
    companyName: "브랜드 콘텐츠 컴퍼니",
    startAt: "2025-05-10",
    endAt: "2025-05-31",
    dday: "마감",
    statusLabel: "Closed",
    imageUrl: null,
    isDisabled: true,
  },
  {
    id: 3,
    title: "친환경 포장 개선안 실무 프로젝트",
    categories: [categories[0], categories[1]],
    companyName: "에코패키징",
    startAt: "2025-06-15",
    endAt: "2025-07-05",
    dday: "D-3",
    statusLabel: "Soon",
    imageUrl: null,
    isDisabled: false,
  },
];

export const projectDetail = {
  id: 1,
  companyName: "그린테크 스타트업",
  title: "고객 리서치 자동화 툴 기획",
  description: "고객 인터뷰/설문 데이터를 자동으로 정리해주는 툴을 기획해주세요.",
  content:
    "그린테크 스타트업은 고객 리서치 결과를 매번 수작업으로 정리하는 데 많은 시간을 쓰고 있습니다.\n청년 팀은 설문/인터뷰 데이터를 자동으로 취합·요약해주는 서비스 기획안과 프로토타입을 제작합니다.",
  status: "OPEN",
  statusLabel: "Open",
  startAt: "2025-06-01",
  endAt: "2025-06-30",
  email: "contact@greentech-startup.example",
  fileUrl: "",
  imageUrl: null,
  categories,
  relatedProjects: [],
  dday: "D-12",
};

export const teams = [
  {
    id: 101,
    title: "리서치봇 팀",
    projectTitle: "고객 리서치 자동화 툴 기획",
    content: "설문 데이터 자동 요약 서비스를 만듭니다.",
    memberCount: 3,
    maxUserCount: 4,
    status: "RECRUITING",
  },
  {
    id: 102,
    title: "인사이트팀",
    projectTitle: "고객 리서치 자동화 툴 기획",
    content: "",
    memberCount: 4,
    maxUserCount: 4,
    status: "CLOSED",
  },
];

export const teamDetail = {
  id: 101,
  title: "리서치봇 팀",
  content: "설문/인터뷰 데이터를 자동으로 정리·요약해주는 서비스를 기획하고 있습니다. 함께할 팀원을 찾아요!",
  fileUrl: "",
  maxUserCount: 4,
  memberCount: 3,
  leaderId: 1,
  status: "RECRUITING",
  project: { id: 1, title: "고객 리서치 자동화 툴 기획" },
  members: [
    { userId: 1, username: "김연신", leader: true },
    { userId: 2, username: "김진우", leader: false },
    { userId: 3, username: "남민우", leader: false },
  ],
};

export const notices = {
  content: [
    { id: 1, title: "1차 회의 안내", createdAt: "2025-06-03" },
    { id: 2, title: "역할 분담 공지", createdAt: "2025-06-05" },
  ],
  totalPages: 1,
};

export const toolLinks = {
  content: [
    { id: 1, title: "피그마 디자인", url: "https://figma.com/example" },
    { id: 2, title: "노션 기획 문서", url: "https://notion.so/example" },
  ],
  totalPages: 1,
};

export const userInfo = {
  nickname: "김연신",
  university: "충북대학교",
  major: "소프트웨어학부",
  introduce: "프론트엔드 개발을 공부하고 있습니다.",
  universityAuthenticated: true,
  imgUrl: null,
};

export const myTeams = [
  {
    id: 101,
    title: "리서치봇 팀",
    projectTitle: "고객 리서치 자동화 툴 기획",
    leaderName: "김연신",
    startAt: "2025-06-01",
    status: "RECRUITING",
  },
];
