import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuarios from "./Usuarios.js"

const Profissionais = sequelize.define('profissionais', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        },
    },
    tempoexperiencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default Profissionais;