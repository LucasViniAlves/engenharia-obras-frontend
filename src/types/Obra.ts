export interface Obra {
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
  local?: string;
  areaTotal?: number;
  tipoObra?: string;
  faseAtual?: string;
  engenheiro?: string;
  observacoes?: string;
}


