import { DataTypes } from "sequelize";
import db from "./db.js";

const Cache_Locks = db.define(
  "Cache_Locks",
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
    tableName: "Cache_Locks",
    timestamps: false,
  }
);

export default Cache_Locks;
