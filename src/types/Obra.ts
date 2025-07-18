export interface Obra {
  id: number;
  nome: string;
  responsavel: string;
  dataInicio: string;
  dataFim?: string;
  custoEstimado: number;
  emailCliente?: string;
  identidadeCliente?: string;
  nomeCliente?: string;
  local?: string;
  areaTotal?: number;
  tipoObra?: string;
  faseAtual?: string;
  engenheiro?: string;
  observacoes?: string;
}


