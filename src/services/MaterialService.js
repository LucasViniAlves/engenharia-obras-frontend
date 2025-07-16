import api from "./api";
 
// Pega todos os materiais
export const getTodosMateriais = async () => {
  const response = await api.get("/Material");
  return response.data;
}

// Pega materiais por obra
export const getMaterialPorId = async (id) => {
  const response = await api.get(`/Material/${id}`);
  return response.data;
}

// Cria um novo material
export const criarMaterial = async (novoMaterial) => {
  const response = await api.post("/Material", novoMaterial);
  return response.data;
}

// Atualiza um material existente
export const atualizarMaterial = async (id, materialAtualizado) => {
  const response = await api.put(`/Material/${id}`, materialAtualizado);
  return response.data;
}

// Deleta um material
export const deletarMaterial = async (id) => {
  const response = await api.delete(`/Material/${id}`);
  return response.data;
}
