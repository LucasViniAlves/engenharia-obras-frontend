import { useState } from "react";
import ObraFormulario from "../../components/Obra/ObraFormulario";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import { Obra } from "../../types/Obra";

export default function ObraPage() {
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);
  const [atualizarTrigger, setAtualizarTrigger] = useState(false);

  const handleSalvar = () => {
    setAtualizarTrigger(!atualizarTrigger);
    setObraSelecionada(null);
  };

  return (
    <LayoutPadrao>
      
      <ObraFormulario 
      obraSelecionada={obraSelecionada} 
      aoSalvar={handleSalvar} 
      />
      
    </LayoutPadrao>
  );
}
