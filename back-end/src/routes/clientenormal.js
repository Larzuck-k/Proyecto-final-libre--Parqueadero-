import { Router } from "express";
import {
  crearClienteNormal,
  obtenerClientesNormales,
  eliminarClienteNormal,
  actualizarClienteNormal,
  cambiarEstado,
} from "../controllers/clientenormal.js";
const clientenormal = Router();
clientenormal.post("/cliente/crear", crearClienteNormal);
clientenormal.get("/cliente/obtener", obtenerClientesNormales);
clientenormal.delete("/cliente/eliminar", eliminarClienteNormal);
clientenormal.put("/cliente/editar", actualizarClienteNormal);
clientenormal.post("/cliente/estado", cambiarEstado);

export default clientenormal;
