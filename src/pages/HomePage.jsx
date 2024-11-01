import { useEffect, useState } from "react";
import ToDoListItems from "./ToDoListItems";
import todopng from "../../public/assets/todo.png";
import completedpng from "../../public/assets/completed.png";
import failedpng from "../../public/assets/failed.png";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import AddTask from "./AddTask";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function HomePage() {
  const [myToDoList, setMyToDoList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todoList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyToDoList(todoList);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500 w-96 text-center font-satisfy p-4">
        <img src={todopng} alt="to-do-icons" className="w-36" /> TO-DO APP
      </h1>
      <div className="flex flex-col justify-around gap-10">
        <AddTask myToDoList={myToDoList} setMyToDoList={setMyToDoList} />
        <div className="flex flex-col h-screen items-center gap-10 ">
          <div className="flex gap-4">
            <button onClick={() => navigate("/tamamlananlar")}>
              <img
                src={completedpng}
                className="w-12 hover:w-14"
                alt="completed"
              />
            </button>
            <button onClick={() => navigate("/failed")}>
              <img src={failedpng} className="w-12 hover:w-14" alt="failed" />
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
