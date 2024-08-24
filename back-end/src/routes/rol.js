import { Router } from "express";
import {
  obtenerRoles,
  crearRol,
  eliminarRol,
  editarRol,
  cambiarEstadoRol
} from "../controllers/rol.js";
const rol = Router();

rol.post("/rol/crear", crearRol);
rol.get("/rol/obtener", obtenerRoles);
rol.delete("/rol/eliminar", eliminarRol);
rol.put("/rol/editar", editarRol);
rol.post("/rol/estado", cambiarEstadoRol);


export default rol;
