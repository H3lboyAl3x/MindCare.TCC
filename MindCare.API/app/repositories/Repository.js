import Usuarios from "../models/Usuarios.js";
import Pacientes from "../models/Pacientes.js";
import Profissionais from "../models/Profissionais.js";
import Consultas from "../models/Consultas.js";
import chats from "../models/Chats.js";
import Mensagem from "../models/Mensagem.js";
import NumeroP from "../models/NumeroP.js";
import AreaTrabalho from "../models/AreTrabalho.js";
import AreaProf from "../models/AreaProf.js";
import Adm from "../models/Administrador.js";

//PARA O ADM____________________________________________________________________________--
//adicionar adm
export const createAdm = async (admData) => {
    return await Adm.create(admData); 
}
//buscar todos adm
export const getAllAdm = async () => {
    return await Adm.findAll();
}
//buscar um adm por id
export const getAdmById = async (id) => {
    return await Adm.findByPk(id);
}
//buscar um adm por email e password(Login)
export const getAdmByLogin = async (email, password) => {
    return await Adm.findOne({ where: { email, password } });
};
//atualizar adm
export const updateAdm = async (id, updates) => {
    const adm = await Adm.findByPk(id);
    if (!adm) {
        return null;
    }
    return await adm.update(updates);
}
//deletar adm
export const deleteAdm = async (id) => {
    const adm = await Adm.findByPk(id);
    if (!adm) {
        return null
    }
    await adm.destroy();
    return true;
}
 
//PARA O USUARIO_____________________________________________________________________
//adicionar usurio
export const createUsuario = async (userData) => {
    return await Usuarios.create(userData);
};
//buscar todos os usuarios
export const getAllUsuario = async () => {
    return await Usuarios.findAll();
};
//buscar um usuario por id
export const getUsuarioById = async (id) => {
    return await Usuarios.findByPk(id);
};
//buscar um usuario por Email e Password(Login)
export const getUsuarioByLogin = async (email, password) => {
    return await Usuarios.findOne({ where: { email, password } });
};
//atualizar usuario
export const uptadeUsuario = async (id, updates) => {
    const user = await Usuarios.findByPk(id);
    if (!user) {
        return null;
    }
    return await user.update(updates);
};
//apagar usuario
export const deleteUsuario = async (id) => {
    const user = await Usuarios.findByPk(id);
    if (!user) {
        return null
    }
    await user.destroy();
    return true;
}

// PARAPACIENTES________________________________________________
// adicionar paciente
export const createPaciente = async (pacienteData) => {
    return await Pacientes.create(pacienteData);
};
// buscar todos os pacientes
export const getAllPacientes = async () => {
    return await Pacientes.findAll();
};
// buscar um paciente por id
export const getPacienteById = async (id) => {
    return await Pacientes.findByPk(id);
};

// buscar um pacinete por chave estrangeira
export const getPacienteByfk = async (iduser) => {
    return await Pacientes.findOne({where: {iduser}})
}

// atualizar paciente
export const updatePaciente = async (id, updates) => {
    const paciente = await Pacientes.findByPk(id);
    if (!paciente) {
        return null;
    }
    return await paciente.update(updates);
};
// apagar paciente
export const deletePaciente = async (id) => {
    const paciente = await Pacientes.findByPk(id);
    if (!paciente) {
        return null
    }
    await paciente.destroy();
    return true;
};


//PARAPROFISSIONAIS___________________________________________
// adicionar profissional
export const createProfissional = async (profissionalData) => {
    return await Profissionais.create(profissionalData);
};
// buscar todos os profissionais
export const getAllProfissionais = async () => {
    return await Profissionais.findAll();
};
// buscar um profissional por id
export const getProfissionalById = async (id) => {
    return await Profissionais.findByPk(id);
};
// buscar um profissional por chave estrangeira
export const getProfissionalByfk = async (iduser) => {
    return await Profissionais.findOne({where: {iduser}})
};
// atualizar profissional
export const updateProfissional = async (id, updates) => {
    const profissional = await Profissionais.findByPk(id);
    if (!profissional) {
        return null;
    }
    return await profissional.update(updates);
};
// apagar profissional
export const deleteProfissional = async (id) => {
    const profissional = await Profissionais.findByPk(id);
    if (!profissional) {
        return null
    }
    await profissional.destroy();
    return true;
};

//PARACONSULTAS______________________________________________
// adicionar consulta
export const createConsulta = async (consultaData) => {
    return await Consultas.create(consultaData);
};
// buscar todas as consultas
export const getAllConsultas = async () => {
    return await Consultas.findAll();
};
// buscar uma consulta por id
export const getConsultaById = async (id) => {
    return await Consultas.findByPk(id);
};
// atualizar consulta
export const updateConsulta = async (id, updates) => {
    const consulta = await Consultas.findByPk(id);
    if (!consulta) {
        return null;
    }
    return await consulta.update(updates);
};
// apagar consulta
export const deleteConsulta = async (id) => {
    const consulta = await Consultas.findByPk(id);
    if (!consulta) {
        return null
    }
    await consulta.destroy();
    return true;
};

