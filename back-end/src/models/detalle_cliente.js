import { DataTypes } from "sequelize";
import db from "./db.js";
import espacio from "./espacio.js";
import Cliente from "./cliente.js";

const Detalle_Cliente = db.define(
  "detalle_cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    placa: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    hora_entrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_salida: {
      type: DataTypes.DATE,
    },
    id_espacio: {
      type: DataTypes.UUID,
      references: {
        model: espacio,
        key: "id",
      },
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: Cliente,
        key: "id",
      },
      defaultValue: 9999,
    },
  },
  {
    tableName: "detalle_cliente",
    timestamps: false,
  }
);

export default Detalle_Cliente;
