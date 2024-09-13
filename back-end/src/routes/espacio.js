import { Router } from "express";
import {
    crearEspacio,
  obtenerEspacios,
  obtenerEspaciosByParking,
  eliminarEspacio,
  actualizarEspacio,
  cambiarEstado
} from "../controllers/espacio.js";
const espacio = Router();

espacio.post("/espacio/crear", crearEspacio);
espacio.get("/espacio/obtener", obtenerEspacios);
espacio.get("/espacio/obtener/parking", obtenerEspaciosByParking);
espacio.delete("/espacio/eliminar", eliminarEspacio);
espacio.put("/espacio/editar", actualizarEspacio);
espacio.post("/espacio/estado", cambiarEstado);

export default espacio;
