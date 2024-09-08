import { DataTypes } from "sequelize";
import db from "./db.js";
import Espacio from "./espacio.js";
import cliente_contratista from "./cliente_contratista.js";
import contratos from "./contratos.js";

export default db.define(
  "Contrato",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_cliente_contratista: {
      type: DataTypes.INTEGER,
      references: {
        model: cliente_contratista,
        key: "id",
      },
    },
    id_contratos: {
      type: DataTypes.INTEGER,
      references: {
        model: contratos,
        key: "id",
      },
    },
    id_espacio: {
      type: DataTypes.INTEGER,
      references: {
        model: Espacio,
        key: "id",
      },
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "Contrato",
    timestamps: false,
  }
);

