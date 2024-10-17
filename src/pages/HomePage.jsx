import { useEffect, useState } from "react";
import ToDoListItems from "./ToDoListItems";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddTask from "./AddTask";

function HomePage() {
  const [myToDoList, setMyToDoList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:3000/todos");
      setMyToDoList(response.data);
    };

    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-96 text-center font-satisfy p-4">
        <img src="../../public/todo.png" alt="to-do-icons" className="w-36" />{" "}
        TO-DO APP
      </h1>
      <div className="flex flex-col justify-around gap-10">
        <AddTask myToDoList={myToDoList} setMyToDoList={setMyToDoList} />
        <div className="flex flex-col h-screen items-center gap-10 ">
          <div className="flex gap-4">
            <button onClick={() => navigate("/tamamlananlar")}>
              <img
                src="../../public/completed.png"
                className="w-12 hover:w-14"
                alt="completed"
              />
            </button>
            <button onClick={() => navigate("/failed")}>
              <img
                src="../../public/failed.png"
                className="w-12 hover:w-14"
                alt="failed"
              />
            </button>
          </div>
          <ToDoListItems
            myToDoList={myToDoList}
            setMyToDoList={setMyToDoList}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
