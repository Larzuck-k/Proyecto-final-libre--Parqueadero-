import { Router } from "express";
import {
  crearContrato,
  obtenerContratos,
  actualizarContrato,

} from "../controllers/contratos.js";
const contrato = Router();
contrato.post("/contratos/crear", crearContrato);
contrato.get("/contratos/obtener", obtenerContratos);

contrato.put("/contratos/editar", actualizarContrato);

export default contrato;
