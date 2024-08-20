import { DataTypes } from "sequelize";
import db from "./db.js";
import Cliente_Normal from "./cliente_normal.js";
import Contratista from "./contratista.js";
import Reserva from "./reserva.js";
import Contrato from "./contrato.js";

export default  db.define("Factura", {
  ID: {
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
      key: 'ID',
    },
  },
  ID_Contratista: {
    type: DataTypes.INTEGER,
    references: {
      model: Contratista,
      key: 'ID',
    },
  },
  ID_Reserva: {
    type: DataTypes.INTEGER,
    references: {
      model: Reserva,
      key: 'ID',
    },
  },
  ID_Contrato: {
    type: DataTypes.INTEGER,
    references: {
      model: Contrato,
      key: 'ID',
    },
  }, Estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'Factura',
  timestamps: false,
});
