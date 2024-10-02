import { DataTypes } from "sequelize";
import db from "./db.js";
import Parqueadero from "./parqueadero.js";

export default db.define(
  "Espacio",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_parqueadero: {
      type: DataTypes.INTEGER,
      references: {
        model: Parqueadero,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.ENUM("Disponible", "Ocupado", "Reservado"),
      allowNull: false,
    },
  },
  {
    tableName: "Espacio",
    timestamps: false,
  }
);
