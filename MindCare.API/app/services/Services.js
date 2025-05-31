import * as Repository from '../repositories/Repository.js'
//PARA O ADM_____________________________________________
export const createAdm = async (userData) => {
    return await Repository.createAdm(userData);
};

export const getAllAdm = async () => {
    return await Repository.getAllAdm();
};

export const getAdmById = async (id) => {
    return await Repository.getAdmById(id);
};

export const getAdmByLogin = async (email, password) => {
    return await Repository.getAdmByLogin(email, password);
};

export const updateAdm = async (id, userData) => {
    return await Repository.updateAdm(id, userData);
};

export const deleteAdm = async (id) => {
    return await Repository.deleteAdm(id);
};

//PARA O USUARIO_____________________________________________
export const createUsuario = async (userData) => {
    return await Repository.createUsuario(userData);
};

export const getAllUsuario = async () => {
    return await Repository.getAllUsuario();
};

export const getUsuarioById = async (id) => {
    return await Repository.getUsuarioById(id);
};

export const getUsuarioByLogin = async (email, password) => {
    return await Repository.getUsuarioByLogin(email, password);
};

export const uptadeUsuario = async (id, userData) => {
    return await Repository.uptadeUsuario(id, userData);
};

export const deleteUsuario = async (id) => {
    return await Repository.deleteUsuario(id);
};

//PARA O PACIENTE______________________________________________
export const createPaciente = async(pacData) => {
    return await Repository.createPaciente(pacData);
};

export const getAllPacientes = async(pacData) => {
    return await Repository.getAllPacientes(pacData);
};
export const getPacienteById = async(pacData) => {
    return await Repository.getPacienteById(pacData);
};
export const getPacienteByfk = async (iduser) => {
    return await Repository.getPacienteByfk(iduser);
}
export const updatePaciente = async(id, pacienteData) => {
    return await Repository.updatePaciente(id, pacienteData);
};
export const deletePaciente = async(id) => {
    return await Repository.deletePaciente(id);
}

//PARA O PROFISSIONAL__________________________________________
// adicionar profissional
export const createProfissional = async (profissionalData) => {
    return await Repository.createProfissional(profissionalData);
};
// buscar todos os profissionais
export const getAllProfissionais = async () => {
    return await Repository.getAllProfissionais();
};
// buscar um profissional por id
export const getProfissionalById = async (id) => {
    return await Repository.getProfissionalById(id);
};
// buscar um profissional por fk
export const getProfissionalByfk = async (iduser) => {
    return await Repository.getProfissionalByfk(iduser);
};
// atualizar profissional
export const updateProfissional = async (id, profissionalData) => {
    return await Repository.updateProfissional(id, profissionalData);
};
// apagar profissional
export const deleteProfissional = async (id) => {
    return await Repository.deleteProfissional(id);
};

//PARA A CONSULTA______________________________________________
// adicionar consulta
export const createConsulta = async (consultaData) => {
    return await Repository.createConsulta(consultaData);
};
// buscar todas as consultas
export const getAllConsultas = async () => {
    return await Repository.getAllConsultas();
};
// buscar uma consulta por id
export const getConsultaById = async (id) => {
    return await Repository.getConsultaById(id);
};
// atualizar consulta
export const updateConsulta = async (id, consultaData) => {
    return await Repository.updateConsulta(id, consultaData);
};
// apagar consulta
export const deleteConsulta = async (id) => {
    return await Repository.deleteConsulta(id);
};

//PARA O CHAT__________________________________________________
// adicionar chat
export const createChat = async (chatData) => {
    return await Repository.createChat(chatData);
};
// buscar todos os chats
export const getAllChats = async () => {
    return await Repository.getAllChats();
};
// buscar um chat por id
export const getChatById = async (id) => {
    return await Repository.getChatById(id);
};
// buscar um chat por fk
export const getChatByfk = async (idpaci) => {
    return await Repository.getChatByfk(idpaci);
};
// buscar um chat por fk
export const getChatByfk1 = async (idpro) => {
    return await Repository.getChatByfk1(idpro);
};
// atualizar chat
export const updateChat = async (id, chatData) => {
    return await Repository.updateChat(id, chatData);
};
// apagar chat
export const deleteChat = async (id) => {
    return await Repository.deleteChat(id);
};

