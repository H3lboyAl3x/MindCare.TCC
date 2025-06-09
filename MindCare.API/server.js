import express from "express";
import dotenv from "dotenv";
import sequelize from "./app/config/db.js";
import Routes from "./app/routes/Routes.js";
import cors from "cors";
import { errorHandler } from "./app/middlewares/errorHandler.js";
import axios from "axios";
import http from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/MindCare/API", Routes);
app.use(errorHandler);
const server = http.createServer(app);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado com sucesso!");

    server.listen(PORT, async () => {
      console.log(`Servidor rodando na porta ${PORT}`);

      try {
        const response = await axios.post(`http://localhost:${PORT}/MindCare/API/adm/login`, {
          telefone: "999999999",
          password: "123abc",
        });

        if (response.data) {
          console.log("Admin já existe e login foi bem-sucedido");
        }
      } catch (err) {
        if (err.response?.status === 404) {
          await axios.post(`http://localhost:${PORT}/MindCare/API/adm`, {
            telefone: "999999999",
            password: "123abc",
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