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
})
 {
return (
  <div className="obra-card d-flex flex-column justify-content-between">
    <div>
      <h4 className="mb-3 text-primary">{obra.nome}</h4>
      <p className="text-muted"><strong>Responsável:</strong> {obra.responsavel}</p>
      <p className="text-muted"><strong>Início:</strong> {obra.dataInicio?.split("T")[0]}</p>
      <p className="text-muted"><strong>Fim:</strong> {obra.dataFim?.split("T")[0]}</p>
    </div>

    <div className="obra-card-buttons mt-auto">
      <button onClick={onDeletar} className="btn btn-outline-danger btn-sm w-100">
        Deletar
      </button>
      <button onClick={onExpandir} className="btn btn-outline-success btn-sm w-100">
        Expandir
      </button>
    </div>
  </div>
);

}
