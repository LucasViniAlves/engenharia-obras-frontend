import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import { getUsuario } from "../../services/AuthService";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../types/Usuario";

export default function HomePage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuario();
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUsuario();
  }, []);

  const handleCriarProjeto = () => {
    navigate("/obras");
  };

  const handleContinuarProjeto = () => {
    navigate("/obras/lista");
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="content container mt-5">

        <h2 className="display-6 mb-3 text-primary">
          Bem-vindo{usuario ? `, ${usuario.nome}` : ""}!
        </h2>
        {usuario && (
          <p className="lead text-secondary">Email: {usuario.email}</p>
        )}

        <hr />

        <div className="alert alert-warning mt-4" role="alert">
          <p className="mb-2">
            Esta é a página inicial do sistema de gerenciamento de obras.
            Aqui você pode acessar as funcionalidades relacionadas às obras.
          </p>
          <p className="mb-2">
            Use o menu lateral para navegar entre as diferentes seções do sistema.
          </p>
          <p className="mb-2">
            Se precisar de ajuda, consulte a documentação ou entre em contato com o suporte.
          </p>
          <p className="mb-0">
            Obrigado por usar nosso sistema!
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="d-flex flex-column flex-md-row gap-3">
            <button
              className="btn btn-success btn-lg"
              onClick={handleCriarProjeto}
            >
              Criar Novo Projeto
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={handleContinuarProjeto}
            >
              Continuar Projeto
            </button>
          </div>
        </div>

      </main>
      <Toaster position="top-right" />
    </div>
  );
}
