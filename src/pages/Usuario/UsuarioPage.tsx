import React, { useEffect, useState } from "react";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { register } from "../../services/AuthService"; // ajuste o caminho se necessário
import { UsuarioTabela } from "./UsuarioTabela";

export const UsuarioPage = () => {
	const [showModal, setShowModal] = useState(false);
	const [novoUsuario, setNovoUsuario] = useState({
		nome: "",
		email: "",
		senha: "",
	});
  const [usuarios, setUsuarios] = useState([]); 

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
       // const resposta = await getTodosUsuarios();
       // setUsuarios(resposta);
      } catch (error) {
        toast.error("Erro ao carregar usuários.");
      }
    };

    carregarUsuarios();
  }, []);

	const handleChange = (e: { target: { name: any; value: any; }; }) => {
		setNovoUsuario({ ...novoUsuario, [e.target.name]: e.target.value });
	};

	const handleCadastrar = async () => {
		const { nome, email, senha } = novoUsuario;

		if (!nome || !email || !senha) {
			toast.error("Preencha todos os campos.");
			return;
		}

		try {
			await register(nome, email, senha);
			toast.success("Usuário cadastrado com sucesso!");
			setShowModal(false);
			setNovoUsuario({ nome: "", email: "", senha: "" });
		} catch (error) {
			console.error(error);
			toast.error("Erro ao cadastrar usuário.");
		}
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
        usuarios={[]}
        onDeletar={() => {}}
        onAtualizar={() => {}}
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
									name="email"
									value={novoUsuario.email}
									onChange={handleChange}
									placeholder="Digite o email"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Senha</Form.Label>
								<Form.Control
									type="password"
									name="senha"
									value={novoUsuario.senha}
									onChange={handleChange}
									placeholder="Digite a senha"
								/>
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
