import { Router } from "express";
import {
    crearEspacio,
  obtenerEspacios,
  eliminarEspacio,
  actualizarEspacio
} from "../controllers/espacio.js";
const espacio = Router();

espacio.post("/espacio/crear", crearEspacio);
espacio.get("/espacio/obtener", obtenerEspacios);
espacio.delete("/espacio/eliminar", eliminarEspacio);
espacio.put("/espacio/editar", actualizarEspacio);

export default espacio;
