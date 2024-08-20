import { DataTypes } from "sequelize";
import db from "./db.js";
import Parqueadero from "./parqueadero.js";

export default  db.define("Espacio", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Número: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Estado: {
    type: DataTypes.ENUM('Disponible', 'Ocupado'),
    allowNull: false,
  },
  Tipo_Ocupación: {
    type: DataTypes.ENUM('Contratista', 'Cliente_Normal'),
    allowNull: false,
  },
  Fila: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  ID_Parqueadero: {
    type: DataTypes.INTEGER,
    references: {
      model: Parqueadero,
      key: 'ID',
    },
  },
  Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Espacio',
  timestamps: false,
});
