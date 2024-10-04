import { DataTypes } from "sequelize";
import db from "./db.js";

const Cache_Locks = db.define(
  "cache_locks",
  {
    key: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    owner: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expiration: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "cache_locks",
    timestamps: false,
  }
);

export default Cache_Locks;
