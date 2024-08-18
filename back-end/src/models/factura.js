import { DataTypes } from "sequelize";
import db from "./db.js";
import Cliente_Normal from "./cliente_normal.js";
import Contratista from "./contratista.js";
import Reserva from "./reserva.js";
import Contrato from "./contrato.js";

export default  db.define("Factura", {
  ID_Factura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Fecha_Emisión: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Monto_Total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  ID_Cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente_Normal,
      key: 'ID_Cliente',
    },
  },
  ID_Contratista: {
    type: DataTypes.INTEGER,
    references: {
      model: Contratista,
      key: 'ID_Contratista',
    },
  },
  ID_Reserva: {
    type: DataTypes.INTEGER,
    references: {
      model: Reserva,
      key: 'ID_Reserva',
    },
  },
  ID_Contrato: {
    type: DataTypes.INTEGER,
    references: {
      model: Contrato,
      key: 'ID_Contrato',
    },
  },
}, {
  tableName: 'Factura',
  timestamps: false,
});
