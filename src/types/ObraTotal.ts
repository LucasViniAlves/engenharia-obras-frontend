export interface ObraTotal {
  id: number;
  nome: string;
  responsavel: string;
  dataInicio: string;
  dataFim?: string;
  custoEstimado: number;
  TelefoneCliente?: string;
  emailCliente?: string;
  IdentidadeCliente?: string;
  NomeCliente?: string;
  Material: [
    {
      id: number;
      nome: string;
      precoUnitario: number;
      quantidade: number;
    }
  ];
  CustoAdicional: [
    {
      id: number;
      descricao: string;
      valor: number;
    }
  ];
  MaoDeObra: [
    {
      id: number;
      profissional: string;
      valorHora: number;
      horasTrabalhadas: number;
    }
  ];
}
