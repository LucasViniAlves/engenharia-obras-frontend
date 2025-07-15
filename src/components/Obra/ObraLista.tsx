import { useEffect, useState } from "react";
import { getTodasObras } from "../../services/ObraService";
import ObraCard from "./ObraCard";
import { Obra } from "../../types/Obra";

export default function ObraLista({
  onEditar,
  onDeletar,
  atualizarTrigger,
}: {
  onEditar: (obra: Obra) => void;
  onDeletar: (id: number) => void;
  atualizarTrigger: boolean;
}) {
  const [obras, setObras] = useState<Obra[]>([]);

  useEffect(() => {
    const carregarObras = async () => {
      const data = await getTodasObras();
      setObras(data);
    };
    carregarObras();
  }, [atualizarTrigger]);

  return (
    <div className="obra-lista">
      {obras.map((obra) => (
        <ObraCard
          key={obra.id}
          obra={obra}
          onEditar={() => onEditar(obra)}
          onDeletar={() => obra.id !== undefined && onDeletar(obra.id!)}
        />
      ))}
    </div>
  );
}
