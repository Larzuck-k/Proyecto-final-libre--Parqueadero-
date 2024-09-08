import { DataTypes } from "sequelize";
import db from "./db.js";
import Cliente_Contratista from "./cliente_contratista.js";

const Cliente = db.define(
  "Cliente_Normal",
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
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING(15),
    },
    ultima_visita: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Cliente_Normal",
    timestamps: false,
  }
);




export default Cliente;