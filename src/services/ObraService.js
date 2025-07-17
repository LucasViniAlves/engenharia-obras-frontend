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

// Associar material a uma obra
export const associarMaterialAObra = async (idObra, payload) => {
  const response = await api.post(`/Obra/${idObra}/associar-material`, payload);
  return response.data;
};

// Remover material de uma obra
export const removerMaterialDaObra = async (idObra, idMaterial) => {
  const response = await api.delete(`/Obra/${idObra}/remover-material/${idMaterial}`);
  return response.data;
};

// Materiais não associados a uma obra
export const getMateriaisNaoAssociados = async (idObra) => {
  const response = await api.get(`/Obra/${idObra}/materiais-nao-associados`);
  return response.data;
};

// Materiais associados a uma obra
export const getMateriaisDaObra = async (idObra) => {
  const response = await api.get(`/Obra/${idObra}/materiais`);
  return response.data;
};

// pegar total do custo de uma obra
export const getTotalCustoObra = async (idObra) => {
  const response = await api.get(`/Obra/${idObra}/total`);
  return response.data;
};
