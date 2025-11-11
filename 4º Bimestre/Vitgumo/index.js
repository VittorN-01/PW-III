import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { testarConexao } from "./DAO/conexao.js";
import router from "./views/routers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurações básicas
app.engine("handlebars", engine({
  helpers: {
    eq: (a, b) => a === b, // 👈 registra o helper aqui
  },
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sessão
app.use(
  session({
    secret: "vitgumo_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Teste de conexão com banco
await testarConexao();

// Rota do carrinho
app.use(router);

// Iniciar servidor
const PORTA = process.env.PORTA || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
