import { useState, useEffect } from "react";
import { criarObra, atualizarObra } from "../../services/ObraService";
import { Obra } from "../../types/Obra";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ObraFormulario({
  obraSelecionada,
  aoSalvar,
}: {
  obraSelecionada: Obra | null;
  aoSalvar: () => void;
}) {
  const [obra, setObra] = useState<Obra>({
    nome: "",
    responsavel: "",
    dataInicio: new Date().toISOString().split("T")[0],
    dataFim: "",
    custoEstimado: 0,
  });

  useEffect(() => {
    if (obraSelecionada) {
      setObra({
        ...obraSelecionada,
        dataInicio: obraSelecionada.dataInicio?.split("T")[0] || "",
        dataFim: obraSelecionada.dataFim?.split("T")[0] || "",
      });
    }
  }, [obraSelecionada]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setObra({
      ...obra,
      [name]: name === "custoEstimado" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (obra.id) {
      await atualizarObra(obra.id, obra);
    } else {
      await criarObra(obra);
    }

    aoSalvar();
    resetForm();
  };

  const resetForm = () => {
    setObra({
      nome: "",
      responsavel: "",
      dataInicio: new Date().toISOString().split("T")[0],
      dataFim: "",
      custoEstimado: 0,
    });
  };

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <h3 className="mb-4 text-primary" style={{ fontWeight: 600, color: "#black" }}>
        {obra.id ? "Atualizar Obra" : "Cadastrar Nova Obra"}
      </h3>

      <div className="mb-3">
        <label className="form-label">Nome da Obra:</label>
        <input
          type="text"
          name="nome"
          className="form-control"
          value={obra.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Profissional Responsável:</label>
        <input
          type="text"
          name="responsavel"
          className="form-control"
          value={obra.responsavel}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de Início:</label>
        <input
          type="date"
          name="dataInicio"
          className="form-control"
          value={obra.dataInicio}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Data de Fim:</label>
        <input
          type="date"
          name="dataFim"
          className="form-control"
          value={obra.dataFim}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Custo Estimado:</label>
        <input
          type="number"
          name="custoEstimado"
          className="form-control"
          value={obra.custoEstimado}
          onChange={handleChange}
          step="0.01"
          required
        />
      </div>

      <h3 className="mb-4 text-primary" style={{ fontWeight: 600, color: "#black" }}>
        Dados do Cliente
      </h3>

      <div className="mb-4">
        <label className="form-label">Nome Completo:</label>
        <input
          type="text"
          name="NomeCliente"
          className="form-control"
          value={obra.NomeCliente || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">CPF/CPNJ:</label>
        <input
          type="Number"
          name="IdentidadeCliente"
          className="form-control"
          value={obra.IdentidadeCliente || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Email:</label>
        <input
          type="text"
          name="emailCliente"
          className="form-control"
          value={obra.emailCliente || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex gap-3">
        <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {obra.id ? "Atualizar" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}
