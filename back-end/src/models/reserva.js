import { DataTypes } from "sequelize";
import db from "./db.js";
import Cliente_Normal from "./cliente_normal.js";
import Espacio from "./espacio.js";

export default  db.define("Reserva", {
  ID_Reserva: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Fecha_Hora_Inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Fecha_Hora_Fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Monto_Pagado: {
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
  ID_Espacio: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'ID_Espacio',
    },
  },
}, {
  tableName: 'Reserva',
  timestamps: false,
});
