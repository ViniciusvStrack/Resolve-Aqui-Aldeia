import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const categorias = ["Jardinagem", "Pintura", "Pedreiro", "Elétrica", "Encanamento", "Limpeza", "Vidraçaria", "Pet Care", "Outro"];
const bairrosDisponiveis = ["Raízes de Aldeia", "Portal de Aldeia", "Morada de Aldeia", "Villa di Aldeia", "Aldeia Park"];

export default function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", telefone: "", whatsapp: "", categoria: "", descricao: "", bairros: [] });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleBairro = (b) => {
    setForm((f) => ({
      ...f,
      bairros: f.bairros.includes(b) ? f.bairros.filter((x) => x !== b) : [...f.bairros, b],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    if (!form.categoria) return setErro("Selecione uma categoria.");
    if (form.bairros.length === 0) return setErro("Selecione ao menos um bairro.");
    setCarregando(true);
    try {
      await registrar(form);
      navigate("/dashboard");
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao cadastrar.");
    } finally {
      setCarregando(false);
    }
  };

  const input = (name, label, type = "text", placeholder = "") => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</label>
      <input name={name} type={type} value={form[name]} onChange={handleChange} required placeholder={placeholder}
        style={{ width: "100%", padding: "12px 16px", border: "1.5px solid var(--borda)", borderRadius: 10, fontFamily: "var(--fonte-corpo)", fontSize: 15 }} />
    </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🔧</div>
        <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 6 }}>Criar conta grátis</h1>
        <p style={{ color: "var(--texto-suave)" }}>Comece a receber clientes em Aldeia hoje mesmo</p>
      </div>

      <div className="card" style={{ padding: 36 }}>
        {erro && (
          <div style={{ background: "#fee", color: "#c0392b", padding: "12px 16px", borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
            ⚠️ {erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {input("nome", "Nome completo", "text", "João Silva")}
          {input("email", "E-mail", "email", "joao@email.com")}
          {input("senha", "Senha", "password", "Mínimo 6 caracteres")}
          {input("telefone", "Telefone", "tel", "(81) 99999-9999")}
          {input("whatsapp", "WhatsApp", "tel", "(81) 99999-9999")}

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Categoria</label>
            <select name="categoria" value={form.categoria} onChange={handleChange} required
              style={{ width: "100%", padding: "12px 16px", border: "1.5px solid var(--borda)", borderRadius: 10, fontFamily: "var(--fonte-corpo)", fontSize: 15, background: "#fff" }}>
              <option value="">Selecione sua área</option>
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Bairros onde atende</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {bairrosDisponiveis.map((b) => (
                <button type="button" key={b} onClick={() => toggleBairro(b)}
                  style={{
                    padding: "7px 14px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "pointer",
                    border: `1.5px solid ${form.bairros.includes(b) ? "#2d6a4f" : "var(--borda)"}`,
                    background: form.bairros.includes(b) ? "#2d6a4f" : "#fff",
                    color: form.bairros.includes(b) ? "#fff" : "#3a3a3a",
                    transition: "all 0.2s",
                  }}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Sobre você (opcional)</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} rows={3} placeholder="Descreva sua experiência e serviços..."
              style={{ width: "100%", padding: "12px 16px", border: "1.5px solid var(--borda)", borderRadius: 10, fontFamily: "var(--fonte-corpo)", fontSize: 15, resize: "vertical" }} />
          </div>

          <button type="submit" className="btn-verde" style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 16 }} disabled={carregando}>
            {carregando ? "Criando conta..." : "Criar conta grátis →"}
          </button>
        </form>
      </div>

      <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--texto-suave)" }}>
        Já tem conta? <Link to="/login" style={{ color: "#2d6a4f", fontWeight: 700 }}>Entrar</Link>
      </p>
    </div>
  );
}
