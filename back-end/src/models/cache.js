import { DataTypes } from "sequelize";
import db from "./db.js";

const Cache = db.define(
  "Cache",
  {
    key: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Cache",
    timestamps: false,
  }
);

export default Cache;
