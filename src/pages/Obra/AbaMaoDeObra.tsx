import React from 'react';
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MaoDeObra } from "../../types/MaoDeObra";
import { getTodosMaoDeObra, criarMaoDeObra, deletarMaoDeObra, atualizarMaoDeObra } from "../../services/MaoDeObraService";
import { Button, Form, Modal, Table } from 'react-bootstrap';

interface AbaMaoDeObraProps {
  idObra: number;
}

const AbaMaoDeObra: React.FC<AbaMaoDeObraProps> = ({ idObra }) => {
  const [maoDeObraAssociada, setMaoDeObraAssociada] = useState<MaoDeObra[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdicao, setShowModalEdicao] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [profissional, setProfissional] = useState("");
  const [valorHora, setValorHora] = useState("");
  const [horasTrabalhadas, setHorasTrabalhadas] = useState("");
  const [maoDeObraEditada, setMaoDeObraEditada] = useState<MaoDeObra | null>(null);

  useEffect(() => {
    carregarMaoDeObra();
  }, [idObra]);

  const carregarMaoDeObra = async () => {
    try {
      const maoDeObra = await getTodosMaoDeObra();
      const destaObra = maoDeObra.filter((item: MaoDeObra) => item.obraId === idObra);
      setMaoDeObraAssociada(destaObra);
    } catch (error) {
      toast.error("Erro ao carregar mão de obra da obra.");
    }
  };

  const abrirModal = () => {
    setShowModal(true);
  }

  const handleAssociar = async () => {
    try {

      const payload = {
        profissional: profissional,
        valorHora: parseInt(valorHora),
        horasTrabalhadas: parseInt(horasTrabalhadas),
        obraId: idObra
      };

      await criarMaoDeObra(payload);
      setMaoDeObraAssociada([...maoDeObraAssociada]);

      toast.success("Mão de obra associada com sucesso!");
      setShowModal(false);
      setIdSelecionado(null);
      carregarMaoDeObra();
    } catch (error) {
      toast.error("Erro ao associar mão de obra.");
    }
  };

  async function handleRemover(id: any): Promise<void> {
    try {
      await deletarMaoDeObra(id);
      toast.success("Mão de obra removida com sucesso!");
      carregarMaoDeObra();
      setShowModalDelete(false);
      setIdSelecionado(null);
    } catch (error) {
      toast.error("Erro ao remover mão de obra.");
    }
  }

  const handleEditar = async () => {
    if (!maoDeObraEditada) return;

    try {
      await atualizarMaoDeObra(maoDeObraEditada.id, {
        ...maoDeObraEditada,
        profissional: maoDeObraEditada.profissional,
        horasTrabalhadas: (maoDeObraEditada.horasTrabalhadas),
        valorHora: (maoDeObraEditada.valorHora),
        obraId: idObra
      });

      toast.success("Mão de obra atualizada com sucesso!");
      setShowModal(false);
      setMaoDeObraEditada(null);
      carregarMaoDeObra();
    } catch (error) {
      toast.error("Erro ao atualizar mão de obra.");
    }
  };

  return (
    <div className='p-3'>
      <h4 className='mb-3'>Mão de Obra</h4>
      <hr />
      <Button variant="primary" onClick={abrirModal} className="mb-3">
        Adicionar Mão de Obra
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profissional</th>
            <th>Valor Hora</th>
            <th>Horas Trabalhadas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {maoDeObraAssociada.map((item) => (
            <tr key={item.id}>
              <td>{item.profissional}</td>
              <td>{item.valorHora}</td>
              <td>{item.horasTrabalhadas}</td>
              <td className="d-flex justify-content-left gap-2">
                <Button 
                variant="danger" 
                size='sm'
                onClick={() => { setIdSelecionado(item.id); setShowModalDelete(true); }}>
                  Remover
                </Button>
                <Button 
                variant="warning" 
                size='sm'
                onClick={() => { setMaoDeObraEditada(item); setShowModalEdicao(true); }}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Mão de Obra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Profissional</Form.Label>
            <Form.Control
              type="text"
              value={profissional}
              onChange={(e) => setProfissional(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valor Hora</Form.Label>
            <Form.Control
              type="number"
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Horas Trabalhadas</Form.Label>
            <Form.Control
              type="number"
              value={horasTrabalhadas}
              onChange={(e) => setHorasTrabalhadas(e.target.value)}
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
      {/* Modal de Deletar */}
      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remover Mão de Obra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza que deseja remover esta mão de obra?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleRemover(idSelecionado)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
      { /* Modal de Edição */}
      <Modal show={showModalEdicao} onHide={() => setShowModalEdicao(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mão de Obra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Profissional</Form.Label>
            <Form.Control
              type="text"
              value={maoDeObraEditada?.profissional || ""}
              onChange={(e) =>
                setMaoDeObraEditada((prev) =>
                  prev ? { ...prev, profissional: e.target.value } : null
                )
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valor Hora</Form.Label>
            <Form.Control
              type="number"
              value={maoDeObraEditada?.valorHora || ""}
              onChange={(e) =>
                setMaoDeObraEditada((prev) =>
                  prev ? { ...prev, valorHora: Number(e.target.value) } : null
                )
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Horas Trabalhadas</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={maoDeObraEditada?.horasTrabalhadas || ""}
              onChange={(e) =>
                setMaoDeObraEditada((prev) =>
                  prev ? { ...prev, horasTrabalhadas: Number(e.target.value) } : null
                )
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMaoDeObraEditada(null)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleEditar}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AbaMaoDeObra;

