import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import Navbar from "../Navbar";
import Footer from "../Footer";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const AuthLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default AuthLayout;
