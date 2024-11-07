import failedpng from "../../public/assets/failed.png";
import addpng from "../../public/assets/add.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Failed({ failed }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredList = failed.filter((item) => {
    const matchesSearch =
      (item.title &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-full text-white max-w-md text-center font-satisfy p-4 gap-2">
        <img src={failedpng} alt="to-do-icons" className="w-12 md:w-36" /> TO-DO
        APP
      </h1>
      <button onClick={() => navigate("/")} className="p-3">
        <img
          src={addpng}
          className="w-10 md:w-12 transition-transform transform scale-90 hover:scale-100"
          alt=""
        />{" "}
      </button>
      <div className="flex w-full max-w-md">
        {" "}
        <input
          type="text"
          className="border-2 flex-1 p-2"
          placeholder="Arama .."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-black text-lg rounded-2xl gap-4 w-full max-w-md break-all py-4">
        {" "}
        {filteredList.length > 0 &&
          filteredList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border-4 p-4 mt-2 border-red-600 bg-white rounded-lg"
            >
              <div className="flex flex-col gap-2">
                <img
                  src={failedpng}
                  className="w-12 bg-white rounded-full mx-auto"
                  alt="pin"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between gap-2">
                    {" "}
                    <span className="border-2 text-center flex-1 p-2">
                      {" "}
                      Eklenme Zamanı: <br /> {item.addedTime}
                    </span>
                    <span className="border-2 text-center flex-1 p-2">
                      {" "}
                      <div className="flex flex-col items-center">
                        Tamamlanma Tarihi:{" "}
                        <img src={failedpng} className="w-16 md:w-20" alt="" />{" "}
                      </div>
                    </span>
                  </div>
                  <div className="border-1 border-black">
                    <p className="max-w-xl uppercase font-semibold break-words whitespace-normal border-b-2 border-black p-2">
                      {" "}
                      {item.title}
                    </p>
                    <p className="text-base font-normal p-2">
                      {" "}
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Failed;
