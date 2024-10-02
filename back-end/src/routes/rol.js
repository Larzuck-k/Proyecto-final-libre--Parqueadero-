import { Router } from "express";
import { obtenerRoles } from "../controllers/rol.js";
const rol = Router();

rol.get("/rol/obtener", obtenerRoles);

export default rol;
