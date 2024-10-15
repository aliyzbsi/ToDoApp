import { useEffect, useState } from "react";
import ToDoListItems from "./ToDoListItems";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { options } from "../options";
import { Input } from "reactstrap";

function 2() {
  const [myToDoList, setMyToDoList] = useState([]);
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:3000/todos");
      setMyToDoList(response.data);
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!input || !selectedOption) {
      return;
    }

    const countdownDuration =
      selectedOption.value === "today"
        ? 24 * 60 * 60 * 1000
        : selectedOption.value === "weekly"
        ? 7 * 24 * 60 * 60 * 1000
        : selectedOption.value === "monthly"
        ? 30 * 24 * 60 * 60 * 1000
        : 365 * 24 * 60 * 60 * 1000;

    const endDate = Date.now() + countdownDuration;

    const request = {
      id: uuidv4(),
      text: input,
      completed: false,
      addedTime: formatDate(),
      category: selectedOption.label,
      endDate: endDate,
    };

    const response = await axios.post("http://localhost:3000/todos", request);
    setMyToDoList([...myToDoList, response.data]);
    setInput("");
  };

  const now = new Date();
  const formatDate = () => {
    return `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const changeCategory = async (id, newCategory) => {
    try {
      // Yeni category'ye bağlı olarak endDate hesapla
      const countdownDuration =
        newCategory === "Bugün"
          ? 24 * 60 * 60 * 1000
          : newCategory === "Bu Hafta"
          ? 7 * 24 * 60 * 60 * 1000
          : newCategory === "Bu Ay"
          ? 30 * 24 * 60 * 60 * 1000
          : 365 * 24 * 60 * 60 * 1000;

      const endDate = Date.now() + countdownDuration;

      // İlgili to-do item'ı güncelle
      const updatedItem = {
        ...myToDoList.find((item) => item.id === id),
        category: newCategory,
        endDate: endDate,
      };

      // Backend'e güncelleme isteği gönder
      await axios.put(`http://localhost:3000/todos/${id}`, updatedItem);

      // To-do listesini güncelle
      setMyToDoList(
        myToDoList.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (error) {
      console.error("Kategori güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col h-screen items-center gap-10 p-4">
        <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-96 text-center font-satisfy p-4">
          <img src="../../public/todo.png" alt="to-do-icons" className="w-36" />{" "}
          TO-DO APP
        </h1>
        <button onClick={() => navigate("/tamamlananlar")}>
          <img
            src="../../public/completed.png"
            className="w-12 hover:w-14"
            alt=""
          />
        </button>
        <div className="flex flex-col w-96 gap-4 items-center md:flex-row md:w-144">
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
            placeholder="Öncelik Sırası"
          />
          <Input
            className="border-b-2 border-black w-96 p-2"
            type="textarea"
            value={input}
            placeholder="Yapılacaklar Listene Ekleme Yapmak İster misin?"
            onChange={handleChange}
          />
          <button onClick={addTodo}>
            <img src="../../public/add.png" className="w-12" alt="" />
          </button>
        </div>

        <ToDoListItems
          myToDoList={myToDoList}
          setMyToDoList={setMyToDoList}
          selectedOption={selectedOption}
          changeCategory={changeCategory}
        />
      </div>
    </div>
  );
}

export default 2;
import axios from "axios";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

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
    console.log(myToDoList);
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

  /* const updateClick = (id, text) => {
    setEditItemId(id);
    setUpdatedToDo(text);
  };*/

  /*const saveUpdate = async (id) => {
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
  };*/

  /*const handleCategoryChange = async (selectedOption, id) => {
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
  };*/
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
        {filteredList.length > 0 &&
          filteredList.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between font-barlow items-center  border-2 p-8 mt-2
              ${
                item.category === "Bugün"
                  ? "border-red-600 "
                  : item.category === "Bu Hafta"
                  ? "border-orange-300"
                  : item.category === "Bu Ay"
                  ? "border-yellow-200"
                  : "border-green-400"
              }`}
            >
              <div className="flex flex-col flex-1 gap-4 ">
                <img
                  src="../../public/pin.png"
                  className="w-12 bg-white rounded-full"
                  alt="pin"
                />

                <div>
                  <div className="flex flex-col justify-between gap-4 border-b-4 font-semibold">
                    <div className="flex justify-between gap-4 text-white p-2  bg-black font-semibold">
                      <span>Eklenme Zamanı: {item.addedTime}</span>
                      <Countdown date={item.endDate} />
                    </div>

                    <p className="max-w-xl break-words whitespace-normal bg-black text-white border-t-4 p-2">
                      başlık:{item.title} <br />
                      açıklama: {item.description}
                    </p>
                  </div>

                  <div className="flex gap-1 items-center justify-around flex-shrink-0 p-1 bg-white rounded-full m-4">
                    <button onClick={() => completed(item.id)}>
                      <img
                        src="../../public/completed.png"
                        className="w-12 hover:w-14"
                        alt="completed"
                      />
                    </button>
                    <button>
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
