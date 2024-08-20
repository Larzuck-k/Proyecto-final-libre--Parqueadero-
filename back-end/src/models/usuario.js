import { DataTypes } from "sequelize";
import db from "./db.js";
import Rol from "./rol.js";

export default db.define("Usuario", {
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
  Contraseña: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ID_Rol: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: 'ID',
    },
  },
  Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Usuario',
  timestamps: false,
});

