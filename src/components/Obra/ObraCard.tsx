import "./ObraCard.css";
import { Obra } from "../../types/Obra";

export default function ObraCard({
  obra,
  onEditar,
  onDeletar,
  onExpandir,
}: {
  obra: Obra;
  onEditar?: () => void;
  onDeletar?: () => void;
  onExpandir?: () => void;
}) {
  return (
    <div className="obra-card">
      <div>
        <h5 className="mb-3 text-primary">{obra.nome}</h5>
        <p className="text-muted mb-1"><strong>Responsável:</strong> {obra.responsavel}</p>
        <p className="text-muted mb-1"><strong>Início:</strong> {obra.dataInicio?.split("T")[0]}</p>
        <p className="text-muted"><strong>Fim:</strong> {obra.dataFim?.split("T")[0]}</p>
      </div>

      <div className="obra-card-buttons">
        <button onClick={onDeletar} className="btn btn-outline-danger btn-sm">
          Deletar
        </button>
        <button onClick={onExpandir} className="btn btn-outline-success btn-sm">
          Expandir
        </button>
      </div>
    </div>
  );
}
