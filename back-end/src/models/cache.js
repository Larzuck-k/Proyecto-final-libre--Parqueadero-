import { DataTypes } from "sequelize";
import db from "./db.js";

const Cache = db.define(
  "cache",
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
    tableName: "cache",
    timestamps: false,
  }
);

export default Cache;
