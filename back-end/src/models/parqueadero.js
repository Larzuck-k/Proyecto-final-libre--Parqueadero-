import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";

export default db.define("Parqueadero", {
  ID: {
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
  ID_Usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'ID',
    },
  }, Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Parqueadero',
  timestamps: false,
});

