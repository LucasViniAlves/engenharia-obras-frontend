import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/Login";
import HomePage from "./pages/PaginaInicial/HomePage";
import ObraPage from "./pages/Obra/ObraPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ObraLista from "./pages/Obra/ObraLista";
import ObraCorpo from "./pages/Obra/ObraCorpo";
import { MaterialCorpo } from "./pages/Material/MaterialCorpo";
import { UsuarioPage } from "./pages/Usuario/UsuarioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/obras" element={<ObraPage />} />
        <Route path="/obras/lista" element={<ObraLista />} />
        <Route path="/obras/:id" element={<ObraCorpo />} />
        <Route path="/materiais" element={<MaterialCorpo />} />
        <Route path="/usuarios" element={<UsuarioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
