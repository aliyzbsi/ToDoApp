import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Failed() {
  const [failed, setFailed] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFailed = async () => {
      const response = await axios.get("http://localhost:3000/failed");
      setFailed(response.data);
    };
    fetchFailed();
  }, [setFailed]);
  const filteredList = failed.filter((item) => {
    const matchesSearch =
      (item.title &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });
  return (
    <div className="flex flex-col items-center ">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-96 text-center font-satisfy p-4 gap-2">
        <img src="../../public/failed.png" alt="to-do-icons" className="w-36" />{" "}
        TO-DO APP
      </h1>
      <button onClick={() => navigate("/")} className="p-3">
        <img src="../../public/add.png" className="w-12 hover:w-14" alt="" />
      </button>
      <div className="flex">
        <input
          type="text"
          className="border-2 w-80 p-2"
          placeholder="Arama .."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col text-black text-lg rounded-2xl gap-4 w-96 break-all py-4 md:w-144">
        {filteredList.length > 0 &&
          filteredList.map((item) => (
            <div
              key={item.id}
              className="flex justify-between font-barlow items-center border-4 p-8 mt-2 border-red-600"
            >
              <div className="flex flex-col flex-1 gap-4">
                <img
                  src="../../public/failed.png"
                  className="w-12 bg-white rounded-full"
                  alt="pin"
                />
                <div>
                  <div className="flex flex-col justify-between gap-4 ">
                    <div className="flex justify-between  gap-4 p-2">
                      <span className="border-2 text-center flex-1">
                        Eklenme Zamanı: <br /> {item.addedTime}
                      </span>
                      <span className="border-2 text-center flex-1">
                        <div className="flex flex-col items-center">
                          Tamamlanma Tarihi:{" "}
                          <img
                            src="../../public/failed.png"
                            className="w-20"
                            alt=""
                          />
                        </div>
                      </span>
                    </div>
                    <div className="border-1 border-black">
                      <p className="max-w-xl uppercase font-semibold break-words whitespace-normal border-b-2 border-black p-3">
                        {item.title}
                      </p>
                      <p className="text-base font-normal p-4">
                        {item.description}
                      </p>
                    </div>
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
