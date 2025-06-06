import express from "express";
import dotenv from "dotenv";
import sequelize from "./app/config/db.js";
import Routes from "./app/routes/Routes.js";
import cors from "cors";
import { errorHandler } from "./app/middlewares/errorHandler.js";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// HABILITAR CORS AQUI
app.use(cors());

// Middleware para JSON
app.use(express.json());

// Rotas da API
app.use("/MindCare/API", Routes);

// Middleware de erro
app.use(errorHandler);

// Conectar ao banco e iniciar servidor
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado com sucesso!");

    const server = app.listen(PORT, async () => {
      console.log(`Servidor rodando na porta ${PORT}`);

      try {
        // Tentar logar o admin para ver se existe
        const response = await axios.post(`http://localhost:${PORT}/MindCare/API/adm/login`, {
          email: "Admin@gmail.com",
          password: "Admin123",
        });

        if (response.data && response.data.sucesso) {
          console.log("Admin já existe e login foi bem-sucedido");
        } else {
          // Caso login falhe, cria o admin
          await axios.post(`http://localhost:${PORT}/MindCare/API/adm`, {
            email: "Admin@gmail.com",
            password: "Admin123",
          });
          console.log("Admin criado com sucesso");
        }
      } catch (err) {
        // Se o login deu erro (admin não existe), cria o admin
        if (err.response && err.response.status === 404) {
          // Login inválido - cria admin
          await axios.post(`http://localhost:${PORT}/MindCare/API/adm`, {
            email: "Admin@gmail.com",
            password: "Admin123"
          });
          console.log("Admin criado pois não existia");
        } else {
          console.error("Erro ao verificar ou criar admin:", err.message);
        }
      }
    });
  } catch (error) {
    console.error("Falha ao conectar com o banco de dados:", error);
  }
})();