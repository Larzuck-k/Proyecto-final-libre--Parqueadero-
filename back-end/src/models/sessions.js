import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";

const Sessions = db.define(
  "sessions",
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    ip_address: {
      type: DataTypes.STRING(45),
    },
    user_agent: {
      type: DataTypes.TEXT,
    },
    payload: {
      type: DataTypes.TEXT,
    },
    last_activity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "sessions",
    timestamps: false,
  }
);

export default Sessions;
