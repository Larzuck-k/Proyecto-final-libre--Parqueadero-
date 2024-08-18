import { DataTypes } from "sequelize";
import db from "./db.js";
import Factura from "./factura.js";
import Espacio from "./espacio.js";

export default db.define("DetalleFactura", {
  ID_DetalleFactura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ID_Factura: {
    type: DataTypes.INTEGER,
    references: {
      model: Factura,
      key: 'ID_Factura',
    },
    allowNull: false,
  },
  ID_Espacio: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'ID_Espacio',
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

