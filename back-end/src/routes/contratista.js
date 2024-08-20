import { Router } from "express";
import {
   crearContratista ,
  obtenerContratistas,
  eliminarContratista,
  actualizarContratista,
  cambiarEstado

} from "../controllers/contratista.js";
const contratista = Router();
contratista.post("/contratista/crear", crearContratista);
contratista.get("/contratista/obtener", obtenerContratistas);
contratista.delete("/contratista/eliminar", eliminarContratista);
contratista.put("/contratista/editar", actualizarContratista);
contratista.post("/contratista/estado", cambiarEstado);

export default contratista;
