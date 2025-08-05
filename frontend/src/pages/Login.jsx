import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
    } catch (e) {
      setError(e?.response?.data?.message || "Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-custom-black to-custom-gray">
      <div className="card w-full max-w-md">
        <div className="card-body space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-custom-gold text-2xl font-semibold">
              <span className="inline-block w-3 rounded-full bg-custom-gold" />
              Indústrias Wayne
            </div>
            <p className="text-custom-ivory/70 text-sm mt-1">
              Acesse sua conta
            </p>
          </div>

          {error && (
            <div className="border border-custom-darkgold text-custom-ivory bg-custom-darkgold/20 p-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              className="input"
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Senha"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button disabled={loading} className="btn btn-primary">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
