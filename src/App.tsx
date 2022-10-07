import { Routes, Route } from "react-router-dom";

import Login from "./views/Login";
import MainLayout from "./containers/MainLayout";
import Recruitments from "./views/Recruitments";
import Recruitment from "./views/Recruitment";

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/p" element={<MainLayout />}>
          <Route path="/p/recruitments" element={<Recruitments />} />
          <Route path="/p/recruitment/:id" element={<Recruitment />} />
        </Route>
        <Route path="*" element={<p>Page not found!</p>} />
      </Route>
    </Routes>
  );
}

export default App;
