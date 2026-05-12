import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { profissional, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #ece6d8",
      position: "sticky", top: 0, zIndex: 100,
      padding: "0 24px"
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: "#2d6a4f", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
          }}>🔧</div>
          <div>
            <div style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 900, fontSize: 16, color: "#1a1a1a", lineHeight: 1 }}>
              Resolve Aqui
            </div>
            <div style={{ fontFamily: "var(--fonte-corpo)", fontSize: 11, color: "#2d6a4f", fontWeight: 700, letterSpacing: 1 }}>
              ALDEIA
            </div>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link to="/profissionais" style={{ fontFamily: "var(--fonte-corpo)", fontSize: 14, fontWeight: 500, color: "#4a4a4a" }}>
            Profissionais
          </Link>
          <Link to="/#planos" style={{ fontFamily: "var(--fonte-corpo)", fontSize: 14, fontWeight: 500, color: "#4a4a4a" }}>
            Planos
          </Link>

          {profissional ? (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link to="/dashboard" style={{ fontFamily: "var(--fonte-corpo)", fontSize: 14, fontWeight: 600, color: "#2d6a4f" }}>
                Olá, {profissional.nome.split(" ")[0]} 👋
              </Link>
              <button onClick={handleLogout} className="btn-outline" style={{ padding: "7px 18px", fontSize: 13 }}>
                Sair
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/login" className="btn-outline" style={{ padding: "8px 18px", fontSize: 13 }}>
                Entrar
              </Link>
              <Link to="/cadastro" className="btn-verde" style={{ padding: "8px 18px", fontSize: 13 }}>
                Seja um Pro
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
