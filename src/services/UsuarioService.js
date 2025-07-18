import api from "./api";

// pegar todos os usuários
export const getAllUsers = async () => {
  const response = await api.get(`/Usuario`);
  return response.data; 
};

export const atualizarUsuario = async (id, usuario) => {
  const response = await api.put(`/Usuario/${id}`, usuario);
  return response.data;
};
