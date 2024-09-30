import { Router } from "express";
import {
  crearContrato,
  obtenerContratos,
  obtenerContrato,
  eliminarContrato,
  actualizarContrato,
  cambiarEstado,
} from "../controllers/contrato.js";
const contrato = Router();
contrato.post("/contrato/crear", crearContrato);
contrato.get("/contrato/obtener", obtenerContratos);
contrato.get("/contrato/obtener/single", obtenerContrato);
contrato.delete("/contrato/eliminar", eliminarContrato);
contrato.put("/contrato/editar", actualizarContrato);
contrato.post("/contrato/estado", cambiarEstado);
export default contrato;
