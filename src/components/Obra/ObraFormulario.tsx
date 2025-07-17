import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { criarObra, atualizarObra } from "../../services/ObraService";
import { Obra } from "../../types/Obra";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ObraFormulario({
  obraSelecionada,
  aoSalvar,
}: {
  obraSelecionada: Obra | null;
  aoSalvar: () => void;
}) {
  const [obra, setObra] = useState<Obra>({
    id: 0,
    nome: "",
    responsavel: "",
    dataInicio: new Date().toISOString().split("T")[0],
    dataFim: "",
    custoEstimado: 0,
    NomeCliente: "",
    IdentidadeCliente: "",
    emailCliente: "",
    local: "",
    areaTotal: 0,
    tipoObra: "",
    faseAtual: "",
    observacoes: "",
  });

  const formatarCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (obraSelecionada) {
      setObra({
        ...obraSelecionada,
        dataInicio: obraSelecionada.dataInicio?.split("T")[0] || "",
        dataFim: obraSelecionada.dataFim?.split("T")[0] || "",
      });
    }
  }, [obraSelecionada]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue =
      name === "custoEstimado" || name === "areaTotal" ? parseFloat(value) : value;

    setObra((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (obra.id) {
        await atualizarObra(obra.id, obra);
        toast.success("Obra atualizada com sucesso!");
      } else {
        await criarObra(obra);
        toast.success("Obra criada com sucesso!");
      }
      aoSalvar();
      navigate("/HomePage");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar a obra.");
    }
  };

  const handleCancel = () => navigate("/HomePage");

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary fw-semibold">
        {obra.id ? "Atualizar Obra" : "Cadastrar Nova Obra"}
      </h3>

      {/* Dados Básicos */}
      <div className="mb-3">
        <label className="form-label">Nome da Obra:</label>
        <input type="text" name="nome" className="form-control" value={obra.nome} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Responsável:</label>
        <input type="text" name="responsavel" className="form-control" value={obra.responsavel} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de Início:</label>
        <input type="date" name="dataInicio" className="form-control" value={obra.dataInicio} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de Fim:</label>
        <input type="date" name="dataFim" className="form-control" value={obra.dataFim} onChange={handleChange} />
      </div>

      <div className="mb-4">
        <label className="form-label">Custo Estimado (R$):</label>
        <input type="number" name="custoEstimado" step="0.01" className="form-control" value={obra.custoEstimado} onChange={handleChange} required />
      </div>

      {/* Cliente */}
      <h3 className="mb-4 text-primary fw-semibold">Dados do Cliente</h3>

      <div className="mb-3">
        <label className="form-label">Nome do Cliente:</label>
        <input type="text" name="NomeCliente" className="form-control" value={obra.NomeCliente} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">CPF/CNPJ:</label>
        <InputMask
          mask={(obra.IdentidadeCliente ?? "").length > 14 ? "99.999.999/9999-99" : "999.999.999-99"}
          maskChar=""
          name="IdentidadeCliente"
          value={obra.IdentidadeCliente}
          onChange={handleChange}
        >
          {(inputProps) => <input {...inputProps} type="text" className="form-control" required />}
        </InputMask>
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input type="email" name="emailCliente" className="form-control" value={obra.emailCliente} onChange={handleChange} required />
      </div>

      {/* Obra */}
      <h3 className="mb-4 text-primary fw-semibold">Dados da Obra</h3>

      <div className="mb-3">
        <label className="form-label">Local:</label>
        <input type="text" name="local" className="form-control" value={obra.local} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Área Total (m²):</label>
        <input
          type="number"
          name="areaTotal"
          step="0.01"
          className="form-control"
          value={obra.areaTotal}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Obra:</label>
        <select
          name="tipoObra"
          className="form-select"
          value={obra.tipoObra || ""}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o tipo de obra</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="industrial">Industrial</option>
          <option value="publica">Pública</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Fase Atual:</label>
        <select
          name="faseAtual"
          className="form-select"
          value={obra.faseAtual || ""}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a fase</option>
          <option value="planejamento">Planejamento</option>
          <option value="execucao">Execução</option>
          <option value="finalizacao">Finalização</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Observações:</label>
        <textarea
          name="observacoes"
          className="form-control"
          value={obra.observacoes || ""}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-end gap-3 mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {obra.id ? "Atualizar" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}


