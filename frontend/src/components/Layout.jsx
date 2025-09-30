import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from '../components/Footer'

export default function Layout({children}) {
  return (
    <div className="appLayout">
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
