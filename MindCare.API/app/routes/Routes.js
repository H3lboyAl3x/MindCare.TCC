import express from "express";
import Mensagem from "../models/Mensagem.js";
import * as Controller from "../controllers/Controller.js";

const router = express.Router();
//PARA O ADM__________________________________________
router.get("/adm", Controller.getAllAdm);
router.post("/adm", Controller.createAdm);
router.get("/adm/:id", Controller.getAdmById);
router.post("/adm/login", Controller.getAdmByLogin);
router.put("/adm/:id", Controller.updateAdm);
router.delete("/adm/:id", Controller.deleteAdm);

//PARA O USUARIO__________________________________________
router.get("/users", Controller.getAllUsuario);
router.post("/users", Controller.createUsuario);
router.get("/users/:id", Controller.getUsuarioById);
router.post("/users/login", Controller.getUsuarioByLogin);
router.put("/users/:id", Controller.uptadeUsuario);
router.delete("/users/:id", Controller.deleteUsuario);

//PARA O PACIENTE_________________________________________
router.get("/pacientes", Controller.getAllPacientes);
router.post("/pacientes", Controller.createPaciente);
router.get("/pacientes/:id", Controller.getPacienteById);
router.get("/pacientes/iduser/:iduser", Controller.getPacienteByfk);
router.put("/pacientes/:id", Controller.updatePaciente);
router.delete("/pacientes/:id", Controller.deletePaciente);

//PARA O PROFISSIONAL_____________________________________
router.get("/profissionais", Controller.getAllProfissionais);
router.post("/profissionais", Controller.createProfissional);
router.get("/profissionais/:id", Controller.getProfissionalById);
router.get("/profissionais/iduser/:iduser", Controller.getProfissionalByfk);
router.put("/profissionais/:id", Controller.updateProfissional);
router.delete("/profissionais/:id", Controller.deleteProfissional);

//PARA A CONSULTA_________________________________________
router.get(`/consultas`, Controller.getAllConsultas);
router.post(`/consultas`, Controller.createConsulta);
router.get(`/consultas/:id`, Controller.getConsultaById);
router.put(`/consultas/:id`, Controller.updateConsulta);
router.delete(`/consultas/:id`, Controller.deleteConsulta);

//PARA O CHAT_____________________________________________
router.get("/chats", Controller.getAllChats);
router.post("/chats", Controller.createChat);
router.get("/chats/:id", Controller.getChatById);
router.get("/chats/idpaci/:idpaci", Controller.getChatByfk);
router.get("/chats/idpro/:idpro", Controller.getChatByfk1);
router.put("/chats/:id", Controller.updateChat);
router.delete("/chats/:id", Controller.deleteChat);

//PARA A MENSAGEM________________________________________
router.get("/mensagens", Controller.getAllMensagens);
router.post("/mensagens", Controller.createMensagem);
router.get("/mensagens/:id", Controller.getMensagemById);
router.get("/mensagens/idchat/:idchat", Controller.getMensagemByfk);
router.put("/mensagens/:id", Controller.updateMensagem);
router.delete("/mensagens/:id", Controller.deleteMensagem);
// Rota DELETE para apagar todas as mensagens de um chat
router.delete('/mensagens/chat/:idchat', async (req, res) => {
    try {
      await Mensagem.destroy({ where: { idchat: req.params.idchat } });
      res.status(200).send({ msg: "Mensagens apagadas com sucesso" });
    } catch (error) {
      res.status(500).send({ error: "Erro ao apagar mensagens" });
    }
  });
  

//PARA A NumeroP________________________________________
router.get("/numeroP", Controller.getAllNumeroP);
router.post("/numeroP", Controller.createNumeroP);
router.get("/numeroP/:id", Controller.getNumeroPById);
router.get("/numeroP/idprof/:idprof", Controller.getNumeroPByfk);
router.get("/numeroP/idpac/:idpac", Controller.getNumeroPByfk1);
router.put("/numeroP/:id", Controller.updateNumeroP);
router.delete("/numeroP/:id", Controller.deleteNumeroP);

//PARA O AREATRABALHO_____________________________________________
router.get("/areatrabalho", Controller.getAllAreaTrabalho);
router.post("/areatrabalho", Controller.createAreaTrabalho);
router.get("/areatrabalho/:id", Controller.getAreaTrabalhoById);
router.put("/areatrabalho/:id", Controller.updadeAreaTrabalho);
router.delete("/areatrabalho/:id", Controller.deleteAreaTrabalho);

//PARA O AREAPROFS_____________________________________________
router.get("/areaprof", Controller.getAllAreaProf);
router.post("/areaprof", Controller.createAreaProf);
router.get("/areaprof/:id", Controller.getAreaProfById);
router.get("/areaprof/idpro/:idpro", Controller.getAreaProfByfk1);
router.get("/areaprof/idarea/:idarea", Controller.getAreaProfByfk2);
router.put("/areaprof/:id", Controller.updadeAreaProf);
router.delete("/areaprof/:id", Controller.deleteAreaProf);

export default router;
