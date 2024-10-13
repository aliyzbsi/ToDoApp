import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import MainLayout from "./layouts/MainLayout";
import CompletedPages from "./pages/CompletedPages";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tamamlananlar" element={<CompletedPages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
