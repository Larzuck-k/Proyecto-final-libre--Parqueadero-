import { DataTypes } from "sequelize";
import db from "./db.js";
import Espacio from "./espacio.js";
import Cliente_Contratista from "./cliente_contratista.js";

export default db.define(
  "Reserva",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente_contratista: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente_Contratista,
        key: "id",
      },
    },
    id_espacio: {
      type: DataTypes.INTEGER,
      references: {
        model: Espacio,
        key: "id",
      },
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
