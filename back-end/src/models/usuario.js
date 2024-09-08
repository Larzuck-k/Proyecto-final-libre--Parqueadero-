import { DataTypes } from "sequelize";
import db from "./db.js";
import Rol from "./rol.js";

export default db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      references: {
        model: Rol,
        key: "id",
      },
      allowNull:false,
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

