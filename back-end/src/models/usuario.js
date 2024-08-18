import { DataTypes } from "sequelize";
import db from "./db.js";
import Rol from "./rol.js";

export default  db.define("Usuario", {
  ID_Usuario: {
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
      key: 'ID_Rol',
    },
  },
}, {
  tableName: 'Usuario',
  timestamps: false,
});

