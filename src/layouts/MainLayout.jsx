import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bg from "../../public/assets/pexels-suzyhazelwood-1629236.jpg";
function MainLayout() {
  return (
    <div
      className="h-full "
      style={{
        backgroundImage: `${bg}`,
        backgroundSize: "cover", // Arka planın tam kapsaması için
        backgroundPosition: "center", // Ortalanmış pozisyon
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
