import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Profissionais from "./Profissionais.js";
import AreaTrabalho from "./AreTrabalho.js";

const AreaProf = sequelize.define('areaprof', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idarea: {
        type: DataTypes.INTEGER,
        references: {
            model: AreaTrabalho,
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

export default AreaProf;