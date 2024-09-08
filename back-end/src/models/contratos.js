import { DataTypes } from "sequelize";
import db from "./db.js";

export default db.define(
  "Contratos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tipo:{
      type: DataTypes.ENUM('Contrato','Tiempo'),
      allowNull:false,
    },
    tiempo:{
      type:DataTypes.ENUM("Minutos","Horas","Dias","Meses"),
      allowNull: false,
    }
  },
  {
    tableName: "Contratos",
    timestamps: false,
  }
);

