import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Outras rotas como /dashboard virão depois */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
