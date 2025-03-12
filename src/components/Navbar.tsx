import { useNavigate } from "react-router-dom";
import Button from "./Button";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/"); // Redireciona para a rota "/login"
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <img
        src={logo}
        alt="Logo"
        className="" // Ajuste o tamanho conforme necessário
      />

      <div>
        <Button onClick={handleRegisterClick}>Sair</Button>
      </div>
    </nav>
  );
};

export default Navbar;
