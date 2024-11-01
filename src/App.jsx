import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import MainLayout from "./layouts/MainLayout";
import CompletedPages from "./pages/CompletedPages";

import Failed from "./pages/Failed";
import useLocalStorage from "./hooks/useLocaleStorage";

function App() {
  const [failed, setFailed] = useLocalStorage("failed", []);
  const [myToDoList, setMyToDoList] = useLocalStorage("myTodo", []);
  const [completed, setCompleted] = useLocalStorage("completed", []);
  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <HomePage
                myToDoList={myToDoList}
                setMyToDoList={setMyToDoList}
                completed={completed}
                setCompleted={setCompleted}
                failed={failed}
                setFailed={setFailed}
              />
            }
          />
          <Route
            path="/tamamlananlar"
            element={
              <CompletedPages
                completed={completed}
                setCompleted={setCompleted}
              />
            }
          />
          <Route
            path="/failed"
            element={<Failed failed={failed} setFailed={setFailed} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
