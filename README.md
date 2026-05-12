# 🔧 Resolve Aqui Aldeia

Plataforma SaaS para conectar moradores de Aldeia (Recife-PE) com prestadores de serviços locais.

---

## 📁 Estrutura do Projeto

```
resolve-aqui-aldeia/
├── backend/          → API Node.js + Express + MongoDB
├── frontend/         → React + Bootstrap
└── README.md
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- MongoDB rodando localmente
- Conta no Cloudinary (gratuita)

---

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com seus dados
npm run dev
```

API disponível em: `http://localhost:5000`

---

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

App disponível em: `http://localhost:3000`

---

## 📡 Rotas da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /api/auth/registro | Cadastro do profissional | ❌ |
| POST | /api/auth/login | Login | ❌ |
| GET | /api/auth/eu | Meu perfil | ✅ |
| GET | /api/profissionais | Listar (filtros: categoria, bairro) | ❌ |
| GET | /api/profissionais/:id | Perfil público | ❌ |
| POST | /api/profissionais/:id/avaliar | Avaliar profissional | ❌ |
| PUT | /api/profissionais/meu-perfil | Editar perfil | ✅ |
| POST | /api/profissionais/fotos | Upload de fotos | ✅ |

---

## 💳 Planos

| Plano | Preço | Fotos | Contatos/mês |
|-------|-------|-------|--------------|
| Grátis | R$ 0 | 3 | 5 |
| Profissional | R$ 29/mês | 20 | Ilimitado |
| Premium | R$ 49/mês | Ilimitado | Ilimitado |

---

Feito com ❤️ em Recife — PE
