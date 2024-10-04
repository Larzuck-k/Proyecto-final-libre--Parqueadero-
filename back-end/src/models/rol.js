import { DataTypes } from "sequelize";
import db from "./db.js";

export default db.define(
  "rol",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "rol",
    timestamps: false,
  }
);
