import axios from "axios";

const API_URL = "https://localhost:7157/api/Auth";

export const login = async (email, senha) => {
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  return response.data; 
};

export const register = async (nome, email, senha) => {
  const response = await axios.post(`${API_URL}/register`, { nome, email, senha });
  return response.data; 
};

export const getUsuario = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await axios.get(`${API_URL}/usuario`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data; // { nome, email }
};
