import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token);
      setErro("");
      navigate("/HomePage");
    } catch (err) {
      setErro("Credenciais inválidas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelp = () => {
    navigate("/pages/RegisterPage/Register");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Entrar no Sistema</h2>
        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="login-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="btn btn-success w-100 mb-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Entrando...
            </>
          ) : (
            "Login"
          )}
        </button>

        <button
          onClick={handleHelp}
          className="btn btn-secondary w-100"
          disabled={isLoading}
        >
          Ajuda
        </button>

        {erro && <p className="login-error mt-3">{erro}</p>}
      </div>
    </div>
  );
}
