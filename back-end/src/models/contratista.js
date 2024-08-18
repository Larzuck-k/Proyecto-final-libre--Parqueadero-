import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";

export default  db.define("Contratista", {
  ID_Contratista: {
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
  ID_Administrador: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'ID_Usuario',
    },
  },
}, {
  tableName: 'Contratista',
  timestamps: false,
});


