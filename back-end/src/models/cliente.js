import { DataTypes } from "sequelize";
import db from "./db.js";

const Cliente = db.define(
  "Cliente",
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
    tableName: "Cliente",
    timestamps: false,
  }
);

export default Cliente;
