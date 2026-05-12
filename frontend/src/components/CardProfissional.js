import { Link } from "react-router-dom";

const coresCategoria = {
  "Jardinagem": "#2d6a4f",
  "Pintura": "#e76f51",
  "Pedreiro": "#457b9d",
  "Elétrica": "#f4a261",
  "Encanamento": "#2196f3",
  "Limpeza": "#9c27b0",
  "Vidraçaria": "#00bcd4",
  "Pet Care": "#ff7043",
  "Outro": "#607d8b",
};

const iconeCategoria = {
  "Jardinagem": "🌿", "Pintura": "🎨", "Pedreiro": "🧱",
  "Elétrica": "💡", "Encanamento": "🔧", "Limpeza": "🧹",
  "Vidraçaria": "🪟", "Pet Care": "🐾", "Outro": "⚙️",
};

export default function CardProfissional({ profissional }) {
  const cor = coresCategoria[profissional.categoria] || "#2d6a4f";
  const icone = iconeCategoria[profissional.categoria] || "⚙️";

  const estrelas = (media) => {
    const cheias = Math.round(media);
    return "★".repeat(cheias) + "☆".repeat(5 - cheias);
  };

  return (
    <div className="card" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
      {/* Faixa colorida no topo */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: cor }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 50, height: 50, background: `${cor}18`, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, border: `2px solid ${cor}30`
        }}>
          {icone}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span className={`badge-plano badge-${profissional.plano}`}>
            {profissional.plano}
          </span>
          {profissional.verificado && (
            <span style={{ fontSize: 11, color: "#2d6a4f", fontWeight: 600 }}>✅ Verificado</span>
          )}
        </div>
      </div>

      <div style={{ fontFamily: "var(--fonte-titulo)", fontSize: 18, fontWeight: 700, marginBottom: 2 }}>
        {profissional.nome}
      </div>
      <div style={{ fontSize: 13, color: "var(--texto-suave)", marginBottom: 10 }}>
        {profissional.categoria}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span className="stars" style={{ fontSize: 13 }}>
          {estrelas(profissional.mediaAvaliacoes || 0)}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{profissional.mediaAvaliacoes || "0.0"}</span>
        <span style={{ fontSize: 12, color: "var(--texto-leve)" }}>
          ({profissional.totalAvaliacoes || 0})
        </span>
      </div>

      {profissional.bairros?.length > 0 && (
        <div style={{ fontSize: 12, color: "var(--texto-leve)", marginBottom: 16 }}>
          📍 {profissional.bairros.slice(0, 2).join(", ")}
          {profissional.bairros.length > 2 && ` +${profissional.bairros.length - 2}`}
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <a
          href={`https://wa.me/55${profissional.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wpp-btn"
          style={{ flex: 1, justifyContent: "center", fontSize: 13 }}
        >
          💬 WhatsApp
        </a>
        <Link
          to={`/profissionais/${profissional._id}`}
          style={{
            padding: "10px 16px", border: "1.5px solid var(--borda)", borderRadius: "var(--radius-pill)",
            fontSize: 13, fontWeight: 600, color: "var(--texto-suave)", background: "#fff",
            display: "flex", alignItems: "center"
          }}
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
