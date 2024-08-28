import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";

export default  db.define("Contratista", {
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
  Fecha_Inicio_Contrato: {
    type: DataTypes.DATE,
  },
  Fecha_Fin_Contrato: {
    type: DataTypes.DATE,
  },
  ID_Usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'ID',
    },
  
  },
  Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Contratista',
  timestamps: false,
});


