import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/Login";
import HomePage from "./pages/PaginaInicial/HomePage";
import ObraPage from "./pages/Obra/ObraPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ObraLista from "./pages/Obra/ObraLista";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/obras" element={<ObraPage />} />
        <Route path="/obras/lista" element={<ObraLista />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
