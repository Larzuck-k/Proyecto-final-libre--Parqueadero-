import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";

export default db.define("Parqueadero", {
  ID_Parqueadero: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Ubicación: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ID_Administrador: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'ID_Usuario',
    },
  },
}, {
  tableName: 'Parqueadero',
  timestamps: false,
});

