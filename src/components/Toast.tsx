import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

// Definição dos tipos de dados
type ToastType = "sucesso" | "erro" | "info" | "aviso";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

// Interface para as configurações de cada tipo de toast
interface ToastConfig {
  icone: React.ElementType;
  corFundo: string;
  titulo: string;
  mensagemPadrao: string;
}

// Interface para as props do componente Toast
interface ToastProps {
  tipo?: ToastType;
  titulo?: string;
  mensagem?: string;
  duracao?: number;
  onClose?: () => void;
  posicao?: ToastPosition;
}

// Definição de tipos de toast com suas configurações
const TIPOS_TOAST: Record<ToastType, ToastConfig> = {
  sucesso: {
    icone: CheckCircle,
    corFundo: "bg-green-500",
    titulo: "Sucesso!",
    mensagemPadrao: "Operação realizada com sucesso!",
  },
  erro: {
    icone: AlertCircle,
    corFundo: "bg-red-500",
    titulo: "Erro!",
    mensagemPadrao: "Ops! Algo deu errado",
  },
  info: {
    icone: Info,
    corFundo: "bg-blue-500",
    titulo: "Informação",
    mensagemPadrao: "Atenção a esta informação",
  },
  aviso: {
    icone: AlertCircle,
    corFundo: "bg-yellow-500",
    titulo: "Aviso",
    mensagemPadrao: "Atenção a este aviso",
  },
};

// Mapeamento de posições para classes CSS
const POSICOES: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const Toast: React.FC<ToastProps> = ({
  tipo = "sucesso",
  titulo,
  mensagem,
  duracao = 5000,
  onClose,
  posicao = "top-right",
}) => {
  const [visivel, setVisivel] = useState<boolean>(true);

  // Obtém configurações com base no tipo
  const config = TIPOS_TOAST[tipo];
  const IconeToast = config.icone;

  // Posicionamento do toast na tela
  const classesPosicao = POSICOES[posicao];

  useEffect(() => {
    if (duracao > 0) {
      const timer = setTimeout(() => {
        fecharToast();
      }, duracao);
      return () => clearTimeout(timer);
    }
  }, [duracao]);

  const fecharToast = (): void => {
    setVisivel(false);
    if (onClose) onClose();
  };

  if (!visivel) return null;

  return (
    <div
      className={`fixed ${classesPosicao} z-50 max-w-md w-full md:w-auto shadow-lg rounded-md overflow-hidden`}
    >
      <div className="bg-gray-800 text-white p-4 flex items-center">
        <div
          className={`${config.corFundo} rounded-full p-1 mr-3 flex-shrink-0`}
        >
          <IconeToast className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          {titulo || config.titulo ? (
            <p className="font-bold">{titulo || config.titulo}</p>
          ) : null}
          <p className="text-gray-200">{mensagem || config.mensagemPadrao}</p>
        </div>
        <button
          onClick={fecharToast}
          className="ml-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div
        className={`h-1 ${config.corFundo} ${
          duracao > 0 ? "animate-[shrink_linear]" : ""
        }`}
        style={duracao > 0 ? { animationDuration: `${duracao}ms` } : {}}
      ></div>
    </div>
  );
};

// Interface para o gerenciador de toast
interface ToastManagerProps {
  children: React.ReactNode;
}

// Interface para o contexto do toast
interface ToastContextType {
  mostrarToast: (props: Omit<ToastProps, "onClose">) => void;
}

// Interface para um item de toast no gerenciador
interface ToastItem extends ToastProps {
  id: number;
}

// Criação do contexto
const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

// Hook personalizado para usar o toast
export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
};

// Componente provedor de toast
export const ToastProvider: React.FC<ToastManagerProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [contador, setContador] = useState<number>(0);

  const mostrarToast = (props: Omit<ToastProps, "onClose">): void => {
    const id = contador;
    setContador((prev) => prev + 1);

    setToasts((prev) => [
      ...prev,
      {
        id,
        ...props,
      },
    ]);
  };

  const removerToast = (id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removerToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default Toast;
