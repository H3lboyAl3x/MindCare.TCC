import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Pacientes from "./Pacientes.js";
import Profissionais from "./Profissionais.js";

const Consultas = sequelize.define('consultas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    idpaci: {
        type: DataTypes.INTEGER,
        references: {
            model: Pacientes,
            key: 'id'
        },
        allowNull: false
    },
    idpro: {
        type: DataTypes.INTEGER,
        references: {
            model: Profissionais,
            key: 'id'
        },
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Consultas;