//PARACHAT__________________________________________________
// adicionar chat
export const createChat = async (chatData) => {
    return await chats.create(chatData);
};
// buscar todos os chats
export const getAllChats = async () => {
    return await chats.findAll();
};
// buscar um chat por id
export const getChatById = async (id) => {
    return await chats.findByPk(id);
};
// buscar um chat por fk
export const getChatByfk = async (idpaci) => {
    return await chats.findAll({where: {idpaci}});
};
// buscar um chat por fk
export const getChatByfk1 = async (idpro) => {
    return await chats.findAll({where: {idpro}});
};
// atualizar chat
export const updateChat = async (id, updates) => {
    const chat = await chats.findByPk(id);
    if (!chat) {
        return null;
    }
    return await chat.update(updates);
};
// apagar chat
export const deleteChat = async (id) => {
    const chat = await chats.findByPk(id);
    if (!chat) {
        return null
    }
    await chat.destroy();
    return true;
};

//PARAMENSAGEM______________________________________________
// adicionar mensagem
export const createMensagem = async (mensagemData) => {
    return await Mensagem.create(mensagemData);
};
// buscar todas as mensagens
export const getAllMensagens = async () => {
    return await Mensagem.findAll();
};
// buscar uma mensagem por id
export const getMensagemById = async (id) => {
    return await Mensagem.findByPk(id);
};
// buscar uma mensagem por fk
export const getMensagemByfk = async (idchat) => {
    return await Mensagem.findAll({where: {idchat}});
};
// atualizar mensagem
export const updateMensagem = async (id, updates) => {
    const mensagem = await Mensagem.findByPk(id);
    if (!mensagem) {
        return null;
    }
    return await mensagem.update(updates);
};
// apagar mensagem
export const deleteMensagem = async (id) => {
    const mensagem = await Mensagem.findByPk(id);
    if (!mensagem) {
        return null
    }
    await mensagem.destroy();
    return true;
};

//PARANUMEROP______________________________________________
// adicionar Numerop
export const createNumeroP = async (numeroPData) => {
    return await NumeroP.create(numeroPData);
};
// buscar todas as NumeroP
export const getAllNumeroP = async () => {
    return await NumeroP.findAll();
};
// buscar uma NumeroP por id
export const getNumeroPById = async (id) => {
    return await NumeroP.findByPk(id);
};
// buscar uma NumeroP por fk
export const getNumeroPByfk = async (idprof) => {
    return await NumeroP.findAll({where: {idprof}});
};
// buscar uma NumeroP por fk
export const getNumeroPByfk1 = async (idpac) => {
    return await NumeroP.findAll({where: {idpac}});
};
// atualizar NumeroP
export const updateNumeroP = async (id, updates) => {
    const numeroP = await NumeroP.findByPk(id);
    if (!numeroP) {
        return null;
    }
    return await numeroP.update(updates);
};
// apagar NumeroP
export const deleteNumeroP = async (id) => {
    const numeroP = await NumeroP.findByPk(id);
    if (!numeroP) {
        return null
    }
    await numeroP.destroy();
    return true;
};

// adicionar AreaTrabalho
export const createAreaTrabalho = async (AreaTrabalhoData) => {
    return await AreaTrabalho.create(AreaTrabalhoData);
};
// buscar todas as AreaTrabalho
export const getAllAreaTrabalho= async () => {
    return await AreaTrabalho.findAll();
};
// buscar uma AreaTrabalho por id
export const getAreaTrabalhoById = async (id) => {
    return await AreaTrabalho.findByPk(id);
};
// atualizar AreaTrabalho
export const updateAreaTrabalho = async (id, updates) => {
    const areatrabalho = await AreaTrabalho.findByPk(id);
    if (!areatrabalho) {
        return null;
    }
    return await areatrabalho.update(updates);
};
// apagar AreaTrabalho
export const deleteAreaTrabalho = async (id) => {
    const areatrabalho = await AreaTrabalho.findByPk(id);
    if (!areatrabalho) {
        return null
    }
    await areatrabalho.destroy();
    return true;
};

// adicionar AreaProf
export const createAreaProf = async (AreaProfData) => {
    return await AreaProf.create(AreaProfData);
};
// buscar todas as AreaProf
export const getAllAreaProf = async () => {
    return await AreaProf.findAll();
};
// buscar uma AreaProf por id
export const getAreaProfById = async (id) => {
    return await AreaProf.findByPk(id);
};
// buscar uma AreaProf por fk1
export const getAreaProfByfk1 = async (idpro) => {
    return await AreaProf.findOne({where: {idpro}});
};
// buscar uma AreaProf por fk2
export const getAreaProfByfk2 = async (idarea) => {
    return await AreaProf.findOne({where: {idarea}});
};
// atualizar AreaProf
export const updateAreaProf = async (id, updates) => {
    const areaprof = await AreaProf.findByPk(id);
    if (!areaprof) {
        return null;
    }
    return await areaprof.update(updates);
};
// apagar AreaProf
export const deleteAreaProf = async (id) => {
    const areaprof = await AreaProf.findByPk(id);
    if (!areaprof) {
        return null
    }
    await areaprof.destroy();
    return true;
};