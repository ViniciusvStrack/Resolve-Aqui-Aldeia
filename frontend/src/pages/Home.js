import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CardProfissional from "../components/CardProfissional";

const categorias = [
  { icone: "🌿", label: "Jardinagem" },
  { icone: "🎨", label: "Pintura" },
  { icone: "🧱", label: "Pedreiro" },
  { icone: "💡", label: "Elétrica" },
  { icone: "🔧", label: "Encanamento" },
  { icone: "🧹", label: "Limpeza" },
  { icone: "🪟", label: "Vidraçaria" },
  { icone: "🐾", label: "Pet Care" },
];

const planos = [
  { nome: "Grátis", preco: "R$ 0", periodo: "", cor: "#6c757d", recursos: ["Perfil básico", "3 fotos", "5 contatos/mês", "Listagem padrão"], destaque: false },
  { nome: "Profissional", preco: "R$ 29", periodo: "/mês", cor: "#2d6a4f", recursos: ["Perfil completo", "20 fotos", "Contatos ilimitados", "Destaque na busca", "Selo verificado"], destaque: true },
  { nome: "Premium", preco: "R$ 49", periodo: "/mês", cor: "#e76f51", recursos: ["Tudo do Pro", "Fotos ilimitadas", "Topo da listagem", "Badge Premium", "Suporte prioritário"], destaque: false },
];

