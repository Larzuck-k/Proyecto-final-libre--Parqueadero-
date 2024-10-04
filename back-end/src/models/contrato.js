import { DataTypes } from "sequelize";
import db from "./db.js";
import Espacio from "./espacio.js";
import Contratista from "./contratista.js";

export default db.define(
  "contrato",
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
    valor_contrato: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    id_contratista: {
      type: DataTypes.INTEGER,
      references: {
        model: Contratista,
        key: "id",
      },
    },
    id_espacio: {
      type: DataTypes.UUID,
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
    tableName: "contrato",
    timestamps: false,
  }
);
