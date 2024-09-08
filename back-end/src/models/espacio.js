import { DataTypes } from "sequelize";
import db from "./db.js";
import Parqueadero from "./parqueadero.js";
import tipo_ocupacion from "./tipo_ocupacion.js";

export default  db.define("Espacio", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tipo_ocupacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model:tipo_ocupacion,
      key:"id"
    }
  },
  id_parqueadero: {
    type: DataTypes.INTEGER,
    references: {
      model: Parqueadero,
      key: 'id',
    },
  },
  estado: {
    type: DataTypes.ENUM('Disponible', 'Ocupado'),
    allowNull: false,
  },
}, {
  tableName: 'Espacio',
  timestamps: false,
});
