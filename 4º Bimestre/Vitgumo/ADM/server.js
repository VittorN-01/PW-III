import express from "express";
import path from "path";
import mysql from "mysql2";
import bodyParser from "body-parser";
import produtosRoutes from "./routes/produtos.js";

const app = express();

// =====================
// 🔌 CONEXÃO COM MYSQL
// =====================
const dbName = process.env.NODE_ENV === "test"
  ? "Vitgumo_test"
  : "Vitgumo";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: dbName
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
app.use(express.static(path.join(process.cwd(), "public")));

// Página Admin
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "views", "admin.html"));
});

// Rotas CRUD
app.use("/produtos", produtosRoutes);

// =====================
// ▶️ INICIAR SERVIDOR
// =====================
if (process.env.NODE_ENV !== "test") {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

export default app;
