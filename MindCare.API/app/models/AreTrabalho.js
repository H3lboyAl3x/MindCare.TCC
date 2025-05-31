import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/db.js";

const AreaTrabalho = sequelize.define('areatrabalho', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

export default AreaTrabalho;