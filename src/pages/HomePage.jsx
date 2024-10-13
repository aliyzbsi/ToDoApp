import { useEffect, useState } from "react";
import ToDoListItems from "./ToDoListItems";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { options } from "../options";

function HomePage() {
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
        <div className="flex flex-col gap-4 items-center md:flex-row">
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={options}
            placeholder="Öncelik Sırası"
          />
          <input
            className="border-b-2 border-black w-96 p-2"
            type="text"
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

export default HomePage;
