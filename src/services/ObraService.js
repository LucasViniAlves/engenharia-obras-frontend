import api from "./api";

// Pega todas as obras
export const getTodasObras = async () => {
  const response = await api.get("/Obra");
  return response.data;
};

// Pega uma obra pelo ID
export const getObraPorId = async (id) => {
  const response = await api.get(`/Obra/${id}`);
  return response.data;
};

// Cria uma nova obra
export const criarObra = async (novaObra) => {
  const response = await api.post("/Obra", novaObra);
  return response.data;
};

// Atualiza uma obra existente
export const atualizarObra = async (id, obraAtualizada) => {
  const response = await api.put(`/Obra/${id}`, obraAtualizada);
  return response.data;
};

// Deleta uma obra
export const deletarObra = async (id) => {
  const response = await api.delete(`/Obra/${id}`);
  return response.data;
};
