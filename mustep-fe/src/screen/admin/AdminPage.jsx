import React from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router";

const AdminContainer = styled.div``;

const NewProjectBtn = styled.button``;

const AdminPage = () => {
  return (
    <AdminContainer>
      관리자 페이지
      <Link to="/admin/newproject">
        <NewProjectBtn> 신규 프로젝트 생성</NewProjectBtn>
      </Link>
    </AdminContainer>
  );
};

export default AdminPage;
