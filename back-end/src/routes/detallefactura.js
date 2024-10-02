import { Router } from "express";
import {
  crearDetalleFactura,
  obtenerDetallesFactura,
  actualizarDetalleFactura,
} from "../controllers/detallefactura.js";
const detallefactura = Router();

detallefactura.post("/detallefactura/crear", crearDetalleFactura);
detallefactura.get("/detallefactura/obtener", obtenerDetallesFactura);
detallefactura.put("/detallefactura/editar", actualizarDetalleFactura);

export default detallefactura;
