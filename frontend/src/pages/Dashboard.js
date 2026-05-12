import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const badgeStyle = { gratis: { bg: "#f0f0f0", cor: "#666" }, profissional: { bg: "#e8f5ee", cor: "#2d6a4f" }, premium: { bg: "#fef3ec", cor: "#e76f51" } };

export default function Dashboard() {
  const { profissional } = useAuth();
  if (!profissional) return null;

  const plano = profissional.plano || "gratis";
  const bs = badgeStyle[plano];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 900 }}>Olá, {profissional.nome.split(" ")[0]}! 👋</h1>
        <p style={{ color: "var(--texto-suave)", marginTop: 4 }}>Bem-vindo ao seu painel do Resolve Aqui Aldeia</p>
      </div>

      {/* Cards de status */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
        {[
          { label: "Seu plano", valor: plano.charAt(0).toUpperCase() + plano.slice(1), icone: "💳", cor: bs.cor, bg: bs.bg },
          { label: "Avaliação média", valor: `${profissional.mediaAvaliacoes || "0.0"} ★`, icone: "⭐", cor: "#f4a261", bg: "#fff8f0" },
          { label: "Total de avaliações", valor: profissional.totalAvaliacoes || 0, icone: "💬", cor: "#457b9d", bg: "#eaf3fb" },
          { label: "Status", valor: profissional.ativo ? "Ativo" : "Inativo", icone: "✅", cor: "#2d6a4f", bg: "#e8f5ee" },
        ].map(({ label, valor, icone, cor, bg }) => (
          <div key={label} className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icone}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: cor, marginBottom: 4 }}>{valor}</div>
            <div style={{ fontSize: 13, color: "var(--texto-suave)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Ações rápidas */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Ações rápidas</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to={`/profissionais/${profissional.id}`} className="btn-outline" style={{ fontSize: 14, padding: "10px 20px" }}>
            👁️ Ver meu perfil público
          </Link>
          <button className="btn-verde" style={{ fontSize: 14, padding: "10px 20px" }}>
            📷 Adicionar fotos
          </button>
          <button className="btn-outline" style={{ fontSize: 14, padding: "10px 20px" }}>
            ✏️ Editar perfil
          </button>
        </div>
      </div>

      {/* Upgrade */}
      {plano === "gratis" && (
        <div style={{ background: "linear-gradient(135deg, #2d6a4f, #52b788)", borderRadius: 16, padding: 28, color: "#fff" }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>🚀 Apareça primeiro nas buscas!</h3>
          <p style={{ opacity: 0.9, marginBottom: 20, fontSize: 15 }}>
            Com o plano Profissional (R$ 29/mês) você aparece no topo, recebe mais clientes e tem mais fotos.
          </p>
          <button style={{ background: "#fff", color: "#2d6a4f", border: "none", padding: "12px 28px", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Fazer upgrade agora →
          </button>
        </div>
      )}
    </div>
  );
}
