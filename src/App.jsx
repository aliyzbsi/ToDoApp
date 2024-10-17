import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import MainLayout from "./layouts/MainLayout";
import CompletedPages from "./pages/CompletedPages";
import Main from "./pages/IT-2/Main";
import Failed from "./pages/Failed";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tamamlananlar" element={<CompletedPages />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/trello" element={<Main />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
