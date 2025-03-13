import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#021A30] min-h-screen text-white flex flex-col">
      <Navbar />

      {/* Linha separadora */}
      <hr className="border-gray-700" />

      {/* Seção logo abaixo do cabeçalho */}
      <div className="bg-gray-900 w-full py-6 px-10 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Olá, Teste Capys</h2>
        <p className="text-gray-400">Desenvolvedor Front-End</p>
      </div>
      {/* Conteúdo principal */}
      {/* Bloco de mensagem fora do card */}
      <div className="w-full flex flex-col items-center justify-center py-10">
        <h3 className="text-lg font-bold">
          Que pena! Estamos em desenvolvimento :(
        </h3>
        <p className="text-gray-300 mt-2">
          Nossa aplicação está em desenvolvimento, em breve teremos novidades.
        </p>
      </div>
    </div>
  );
};

export default Home;
