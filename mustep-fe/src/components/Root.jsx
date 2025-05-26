import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GlobalStyle from "../styles/GlobalStyles";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  )
}

export default Root;