import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Acesso negado</h1>
        <p className="text-custom-ivory/70">
          Você não tem permissão para acessar esta página.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Voltar
        </button>
      </div>
    </div>
  );
}
