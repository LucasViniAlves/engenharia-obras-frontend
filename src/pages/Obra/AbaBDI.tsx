import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BDI } from "../../types/BDI";
import { getTodosBDI, criarBDI, deletarBDI } from "../../services/BDIService";
import { Button, Form, Modal, Table } from "react-bootstrap";

interface AbaBDIProps {
  idObra: number;
}

const AbaBDI: React.FC<AbaBDIProps> = ({ idObra }) => {
  const [bdiAssociado, setBdiAssociado] = useState<BDI[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<number | null>(null);
  const [despesasFinanceiras, setDespesasFinanceiras] = useState(0.0);
  const [administracaoCentral, setAdministracaoCentral] = useState(0.0);
  const [administracaoLocal, setAdministracaoLocal] = useState(0.0);
  const [despesasIndiretas, setDespesasIndiretas] = useState(0.0);
  const [posObra, setPosObra] = useState(0.0);
  const [risco, setRisco] = useState(0.0);
  const [impostos, setImpostos] = useState(0.0);
  const [margemLucro, setMargemLucro] = useState(0.0);
  const [seguro, setSeguro] = useState(0.0);
  const [reservaTecnica, setReservaTecnica] = useState(0.0);

  useEffect(() => {
    carregarBDI();
  }, [idObra]);

  const carregarBDI = async () => {
    try {
      const bdIs = await getTodosBDI();
      const destaObra = bdIs.filter((item: BDI) => item.obraId === idObra);
      setBdiAssociado(destaObra);
    } catch (error) {
      toast.error("Erro ao carregar BDI da obra.");
    }
  };

  const abrirModal = () => {
    setShowModal(true);
  };

  const handleAssociar = async () => {
    try {
      const payload = {
        obraId: idObra,
        despesasFinanceiras: despesasFinanceiras,
        seguro: seguro,
        administracaoCentral: administracaoCentral,
        administracaoLocal: administracaoLocal,
        despesasIndiretas: despesasIndiretas,
        posObra: posObra,
        risco: risco,
        impostos: impostos,
        margemLucro: margemLucro,
        reservaTecnica: reservaTecnica,
      };

      await criarBDI(payload);
      setBdiAssociado([...bdiAssociado]);

      toast.success("BDI associado com sucesso!");
      setShowModal(false);
      setIdSelecionado(null);
      carregarBDI();
    } catch (error) {
      toast.error("Erro ao associar BDI.");
    }
  };

  const handleRemover = async (id: number) => {
    try {
      await deletarBDI(id);
      toast.success("BDI removido com sucesso!");
      carregarBDI();
      setShowModalDelete(false);
      setIdSelecionado(null);
    } catch (error) {
      toast.error("Erro ao remover BDI.");
    }
  };

  return (
    <div className='p-3'>

      <h4 className='mb-3'>BDI</h4>

      <Button variant="primary"
        onClick={abrirModal} className="mb-3">
        Adicionar BDI
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Identificador do BDI</th>
          </tr>
        </thead>
        <tbody>
          {bdiAssociado.map((bdi) => (
            <tr key={bdi.id}>
              <td>{bdi.id}</td>
              <td>
                <Button variant="danger" onClick={() => {
                  setIdSelecionado(bdi.id);
                  setShowModalDelete(true);
                }}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar BDI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAdministracaoCentral">
              <Form.Label>Administração Central</Form.Label>
              <Form.Control
                type="decimal"
                value={administracaoCentral}
                onChange={(e) => setAdministracaoCentral(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formAdministracaoLocal">
              <Form.Label>Administração Local</Form.Label>
              <Form.Control
                type="decimal"
                value={administracaoLocal}
                onChange={(e) => setAdministracaoLocal(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formDespesasIndiretas">
              <Form.Label>Despesas Indiretas</Form.Label>
              <Form.Control
                type="decimal"
                value={despesasIndiretas}
                onChange={(e) => setDespesasIndiretas(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formDespesasFinanceiras">
              <Form.Label>Despesas Financeiras</Form.Label>
              <Form.Control
                type="decimal"
                value={despesasFinanceiras}
                onChange={(e) => setDespesasFinanceiras(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formPosObra">
              <Form.Label>Pós Obra</Form.Label>
              <Form.Control
                type="decimal"
                value={posObra}
                onChange={(e) => setPosObra(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formRisco">
              <Form.Label>Risco</Form.Label>
              <Form.Control
                type="decimal"
                value={risco}
                onChange={(e) => setRisco(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formImpostos">
              <Form.Label>Impostos</Form.Label>
              <Form.Control
                type="decimal"
                value={impostos}
                onChange={(e) => setImpostos(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formMargemLucro">
              <Form.Label>Margem Lucro</Form.Label>
              <Form.Control
                type="decimal"
                value={margemLucro}
                onChange={(e) => setMargemLucro(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formSeguro">
              <Form.Label>Seguro</Form.Label>
              <Form.Control
                type="decimal"
                value={seguro}
                onChange={(e) => setSeguro(parseFloat(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="formReservaTecnica">
              <Form.Label>Reserva Técnica</Form.Label>
              <Form.Control
                type="decimal"
                value={reservaTecnica}
                onChange={(e) => setReservaTecnica(parseFloat(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAssociar}>
            Associar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remover BDI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja remover este BDI?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => idSelecionado && handleRemover(idSelecionado)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AbaBDI;
