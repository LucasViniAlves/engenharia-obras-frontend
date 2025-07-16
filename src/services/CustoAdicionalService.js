import api from "./api";

// pegar todos as custo adicional
export const getTodosCustoAdicional = async () => {
  const response = await api.get("/CustoAdicional");
  return response.data;
}

// pegar custo adicional por id
export const getCustoAdicionalPorId = async (id) => {
  const response = await api.get(`/CustoAdicional/${id}`);
  return response.data;
}

// criar novo custo adicional
export const criarCustoAdicional = async (novoCustoAdicional) => {
  const response = await api.post("/CustoAdicional", novoCustoAdicional);
  return response.data;
}

// atualizar custo adicional existente
export const atualizarCustoAdicional = async (id, custoAdicionalAtualizado) => {
  const response = await api.put(`/CustoAdicional/${id}`, custoAdicionalAtualizado);
  return response.data;
}

// deletar custo adicional
export const deletarCustoAdicional = async (id) => {
  const response = await api.delete(`/CustoAdicional/${id}`);
  return response.data;
}