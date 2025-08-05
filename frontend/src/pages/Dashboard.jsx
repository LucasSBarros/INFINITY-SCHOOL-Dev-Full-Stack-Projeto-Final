import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#F5CB5C", "#CD9C20", "#333533"];

export default function Dashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    users: 0,
    resources: 0,
    areas: 0,
    logs: 0,
  });
  const [logs, setLogs] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    (async () => {
      const [
        { data: users },
        { data: resources },
        { data: areas },
        { data: logs },
      ] = await Promise.all([
        api.get("/users"),
        api.get("/resources"),
        api.get("/areas"),
        api.get("/accesslogs"),
      ]);
      setCounts({
        users: users.length,
        resources: resources.length,
        areas: areas.length,
        logs: logs.length,
      });
      setResources(resources);
      setLogs(logs);
    })();
  }, []);

  const resourcesByType = useMemo(() => {
    const types = ["equipamento", "veiculo", "dispositivoDeSeguranca"];
    const map = { equipamento: 0, veiculo: 0, dispositivoDeSeguranca: 0 };
    resources.forEach((r) => {
      if (map[r.type] !== undefined) map[r.type]++;
    });
    return types.map((t) => ({ type: t, total: map[t] }));
  }, [resources]);

  const logsByStatus = useMemo(() => {
    const map = { autorizado: 0, negado: 0 };
    logs.forEach((l) => {
      if (map[l.status] !== undefined) map[l.status]++;
    });
    return [
      { name: "Autorizados", value: map.autorizado },
      { name: "Negados", value: map.negado },
    ];
  }, [logs]);

  const Stat = ({ title, value }) => (
    <div className="card">
      <div className="card-body">
        <div className="text-sm text-custom-ivory/70">{title}</div>
        <div className="text-3xl font-semibold text-custom-gold">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold">
        Bem-vindo,{" "}
        <span className="text-custom-gold">
          {user?.name || user?.email || "usuário"}
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat title="Usuários" value={counts.users} />
        <Stat title="Recursos" value={counts.resources} />
        <Stat title="Áreas" value={counts.areas} />
        <Stat title="Logs" value={counts.logs} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="card">
          <div className="card-body">
            <h3 className="text-lg font-medium mb-3">Recursos por tipo</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourcesByType}>
                  <XAxis dataKey="type" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" fill="#F5CB5C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-body">
            <h3 className="text-lg font-medium mb-3">Tentativas de acesso</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={logsByStatus} dataKey="value" nameKey="name" label>
                    {logsByStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
