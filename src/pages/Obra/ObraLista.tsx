import { useEffect, useState } from "react";
import { Obra } from "../../types/Obra";
import { useNavigate } from "react-router-dom";
import { getTodasObras } from "../../services/ObraService";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import ObraCard from "../../components/Obra/ObraCard";

export default function ObraPage() {
  const [obraDados, setObraDados] = useState<Obra[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const data = await getTodasObras();
        setObraDados(data);
      } catch (error) {
        console.error("Erro ao buscar obra:", error);
      }
    };

    fetchObra();
  }, []);

  const handleEditar = (obra: Obra) => {
    console.log("Editar", obra);
  };

  const handleDeletar = (id: number) => {
    console.log("Deletar", id);
  };

  const handleExpandir = (id: number) => {
    navigate(`/obras/${id}`);
  };

  return (
    <LayoutPadrao>
      <div className="obra-page container mt-4">
        <h1 className="mb-4">Selecione a obra</h1>
        <div className="row g-4">
          {obraDados.map((obra) => (
            <div key={obra.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ObraCard
                obra={obra}
                onEditar={() => handleEditar(obra)}
                onDeletar={() => handleDeletar(obra.id)}
                onExpandir={() => handleExpandir(obra.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </LayoutPadrao>
  );
}
