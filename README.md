# 2025_9oormthonUNIV_4_FE
교내 팀 프로젝트 4팀 프론트엔드


## FE Conventions

| 분류                   | 규칙                                            | 예시                                      |
|----------------------|-----------------------------------------------|-----------------------------------------|
| 디렉토리 네이밍 규칙       | `camelCase` 사용                                 | `src/components`, `utils/helpers`      |
| 컴포넌트 네이밍            | `PascalCase` 사용                                | `LoginForm`, `UserProfile`             |
| 상태 변수 네이밍           | `camelCase` 사용                                 | `userName`, `isLoggedIn`               |
| 변수 / 함수 네이밍         | - **Boolean** 타입: `is~~` 형식<br>- **핸들러** 함수: `handle~~` 형식 | `isCompleted`, `isChecked`<br>`handleLogin`, `handleLogout` |
| 자주 쓰는 UI 용어          | 버튼: `Btn` / 인풋: `Input`                        | `SubmitBtn`, `TextInput`               |

## 프론트엔드 개발설정
1. 터미널에서 git clone 받기 `git clone https://github.com/9oormthonUNIV-CBNU/2025_9oormthonUNIV_4_FE.git`
2. 터미널에서 `/mustep` 디렉토리로 이동
3. npm 패키지 설치 - 터미널에서 `npm install`
4. 리액트 프로젝트 시작 - `npm run dev`

## 개발시 확인사항
1. 로컬 백엔드 환경설정하기(배포 전)

백엔드 프로젝트 `git clone`받고 노션에 백엔드 팀원분들이 개발설정 써놓으신거 보고 환경설정하기

1-1. `application.yml` 파일 `/src/main/resources` 디렉토리에 생성하고 노션에 적힌 내용으로 작성

1-2. `.env` 파일 최상단 디렉토리에 생성하고 노션에 작성된 `.env` 내용 그대로 작성

2. 작업할 때는 항상 `git pull origin master`로 코드 최신화하고 작업하기
