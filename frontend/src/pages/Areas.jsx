import { useEffect, useState } from "react";
import api from "../services/api";

export default function Areas() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    accessLevel: 1,
  });
  const [editing, setEditing] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/areas");
      setItems(data);
    } catch (e) {
      setError(e?.response?.data?.message || "Erro ao carregar áreas");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "accessLevel"
          ? Number(e.target.value)
          : e.target.value,
    });
  const resetForm = () => {
    setForm({ name: "", description: "", accessLevel: 1 });
    setEditing(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/areas", form);
      resetForm();
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao criar");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/areas/${editing.id}`, form);
      resetForm();
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao atualizar");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Excluir área?")) return;
    try {
      await api.delete(`/areas/${id}`);
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao excluir");
    }
  };

  const startEdit = (a) => {
    setEditing(a);
    setForm({
      name: a.name,
      description: a.description || "",
      accessLevel: a.accessLevel,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Áreas</h2>

      <form
        onSubmit={editing ? handleUpdate : handleCreate}
        className="card max-w-xl"
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
          <input
            className="input"
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
          />
          <input
            className="input"
            name="accessLevel"
            type="number"
            min={1}
            max={5}
            placeholder="Nível de acesso"
            value={form.accessLevel}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editing ? "Atualizar" : "Criar"}
            </button>
            {editing && (
              <button type="button" className="btn" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table">
          <table className="w-full">
            <thead>
              <tr>
                <th className="th">Nome</th>
                <th className="th">Nível</th>
                <th className="th">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="odd:bg-custom-gray/20">
                  <td className="td">{a.name}</td>
                  <td className="td">{a.accessLevel}</td>
                  <td className="td">
                    <div className="flex gap-2">
                      <button className="btn" onClick={() => startEdit(a)}>
                        Editar
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(a.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
