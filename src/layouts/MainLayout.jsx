import { Outlet } from "react-router-dom";
import Header from "../components/Header";

import bg from "../../public/assets/pexels-suzyhazelwood-1629236.jpg";
function MainLayout() {
  return (
    <div
      className="h-full "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
