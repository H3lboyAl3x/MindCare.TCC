import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Adm from "./Administrador.js";

const Usuarios = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    datanascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idadm: {
        type: DataTypes.INTEGER,
        references: {
            model: Adm,
            key: 'id'
        },
        allowNull: false
    }
});

export default Usuarios;