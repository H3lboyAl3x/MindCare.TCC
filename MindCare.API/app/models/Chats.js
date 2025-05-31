import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Pacientes from "./Pacientes.js";
import Profissionais from "./Profissionais.js";

const Chats = sequelize.define('chats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    }
});

export default Chats;