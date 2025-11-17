// server.js - Vitgumo Supermercado Admin Backend
// ===============================================
// Express + MySQL + Rotas Separadas + Public + View Engine (HTML)

import express from "express";
import path from "path";
import mysql from "mysql2";
import bodyParser from "body-parser";
import produtosRoutes from "./routes/produtos.js";

const app = express();
const PORT = 3000;

// =====================
// 🔌 CONEXÃO COM MYSQL
// =====================
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "Vitgumo"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("MySQL conectado com sucesso!");
});

// =====================
// 🔧 MIDDLEWARES
// =====================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Public Folder (CSS, JS, Images)
app.use(express.static(path.join(process.cwd(), "public")));

// =====================
// ROTAS
// =====================
// Página do ADMIN
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "admin.html"));
});

// CRUD de Produtos (rotas separadas)
app.use("/produtos", produtosRoutes);

// =====================
// ▶️ INICIAR SERVIDOR
// =====================
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});