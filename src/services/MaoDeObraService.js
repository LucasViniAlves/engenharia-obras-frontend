import api from "./api";

// pegar todos as mao de obra
export const getTodosMaoDeObra = async () => {
  const response = await api.get("/MaoDeObra");
  return response.data;
}

// pegar mao de obra por id
export const getMaoDeObraPorId = async (id) => {
  const response = await api.get(`/MaoDeObra/${id}`);
  return response.data;
}

// criar nova mao de obra
export const criarMaoDeObra = async (novaMaoDeObra) => {
  const response = await api.post("/MaoDeObra", novaMaoDeObra);
  return response.data;
}

// atualizar mao de obra existente
export const atualizarMaoDeObra = async (id, maoDeObraAtualizada) => {
  const response = await api.put(`/MaoDeObra/${id}`, maoDeObraAtualizada);
  return response.data;
}

// deletar mao de obra
export const deletarMaoDeObra = async (id) => {
  const response = await api.delete(`/MaoDeObra/${id}`);
  return response.data;
}