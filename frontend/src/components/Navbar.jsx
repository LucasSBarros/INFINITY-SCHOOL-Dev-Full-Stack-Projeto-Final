import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-custom-gray bg-custom-black/90 backdrop-blur">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link
            to="/areas-map"
            className="text-custom-ivory font-semibold tracking-wide"
          >
            <span className="inline-block w-2 rounded-full bg-custom-gold mr-2"></span>
            Indústrias Wayne
          </Link>
          {user && (
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/areas-map" className="link">
                Mapa de áreas
              </Link>
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
              <Link to="/users" className="link">
                Usuários
              </Link>
              <Link to="/resources" className="link">
                Recursos
              </Link>
              <Link to="/areas" className="link">
                Áreas
              </Link>
              <Link to="/access-logs" className="link">
                Logs
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-custom-ivory/80">
                {user?.name || user?.email} — <em>{user?.role}</em>
              </span>
              <button className="btn" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <Link to="/" className="btn btn-primary">
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
