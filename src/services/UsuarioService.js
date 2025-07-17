import api from "./api";

// pegar todos os usuários
export const getAllUsers = async () => {
  const response = await api.get(`/Usuario`);
  return response.data; 
};