//PARA A MENSAGEM______________________________________________
// adicionar mensagem
export const createMensagem = async (mensagemData) => {
    return await Repository.createMensagem(mensagemData);
};
// buscar todas as mensagens
export const getAllMensagens = async () => {
    return await Repository.getAllMensagens();
};
// buscar uma mensagem por id
export const getMensagemById = async (id) => {
    return await Repository.getMensagemById(id);
};
// buscar uma mensagem por fk
export const getMensagemByfk = async (idchat) => {
    return await Repository.getMensagemByfk(idchat);
};
// atualizar mensagem
export const updateMensagem = async (id, mensagemData) => {
    return await Repository.updateMensagem(id, mensagemData);
};
// apagar mensagem
export const deleteMensagem = async (id) => {
    return await Repository.deleteMensagem(id);
};

//PARA A NumeroP____________________________________________
// adicionar NumeroP
export const createNumeroP = async (NumeroPData) => {
    return await Repository.createNumeroP(NumeroPData);
};
// buscar todas as NumeroP
export const getAllNumeroP = async () => {
    return await Repository.getAllNumeroP();
};
// buscar uma NumeroP por id
export const getNumeroPById = async (id) => {
    return await Repository.getNumeroPById(id);
};
// buscar uma NumeroP por fk
export const getNumeroPByfk = async (idprof) => {
    return await Repository.getNumeroPByfk(idprof);
};
// buscar uma NumeroP por fk
export const getNumeroPByfk1 = async (idpac) => {
    return await Repository.getNumeroPByfk1(idpac);
};
// atualizar NumeroP
export const updateNumeroP = async (id, NumeroPData) => {
    return await Repository.updateNumeroP(id, NumeroPData);
};
// apagar NumeroP
export const deleteNumeroP = async (id) => {
    return await Repository.deleteNumeroP(id);
};

//PARA A AreaTrabalho____________________________________________
// adicionar AreaTrabalho
export const createAreaTrabalho = async (AreaTrabalhoData) => {
    return await Repository.createAreaTrabalho(AreaTrabalhoData);
};
// buscar todas as AreaTrabalho
export const getAllAreaTrabalho = async () => {
    return await Repository.getAllAreaTrabalho();
};
// buscar uma AreaTrabalho por id
export const getAreaTrabalhoById = async (id) => {
    return await Repository.getAreaTrabalhoById(id);
};
// atualizar AreaTrabalho
export const updateAreaTrabalho = async (id, AreaTrabalhoData) => {
    return await Repository.updateAreaTrabalho(id, AreaTrabalhoData);
};
// apagar AreaTrabalho
export const deleteAreaTrabalho = async (id) => {
    return await Repository.deleteAreaTrabalho(id);
};

//PARA A AreaProf____________________________________________
// adicionar AreaProf
export const createAreaProf = async (AreaProfData) => {
    return await Repository.createAreaProf(AreaProfData);
};
// buscar todas as AreaProf
export const getAllAreaProf = async () => {
    return await Repository.getAllAreaProf();
};
// buscar uma AreaProf por id
export const getAreaProfById = async (id) => {
    return await Repository.getAreaProfById(id);
};
// buscar uma AreaProf por idpro1
export const getAreaProfByfk1 = async (idpro) => {
    return await Repository.getAreaProfByfk1(idpro);
};
// buscar uma AreaProf por idpro2
export const getAreaProfByfk2 = async (idarea) => {
    return await Repository.getAreaProfByfk2(idarea);
};
// atualizar AreaProf
export const updateAreaProf = async (id, AreaProfData) => {
    return await Repository.updateAreaProf(id, AreaProfData);
};
// apagar AreaProf
export const deleteAreaProf = async (id) => {
    return await Repository.deleteAreaProf(id);
};