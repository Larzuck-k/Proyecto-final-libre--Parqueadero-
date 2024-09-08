import { DataTypes } from "sequelize";
import db from "./db.js";
import Usuario from "./usuario.js";



const Contratista = db.define("Contratista", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING(15),
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  
  }
}, {
  tableName: 'Contratista',
  timestamps: false,
});



export default Contratista;