import { Router } from "express";
import {
  crearFactura,
  obtenerFacturas,
  actualizarFactura,
} from "../controllers/factura.js";
const factura = Router();

factura.post("/factura/crear", crearFactura);
factura.get("/factura/obtener", obtenerFacturas);
factura.put("/factura/editar", actualizarFactura);
// factura.post("/factura/estado", cambiarEstado);

export default factura;