export default function Home() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisivel(true), 100);
    buscarProfissionais();
  }, []);

  useEffect(() => {
    buscarProfissionais(categoriaSelecionada);
  }, [categoriaSelecionada]);

  const buscarProfissionais = async (categoria = null) => {
    setCarregando(true);
    try {
      const params = categoria ? { categoria, limite: 6 } : { limite: 6 };
      const { data } = await api.get("/profissionais", { params });
      setProfissionais(data.profissionais);
    } catch {
      setProfissionais([]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #f5f0e8 0%, #fafaf7 60%, #eef6f1 100%)",
        padding: "80px 24px 60px"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ opacity: visivel ? 1 : 0, transform: visivel ? "none" : "translateY(30px)", transition: "all 0.9s ease" }}>
            <span className="section-tag" style={{ background: "#e8f5ee", color: "#2d6a4f" }}>
              📍 Aldeia, Pernambuco
            </span>
            <h1 style={{ fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 900, color: "#1a1a1a", margin: "12px 0 20px" }}>
              O serviço que<br />
              <span style={{ color: "#2d6a4f" }}>você precisa,</span><br />
              do vizinho que<br />você confia.
            </h1>
            <p style={{ fontSize: 17, color: "var(--texto-suave)", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
              Encontre profissionais verificados de jardinagem, pintura, pedreiro e muito mais — todos aqui em Aldeia.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/profissionais" className="btn-verde" style={{ fontSize: 16, padding: "14px 32px" }}>
                Encontrar profissional
              </Link>
              <Link to="/cadastro" className="btn-outline" style={{ fontSize: 16, padding: "14px 28px" }}>
                Sou profissional →
              </Link>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 40 }}>
              {[["50+", "Profissionais"], ["200+", "Serviços feitos"], ["4.9★", "Avaliação média"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#2d6a4f" }}>{num}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card hero */}
          <div style={{ opacity: visivel ? 1 : 0, transition: "all 0.9s ease 0.3s" }}>
            <div className="card" style={{ padding: 32, boxShadow: "0 30px 80px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 54, height: 54, background: "linear-gradient(135deg, #2d6a4f, #52b788)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🌿</div>
                <div>
                  <div style={{ fontFamily: "var(--fonte-titulo)", fontWeight: 700, fontSize: 17 }}>João Silva</div>
                  <div style={{ fontSize: 13, color: "var(--texto-suave)" }}>Jardinagem & Paisagismo</div>
                  <div style={{ color: "#f4a261", fontSize: 13, marginTop: 2 }}>★★★★★ <span style={{ color: "#666", fontSize: 12 }}>4.9 (38)</span></div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {["Raízes", "Portal", "Morada"].map(b => (
                  <span key={b} style={{ background: "#e8f5ee", color: "#2d6a4f", padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 500 }}>📍 {b}</span>
                ))}
              </div>
              <a href="https://wa.me/5581999999999" target="_blank" rel="noopener noreferrer"
                className="wpp-btn" style={{ width: "100%", justifyContent: "center" }}>
                💬 Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-tag" style={{ background: "#fef3ec", color: "#e76f51" }}>O que você precisa?</span>
            <h2 style={{ fontSize: 36, fontWeight: 900 }}>Buscar por categoria</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {categorias.map((c) => (
              <button
                key={c.label}
                onClick={() => setCategoriaSelecionada(categoriaSelecionada === c.label ? null : c.label)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 50,
                  border: `2px solid ${categoriaSelecionada === c.label ? "#2d6a4f" : "#d4c9b0"}`,
                  background: categoriaSelecionada === c.label ? "#2d6a4f" : "#fff",
                  color: categoriaSelecionada === c.label ? "#fff" : "#3a3a3a",
                  fontFamily: "var(--fonte-corpo)", fontSize: 15, fontWeight: 500,
                  cursor: "pointer", transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: 18 }}>{c.icone}</span> {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROFISSIONAIS */}
      <section style={{ padding: "64px 24px", background: "#f8f5f0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-tag" style={{ background: "#e8f5ee", color: "#2d6a4f" }}>Aqui perto de você</span>
            <h2 style={{ fontSize: 36, fontWeight: 900 }}>Profissionais em destaque</h2>
          </div>

          {carregando ? (
            <div style={{ textAlign: "center", padding: 40, color: "var(--texto-suave)" }}>Carregando...</div>
          ) : profissionais.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ color: "var(--texto-suave)" }}>Nenhum profissional encontrado nessa categoria ainda.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
              {profissionais.map((p) => <CardProfissional key={p._id} profissional={p} />)}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link to="/profissionais" className="btn-outline">Ver todos os profissionais →</Link>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag" style={{ background: "#fef3ec", color: "#e76f51" }}>Para profissionais</span>
            <h2 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Escolha seu plano</h2>
            <p style={{ color: "var(--texto-suave)", maxWidth: 460, margin: "0 auto" }}>
              Comece grátis e cresça conforme sua demanda aumenta.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "center" }}>
            {planos.map((p) => (
              <div key={p.nome} className="card" style={{
                padding: "36px 28px", textAlign: "center",
                position: "relative", overflow: "visible",
                ...(p.destaque ? { border: `2px solid ${p.cor}`, background: "#f0f7f4", transform: "scale(1.04)", boxShadow: "0 20px 50px rgba(45,106,79,0.18)" } : {})
              }}>
                {p.destaque && (
                  <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: p.cor, color: "#fff", padding: "4px 20px", borderRadius: 50, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                    MAIS POPULAR
                  </div>
                )}
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: p.cor, marginBottom: 12 }}>{p.nome}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "center", marginBottom: 24 }}>
                  <span style={{ fontFamily: "var(--fonte-titulo)", fontSize: 40, fontWeight: 900 }}>{p.preco}</span>
                  <span style={{ fontSize: 14, color: "#888" }}>{p.periodo}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 8 }}>
                  {p.recursos.map((r) => (
                    <li key={r} style={{ fontSize: 14, color: "#444", padding: "8px 0", borderBottom: "1px solid #f0ece4", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: p.cor, fontWeight: 700 }}>✓</span> {r}
                    </li>
                  ))}
                </ul>
                <Link to="/cadastro" className="btn-verde" style={{
                  width: "100%", justifyContent: "center", marginTop: 24, display: "flex",
                  background: p.destaque ? p.cor : "transparent",
                  color: p.destaque ? "#fff" : p.cor,
                  border: `2px solid ${p.cor}`,
                }}>
                  Começar agora
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#9a9a9a", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--fonte-titulo)", fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Resolve Aqui Aldeia</div>
        <div style={{ fontSize: 13, marginBottom: 8 }}>Conectando moradores e profissionais em Aldeia, Recife — PE</div>
        <div style={{ fontSize: 12 }}>© 2025 Resolve Aqui Aldeia · Feito com ❤️ em Recife</div>
      </footer>
    </div>
  );
}
