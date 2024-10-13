import axios from "axios";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Select from "react-select";
import { options } from "../options";
import { Input } from "reactstrap";

function ToDoListItems({ myToDoList, setMyToDoList }) {
  const [updatedToDo, setUpdatedToDo] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [filter, setFilter] = useState("Tümünü Gör");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        setMyToDoList(response.data);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    };
    fetchData();
  }, [setMyToDoList]);

  const removeClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setMyToDoList(myToDoList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Öğeyi silerken hata oluştu:", error);
    }
  };

  const completed = async (id) => {
    try {
      const toDoComplete = {
        ...myToDoList.find((item) => item.id === id),
        completed: true,
      };
      await axios.post("http://localhost:3000/completed", toDoComplete);
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setMyToDoList(myToDoList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Öğeyi tamamlarken hata oluştu:", error);
    }
  };

  const updateClick = (id, text) => {
    setEditItemId(id);
    setUpdatedToDo(text);
  };

  const saveUpdate = async (id) => {
    try {
      const updatedToDoObj = {
        ...myToDoList.find((item) => item.id === id),
        text: updatedToDo,
      };
      await axios.put(`http://localhost:3000/todos/${id}`, updatedToDoObj);
      setMyToDoList(
        myToDoList.map((item) => (item.id === id ? updatedToDoObj : item))
      );
      setEditItemId(null);
    } catch (error) {
      console.error("Güncelleme işlemi sırasında hata:", error);
    }
  };

  const handleCategoryChange = async (selectedOption, id) => {
    try {
      let endDate;

      if (selectedOption.label === "Bugün") {
        endDate = Date.now() + 86400000;
      } else if (selectedOption.label === "Bu Hafta") {
        endDate = Date.now() + 86400000 * 7;
      } else if (selectedOption.label === "Bu Ay") {
        endDate = Date.now() + 86400000 * 30;
      } else {
        endDate = Date.now() + 86400000 * 365;
      }
      const updatedToDoObj = {
        ...myToDoList.find((item) => item.id === id),
        category: selectedOption.label,
        endDate: endDate,
      };
      await axios.put(`http://localhost:3000/todos/${id}`, updatedToDoObj);
      setMyToDoList(
        myToDoList.map((item) => (item.id === id ? updatedToDoObj : item))
      );
    } catch (error) {
      console.error("Kategori değişikliği sırasında hata oluştu:", error);
    }
  };
  const filteredList = myToDoList.filter((item) => {
    if (filter === "Bugün") return item.category === "Bugün";
    if (filter === "Bu Hafta") return item.category === "Bu Hafta";
    if (filter === "Bu Ay") return item.category === "Bu Ay";
    if (filter === "Bu Yıl") return item.category === "Bu Yıl";
    return true;
  });
  return (
    <div>
      <div className="flex justify-around">
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bugün")}
        >
          Bugün
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bu Hafta")}
        >
          Bu Hafta
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bu Ay")}
        >
          Bu Ay
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Bu Yıl")}
        >
          Bu Yıl
        </button>{" "}
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => setFilter("Tümünü Gör")}
        >
          Tümünü Gör
        </button>
      </div>

      <div className="flex flex-col text-black text-lg rounded-2xl gap-4 w-96 break-all py-4 md:w-144">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between font-barlow items-center  border-b-2 p-8 mt-2
              ${
                item.category === "Bugün"
                  ? "bg-red-600 "
                  : item.category === "Bu Hafta"
                  ? "bg-orange-300"
                  : item.category === "Bu Ay"
                  ? "bg-yellow-200"
                  : "bg-green-400"
              }`}
          >
            <div className="flex flex-col flex-1 gap-4 ">
              <img
                src="../../public/pin.png"
                className="w-12 bg-white rounded-full"
                alt="pin"
              />

              <div>
                {editItemId === item.id ? (
                  <div className="flex flex-col justify-between items-center gap-4 border-b-4 font-semibold md:flex-row">
                    <Input
                      type="textarea"
                      value={updatedToDo}
                      onChange={(e) => setUpdatedToDo(e.target.value)}
                      className="text-input h-28 rounded-full p-4 m-4 w-72 md:w-96 "
                    />
                    <button
                      onClick={() => saveUpdate(item.id)}
                      className="save-button"
                    >
                      <img
                        src="../../public/add.png"
                        className="w-12 m-2"
                        alt=""
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between gap-4 border-b-4 font-semibold">
                    <div className="flex justify-between gap-4 text-white p-2  bg-black font-semibold">
                      <span>Eklenme Zamanı: {item.addedTime}</span>
                      <Countdown date={item.endDate} />
                    </div>

                    <p className="max-w-xl break-words whitespace-normal bg-black text-white border-t-4 p-2">
                      {item.text}
                    </p>
                  </div>
                )}

                {editItemId === item.id && (
                  <Select
                    value={options.find((opt) => opt.label === item.category)}
                    onChange={(option) => handleCategoryChange(option, item.id)}
                    options={options}
                    placeholder="Kategori Seçin"
                    className="w-full "
                  />
                )}

                <div className="flex gap-1 items-center justify-around flex-shrink-0 p-1 bg-white rounded-full m-4">
                  <button onClick={() => completed(item.id)}>
                    <img
                      src="../../public/completed.png"
                      className="w-12 hover:w-14"
                      alt="completed"
                    />
                  </button>
                  <button onClick={() => updateClick(item.id, item.text)}>
                    <img
                      src="../../public/update.png"
                      alt="update"
                      className="w-10 hover:w-12"
                    />
                  </button>
                  <button onClick={() => removeClick(item.id)}>
                    <img
                      src="../../public/delete.png"
                      className="w-12 hover:w-14"
                      alt="delete"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoListItems;
