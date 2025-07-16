// MaterialCorpo.tsx
import React, { useState, useEffect } from "react";
import LayoutPadrao from "../../components/LayouPadrao/LayoutPadrao";
import { MaterialTabela } from "./MaterialTabela";
import { Modal, Button, Form } from "react-bootstrap";
import {
	getTodosMateriais, criarMaterial, atualizarMaterial, deletarMaterial,
} from "../../services/MaterialService";
import { toast } from "react-hot-toast";

export const MaterialCorpo = () => {
	const [materiais, setMateriais] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [novoMaterial, setNovoMaterial] = useState({
		nome: "",
		precoUnitario: 0,
		quantidade: "0",
	});

	useEffect(() => {
		const carregarMateriais = async () => {
			try {
				const resposta = await getTodosMateriais();
				setMateriais(resposta);
			} catch (error) {
				toast.error("Erro ao carregar materiais.");
			}
		};

		carregarMateriais();
	}, []);


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNovoMaterial({ ...novoMaterial, [e.target.name]: e.target.value });
	};

	const handleSalvar = async () => {
		if (novoMaterial.nome && novoMaterial.precoUnitario > 0) {

			try {
				const novo = {
					nome: novoMaterial.nome,
					precoUnitario: parseFloat(String(novoMaterial.precoUnitario)),
					quantidade: parseInt(novoMaterial.quantidade || "0", 10)
				};

				const materialCriado = await criarMaterial(novo);


				toast.success("Material cadastrado com sucesso!");

				setShowModal(false);
				setNovoMaterial({ nome: "", precoUnitario: 0, quantidade: "0" });

			} catch (error) {
				toast.error("Erro ao cadastrar material.");
			}
		} else {
			toast.error("Preencha todos os campos corretamente.");
		}
	};

	const handleExcluirMaterial = (id: number) => {
		toast.success("Material excluído.");
	};

	const handleAtualizarMaterial = (materialAtualizado: any) => {
		toast.success("Material atualizado com sucesso!");
	};

	return (
		<LayoutPadrao>
			<div className="container mt-4">
				<div className="d-flex justify-content-between align-items-center mb-3">
					<h1>Materiais</h1>
					<button className="btn btn-success" onClick={() => setShowModal(true)}>
						Criar Novo Material
					</button>
				</div>

				<MaterialTabela
					materiais={materiais}
					onDeletar={handleExcluirMaterial}
					onAtualizar={handleAtualizarMaterial}
				/>

				{/* Modal de Criação */}
				<Modal show={showModal} onHide={() => setShowModal(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>Novo Material</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Nome</Form.Label>
								<Form.Control
									type="text"
									name="nome"
									value={novoMaterial.nome}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Preço</Form.Label>
								<Form.Control
									type="number"
									name="precoUnitario"
									value={novoMaterial.precoUnitario}
									onChange={handleChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Quantidade</Form.Label>
								<Form.Control
									type="number"
									name="quantidade"
									value={novoMaterial.quantidade}
									onChange={handleChange}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
						<Button variant="success" onClick={handleSalvar}>Salvar</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</LayoutPadrao>
	);
};
