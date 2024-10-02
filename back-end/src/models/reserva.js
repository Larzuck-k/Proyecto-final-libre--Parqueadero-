import { DataTypes } from "sequelize";
import db from "./db.js";
import Espacio from "./espacio.js";

export default db.define(
  "Reserva",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_espacio: {
      type: DataTypes.UUID,
      references: {
        model: Espacio,
        key: "id",
      },
    },
    placa: {
      type: DataTypes.STRING(8),
      defaultValue: "NINGUNO",
    },
    fin_reserva: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "Reserva",
    timestamps: false,
  }
);
