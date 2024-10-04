import { DataTypes } from "sequelize";
import db from "./db.js";

const Cliente = db.define(
  "cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "cliente",
    timestamps: false,
  }
);

export default Cliente;
