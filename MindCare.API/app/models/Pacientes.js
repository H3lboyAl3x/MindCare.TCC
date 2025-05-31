import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/db.js";
import Usuarios from "./Usuarios.js";

const Pacientes = sequelize.define('pacientes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        },
    },
});

export default Pacientes;