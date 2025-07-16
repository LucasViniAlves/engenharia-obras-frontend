import api from "./api";

// pegar todos os BDI
export const getTodosBDI = async () => {
  const response = await api.get("/BDI");
  return response.data;
}

// pegar BDI por id
export const getBDIPorId = async (id) => {
  const response = await api.get(`/BDI/${id}`);
  return response.data;
}

// criar novo BDI
export const criarBDI = async (novoBDI) => {
  const response = await api.post("/BDI", novoBDI);
  return response.data;
}

// atualizar BDI existente
export const atualizarBDI = async (id, bdiAtualizado) => {
  const response = await api.put(`/BDI/${id}`, bdiAtualizado);
  return response.data;
}

// deletar BDI
export const deletarBDI = async (id) => {
  const response = await api.delete(`/BDI/${id}`);
  return response.data;
}   