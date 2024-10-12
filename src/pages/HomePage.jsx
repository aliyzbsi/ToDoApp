import { useEffect, useState } from "react";
import ToDoListItems from "./ToDoListItems";

function HomePage() {
  const myList = useRef();

  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const toDoEkle = () => {
    if (!input) {
      return;
    }
    const request = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    };

    setList((prev) => [...prev, request]);

    setInput("");
    console.table(list);
  };
  useEffect(() => {
    console.log(list);
  }, []);
  return (
    <div>
      <div className="flex flex-col h-screen items-center gap-10 p-4">
        <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-96 text-center font-satisfy p-4">
          <img src="../../public/todo.png" alt="to-do-icons" className="w-36" />{" "}
          TO-DO APP
        </h1>
        <div className="flex gap-4 items-center">
          <input
            className="border-b-2 border-black w-96 p-2"
            type="text"
            value={input}
            placeholder="Yapılacaklar Listene Ekleme Yapmak İster misin ?"
            onChange={handleChange}
          />
          <button onClick={toDoEkle}>
            <img src="../../public/add.png" className="w-12" alt="" />
          </button>
        </div>
        <ToDoListItems list={list} />
      </div>
    </div>
  );
}

export default HomePage;
