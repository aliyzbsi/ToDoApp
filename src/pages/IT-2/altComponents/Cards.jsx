import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const Cards = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState(false); // Hover durumunu takip eder
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup'un açılma durumunu takip eder

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPopupOpen(false); // Kart dışına çıkınca popup'ı kapat
  };

  const handleIconClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64 transition-all">
      <header className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{title}</h3>
        <div className="text-gray-400 cursor-pointer">•••</div>
      </header>

      <div
        className="mb-4 flex justify-between p-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {typeof content === "string" ? (
          <p>{content}</p>
        ) : (
          <img src={content} alt="Kart İçeriği" className="rounded-md w-full" />
        )}

        {isHovered && (
          <div className="absolute  cursor-pointer" onClick={handleIconClick}>
            <FaPencilAlt className="text-gray-400 hover:text-white transition-all" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-white">
        <button className="text-sm hover:bg-gray-400 p-2 rounded-lg">
          + Kart ekle
        </button>
      </div>

      {isPopupOpen && (
        <div className="absolute top-12 right-4 bg-white text-black p-3 rounded-lg shadow-lg w-48">
          <p className="font-bold">Kartı Düzenle</p>
          <ul className="mt-2 space-y-2">
            <li className="hover:bg-gray-100 p-2 rounded">Adını Değiştir</li>
            <li className="hover:bg-gray-100 p-2 rounded">Etiket Ekle</li>
            <li className="hover:bg-gray-100 p-2 rounded">Arşivle</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cards;
