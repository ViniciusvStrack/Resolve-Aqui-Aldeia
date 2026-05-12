import { useState, useEffect } from "react";
import api from "../services/api";
import CardProfissional from "../components/CardProfissional";

const categorias = ["Jardinagem", "Pintura", "Pedreiro", "Elétrica", "Encanamento", "Limpeza", "Vidraçaria", "Pet Care"];
const bairros = ["Raízes de Aldeia", "Portal de Aldeia", "Morada de Aldeia", "Villa di Aldeia", "Aldeia Park"];

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState({ categoria: "", bairro: "", pagina: 1 });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    buscar();
  }, [filtros]);

  const buscar = async () => {
    setCarregando(true);
    try {
      const params = { limite: 12, pagina: filtros.pagina };
      if (filtros.categoria) params.categoria = filtros.categoria;
      if (filtros.bairro) params.bairro = filtros.bairro;
      const { data } = await api.get("/profissionais", { params });
      setProfissionais(data.profissionais);
      setTotal(data.total);
    } catch {
      setProfissionais([]);
    } finally {
      setCarregando(false);
    }
  };

  const limparFiltros = () => setFiltros({ categoria: "", bairro: "", pagina: 1 });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>Profissionais em Aldeia</h1>
        <p style={{ color: "var(--texto-suave)" }}>{total} profissional{total !== 1 ? "is" : ""} encontrado{total !== 1 ? "s" : ""}</p>
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
        <select
          value={filtros.categoria}
          onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value, pagina: 1 })}
          style={{ padding: "10px 16px", borderRadius: 50, border: "1.5px solid var(--borda)", fontFamily: "var(--fonte-corpo)", fontSize: 14, background: "#fff", cursor: "pointer" }}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={filtros.bairro}
          onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value, pagina: 1 })}
          style={{ padding: "10px 16px", borderRadius: 50, border: "1.5px solid var(--borda)", fontFamily: "var(--fonte-corpo)", fontSize: 14, background: "#fff", cursor: "pointer" }}
        >
          <option value="">Todos os bairros</option>
          {bairros.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>

        {(filtros.categoria || filtros.bairro) && (
          <button onClick={limparFiltros} style={{ padding: "10px 18px", borderRadius: 50, border: "none", background: "#fee", color: "#c0392b", fontFamily: "var(--fonte-corpo)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            ✕ Limpar filtros
          </button>
        )}
      </div>

      {/* Grid */}
      {carregando ? (
        <div style={{ textAlign: "center", padding: 60, color: "var(--texto-suave)" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
          Buscando profissionais...
        </div>
      ) : profissionais.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h3 style={{ marginBottom: 8 }}>Nenhum profissional encontrado</h3>
          <p style={{ color: "var(--texto-suave)" }}>Tente outros filtros ou volte mais tarde.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {profissionais.map((p) => <CardProfissional key={p._id} profissional={p} />)}
        </div>
      )}
    </div>
  );
}
