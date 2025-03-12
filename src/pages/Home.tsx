import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <h2 className="text-2xl font-bold">Olá, Teste Capys</h2>
        <p className="text-gray-400">Desenvolvedor Front-End</p>
        <div className="mt-6 p-6 bg-gray-700 rounded-md max-w-md text-center">
          <h3 className="text-lg font-bold">
            Que pena! Estamos em desenvolvimento :(
          </h3>
          <p className="text-gray-300 mt-2">
            Nossa aplicação está em desenvolvimento, em breve teremos novidades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
