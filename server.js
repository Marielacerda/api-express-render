const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve os arquivos da pasta 'public' na raiz (/)
app.use(express.static(path.join(__dirname, "public")));

// Banco simples em memória
let usuarios = [
  { id: 1, nome: "João" },
  { id: 2, nome: "Maria" },
];

// GET - Listar usuários
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// GET por ID
app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json(usuario);
});

// POST - Criar usuário
app.post("/usuarios", (req, res) => {
  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome: req.body.nome,
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// PUT - Atualizar usuário
app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  usuario.nome = req.body.nome;
  res.json(usuario);
});

// DELETE - Remover usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário removido" });
});

// Porta dinâmica (exigida pelo Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
