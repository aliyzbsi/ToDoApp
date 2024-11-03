import ToDoListItems from "./ToDoListItems";
import todopng from "../../public/assets/todo.png";
import completedpng from "../../public/assets/completed.png";
import failedpng from "../../public/assets/failed.png";

import { useNavigate } from "react-router-dom";

import AddTask from "./AddTask";

function HomePage({
  myToDoList,
  setMyToDoList,
  completed,
  setCompleted,
  failed,
  setFailed,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="flex items-center text-4xl border-b-4 border-yellow-500  text-center font-satisfy p-4">
        <img src={todopng} alt="to-do-icons" className="w-36" /> TO-DO APP
      </h1>
      <div className="flex flex-col justify-around gap-10 w-full max-w-md">
        {" "}
        <AddTask myToDoList={myToDoList} setMyToDoList={setMyToDoList} />
        <div className="flex flex-col items-center gap-10">
          <div className="flex gap-4">
            <button onClick={() => navigate("/tamamlananlar")}>
              <img
                src={completedpng}
                className="w-12 transition-transform transform scale-90 hover:scale-125"
                alt="completed"
              />
            </button>
            <button onClick={() => navigate("/failed")}>
              <img
                src={failedpng}
                className="w-12 transition-transform transform scale-90 hover:scale-125"
                alt="failed"
              />
            </button>
          </div>
          <div className="flex flex-col w-full">
            {" "}
            <ToDoListItems
              myToDoList={myToDoList}
              setMyToDoList={setMyToDoList}
              completed={completed}
              setCompleted={setCompleted}
              failed={failed}
              setFailed={setFailed}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
