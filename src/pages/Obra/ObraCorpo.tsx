import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Obra } from "../../types/Obra";
import { getObraPorId } from "../../services/ObraService";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import "bootstrap/dist/css/bootstrap.min.css";
import AbaMateriais from "./AbaMateriais";
import AbaMaoDeObra from "./AbaMaoDeObra";
import AbaCustosAdicionais from "./AbaCustosAdicionais";
import AbaBDI from "./AbaBDI";
import AbaCustoTotal from "./AbaCustoTotal";
import AbaDadosIniciais from "./AbaDadosIniciais";
import "./ObraPage.css"; // Importando o CSS para aplicar o estilo

export default function ObraCorpo() {
  const { id } = useParams();
  const [obra, setObra] = useState<Obra | null>(null);
  const [abaAtiva, setAbaAtiva] = useState("dados");
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchObra = async () => {
      try {
        if (id) {
          const data = await getObraPorId(Number(id));
          setObra(data);
        }
      } catch (error) {
        console.error("Erro ao buscar obra:", error);
      }
    };

    fetchObra();
  }, [id]);

  const HandleCancelar = () => {
    Navigate("/obras/lista");
  };

  return (
    <LayoutPadrao>
      <div className="container mt-4" style={{ minHeight: '100vh' }}>
        <h2 className="mb-4 text-primary">
          {obra?.nome ?? "Carregando..."}
        </h2>

        {/* Abas */}
        <ul className="nav nav-pills mb-4 bg-dark p-2 rounded-3 justify-content-center gap-2">
          {[
            { key: "dados", label: "Dados Iniciais" },
            { key: "materiais", label: "Materiais" },
            { key: "maoDeObra", label: "Mão de Obra" },
            { key: "custos", label: "Custos Adicionais" },
            { key: "BDI", label: "BDI" },
            { key: "custoTotal", label: "Custo Total" },
          ].map((aba) => (
            <li className="nav-item" key={aba.key}>
              <button
                className={`nav-link rounded-pill px-4 fw-semibold ${abaAtiva === aba.key ? "active bg-success text-white" : "text-light"
                  }`}
                onClick={() => setAbaAtiva(aba.key)}
                style={{ transition: "all 0.3s ease" }}
              >
                {aba.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Conteúdo da aba */}
        <div className="conteudo-abas">
          {abaAtiva === "dados" && (
            <AbaDadosIniciais
              idObra={obra?.id || 0}
              onSalvar={(obra) => {
                setObra(obra);
                HandleCancelar();
              }}
              onCancelar={HandleCancelar}
            />
          )}
          {abaAtiva === "materiais" && <AbaMateriais idObra={obra?.id || 0} />}
          {abaAtiva === "maoDeObra" && <AbaMaoDeObra idObra={obra?.id || 0} />}
          {abaAtiva === "custos" && <AbaCustosAdicionais idObra={obra?.id || 0} />}
          {abaAtiva === "BDI" && <AbaBDI idObra={obra?.id || 0} />}
          {abaAtiva === "custoTotal" && <AbaCustoTotal idObra={obra?.id || 0} />}
        </div>
      </div>
    </LayoutPadrao>
  );
}
