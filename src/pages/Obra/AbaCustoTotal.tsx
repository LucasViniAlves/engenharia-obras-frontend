import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getObraPorId, getTotalCustoObra } from "../../services/ObraService";
import { Table } from "react-bootstrap";
import { ObraTotal } from "../../types/ObraTotal";

interface AbaCustoTotalProps {
  idObra: number;
}

const AbaCustoTotal: React.FC<AbaCustoTotalProps> = ({ idObra }) => {
  const [materiais, setMateriais] = useState<ObraTotal["Material"]>([
    {
      id: 0,
      nome: "",
      precoUnitario: 0,
      quantidade: 0,
    },
  ]);
  const [custosAdicionais, setCustosAdicionais] = useState<ObraTotal["CustoAdicional"]>([
    {
      id: 0,
      descricao: "",
      valor: 0,
    },
  ]);
  const [maoDeObra, setMaoDeObra] = useState<ObraTotal["MaoDeObra"]>([
    {
      id: 0,
      profissional: "",
      valorHora: 0,
      horasTrabalhadas: 0,
    },
  ]);
  const [totalCusto, setTotalCusto] = useState<number>(0);

  useEffect(() => {
    pegarDadosDaObra();
  }, [idObra]);

  const pegarDadosDaObra = async () => {
    try {
      const obraData = await getObraPorId(idObra);
      const totalCusto = await getTotalCustoObra(idObra);
      setTotalCusto(totalCusto);
      setMateriais(obraData.materiais || []);
      setCustosAdicionais(obraData.custosAdicionais || []);
      setMaoDeObra(obraData.maoDeObras || []);
    } catch (error) {
      toast.error("Erro ao carregar dados da obra.");
    }
  };

  return (
    <div className="p-3">
      <h4 className="mb-3">Custo Total da Obra</h4>
      <hr />
      <h5 className="mb-3">Materiais:</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço Unitário</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {materiais?.map((material) => (
            <tr key={material.id}>
              <td>{material.nome}</td>
              <td>{material.precoUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{material.quantidade}</td>
              <td>{(material.precoUnitario * material.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <h5 className="mb-3">Custos Adicionais:</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {custosAdicionais?.map((custo) => (
            <tr key={custo.id}>
              <td>{custo.descricao}</td>
              <td>{custo.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <h5 className="mb-3">Mão de Obra:</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profissional</th>
            <th>Valor Hora</th>
            <th>Horas Trabalhadas</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {maoDeObra?.map((mao) => (
            <tr key={mao.id}>
              <td>{mao.profissional}</td>
              <td>{mao.valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{mao.horasTrabalhadas}</td>
              <td>{(mao.valorHora * mao.horasTrabalhadas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="mb-3 text-end">Total Custo da Obra:</h5>
      <h4 className="text-end">{totalCusto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
    </div>
  );
};

export default AbaCustoTotal;