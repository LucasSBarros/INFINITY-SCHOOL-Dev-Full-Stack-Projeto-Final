import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function AccessLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/accesslogs");
      setLogs(data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Excluir log?")) return;
    try {
      await api.delete(`/accesslogs/${id}`);
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao excluir");
    }
  };

  const isAdmin = user?.role === "administrador";

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Logs de Acesso</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="table">
          <table className="w-full">
            <thead>
              <tr>
                <th className="th">Data/Hora</th>
                <th className="th">Usuário</th>
                <th className="th">Área</th>
                <th className="th">Status</th>
                <th className="th">Motivo</th>
                {isAdmin && <th className="th">Ações</th>}
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="odd:bg-custom-gray/20">
                  <td className="td">
                    {new Date(l.timestamp || Date.now()).toLocaleString()}
                  </td>
                  <td className="td">
                    {l.user?.name} ({l.user?.email})
                  </td>
                  <td className="td">{l.area?.name}</td>
                  <td className="td">
                    <span className="badge">{l.status}</span>
                  </td>
                  <td className="td">{l.deniedReason || "-"}</td>
                  {isAdmin && (
                    <td className="td">
                      <button
                        className="btn"
                        onClick={() => handleDelete(l.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
