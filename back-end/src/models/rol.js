import { DataTypes } from "sequelize";
import db from "./db.js";

export default  db.define("Rol", {
  ID_Rol: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'Rol',
  timestamps: false,
});

