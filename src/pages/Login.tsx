import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // Redireciona para a rota "/register"
  };

  const handleRegisterHome = () => {
    navigate("/home"); // Redireciona para a rota "/home"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <img
        src={logo}
        alt="Logo"
        className="mx-auto mb-8 w-32 h-32" // Ajuste o tamanho conforme necessário
      />

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-center text-2xl font-semibold mb-6">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Senha</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded text-lg font-semibold"
          onClick={handleRegisterHome}
        >
          Entrar
        </button>
        <p className="text-center text-gray-400 mt-4">
          Ainda não possui uma conta?
        </p>
        <button
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded mt-2"
          onClick={handleRegisterClick}
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
}
