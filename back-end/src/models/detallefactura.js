import { DataTypes } from "sequelize";
import db from "./db.js";
import Factura from "./factura.js";
import Espacio from "./espacio.js";

export default db.define("DetalleFactura", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_Factura: {
    type: DataTypes.INTEGER,
    references: {
      model: Factura,
      key: 'ID',
    },
    allowNull: false,
  },
  ID_Espacio: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'ID',
    },
    allowNull: false,
  },
  Monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'DetalleFactura',
  timestamps: false,
});

