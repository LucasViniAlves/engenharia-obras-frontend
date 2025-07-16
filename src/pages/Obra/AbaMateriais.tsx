import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { getMateriaisNaoAssociados, getMateriaisDaObra, associarMaterialAObra, removerMaterialDaObra } from "../../services/ObraService";
import { Material } from "../../types/Material";

interface AbaMateriaisProps {
  idObra: number;
}

const AbaMateriais: React.FC<AbaMateriaisProps> = ({ idObra }) => {
  const [materiaisAssociados, setMateriaisAssociados] = useState<Material[]>([]);
  const [materiaisDisponiveis, setMateriaisDisponiveis] = useState<Material[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("1");

  useEffect(() => {
    carregarMateriais();
  }, [idObra]);

  const carregarMateriais = async () => {
    try {
      const associados = await getMateriaisDaObra(idObra);
      setMateriaisAssociados(associados);
    } catch (error) {
      toast.error("Erro ao carregar materiais da obra.");
    }
  };

  const abrirModal = async () => {
    try {
      const disponiveis = await getMateriaisNaoAssociados(idObra);
      setMateriaisDisponiveis(disponiveis);
      setShowModal(true);
    } catch (error) {
      toast.error("Erro ao carregar materiais disponíveis.");
    }
  };

  const handleAssociar = async () => {
    if (!idSelecionado || parseInt(quantidade) <= 0) {
      toast.error("Preencha os campos corretamente.");
      return;
    }

    try {

      const payload = {
        idMaterial: parseInt(idSelecionado),
        quantidade: parseInt(quantidade)
      };

      await associarMaterialAObra(idObra, payload);
      toast.success("Material associado com sucesso!");
      setShowModal(false);
      setIdSelecionado("");
      setQuantidade("1");
      carregarMateriais();
    } catch (error) {
      toast.error("Erro ao associar material.");
    }
  };

  const handleRemover = async (idMaterial: number) => {
    try {
      await removerMaterialDaObra(idObra, idMaterial);
      toast.success("Material removido.");
      carregarMateriais();
    } catch (error) {
      toast.error("Erro ao remover material.");
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Materiais da Obra</h4>
      <hr />
      <Button variant="primary" onClick={abrirModal} className="mb-3">
        Adicionar Material
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço Unitário</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {materiaisAssociados.map((mat) => (
            <tr key={mat.id}>
              <td>{mat.nome}</td>
              <td>R$ {mat.precoUnitario.toFixed(2)}</td>
              <td>{mat.quantidade}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemover(mat.id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Material</Form.Label>
            <Form.Select
              value={idSelecionado}
              onChange={(e) => setIdSelecionado(e.target.value)}
            >
              <option value="">Selecione</option>
              {materiaisDisponiveis.map((mat) => (
                <option key={mat.id} value={mat.id}>
                  {mat.nome} - R$ {mat.precoUnitario.toFixed(2)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleAssociar}>
            Associar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AbaMateriais;
