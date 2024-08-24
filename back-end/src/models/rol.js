import { DataTypes } from "sequelize";
import db from "./db.js";

export default  db.define("Rol", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Rol',
  timestamps: false,
});

