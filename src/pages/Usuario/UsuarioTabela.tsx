import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  perfil: string;
}

export const UsuarioTabela = ({
  usuarios,
  onDeletar,
  onAtualizar,
}: {
  usuarios: Usuario[];
  onDeletar: (id: number) => void;
  onAtualizar: (usuario: Usuario) => void;
}) => {
  const [usuarioSelecionado, setUsuarioSelecionado] = React.useState<Usuario | null>(null);
  const [modoEdicao, setModoEdicao] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleEditar = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setModoEdicao(true);
  };

  const confirmarEdicao = () => {
    if (usuarioSelecionado) {
      onAtualizar(usuarioSelecionado);
      setModoEdicao(false);
    }
  };

  const confirmarExclusao = () => {
    if (usuarioSelecionado) {
      onDeletar(usuarioSelecionado.id);
      setShowConfirm(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!usuarioSelecionado) return;
    setUsuarioSelecionado({
      ...usuarioSelecionado,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.perfil}</td>
              <td className="d-flex justify-content-left gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setUsuarioSelecionado(usuario);
                    setShowConfirm(true);
                  }}>Deletar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEditar(usuario)}
                >
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edição */}
      {modoEdicao && usuarioSelecionado && (
        <Modal show={modoEdicao} onHide={() => setModoEdicao(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={usuarioSelecionado.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={usuarioSelecionado.email}
                  onChange={handleChange}
                  placeholder="Digite o email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="senha"
                  value={usuarioSelecionado.senha}
                  onChange={handleChange}
                  placeholder="Digite a senha"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Perfil</Form.Label>
                <Form.Select
                  name="perfil"
                  value={usuarioSelecionado.perfil}
                  onChange={handleChange}
                >
                  <option value="">Selecione o perfil</option>
                  <option value="administrador">Administrador</option>
                  <option value="proprietario">Proprietário</option>
                  <option value="visitante">Visitante</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModoEdicao(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={confirmarEdicao}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal de Confirmação */}
      {showConfirm && usuarioSelecionado && (
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Tem certeza que deseja excluir o usuário <strong>{usuarioSelecionado.nome}</strong>?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarExclusao}>
              Deletar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
