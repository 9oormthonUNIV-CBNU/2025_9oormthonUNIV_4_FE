// v6 기준 예시. v5라면 import { useLocation, useNavigate } from "react-router-dom" 으로 바꾸세요.
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const AuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // location.search에 쿼리 스트링이 담겨있음
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      console.log("localStorage에 토큰 저장 완료:", token);

      // 쿼리스트링 지우고 깨끗한 URL로 리다이렉트 (예: 로그인 후 홈으로)
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <p>로그인 처리 중… 잠시만 기다려주세요.</p>
    </div>
  );
};

export default AuthRedirectHandler;
