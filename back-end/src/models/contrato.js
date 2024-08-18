import { DataTypes } from "sequelize";
import db from "./db.js";
import Contratista from "./contratista.js";
import Espacio from "./espacio.js";

export default db.define("Contrato", {
  ID_Contrato: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Fecha_Inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Fecha_Fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ID_Contratista: {
    type: DataTypes.INTEGER,
    references: {
      model: Contratista,
      key: 'ID_Contratista',
    },
  },
  ID_Espacio: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'ID_Espacio',
    },
  },
}, {
  tableName: 'Contrato',
  timestamps: false,
});

