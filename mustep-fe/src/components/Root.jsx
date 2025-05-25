import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

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