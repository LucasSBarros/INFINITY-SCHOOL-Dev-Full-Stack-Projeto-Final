import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const typeOptions = [
  { value: "equipamento", label: "Equipamento" },
  { value: "veiculo", label: "Veículo" },
  { value: "dispositivoDeSeguranca", label: "Dispositivo de segurança" },
];

export default function Resources() {
  const [items, setItems] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "equipamento",
    description: "",
    status: "ativo",
    location: "",
  });
  const [editing, setEditing] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [{ data: resources }, { data: areas }] = await Promise.all([
        api.get("/resources"),
        api.get("/areas"),
      ]);
      setItems(resources);
      setAreas([...areas].sort((a, b) => a.name.localeCompare(b.name)));
    } catch (e) {
      setError(e?.response?.data?.message || "Erro ao carregar recursos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({
      name: "",
      type: "equipamento",
      description: "",
      status: "ativo",
      location: "",
    });
    setEditing(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/resources", form);
      resetForm();
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao criar");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/resources/${editing.id}`, form);
      resetForm();
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao atualizar");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Excluir recurso?")) return;
    try {
      await api.delete(`/resources/${id}`);
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao excluir");
    }
  };

  const startEdit = (r) => {
    setEditing(r);
    setForm({
      name: r.name,
      type: r.type,
      description: r.description || "",
      status: r.status,
      location: r.location,
    });
  };

  const groups = useMemo(() => {
    const g = { veiculo: [], equipamento: [], dispositivoDeSeguranca: [] };
    items.forEach((r) => {
      if (g[r.type]) g[r.type].push(r);
    });
    return g;
  }, [items]);

  const List = ({ data }) => (
    <div className="table overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="th">Nome</th>
            <th className="th">Tipo</th>
            <th className="th">Status</th>
            <th className="th">Localização</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="odd:bg-custom-gray/20">
              <td className="td">{r.name}</td>
              <td className="td">{r.type}</td>
              <td className="td">{r.status}</td>
              <td className="td">{r.location}</td>
              <td className="td">
                <div className="flex gap-2">
                  <button className="btn" onClick={() => startEdit(r)}>
                    Editar
                  </button>
                  <button className="btn" onClick={() => handleDelete(r.id)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="td" colSpan={5}>
                Nenhum item.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recursos</h2>

      <form
        onSubmit={editing ? handleUpdate : handleCreate}
        className="card max-w-4xl"
      >
        <div className="card-body grid gap-3">
          <input
            className="input"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
          <select
            className="input"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            className="input"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a área</option>
            {areas.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <select
            className="input"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="manutencao">Em manutenção</option>
          </select>
          <textarea
            className="input"
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editing ? "Atualizar" : "Criar"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn"
                onClick={() => setEditing(null)}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      {error && (
        <div className="border border-custom-darkgold bg-custom-darkgold/20 text-custom-ivory px-3 py-2 rounded-lg">
          {error}
        </div>
      )}
      {loading ? (
        <p className="text-custom-ivory/70">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <section className="card h-full min-h-[320px] lg:col-span-4">
            <div className="card-body space-y-3">
              <h3 className="text-lg font-medium">Veículos</h3>
              <List data={groups.veiculo} />
            </div>
          </section>
          <section className="card h-full min-h-[320px] lg:col-span-4">
            <div className="card-body space-y-3">
              <h3 className="text-lg font-medium">Equipamentos</h3>
              <List data={groups.equipamento} />
            </div>
          </section>
          <section className="card h-full min-h-[320px] lg:col-span-4">
            <div className="card-body space-y-3">
              <h3 className="text-lg font-medium">Dispositivos de segurança</h3>
              <List data={groups["dispositivoDeSeguranca"]} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
