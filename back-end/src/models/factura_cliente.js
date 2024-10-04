import { DataTypes } from "sequelize";
import db from "./db.js";
import Detalle_Cliente from "./detalle_cliente.js";

export default db.define(
  "factura_cliente",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor_hora: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    id_detalle_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Detalle_Cliente,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "factura_cliente",
    timestamps: false,
  }
);
