import { Home, User, Package, Building2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div>
        <h1 className="sidebar-title"></h1>
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/HomePage")}>
            <Home size={20} /> Início
          </button>
          <button onClick={() => navigate("/usuarios")}>
            <User size={20} /> Usuário
          </button>
          <button onClick={() => navigate("/materiais")}>
            <Package size={20} /> Material
          </button>
          <button onClick={() => navigate("/obras/lista")}>
            <Building2 size={20} /> Obra
          </button>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout}>
          <LogOut size={20} /> Sair
        </button>
      </div>
    </div>
  );
}
