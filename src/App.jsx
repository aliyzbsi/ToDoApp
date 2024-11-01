import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import MainLayout from "./layouts/MainLayout";
import CompletedPages from "./pages/CompletedPages";

import Failed from "./pages/Failed";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tamamlananlar" element={<CompletedPages />} />
          <Route path="/failed" element={<Failed />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
