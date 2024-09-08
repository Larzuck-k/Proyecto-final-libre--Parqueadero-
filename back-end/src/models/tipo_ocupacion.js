import { DataTypes } from "sequelize";
import db from "./db.js";


export default  db.define("Tipo_Ocupacion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING(20),
    allowNull: false,
  }
}, {
  tableName: 'Tipo_Ocupacion',
  timestamps: false,
});
