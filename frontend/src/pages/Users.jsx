import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function Users() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "funcionario",
  });
  const [editing, setEditing] = useState(null);
  const canEdit = user?.role === "administrador";

  const fetchAll = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/users");
      setItems(data);
    } catch (e) {
      setError(e?.response?.data?.message || "Erro ao carregar usuários");
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
    setForm({ name: "", email: "", password: "", role: "funcionario" });
    setEditing(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form);
      resetForm();
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao criar");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editing.id}`, {
        name: form.name,
        email: form.email,
        password: form.password || editing.password,
        role: form.role,
      });
      resetForm();
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao atualizar");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Excluir usuário?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchAll();
    } catch (e) {
      alert(e?.response?.data?.message || "Erro ao excluir");
    }
  };

  const startEdit = (u) => {
    setEditing(u);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
  };

  if (!canEdit) {
    return (
      <p className="text-custom-ivory/80">
        Somente administradores podem gerenciar usuários.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Usuários</h2>

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
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder={editing ? "Nova senha (opcional)" : "Senha"}
            value={form.password}
            onChange={handleChange}
            required={!editing}
          />
          <select
            className="input"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="funcionario">Funcionário</option>
            <option value="gerente">Gerente</option>
            <option value="administrador">Administrador</option>
          </select>
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
                <th className="th">E-mail</th>
                <th className="th">Papel</th>
                <th className="th">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id} className="odd:bg-custom-gray/20">
                  <td className="td">{u.name}</td>
                  <td className="td">{u.email}</td>
                  <td className="td">{u.role}</td>
                  <td className="td">
                    <div className="flex gap-2">
                      <button className="btn" onClick={() => startEdit(u)}>
                        Editar
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleDelete(u.id)}
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
