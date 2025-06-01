import { Outlet, useLocation, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalStyle from "../styles/GlobalStyles";
import { useEffect } from "react";

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1) 현재 URL의 쿼리스트링을 파싱
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      // 2) localStorage에 JWT 저장
      localStorage.setItem("token", token);
      console.log("✅ 토큰이 localStorage에 저장되었습니다:", token);

      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  )
}

export default Root;