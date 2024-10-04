import { DataTypes } from "sequelize";
import db from "./db.js";
import Contrato from "./contrato.js";
import Contratista from "./contratista.js";

const Factura_Contratista = db.define(
  "factura_contratista",
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
      allowNull: false,
    },
    id_contrato: {
      type: DataTypes.INTEGER,
      references: {
        model: Contrato,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "factura_contratista",
    timestamps: false,
  }
);

export default Factura_Contratista;
