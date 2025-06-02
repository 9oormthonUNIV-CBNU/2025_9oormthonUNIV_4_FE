// src/components/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router"; 
// 만약 react-router-dom을 쓰고 있다면: 
// import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // 토큰이 없으면 /login으로 보낸다. state.from에 원래 접근하려던 location 저장
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 토큰이 있으면 자식 컴포넌트를 렌더
  return children;
};

export default RequireAuth;
