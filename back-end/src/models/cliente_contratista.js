import { DataTypes } from "sequelize";
import db from "./db.js";
import Contratista from "./contratista.js";
import Cliente from "./cliente_normal.js";

const Cliente_Contratista = db.define(
  "Cliente_Contratista",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: "id",
      },
      allowNull: true,
    },
    id_contratista: {
      type: DataTypes.INTEGER,
      references: {
        model: Contratista,
        key: "id",
      },
      allowNull: true,
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "Cliente_Contratista",
    timestamps: false,
  }
);



export default Cliente_Contratista;
