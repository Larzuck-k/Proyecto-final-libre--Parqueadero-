import { DataTypes } from "sequelize";
import db from "./db.js";

export default db.define("Cliente_Normal", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  Teléfono: {
    type: DataTypes.STRING(15),
  },
  Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Cliente_Normal',
  timestamps: false,
});

