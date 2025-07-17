import api from './api';

export const login = async (email, senha) => {
  const response = await api.post(`/login`, { email, senha });
  return response.data; 
};

export const register = async (nome, email, senha) => {
  const response = await api.post(`/Auth/register`, { nome, email, senha });
  return response.data; 
};

export const getUsuario = async () => {
  const response = await api.get(`/Auth/usuario`);
  return response.data; 
}

