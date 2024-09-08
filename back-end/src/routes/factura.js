import { Router } from "express";
import {
  crearFactura,
  obtenerFacturas,
  eliminarFactura,
  actualizarFactura,
} from "../controllers/factura.js";
const factura = Router();

factura.post("/factura/crear", crearFactura);
factura.get("/factura/obtener", obtenerFacturas);
factura.delete("/factura/eliminar", eliminarFactura);
factura.put("/factura/editar", actualizarFactura);
// factura.post("/factura/estado", cambiarEstado);

export default factura;
