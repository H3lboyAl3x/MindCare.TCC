import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Chats from "./Chats.js";
import Usuarios from "./Usuarios.js";

const Mensagem = sequelize.define('mensagem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idchat: {
        type: DataTypes.INTEGER,
        references: {
            model: Chats,
            key: 'id'
        },
        allowNull:false
    },
    remetente: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuarios,
            key: 'id'
        },
        allowNull:false
    },
    conteudo: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
});

export default Mensagem;