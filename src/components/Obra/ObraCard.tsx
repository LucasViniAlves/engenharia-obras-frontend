import "./ObraCard.css";
import { Obra } from "../../types/Obra";


export default function ObraCard({
  obra,
  onEditar,
  onDeletar,
  onExpandir,
}: {
  obra: Obra;
  onEditar: () => void;
  onDeletar: () => void;
  onExpandir: () => void;
})
 {
  return (
    <div className="obra-card">
      <h3>{obra.nome}</h3>
      <div className="obra-card-buttons">
        <button onClick={onEditar} className="btn-editar">
          Editar
        </button>
        <button onClick={onDeletar} className="btn-deletar">
          Deletar
        </button>
        <button onClick={onExpandir} className="btn-expandir">
          Expandir
        </button>
      </div>
    </div>
  );
}
