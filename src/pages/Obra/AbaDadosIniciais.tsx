import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { Button, Form, Modal } from "react-bootstrap";
import { Obra } from "../../types/Obra";
import { getObraPorId } from "../../services/ObraService";

interface AbaDadosIniciaisProps {
  idObra: number;
  onSalvar: (obra: Obra) => void;
  onCancelar: () => void;
}

const AbaDadosIniciais: React.FC<AbaDadosIniciaisProps> = ({
  idObra,
  onSalvar,
  onCancelar,
}) => {
  const [obra, setObra] = useState<Obra>({
    id: 0,
    nome: "",
    responsavel: "",
    dataInicio: "",
    dataFim: "",
    custoEstimado: 0,
    NomeCliente: "",
    IdentidadeCliente: "",
    emailCliente: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idObra > 0) {
          const response = await getObraPorId(idObra);
          setObra(response);
          console.log("Dados da obra carregados:", response.data);
        }
      } catch (error) {
        toast.error("Erro ao carregar dados da obra.");
      }
    };

    fetchData();
  }, [idObra]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSalvar(obra);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setObra((prev) => ({
      ...prev,
      [name]: name === "custoEstimado" ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Dados da Obra</h4>
      <Form className="p-3" onSubmit={handleSubmit}>
        <h3 className="mb-4 text-primary" style={{ fontWeight: 600 }}>
          {idObra ? "Atualizar Obra" : "Cadastrar Nova Obra"}
        </h3>

        <Form.Group>
          <Form.Label>Nome da Obra</Form.Label>
          <Form.Control
            name="nome"
            type="text"
            value={obra.nome}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profissional Responsável</Form.Label>
          <Form.Control
            name="responsavel"
            type="text"
            value={obra.responsavel}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de Início</Form.Label>
          <Form.Control
            name="dataInicio"
            type="date"
            value={obra.dataInicio?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de Fim</Form.Label>
          <Form.Control
            name="dataFim"
            type="date"
            value={obra.dataFim?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Custo Estimado</Form.Label>
          <Form.Control
            name="custoEstimado"
            type="number"
            step="0.01"
            value={obra.custoEstimado}
            onChange={handleChange}
          />
        </Form.Group>
        <hr />
        <h4 className="text-primary mb-3">Dados do Cliente</h4>

        <Form.Group className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            name="NomeCliente"
            type="text"
            value={obra.NomeCliente}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>CPF/CNPJ</Form.Label>
          <Form.Control
            name="IdentidadeCliente"
            type="text"
            value={obra.IdentidadeCliente}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="emailCliente"
            type="email"
            value={obra.emailCliente}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-3">
          <Button variant="outline-secondary" onClick={onCancelar} type="button">
            Cancelar
          </Button>
          <Button variant="success" type="submit">
            {idObra ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </Form>

      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Associar Custo Adicional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default AbaDadosIniciais;
