import { Router } from "express";
import {
  obtenerRoles,
  crearRol,
  eliminarRol
} from "../controllers/rol.js";
const rol = Router();

rol.post("/rol/crear", crearRol);
rol.get("/rol/obtener", obtenerRoles);
rol.delete("/rol/eliminar", eliminarRol);



export default rol;
