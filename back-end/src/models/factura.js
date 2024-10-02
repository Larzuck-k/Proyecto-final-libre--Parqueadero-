import { DataTypes } from "sequelize";
import db from "./db.js";
import Contrato from "./contrato.js";
import Contratista from "./contratista.js";

export default db.define(
  "Factura",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    id_contratista: {
      type: DataTypes.INTEGER,
      references: {
        model: Contratista,
        key: "id",
      },
    },
    id_contrato: {
      type: DataTypes.INTEGER,
      references: {
        model: Contrato,
        key: "id",
      },
    },
  },
  {
    tableName: "Factura",
    timestamps: false,
  }
);
