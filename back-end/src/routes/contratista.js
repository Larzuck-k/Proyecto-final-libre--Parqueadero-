import { Router } from "express";
import {
  crearContratista,
  obtenerContratistas,
  actualizarContratista,
  cambiarEstado,
  obtenerContratistaByPk,
} from "../controllers/contratista.js";
const contratista = Router();
contratista.post("/contratista/crear", crearContratista);
contratista.get("/contratista/obtener", obtenerContratistas);
contratista.get("/contratista/obtener/single", obtenerContratistaByPk);
contratista.put("/contratista/editar", actualizarContratista);
contratista.post("/contratista/estado", cambiarEstado);

export default contratista;
