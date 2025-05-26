import { BrowserRouter, Routes, Route } from "react-router";
import Root from "./components/Root";
import MainPage from "./screen/MainPage";
import LoginPage from "./screen/LoginPage";
import RegisterPage from "./screen/RegisterPage";
import AuthLayout from "./components/auth/AuthLayout";
import ProjectList from "./screen/project/ProjectList";
import ProjectDetail from "./screen/project/ProjectDetail";
import ProjectTeamList from "./screen/project/ProjectTeamList";
import NewTeam from "./screen/project/NewTeamForm";
import TeamDetail from "./screen/team/TeamDetail";
import TeamApplyForm from "./screen/team/TeamApplyForm";
import NewNoticeForm from "./screen/team/NewNoticeForm";
import TeamEditForm from "./screen/team/TeamEditForm";
import NotFound from "./screen/NotFound";
import MyPage from "./screen/ProfilePage";
import AdminPage from "./screen/admin/AdminPage";
import AdminLayout from "./components/admin/AdminLayout";
import NewProjectForm from "./screen/admin/NewProjectForm";
import GlobalStyle from "./styles/GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          {/* 기본 라우팅 홈페이지로 리다이렉트 */}
          <Route path="/" element={<Root />}>
            <Route index element={<MainPage />} />

            {/* 프로젝트 관련 페이지 라우팅 */}
            <Route path="projects">
              <Route index element={<ProjectList />} />
              <Route path=":projectId">
                <Route index element={<ProjectDetail />} />
                <Route path="teams" element={<ProjectTeamList />} />
                <Route path="newteam" element={<NewTeam />} />
              </Route>
            </Route>

            {/* 팀 관련 페이지 라우팅 */}
            <Route path="teams">
              <Route path=":teamId">
                <Route index element={<TeamDetail />} />
                <Route path="apply" element={<TeamApplyForm />} />
                <Route path="newnotice" element={<NewNoticeForm />} />
                <Route path="edit" element={<TeamEditForm />} />
              </Route>
            </Route>

            {/* 프로필 관련 페이지 라우팅 */}
            <Route path="profile">
              <Route path=":uid" element={<MyPage />} />
            </Route>
          </Route>

          {/* 인증관련 페이지 라우팅 */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* 관리자 페이지 라우팅 */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="newproject" element={<NewProjectForm />} />
          </Route>

          {/* 잘못된 주소 접근 시 라우팅 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
