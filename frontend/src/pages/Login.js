import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await login(form.email, form.senha);
      navigate("/dashboard");
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao fazer login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔧</div>
          <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>Entrar</h1>
          <p style={{ color: "var(--texto-suave)" }}>Acesse seu painel de profissional</p>
        </div>

        <div className="card" style={{ padding: 36 }}>
          {erro && (
            <div style={{ background: "#fee", color: "#c0392b", padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
              ⚠️ {erro}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>E-mail</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                placeholder="seu@email.com"
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid var(--borda)", borderRadius: 10, fontFamily: "var(--fonte-corpo)", fontSize: 15 }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Senha</label>
              <input
                name="senha" type="password" value={form.senha} onChange={handleChange} required
                placeholder="••••••••"
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid var(--borda)", borderRadius: 10, fontFamily: "var(--fonte-corpo)", fontSize: 15 }}
              />
            </div>
            <button type="submit" className="btn-verde" style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16 }} disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--texto-suave)" }}>
          Não tem conta? <Link to="/cadastro" style={{ color: "#2d6a4f", fontWeight: 700 }}>Cadastre-se grátis</Link>
        </p>
      </div>
    </div>
  );
}
