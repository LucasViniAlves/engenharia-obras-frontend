import React, { useEffect, useState } from "react";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { getUsuario, register } from "../../services/AuthService";
import { getAllUsers } from "../../services/UsuarioService";
import { UsuarioTabela } from "./UsuarioTabela";

export const UsuarioPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "",
  });
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const resposta = await getAllUsers();
      setUsuarios(resposta);
    } catch (error) {
      toast.error("Erro ao carregar usuários.");
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setNovoUsuario({ ...novoUsuario, [e.target.name]: e.target.value });
  };

  const handleCadastrar = async () => {
    const { nome, email, senha, perfil } = novoUsuario;

    if (!nome || !email || !senha || !perfil) {
      toast.error("Preencha todos os campos.");
      return;
    }

    try {
      await register(nome, email, senha, perfil);
      toast.success("Usuário cadastrado com sucesso!");
      setShowModal(false);
      setNovoUsuario({ nome: "", email: "", senha: "", perfil: "" });
      carregarUsuarios();
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.status === "number"
      ) {
        if ((error as any).response.status === 403) {
          toast.error("Você não tem permissão para realizar esta ação.");
        } else if ((error as any).response.status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
        } else {
          toast.error("Erro ao cadastrar usuário.");
        }
      } else {
        toast.error("Erro ao cadastrar usuário.");
      }
    }
  };

  const handleEditar = (usuario: { nome: string; email: string; perfil: string; senha: string; }) => {
    setNovoUsuario({
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha || "",
      perfil: usuario.perfil,
    });
    setShowModal(true);
  };

  return (
    <LayoutPadrao>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Usuários</h1>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Adicionar Novo Usuário
          </Button>
        </div>

        <UsuarioTabela
          usuarios={usuarios}
          onDeletar={() => { }}
          onAtualizar={handleEditar}
        />

        {/* Modal de Cadastro */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={novoUsuario.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="usuarioEmail"
                  autoComplete="off"
                  value={novoUsuario.email}
                  onChange={(e) =>
                    setNovoUsuario({ ...novoUsuario, email: e.target.value })
                  }
                  placeholder="Digite o email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="usuarioSenha"
                  autoComplete="new-password"
                  value={novoUsuario.senha}
                  onChange={(e) =>
                    setNovoUsuario({ ...novoUsuario, senha: e.target.value })
                  }
                  placeholder="Digite a senha"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Perfil</Form.Label>
                <Form.Select
                  name="perfil"
                  value={novoUsuario.perfil}
                  onChange={(e) =>
                    setNovoUsuario({ ...novoUsuario, perfil: e.target.value })
                  }
                >
                  <option value="">Selecione o perfil</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Proprietario">Proprietário</option>
                  <option value="visitante">Visitante</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleCadastrar}>
              Cadastrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </LayoutPadrao>
  );
};
