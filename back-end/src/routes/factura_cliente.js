import { Router } from "express";
import {
  crearFactura,
  obtenerFacturas,
} from "../controllers/factura_cliente.js";
const factura_cliente = Router();

factura_cliente.post("/factura_cliente/crear", crearFactura);
factura_cliente.get("/factura_cliente/obtener", obtenerFacturas);

export default factura_cliente;
