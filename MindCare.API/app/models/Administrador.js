import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/db.js";

const Adm = sequelize.define('administrador', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Adm;