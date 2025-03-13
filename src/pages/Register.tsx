import { useState } from "react";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import axios from "axios"; // Importe o Axios

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    contact: "",
    role: "",
  });

  const { mostrarToast } = useToast();
  const navigate = useNavigate();

  const handleRegisterHome = () => {
    navigate("/login");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        bio: form.bio,
        contact: form.contact,
        role: form.role,
      };

      const response = await axios.post(
        "http://localhost:3000/api/registrar/usuario",
        data
      );

      if (response.status === 200) {
        mostrarToast({
          tipo: "sucesso",
          mensagem: response.data.message,
          posicao: "top-right",
          duracao: 5000,
        });
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        mostrarToast({
          tipo: "erro",
          mensagem:
            error.response?.data.message || "Erro ao registrar o usuário.",
          duracao: 8000,
        });
      } else {
        mostrarToast({
          tipo: "erro",
          mensagem: "Erro desconhecido ao enviar formulário.",
          duracao: 8000,
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <img src={logo} alt="Logo" />
        <Button onClick={handleRegisterHome}>Sair</Button>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-center text-2xl font-semibold mb-2">
          Crie sua conta
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Rápido e grátis, vamos nessa
        </p>

        <input
          type="text"
          name="name"
          placeholder="Digite aqui seu nome"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Digite aqui seu email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Digite aqui sua senha"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Digite novamente sua senha"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        />
        <textarea
          name="bio"
          placeholder="Fale sobre você"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="text"
          name="contact"
          placeholder="Opção de contato"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white focus:ring-2 focus:ring-red-500"
        >
          <option value="">Selecionar Cargo</option>
          <option value="frontend">Desenvolvedor Front-End</option>
          <option value="backend">Desenvolvedor Back-End</option>
          <option value="fullstack">Desenvolvedor Full-Stack</option>
        </select>

        <button
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded text-lg font-semibold"
          onClick={handleSubmit}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}
