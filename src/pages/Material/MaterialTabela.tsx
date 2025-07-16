// MaterialTabela.tsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Material {
  id: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
}

export const MaterialTabela = ({
  materiais,
  onDeletar,
  onAtualizar,
}: {
  materiais: Material[];
  onDeletar: (id: number) => void;
  onAtualizar: (material: Material) => void;
}) => {
  const [materialSelecionado, setMaterialSelecionado] = useState<Material | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditar = (material: Material) => {
    setMaterialSelecionado(material);
    setModoEdicao(true);
  };

  const confirmarEdicao = () => {
    if (materialSelecionado) {
      onAtualizar(materialSelecionado);
      setModoEdicao(false);
    }
  };

  const confirmarExclusao = () => {
    if (materialSelecionado) {
      onDeletar(materialSelecionado.id);
      setShowConfirm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!materialSelecionado) return;
    setMaterialSelecionado({
      ...materialSelecionado,
      [e.target.name]: e.target.name === "preco" ? parseFloat(e.target.value) : e.target.value,
    });
  };

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {materiais.map((material) => (
            <tr key={material.id}>
              <td>{material.nome}</td>
              <td>R$ {material.precoUnitario.toFixed(2)}</td>
              <td>{material.quantidade}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(material)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => {
                  setMaterialSelecionado(material);
                  setShowConfirm(true);
                }}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edição */}
      <Modal show={modoEdicao} onHide={() => setModoEdicao(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {materialSelecionado && (
            <>
              <input
                className="form-control mb-2"
                name="nome"
                value={materialSelecionado.nome}
                onChange={handleChange}
              />
              <input
                className="form-control"
                name="preco"
                type="number"
                value={materialSelecionado.precoUnitario}
                onChange={handleChange}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModoEdicao(false)}>Cancelar</Button>
          <Button variant="success" onClick={confirmarEdicao}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir <strong>{materialSelecionado?.nome}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmarExclusao}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
