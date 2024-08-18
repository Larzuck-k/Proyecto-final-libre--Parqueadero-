import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "././.env" });

//Instansiamos la clase sequelize y establacemos la conexión con sus respectivos datos
export default new Sequelize(process.env.MYSQL_DATABASE,process.env.MYSQL_USER,process.env.MYSQL_PASSWORD,{
    host:process.env.MYSQL_HOST,

    dialect:process.env.ORM_DIALECT //El dialecto define el gestor de base de datos, recordar descargar el driver, nuestro driver es mysql2
})

