import completedpng from "../../public/assets/completed.png";
import donepng from "../../public/assets/done.png";
import deletepng from "../../public/assets/delete.png";
import addpng from "../../public/assets/add.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompletedPages({ completed, setCompleted }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const remove = async (id) => {
    try {
      setCompleted(completed.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Öğeyi silerken hata oluştu:", error);
    }
  };

  const filteredList = completed.filter((item) => {
    const matchesSearch =
      (item.title &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-full max-w-md text-center font-satisfy p-4 gap-2">
        <img src={completedpng} alt="to-do-icons" className="w-12 md:w-36" />{" "}
        {/* Küçük ekranlarda simge boyutu azaltıldı */}
        TO-DO APP
      </h1>
      <button onClick={() => navigate("/")} className="p-3">
        <img src={addpng} className="w-10 md:w-12 hover:w-14" alt="" />{" "}
        {/* Buton boyutu küçültüldü */}
      </button>
      <div className="flex w-full max-w-md">
        {" "}
        {/* Arama çubuğu için genişlik ayarı eklendi */}
        <input
          type="text"
          className="border-2 flex-1 p-2"
          placeholder="Arama .."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-black text-lg rounded-2xl gap-4 w-full max-w-md break-all py-4 md:w-144">
        {" "}
        {/* Genişlik ayarları düzenlendi */}
        {filteredList.length > 0 &&
          filteredList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border-2 p-4 mt-2 border-black rounded-lg" // Yuvarlatılmış köşeler eklendi
            >
              <div className="flex flex-col flex-1 gap-4">
                <img
                  src={donepng}
                  className="w-12 bg-white rounded-full mx-auto" // Ortalanmış simge
                  alt="pin"
                />
                <div className="flex flex-col justify-between gap-4">
                  <div className="flex justify-between gap-2 p-2">
                    {" "}
                    {/* Aralık küçültüldü */}
                    <span className="border-2 text-center flex-1 p-1">
                      {" "}
                      {/* Padding eklendi */}
                      Eklenme Zamanı: <br /> {item.addedTime}
                    </span>
                    <span className="border-2 text-center flex-1 p-1">
                      {" "}
                      {/* Padding eklendi */}
                      Tamamlanma Tarihi: <br /> {item.completedTime}
                    </span>
                  </div>
                  <div className="border-1 border-black">
                    <p className="max-w-xl uppercase font-semibold break-words whitespace-normal border-b-2 border-black p-2">
                      {" "}
                      {/* Padding azaltıldı */}
                      {item.title}
                    </p>
                    <p className="text-base font-normal p-2">
                      {" "}
                      {/* Padding azaltıldı */}
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button onClick={() => remove(item.id)}>
                    <img
                      src={deletepng}
                      className="w-10 hover:w-12" // Boyut küçültüldü
                      alt="delete"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CompletedPages;
