import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CustoAdicional } from "../../types/CustoAdicional";
import { getTodosCustoAdicional, criarCustoAdicional, atualizarCustoAdicional, deletarCustoAdicional } from "../../services/CustoAdicionalService";
import { Button, Form, Modal, Table } from "react-bootstrap";

interface AbaCustosAdicionaisProps {
  idObra: number;
}

const AbaCustosAdicionais: React.FC<AbaCustosAdicionaisProps> = ({ idObra }) => {
  const [custosAdicionais, setCustosAdicionais] = useState<CustoAdicional[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdicao, setShowModalEdicao] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [custoAdicionalEditado, setCustoAdicionalEditado] = useState<CustoAdicional | null>(null);

  useEffect(() => {
    carregarCustosAdicionais();
  }, [idObra]);

  const carregarCustosAdicionais = async () => {
    try {
      const custos = await getTodosCustoAdicional();
      const destaObra = custos.filter((item: CustoAdicional) => item.obraId === idObra);
      setCustosAdicionais(destaObra);
    } catch (error) {
      toast.error("Erro ao carregar custos adicionais da obra.");
    }
  };

  const abrirModal = () => {
    setShowModal(true);
  };

  const handleAssociar = async () => {
    try {
      const payload = {
        descricao: descricao,
        valor: parseFloat(valor),
        obraId: idObra
      };

      await criarCustoAdicional(payload);
      setCustosAdicionais([...custosAdicionais]);

      toast.success("Custo adicional associado com sucesso!");
      setShowModal(false);
      setIdSelecionado(null);
      carregarCustosAdicionais();
    } catch (error) {
      toast.error("Erro ao associar custo adicional.");
    }
  };

  const handleRemover = async (id: number) => {
    try {
      await deletarCustoAdicional(id);
      toast.success("Custo adicional removido com sucesso!");
      carregarCustosAdicionais();
      setShowModalDelete(false);
      setIdSelecionado(null);
    } catch (error) {
      toast.error("Erro ao remover custo adicional.");
    }
  };

  const handleEditar = async () => {
    if (idSelecionado === null) return;
    try {
      const payload = {
        descricao: descricao,
        valor: (valor),
        obraId: idObra
      };

      await atualizarCustoAdicional(idSelecionado, payload);
      toast.success("Custo adicional atualizado com sucesso!");
      setShowModal(false);
      setIdSelecionado(null);
      carregarCustosAdicionais();
      setShowModalEdicao(false);
    } catch (error) {
      toast.error("Erro ao atualizar custo adicional.");
    }
  };

  return (
    <div className='p-3'>
      <h4 className='mb-3'>Custos Adicionais</h4>
      <hr />
      <Button variant="primary" onClick={abrirModal} className="mb-3">
        Associar Custo Adicional
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {custosAdicionais.map((item) => (
            <tr key={item.id}>
              <td>{item.descricao}</td>
              <td>{item.valor}</td>
              <td className="d-flex justify-content-left gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => { setIdSelecionado(item.id); setShowModalDelete(true); }}>
                  Remover
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setIdSelecionado(item.id);
                    setCustoAdicionalEditado(item);
                    setDescricao(item.descricao);
                    setValor(item.valor.toString());
                    setShowModalEdicao(true);
                  }}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para adicionar custo adicional */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Associar Custo Adicional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição do custo adicional"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor do custo adicional"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAssociar}>
            Associar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de confirmação de remoção */}
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover este custo adicional?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleRemover(idSelecionado!)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de Edição */}
      <Modal show={showModalEdicao} onHide={() => setShowModalEdicao(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Custo Adicional</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalEdicao(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditar}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default AbaCustosAdicionais;