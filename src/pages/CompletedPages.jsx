import axios from "axios";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

function CompletedPages() {
  const [completed, setCompleted] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchComplete = async () => {
      const response = await axios.get("http://localhost:3000/completed");
      setCompleted(response.data);
    };
    fetchComplete();
  }, [setCompleted]);

  return (
    <div className="flex flex-col items-center ">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-96 text-center font-satisfy p-4 gap-2">
        <img
          src="../../public/completed.png"
          alt="to-do-icons"
          className="w-36"
        />{" "}
        TO-DO APP
      </h1>
      <button onClick={() => navigate("/")} className="p-3">
        <img src="../../public/add.png" className="w-12 hover:w-14" alt="" />
      </button>
      <div className="flex flex-col  text-black text-lg rounded-2xl gap-4 w-96 break-all py-4 md:w-144">
        {completed.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between font-barlow items-center border-b-2 p-2 mt-2
            ${
              item.category === "Bugün"
                ? "bg-red-400 "
                : item.category === "Bu Hafta"
                ? "bg-orange-300"
                : item.category === "Bu Ay"
                ? "bg-yellow-200"
                : "bg-green-400"
            }`}
          >
            <div className="flex flex-col flex-1 gap-4">
              <img
                src="../../public/pin.png"
                className="w-12 bg-white rounded-full"
                alt="pin"
              />
              <div>
                <div className="flex justify-between gap-4 border-b-4  font-semibold">
                  <span>Eklenme Zamanı : {item.addedTime}</span>
                  <span
                    className={`${
                      item.category === "Bugün" ? "text-white" : "text-red-600"
                    }`}
                  >
                    <Countdown date={0} />
                  </span>
                </div>
                <div className="flex">
                  <p className="max-w-xl break-words whitespace-normal p-2">
                    {item.text}
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

export default CompletedPages;
