import { Router } from "express";
import {
    crearParqueadero,
  obtenerParqueaderos,
  eliminarParqueadero,
  actualizarParqueadero,
  cambiarEstado
} from "../controllers/parqueadero.js";
const parqueadero = Router();

parqueadero.post("/parqueadero/crear", crearParqueadero);
parqueadero.get("/parqueadero/obtener", obtenerParqueaderos);
parqueadero.delete("/parqueadero/eliminar", eliminarParqueadero);
parqueadero.put("/parqueadero/editar", actualizarParqueadero);
parqueadero.post("/parqueadero/estado", cambiarEstado);

export default parqueadero;
