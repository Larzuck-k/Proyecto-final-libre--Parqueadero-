import { DataTypes } from "sequelize";
import db from "./db.js";
import Factura from "./factura.js";
import Espacio from "./espacio.js";

export default db.define("DetalleFactura", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_factura: {
    type: DataTypes.INTEGER,
    references: {
      model: Factura,
      key: 'id',
    },
    allowNull: false,
  },
  id_espacio: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'id',
    },
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'DetalleFactura',
  timestamps: false,
});

