import { Router } from "express";
import {
    crearParqueadero,
  obtenerParqueaderos,
  eliminarParqueadero,
  actualizarParqueadero
} from "../controllers/parqueadero.js";
const parqueadero = Router();

parqueadero.post("/parqueadero/crear", crearParqueadero);
parqueadero.get("/parqueadero/obtener", obtenerParqueaderos);
parqueadero.delete("/parqueadero/eliminar", eliminarParqueadero);
parqueadero.put("/parqueadero/editar", actualizarParqueadero);

export default parqueadero;
