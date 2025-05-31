import * as Services from "../services/Services.js";

//PARA O ADM_______________________________________________
export const getAllAdm = async (req, res) => {
    try {
        const adm = await Services.getAllAdm();
        res.status(200).json(adm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAdm = async (req, res) => {
    try {
        const newadm = await Services.createAdm(req.body);
        res.status(201).json(newadm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAdmById = async (req, res) => {
    try {
        const adm = await Services.getAdmById(req.params.id);
        if (!adm) {
            return res.status(404).json({ message: 'ADM nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(adm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAdmByLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adm = await Services.getAdmByLogin(email, password);
        if (!adm) {
            return res.status(404).json({ message: `Adm não encontrado com nome: ${email}` });
        }
        
        res.status(200).json(adm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAdm = async (req, res) => {
    try {
        const updateadm = await Services.updateAdm(req.params.id, req.body);
        if (!updateadm) {
            return res.status(404).json({ message: 'ADM nao encontrado' });
        }
        res.status(200).json(updateadm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAdm = async (req, res) => {
    try {
        const deleted = await Services.deleteAdm(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'ADM nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//PARA O USUARIO_______________________________________________
export const getAllUsuario = async (req, res) => {
    try {
        const users = await Services.getAllUsuario();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const newUser = await Services.createUsuario(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const user = await Services.getUsuarioById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsuarioByLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Services.getUsuarioByLogin(email, password);
        if (!user) {
            return res.status(404).json({ message: `Usuário não encontrado com email: ${email}` });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const uptadeUsuario = async (req, res) => {
    try {
        const updateUser = await Services.uptadeUsuario(req.params.id, req.body);
        if (!updateUser) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const deleted = await Services.deleteUsuario(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA O PACIENTE______________________________________________
export const getAllPacientes = async (req, res) => {
    try {
        const pacientes = await Services.getAllPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createPaciente = async (req, res) => {
    try {
        const newPaciente = await Services.createPaciente(req.body);
        res.status(201).json(newPaciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getPacienteById = async (req, res) => {
    try {
        const paciente = await Services.getPacienteById(req.params.id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPacienteByfk = async (req, res) => {
    try {
        const { iduser } = req.params;
        const paciente = await Services.getPacienteByfk(iduser);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente nao encontrado de id:' + iduser });
        }
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePaciente = async (req, res) => {
    try {
        const updatePaciente = await Services.updatePaciente(req.params.id, req.body);
        if (!updatePaciente) {
            return res.status(404).json({ message: 'Paciente nao encontrado' });
        }
        res.status(200).json(updatePaciente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deletePaciente = async (req, res) => {
    try {
        const deleted = await Services.deletePaciente(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Paciente nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA O PROFISSIONAL__________________________________________
export const getAllProfissionais = async (req, res) => {
    try {
        const profissionais = await Services.getAllProfissionais();
        res.status(200).json(profissionais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createProfissional = async (req, res) => {
    try {
        const newProfissional = await Services.createProfissional(req.body);
        res.status(201).json(newProfissional);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProfissionalById = async (req, res) => {
    try {
        const profissional = await Services.getProfissionalById(req.params.id);
        if (!profissional) {
            return res.status(404).json({ message: 'Profissional nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(profissional);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProfissionalByfk = async (req, res) => {
    try {
        const { iduser } = req.params;
        const profissional = await Services.getProfissionalByfk(iduser);
        if (!profissional) {
            return res.status(404).json({ message: 'Profissional nao encontrado de id:' + iduser });
        }
        res.status(200).json(profissional);
    } catch (error) {
        console.error("Erro ao buscar profissional:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updateProfissional = async (req, res) => {
    try {
        const updateProfissional = await Services.updateProfissional(req.params.id, req.body);
        if (!updateProfissional) {
            return res.status(404).json({ message: 'Profissional nao encontrado' });
        }
        res.status(200).json(updateProfissional);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProfissional = async (req, res) => {
    try {
        const deleted = await Services.deleteProfissional(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Profissional nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA A CONSULTA______________________________________________
export const getAllConsultas = async (req, res) => {
    try {
        const consultas = await Services.getAllConsultas();
        res.status(200).json(consultas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createConsulta = async (req, res) => {
    try {
        const newConsulta = await Services.createConsulta(req.body);
        res.status(201).json(newConsulta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getConsultaById = async (req, res) => {
    try {
        const consulta = await Services.getConsultaById(req.params.id);
        if (!consulta) {
            return res.status(404).json({ message: 'Consulta nao encontrada de id:' + req.params.id });
        }
        res.status(200).json(consulta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateConsulta = async (req, res) => {
    try {
        const updateConsulta = await Services.updateConsulta(req.params.id, req.body);
        if (!updateConsulta) {
            return res.status(404).json({ message: 'Consulta nao encontrada' });
        }
        res.status(200).json(updateConsulta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteConsulta = async (req, res) => {
    try {
        const deleted = await Services.deleteConsulta(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Consulta nao encontrada' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA O CHAT__________________________________________________
export const getAllChats = async (req, res) => {
    try {
        const chats = await Services.getAllChats();
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createChat = async (req, res) => {
    try {
        const newChat = await Services.createChat(req.body);
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getChatById = async (req, res) => {
    try {
        const chat = await Services.getChatById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getChatByfk = async (req, res) => {
    try {
        const { idpaci } = req.params;
        const chat = await Services.getChatByfk(idpaci);
        if (!chat) {
            return res.status(401).json({ message: 'Chat nao encontrado de id:' + idpaci });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getChatByfk1 = async (req, res) => {
    try {
        const { idpro } = req.params;
        const chat = await Services.getChatByfk1(idpro);
        if (!chat) {
            return res.status(401).json({ message: 'Chat nao encontrado de id:' + idpro });
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateChat = async (req, res) => {
    try {
        const updateChat = await Services.updateChat(req.params.id, req.body);
        if (!updateChat) {
            return res.status(404).json({ message: 'Chat nao encontrado' });
        }
        res.status(200).json(updateChat);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteChat = async (req, res) => {
    try {
        const deleted = await Services.deleteChat(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Chat nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA A MENSAGEM______________________________________________
export const getAllMensagens = async (req, res) => {
    try {
        const mensagens = await Services.getAllMensagens();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMensagem = async (req, res) => {
    try {
        const newMensagem = await Services.createMensagem(req.body);
        res.status(201).json(newMensagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMensagemByfk = async (req, res) => {
    try {
        const {idchat} = req.params
        const mensagem = await Services.getMensagemByfk(idchat);
        if (!mensagem) {
            return res.status(404).json({ message: 'Mensagem nao encontrada de id:' + idchat});
        }
        res.status(200).json(mensagem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getMensagemById = async (req, res) => {
    try {
        const mensagem = await Services.getMensagemById(req.params.id);
        if (!mensagem) {
            return res.status(404).json({ message: 'Mensagem nao encontrada de id:' + req.params.id });
        }
        res.status(200).json(mensagem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMensagem = async (req, res) => {
    try {
        const updateMensagem = await Services.updateMensagem(req.params.id, req.body);
        if (!updateMensagem) {
            return res.status(404).json({ message: 'Mensagem nao encontrada' });
        }
        res.status(200).json(updateMensagem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteMensagem = async (req, res) => {
    try {
        const deleted = await Services.deleteMensagem(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Mensagem nao encontrada' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA A NumeroP______________________________________________
export const getAllNumeroP = async (req, res) => {
    try {
        const numeroP = await Services.getAllNumeroP();
        res.status(200).json(numeroP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createNumeroP = async (req, res) => {
    try {
        const newNumeroP = await Services.createNumeroP(req.body);
        res.status(201).json(newNumeroP);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getNumeroPById = async (req, res) => {
    try {
        const numeroP = await Services.getNumeroPById(req.params.id);
        if (!numeroP) {
            return res.status(404).json({ message: 'NumeroP nao encontrada de id:' + req.params.id });
        }
        res.status(200).json(numeroP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNumeroPByfk = async (req, res) => {
    try {
        const {idprof} = req.params;
        const numeroP = await Services.getNumeroPByfk(idprof);
        if (!numeroP) {
            return res.status(404).json({ message: 'NumeroP nao encontrada de id:' + idprof });
        }
        res.status(200).json(numeroP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNumeroPByfk1 = async (req, res) => {
    try {
        const {idpac} = req.params;
        const numeroP = await Services.getNumeroPByfk1(idpac);
        if (!numeroP) {
            return res.status(404).json({ message: 'NumeroP nao encontrada de id:' + idpac });
        }
        res.status(200).json(numeroP);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateNumeroP = async (req, res) => {
    try {
        const updateNumeroP = await Services.updateNumeroP(req.params.id, req.body);
        if (!updateNumeroP) {
            return res.status(404).json({ message: 'NumeroP nao encontrada' });
        }
        res.status(200).json(updateNumeroP);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteNumeroP = async (req, res) => {
    try {
        const deleted = await Services.deleteNumeroP(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'NumeroP nao encontrada' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA O AreaTrabalho_______________________________________________
export const getAllAreaTrabalho = async (req, res) => {
    try {
        const areaTrabalho = await Services.getAllAreaTrabalho();
        res.status(200).json(areaTrabalho);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAreaTrabalho = async (req, res) => {
    try {
        const newAreaTrabalho = await Services.createAreaTrabalho(req.body);
        res.status(201).json(newAreaTrabalho);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAreaTrabalhoById = async (req, res) => {
    try {
        const areaTrabalho = await Services.getAreaTrabalhoById(req.params.id);
        if (!areaTrabalho) {
            return res.status(404).json({ message: 'Area de Trabalho nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(areaTrabalho);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updadeAreaTrabalho = async (req, res) => {
    try {
        const updateareaTrabalho = await Services.updateAreaTrabalho(req.params.id, req.body);
        if (!updateareaTrabalho) {
            return res.status(404).json({ message: 'Area de Trabalho nao encontrado' });
        }
        res.status(200).json(updateareaTrabalho);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAreaTrabalho = async (req, res) => {
    try {
        const deleted = await Services.deleteAreaTrabalho(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Area de Trabalho nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PARA O AreaProf_______________________________________________
export const getAllAreaProf = async (req, res) => {
    try {
        const areaProf = await Services.getAllAreaProf();
        res.status(200).json(areaProf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createAreaProf = async (req, res) => {
    try {
        const newAreaProf = await Services.createAreaProf(req.body);
        res.status(201).json(newAreaProf);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAreaProfById = async (req, res) => {
    try {
        const areaProf = await Services.getAreaProfById(req.params.id);
        if (!areaProf) {
            return res.status(404).json({ message: 'areaProf nao encontrado de id:' + req.params.id });
        }
        res.status(200).json(areaProf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAreaProfByfk1 = async (req, res) => {
    try {
        const { idpro } = req.params;
        const areaProf = await Services.getAreaProfByfk1(idpro);
        if (!areaProf) {
            return res.status(404).json({ message: 'AreaPro nao encontrado de id:' + idpro });
        }
        res.status(200).json(areaProf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAreaProfByfk2 = async (req, res) => {
    try {
        const { idarea } = req.params;
        const areaProf = await Services.getAreaProfByfk2(idarea);
        if (!areaProf) {
            return res.status(404).json({ message: 'AreaPro nao encontrado de id:' + idarea });
        }
        res.status(200).json(areaProf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updadeAreaProf = async (req, res) => {
    try {
        const updateAreaProf = await Services.updadeAreaProf(req.params.id, req.body);
        if (!updateAreaProf) {
            return res.status(404).json({ message: 'AreaProf nao encontrado' });
        }
        res.status(200).json(updateAreaProf);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAreaProf = async (req, res) => {
    try {
        const deleted = await Services.deleteAreaProf(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'AreaProf nao encontrado' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};