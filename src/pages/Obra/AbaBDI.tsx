import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BDI } from "../../types/BDI";
import { getTodosBDI, criarBDI, atualizarBDI, deletarBDI, calcularBDI } from "../../services/BDIService";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AbaBDIProps {
  idObra: number;
}

const AbaBDI: React.FC<AbaBDIProps> = ({ idObra }) => {
  const [bdi, setBdi] = useState<BDI | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalCalculoBDI, setShowModalCalculoBDI] = useState(false);
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
  const [totalBDI, setTotalBDI] = useState<string | number>("");
  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8C52FF",
    "#3CB371", "#FF69B4", "#A64D79", "#E06666", "#999999"
  ];

  useEffect(() => {
    carregarBDI();
  }, [idObra]);

  const carregarBDI = async () => {
    try {
      const bdIs = await getTodosBDI();
      const destaObra = bdIs.find((item: BDI) => item.obraId === idObra);
      if (destaObra) {
        setBdi(destaObra || null);
        setAdministracaoCentral(destaObra.administracaoCentral || 0.0);
        setAdministracaoLocal(destaObra.administracaoLocal || 0.0);
        setDespesasIndiretas(destaObra.despesasIndiretas || 0.0);
        setDespesasFinanceiras(destaObra.despesaFinanceira || 0.0);
        setPosObra(destaObra.posObras || 0.0);
        setRisco(destaObra.risco || 0.0);
        setImpostos(destaObra.impostos || 0.0);
        setMargemLucro(destaObra.margemLucro || 0.0);
        setSeguro(destaObra.seguro || 0.0);
        setReservaTecnica(destaObra.reservaTecnica || 0.0);
      } else {
        setBdi(null);
      }
    } catch (error) {
      toast.error("Erro ao carregar BDI da obra.");
    }
  };

  const handleSalvar = async () => {
    const payload = {
      obraId: idObra,
      despesaFinanceira: despesasFinanceiras,
      seguro,
      administracaoCentral,
      administracaoLocal,
      despesasIndiretas,
      posObras: posObra,
      risco,
      impostos,
      margemLucro,
      reservaTecnica
    };

    try {
      if (bdi) {
        await atualizarBDI(bdi.id, payload);
        toast.success("BDI atualizado com sucesso!");
      } else {
        await criarBDI(payload);
        toast.success("BDI criado com sucesso!");
      }
      setShowModal(false);
      carregarBDI();
      calcularBDI(idObra);
    } catch (error) {
      toast.error("Erro ao salvar BDI.");
    }
  };

  const handleRemover = async (id: number) => {
    try {
      await deletarBDI(id);
      toast.success("BDI removido com sucesso!");

      setAdministracaoCentral(0);
      setAdministracaoLocal(0);
      setDespesasIndiretas(0);
      setDespesasFinanceiras(0);
      setPosObra(0);
      setRisco(0);
      setImpostos(0);
      setMargemLucro(0);
      setSeguro(0);
      setReservaTecnica(0);
      setBdi(null);
      carregarBDI();
      setShowModalDelete(false);
      setIdSelecionado(null);
    } catch (error) {
      toast.error("Erro ao remover BDI.");
    }
  };

  const handleGerarCalculoBDI = async () => {
    try {
      const resposta = await calcularBDI(idObra);
      setTotalBDI(resposta.bdi);
      setShowModalCalculoBDI(true);
    } catch (error) {
      toast.error("Erro ao calcular BDI.");
    }
  };

  return (
    <div className='p-3'>
      <Alert variant="warning">
        <strong>O que é BDI?</strong><br />
        O BDI (Bonificação e Despesas Indiretas) é um percentual aplicado sobre o custo direto da obra para cobrir despesas indiretas, riscos, tributos e lucro. É essencial para garantir que a empresa tenha viabilidade econômica na execução do projeto.
        <br /><br />
        <strong>Fórmula do BDI:</strong><br />
        <code>
          BDI (%) = [(Despesas Indiretas + Impostos + Lucro + Riscos + Outros) / Custo Direto] × 100
        </code>
        <br />
        Ou, representado com os componentes:<br />
        <code>
          BDI = (ADC + ADL + DI + DF + PO + RO + IMP + LP + SG + RT) / Custo Direto × 100
        </code>
        <br />
        Onde cada sigla representa os percentuais atribuídos aos componentes do BDI.
      </Alert>
      <h4 className='mb-3'>BDI</h4>
      <hr />
      <div className="mb-3 d-flex gap-2">
        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          className="mb-3"
        >
          {bdi ? "Editar BDI" : "Adicionar BDI"}
        </Button>

        {bdi && (
          <Button variant="danger" onClick={() => { setShowModalDelete(true); setIdSelecionado(bdi.id); }} className="mb-3">
            Remover BDI
          </Button>
        )}

        {bdi && (
          <Button variant="secondary" onClick={() => { setShowModalCalculoBDI(true); handleGerarCalculoBDI(); setIdSelecionado(bdi.id) }} className="mb-3">
            Gerar Cálculo BDI
          </Button>
        )}
      </div>

      <Form className="mb-4">
        <Row className="g-3">
          {[{
            label: 'Adm. Central', value: administracaoCentral
          }, {
            label: 'Adm. Local', value: administracaoLocal
          }, {
            label: 'Desp. Indiretas', value: despesasIndiretas
          }, {
            label: 'Desp. Financeiras', value: despesasFinanceiras
          }, {
            label: 'Pós Obra', value: posObra
          }, {
            label: 'Risco', value: risco
          }, {
            label: 'Impostos', value: impostos
          }, {
            label: 'Lucro', value: margemLucro
          }, {
            label: 'Seguro', value: seguro
          }, {
            label: 'Reserva Téc.', value: reservaTecnica
          }].map((item, index) => (
            <Col md={2} key={index}>
              <Form.Group>
                <Form.Label className="fw-semibold small">{item.label}</Form.Label>
                <Form.Control type="number" value={item.value} disabled />
              </Form.Group>
            </Col>
          ))}
        </Row>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{bdi ? "Editar BDI" : "Adicionar BDI"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-3">
              {[
                { label: 'Adm. Central', value: administracaoCentral, setter: setAdministracaoCentral },
                { label: 'Adm. Local', value: administracaoLocal, setter: setAdministracaoLocal },
                { label: 'Desp. Indiretas', value: despesasIndiretas, setter: setDespesasIndiretas },
                { label: 'Desp. Financeiras', value: despesasFinanceiras, setter: setDespesasFinanceiras },
                { label: 'Pós Obra', value: posObra, setter: setPosObra },
                { label: 'Risco', value: risco, setter: setRisco },
                { label: 'Impostos', value: impostos, setter: setImpostos },
                { label: 'Lucro', value: margemLucro, setter: setMargemLucro },
                { label: 'Seguro', value: seguro, setter: setSeguro },
                { label: 'Reserva Téc.', value: reservaTecnica, setter: setReservaTecnica }
              ].map((item, index) => (
                <Col md={2} key={index}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small">{item.label}</Form.Label>
                    <Form.Control
                      type="number"
                      className="form-control-sm"
                      value={item.value}
                      onChange={(e) => item.setter(parseFloat(e.target.value))}
                    />
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSalvar}>
            {bdi ? "Atualizar" : "Associar"}
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

      <Modal show={showModalCalculoBDI} onHide={() => setShowModalCalculoBDI(false)} size="lg" height="800px" centered>
        <Modal.Header closeButton>
          <Modal.Title>Memória de Cálculo do BDI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-muted mb-2">Fórmula do BDI:</h6>
          <p className="fst-italic small text-secondary mb-3">
            BDI (%) = [(Despesas Indiretas + Impostos + Lucro + Riscos + Outros) / Custo Direto] × 100
            <br />
            Ou, representado pelos componentes:<br />
            BDI = (ADC + ADL + DI + DF + PO + RO + IMP + LP + SG + RT) / Custo Direto × 100
          </p>

          <h5>Total do BDI Calculado:</h5>
          <p className="fs-4 fw-bold text-success">{totalBDI}</p>

          <hr className="my-4" />

          <h6>Composição dos Componentes:</h6>
          <ul className="mb-4">
            <li>Administração Central (ADC): {administracaoCentral.toFixed(2)}%</li>
            <li>Administração Local (ADL): {administracaoLocal.toFixed(2)}%</li>
            <li>Despesas Indiretas (DI): {despesasIndiretas.toFixed(2)}%</li>
            <li>Despesas Financeiras (DF): {despesasFinanceiras.toFixed(2)}%</li>
            <li>Pós-Obra (PO): {posObra.toFixed(2)}%</li>
            <li>Risco da Obra (RO): {risco.toFixed(2)}%</li>
            <li>Impostos (IMP): {impostos.toFixed(2)}%</li>
            <li>Lucro Previsto (LP): {margemLucro.toFixed(2)}%</li>
            <li>Seguro (SG): {seguro.toFixed(2)}%</li>
            <li>Reserva Técnica (RT): {reservaTecnica.toFixed(2)}%</li>
          </ul>

          <h6 className="mb-3">Distribuição Visual:</h6>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  label={({ name }: { name: string }) => name}
                  data={[
                    { name: "Adm. Central", value: administracaoCentral },
                    { name: "Adm. Local", value: administracaoLocal },
                    { name: "Despesas Indiretas", value: despesasIndiretas },
                    { name: "Despesas Financeiras", value: despesasFinanceiras },
                    { name: "Pós Obra", value: posObra },
                    { name: "Risco", value: risco },
                    { name: "Impostos", value: impostos },
                    { name: "Lucro", value: margemLucro },
                    { name: "Seguro", value: seguro },
                    { name: "Reserva Técnica", value: reservaTecnica },
                  ]}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalCalculoBDI(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AbaBDI;
