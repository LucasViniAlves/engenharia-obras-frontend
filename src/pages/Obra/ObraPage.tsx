import { useState } from "react";
import ObraFormulario from "../../components/Obra/ObraFormulario";
import ObraLista from "../../components/Obra/ObraLista";
import { deletarObra } from "../../services/ObraService";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import { Obra } from "../../types/Obra";

export default function ObraPage() {
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);
  const [atualizarTrigger, setAtualizarTrigger] = useState(false);

  const handleSalvar = () => {
    setAtualizarTrigger(!atualizarTrigger);
    setObraSelecionada(null);
  };

  const handleEditar = (obra: Obra) => {
    setObraSelecionada(obra);
  };

  const handleDeletar = async (id: number) => {
    await deletarObra(id);
    setAtualizarTrigger(!atualizarTrigger);
  };

  return (
    <LayoutPadrao>
      
      <ObraFormulario 
      obraSelecionada={obraSelecionada} 
      aoSalvar={handleSalvar} 
      />

      <ObraLista
        onEditar={handleEditar}
        onDeletar={handleDeletar}
        atualizarTrigger={atualizarTrigger}
      />
      
    </LayoutPadrao>
  );
}
