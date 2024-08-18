import { Router } from "express";
import {
    crearDetalleFactura,
  obtenerDetallesFactura,
  eliminarDetalleFactura,
  actualizarDetalleFactura
} from "../controllers/detallefactura.js";
const detallefactura = Router();

detallefactura.post("/detallefactura/crear", crearDetalleFactura);
detallefactura.get("/detallefactura/obtener", obtenerDetallesFactura);
detallefactura.delete("/detallefactura/eliminar", eliminarDetalleFactura);
detallefactura.put("/detallefactura/editar", actualizarDetalleFactura);

export default detallefactura;
