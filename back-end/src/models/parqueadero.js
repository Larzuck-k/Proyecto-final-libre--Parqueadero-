import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";

export default db.define("Parqueadero", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
    allowNull:false,
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull:false,
  },
}, {
  tableName: 'Parqueadero',
  timestamps: false,
});

